// POST /api/auth/verifyEmail
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// POST /api/auth/signup
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const axios = require('axios');
const pool = new Pool();

router.post('/signup', async (req, res) => {
    const { username, password, email, baseUrl } = req.body;
    if (!username || !password || !email || !baseUrl) {
        return res.status(400).json({ error: 'Missing username, password, email, or baseUrl' });
    }
    try {
        // Check if user/email already exists
        const existing = await pool.query('SELECT id FROM users WHERE username = $1 OR email = $2', [username, email]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ error: 'Username or email already exists' });
        }
        // Hash password
        const password_hash = await bcrypt.hash(password, 10);
                const user = {
                        id: uuidv4(),
                        is_verified: false,
                        created_at: new Date().toISOString(),
                        password_hash,
                        profile_picture_url: null,
                        bio: null,
                        username,
                        email,
                };
                // Insert user with all fields
                const insertQuery = `
                    INSERT INTO users (
                        id, is_verified, created_at, password_hash, profile_picture_url, bio, username, email
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6, $7, $8
                    ) RETURNING id, email
                `;
                const result = await pool.query(insertQuery, [
                        user.id,
                        user.is_verified,
                        user.created_at,
                        user.password_hash,
                        user.profile_picture_url,
                        user.bio,
                        user.username,
                        user.email
                ]);
                const dbUser = result.rows[0];
                // Generate OTP
                const otpRes = await axios.post('http://localhost:3002/get-otp', { email });
                const otp = otpRes.data.otp;
                if (!otp) {
                        return res.status(500).json({ error: 'Failed to generate OTP' });
                }

                // Insert OTP into verification_token table
                const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes from now
                const insertOtpQuery = `
                    INSERT INTO verification_tokens (user_id, expires_at, used, token, type)
                    VALUES ($1, $2, $3, $4, $5)
                `;
                await pool.query(insertOtpQuery, [user.id, expiresAt, false, otp, 'email_verification']);
                // Create JWT with email and user id
                                const token = jwt.sign(
                                    { email: user.email, id: user.id },
                                    process.env.JWT_SECRET,
                                    { expiresIn: '1h' }
                                );
                const isEmailSent = await axios.post('http://localhost:3000/send-email', { to: email, subject: 'ChatApp: Please verify your email', appName: 'ChatApp', isOtp: true, baseUrl, token, otp });
                if(isEmailSent.data.success !== true) {
                        return res.status(500).json({ error: 'Failed to send verification email' });
                }

                                
                                return res.status(200).json({ success: true, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Signup failed', success: false });
    }
});

router.post('/verify', async (req, res) => {
    const { token, otp } = req.body;
    if (!token || !otp) {
        return res.status(400).json({ error: 'Missing token or otp' });
    }

    try {
        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        // Fetch user
        const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userRes.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = userRes.rows[0];
        const userID = user.id;
        // Check if OTP is valid
        const otpRes = await pool.query('SELECT * FROM verification_tokens WHERE token = $1 AND user_id = $2', [otp, userID]);
        if (otpRes.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // Mark OTP as used
        await pool.query('UPDATE verification_tokens SET used = true WHERE token = $1', [otp]);

        // Update user as verified
        await pool.query('UPDATE users SET is_verified = true WHERE email = $1', [email]);

        // Get the user a fresh JWT for his session
        const newToken = jwt.sign(
            { email: user.email, id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        return res.status(200).json({ success: true, token: newToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Verification failed', success: false });
    }
});
module.exports = router;

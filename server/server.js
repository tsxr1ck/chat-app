const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Pool } = require('pg');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
};
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
const pool = new Pool(dbConfig);

const setupDatabase = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL.');
        await client.query(`
        CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log('Messages table is ready.');
        client.release();
    } catch (err) {
        console.error('Error setting up the database:', err.stack);
        process.exit(1);
    }
};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('chat message', async (msg) => {
        console.log('Message received:', msg);
        try {
            const result = await pool.query(
                `INSERT INTO messages(username, content) VALUES($1, $2) RETURNING *;`,
                [msg.username, msg.content]
            );
            io.emit('chat message', result.rows[0]);
        } catch (err) {
            console.error('Error saving message:', err.stack);
        }
    });
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});


app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Messages API
app.get('/messages', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM messages ORDER BY created_at ASC');
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

setupDatabase().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
});
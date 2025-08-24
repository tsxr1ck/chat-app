// utils/dbMessages.ts
// Node.js utility to fetch all chat messages from the Postgres database
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
});

export async function fetchAllMessages() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM messages ORDER BY created_at ASC');
        return res.rows;
    } finally {
        client.release();
    }
}

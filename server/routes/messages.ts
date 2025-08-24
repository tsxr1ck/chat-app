// server/routes/messages.ts
import express from 'express';
import { fetchAllMessages } from '../utils/dbMessages';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await fetchAllMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;

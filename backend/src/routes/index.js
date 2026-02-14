import { Router } from 'express';
import authRoutes from './authRoutes.js';
import chatRoutes from './chatRoutes.js';
import documentRoutes from './documentRoutes.js';

const router = Router();

router.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'sociology-ai-backend' });
});

router.use('/auth', authRoutes);
router.use('/chats', chatRoutes);
router.use('/docs', documentRoutes);

export default router;

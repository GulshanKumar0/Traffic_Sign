import { Router } from 'express';
import {
  continueChat,
  createChat,
  listChats,
  searchQuestionBank
} from '../controllers/chatController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);
router.get('/', listChats);
router.post('/', createChat);
router.post('/:chatId/message', continueChat);
router.get('/question-bank/search', searchQuestionBank);

export default router;

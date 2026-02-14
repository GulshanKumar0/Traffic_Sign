import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth.js';
import { parseDocument } from '../controllers/documentController.js';

const router = Router();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/parse', authMiddleware, upload.single('file'), parseDocument);

export default router;

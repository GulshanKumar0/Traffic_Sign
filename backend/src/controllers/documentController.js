import fs from 'fs/promises';
import { extractTextFromFile } from '../services/documentService.js';
import { generateSociologyAnswer } from '../services/ragService.js';

export const parseDocument = async (req, res) => {
  try {
    const { mode = 'exam', languagePreference } = req.body;
    const result = await extractTextFromFile(req.file);
    const language = languagePreference || result.language;
    const aiReply = generateSociologyAnswer({ query: result.extractedText, mode, language });

    await fs.unlink(req.file.path).catch(() => null);

    return res.json({
      ...result,
      responseLanguage: language,
      answer: aiReply
    });
  } catch (error) {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => null);
    }

    return res.status(400).json({ message: error.message || 'Document parsing failed' });
  }
};

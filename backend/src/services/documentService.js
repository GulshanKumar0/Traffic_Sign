import fs from 'fs/promises';
import pdf from 'pdf-parse';
import Tesseract from 'tesseract.js';
import { detectLanguage } from '../utils/language.js';

const supportedMime = ['image/png', 'image/jpeg', 'application/pdf'];

export const validateFile = (file) => {
  if (!file) {
    throw new Error('No file uploaded');
  }

  if (!supportedMime.includes(file.mimetype)) {
    throw new Error('Unsupported file format. Upload PNG, JPG, or PDF only.');
  }
};

export const extractTextFromFile = async (file) => {
  validateFile(file);

  if (file.mimetype === 'application/pdf') {
    const buffer = await fs.readFile(file.path);
    const parsed = await pdf(buffer);
    return {
      extractedText: parsed.text.trim(),
      language: detectLanguage(parsed.text)
    };
  }

  const { data } = await Tesseract.recognize(file.path, 'eng+hin');
  const extractedText = data?.text?.trim() || '';
  if (!extractedText) {
    throw new Error('Could not extract text. Please upload a clearer image.');
  }

  return {
    extractedText,
    language: detectLanguage(extractedText)
  };
};

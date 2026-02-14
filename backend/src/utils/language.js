const hindiPattern = /[\u0900-\u097F]/;

export const detectLanguage = (text = '') => {
  if (!text.trim()) return 'en';
  if (hindiPattern.test(text) && /[a-zA-Z]/.test(text)) return 'hinglish';
  if (hindiPattern.test(text)) return 'hi';
  return 'en';
};

export const normalizeLanguage = (preferred, text) => preferred || detectLanguage(text);

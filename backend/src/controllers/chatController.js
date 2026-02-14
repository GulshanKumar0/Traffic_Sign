import { v4 as uuid } from 'uuid';
import { chats, questionBank } from '../db/mockDb.js';
import { detectLanguage, normalizeLanguage } from '../utils/language.js';
import { generateSociologyAnswer } from '../services/ragService.js';

export const createChat = (req, res) => {
  const { message, mode = 'exam', languagePreference } = req.body;
  const language = normalizeLanguage(languagePreference, message);

  const answer = generateSociologyAnswer({ query: message, mode, language });
  const chat = {
    id: uuid(),
    userId: req.user.sub,
    mode,
    language,
    createdAt: new Date().toISOString(),
    messages: [
      { role: 'user', text: message, timestamp: new Date().toISOString() },
      { role: 'assistant', text: answer, timestamp: new Date().toISOString() }
    ]
  };

  chats.push(chat);
  return res.status(201).json(chat);
};

export const continueChat = (req, res) => {
  const { chatId } = req.params;
  const { message, languagePreference } = req.body;

  const chat = chats.find((c) => c.id === chatId && c.userId === req.user.sub);
  if (!chat) return res.status(404).json({ message: 'Chat not found' });

  const language = normalizeLanguage(languagePreference, message) || chat.language || detectLanguage(message);
  const reply = generateSociologyAnswer({ query: message, mode: chat.mode, language });
  chat.messages.push(
    { role: 'user', text: message, timestamp: new Date().toISOString() },
    { role: 'assistant', text: reply, timestamp: new Date().toISOString() }
  );

  return res.json(chat);
};

export const listChats = (req, res) => {
  const own = chats.filter((c) => c.userId === req.user.sub);
  res.json(own);
};

export const searchQuestionBank = (req, res) => {
  const { topic = '' } = req.query;
  const filtered = questionBank.filter((q) => q.topic.toLowerCase().includes(topic.toLowerCase()));
  res.json(filtered);
};

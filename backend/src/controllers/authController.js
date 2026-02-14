import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { env } from '../config/env.js';
import { users } from '../db/mockDb.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: uuid(), name, email, password: hashed, progress: [] };
  users.push(user);
  return res.status(201).json({ message: 'Signup successful' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, env.jwtSecret, {
    expiresIn: '12h'
  });

  return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
};

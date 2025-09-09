import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../sequelize/index.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(409).json({ error: 'email already exists' });
  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password_hash });
  res.json({ id: user.id, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
  res.json({ token });
});

export default router;

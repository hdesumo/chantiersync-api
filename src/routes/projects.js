import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Project } from '../sequelize/index.js';

const router = Router();

router.post('/', requireAuth, async (req, res) => {
  const { title, country, city, address } = req.body;
  const project = await Project.create({ title, country, city, address, owner_id: req.user.sub });
  res.json(project);
});

router.get('/', requireAuth, async (req, res) => {
  const list = await Project.findAll({ where: { owner_id: req.user.sub }, order: [['created_at','DESC']] });
  res.json(list);
});

router.get('/:id', requireAuth, async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project || project.owner_id !== req.user.sub) return res.status(404).json({ error: 'not found' });
  res.json(project);
});

export default router;

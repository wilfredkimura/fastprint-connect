import { Router } from 'express';
import { authRequired, requireRole } from '../middleware/auth.js';
import { prisma } from '../prismaClient.js';

const router = Router();

router.get('/', async (req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  res.json({ categories });
});

router.post('/', authRequired, requireRole('admin'), async (req, res) => {
  const created = await prisma.category.create({ data: req.body });
  res.status(201).json({ category: created });
});

router.put('/:id', authRequired, requireRole('admin'), async (req, res) => {
  const updated = await prisma.category.update({ where: { id: req.params.id }, data: req.body });
  res.json({ category: updated });
});

router.delete('/:id', authRequired, requireRole('admin'), async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

export default router;

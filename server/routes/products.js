import { Router } from 'express';
import { authRequired, requireRole } from '../middleware/auth.js';
import { prisma } from '../prismaClient.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q, category, lowStock } = req.query;
  const where = {};
  if (q) where.name = { contains: String(q), mode: 'insensitive' };
  if (category) where.categoryId = String(category);
  if (lowStock) where.stock = { lt: Number(lowStock) };
  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ products });
});

router.get('/:id', async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id }, include: { category: true } });
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json({ product });
});

router.post('/', authRequired, requireRole('admin'), async (req, res) => {
  const created = await prisma.product.create({ data: req.body });
  res.status(201).json({ product: created });
});

router.put('/:id', authRequired, requireRole('admin'), async (req, res) => {
  const updated = await prisma.product.update({ where: { id: req.params.id }, data: req.body });
  res.json({ product: updated });
});

router.delete('/:id', authRequired, requireRole('admin'), async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

export default router;

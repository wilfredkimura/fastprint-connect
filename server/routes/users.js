import { Router } from 'express';
import { authRequired, requireRole } from '../middleware/auth.js';
import { prisma } from '../prismaClient.js';

const router = Router();

router.get('/', authRequired, requireRole('admin'), async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, role: true, phone: true, address: true, createdAt: true },
  });
  res.json({ users });
});

router.put('/:id', authRequired, requireRole('admin'), async (req, res) => {
  const { name, email, phone, address, role } = req.body;
  const updated = await prisma.user.update({
    where: { id: req.params.id },
    data: { name, email, phone, address, role },
    select: { id: true, name: true, email: true, role: true, phone: true, address: true },
  });
  res.json({ user: updated });
});

router.delete('/:id', authRequired, requireRole('admin'), async (req, res) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

export default router;

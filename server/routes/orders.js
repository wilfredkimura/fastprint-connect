import { Router } from 'express';
import { authRequired, requireRole } from '../middleware/auth.js';
import { prisma } from '../prismaClient.js';

const router = Router();

const toEnum = (s) => (s ? String(s).replaceAll(' ', '_') : undefined);

// User creates order
router.post('/', authRequired, async (req, res) => {
  const { items, total, status, trackingNumber } = req.body;
  if (!Array.isArray(items) || typeof total !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const order = await prisma.order.create({
    data: {
      userId: req.user.id,
      status: toEnum(status) || 'Pending',
      trackingNumber,
      total,
      items: {
        create: items.map((it) => ({
          productId: it.product,
          quantity: it.quantity,
          price: it.price,
          customizations: it.customizations ?? null,
        })),
      },
    },
    include: { items: true },
  });
  res.status(201).json({ order });
});

// User: list own orders
router.get('/mine', authRequired, async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } },
  });
  res.json({ orders });
});

// Admin: list all orders with filters
router.get('/', authRequired, requireRole('admin'), async (req, res) => {
  const { status, from, to, customer } = req.query;
  const where = {};
  if (status) where.status = toEnum(status);
  if (from || to) where.createdAt = { ...(from && { gte: new Date(String(from)) }), ...(to && { lte: new Date(String(to)) }) };
  if (customer) where.userId = String(customer);
  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { user: true, items: { include: { product: true } } },
  });
  res.json({ orders });
});

router.get('/:id', authRequired, async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { user: true, items: { include: { product: true } } },
  });
  if (!order) return res.status(404).json({ error: 'Not found' });
  if (req.user.role !== 'admin' && order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json({ order });
});

router.put('/:id/status', authRequired, requireRole('admin'), async (req, res) => {
  const { status, trackingNumber } = req.body;
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { ...(status && { status: toEnum(status) }), ...(trackingNumber !== undefined && { trackingNumber }) },
  });
  res.json({ order });
});

router.delete('/:id', authRequired, requireRole('admin'), async (req, res) => {
  await prisma.orderItem.deleteMany({ where: { orderId: req.params.id } });
  await prisma.order.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

export default router;

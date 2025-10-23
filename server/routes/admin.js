import { Router } from 'express';
import { authRequired, requireRole } from '../middleware/auth.js';
import { prisma } from '../prismaClient.js';

const router = Router();

router.get('/stats', authRequired, requireRole('admin'), async (req, res) => {
  const [totalOrders, pendingOrders, lowStock] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'Pending' } }),
    prisma.product.count({ where: { stock: { lt: 5 } } }),
  ]);

  const revenueAgg = await prisma.order.aggregate({ _sum: { total: true } });
  const revenue = revenueAgg._sum.total || 0;
  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: { user: true },
  });

  res.json({
    stats: {
      totalOrders,
      pendingOrders,
      totalRevenue: revenue,
      lowStockAlerts: lowStock,
    },
    recentOrders,
  });
});

export default router;

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import categoryRoutes from './routes/categories.js';
import adminRoutes from './routes/admin.js';
import { prisma } from './prismaClient.js';
import { seedAdminIfMissing } from './seed.js';

export function createApp() {
  const app = express();
  app.use(cors({ origin: '*', credentials: false }));
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  app.get('/health', async (req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ ok: false, error: String(e) });
    }
  });

  // Mount without '/api' so Vercel function at '/api' exposes these at '/api/*'
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/products', productRoutes);
  app.use('/orders', orderRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/admin', adminRoutes);

  return app;
}

export default createApp();

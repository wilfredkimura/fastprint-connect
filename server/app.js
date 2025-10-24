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

  // Basic request timing logs
  app.use((req, res, next) => {
    const start = Date.now();
    const { method, url } = req;
    res.on('finish', () => {
      const ms = Date.now() - start;
      // eslint-disable-next-line no-console
      console.log(`[api] ${method} ${url} -> ${res.statusCode} in ${ms}ms`);
    });
    next();
  });

  app.get('/health', async (req, res) => {
    try {
      const t0 = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      const ms = Date.now() - t0;
      // eslint-disable-next-line no-console
      console.log(`[api] prisma health query took ${ms}ms`);
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ ok: false, error: String(e) });
    }
  });

  // Root handler so GET /api returns a valid response on Vercel
  app.get('/', (req, res) => {
    res.json({ ok: true, service: 'api' });
  });

  // Mount without '/api' so Vercel function at '/api' exposes these at '/api/*'
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/products', productRoutes);
  app.use('/orders', orderRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/admin', adminRoutes);

  // 404 handler for unknown API routes
  app.use((req, res, next) => {
    if (req.method && req.path) {
      return res.status(404).json({ error: 'Not found', method: req.method, path: req.path });
    }
    next();
  });

  // Global error handler to avoid 500 without JSON body
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err, req, res, next) => {
    // Optional: console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}

export default createApp();

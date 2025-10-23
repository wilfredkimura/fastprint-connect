import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

// Build DATABASE_URL from NEON_* pieces if not provided
if (!process.env.DATABASE_URL) {
  const host = process.env.NEON_HOST;
  const user = process.env.NEON_USER;
  const pass = process.env.NEON_PASSWORD;
  const db   = process.env.NEON_DATABASE;
  if (host && user && pass && db) {
    process.env.DATABASE_URL = `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}/${db}?sslmode=require`;
  }
}

const globalForPrisma = globalThis;

function createClient() {
  const url = process.env.DATABASE_URL || '';
  if (url.includes('neon.tech') || url.includes('sslmode=require')) {
    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaNeon(pool);
    return new PrismaClient({ adapter });
  }
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma || createClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

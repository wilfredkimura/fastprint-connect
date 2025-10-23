import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

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

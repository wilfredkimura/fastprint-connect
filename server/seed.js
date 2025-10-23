import bcrypt from 'bcryptjs';
import { prisma } from './prismaClient.js';

export async function seedAdminIfMissing() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';
  if (!email || !password) return;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return;

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { name, email, passwordHash, role: 'admin' } });
  // eslint-disable-next-line no-console
  console.log(`Seeded admin user ${email}`);
}

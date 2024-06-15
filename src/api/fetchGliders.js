// api/fetchGliders.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const gliders = await prisma.glider.findMany();
    res.status(200).json(gliders);
  } catch (error) {
    console.error('Error fetching gliders:', error);
    res.status(500).json({ message: 'Failed to fetch gliders' });
  } finally {
    await prisma.$disconnect();
  }
}

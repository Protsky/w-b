import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const gliders = await prisma.glider.findMany();
    if (!gliders || gliders.length === 0) {
      return res.status(200).json([]); // Return an empty array if no gliders found
    }
    res.status(200).json(gliders);
  } catch (error) {
    console.error('Error fetching gliders:', error);
    res.status(500).json({ message: 'Failed to fetch gliders' });
  } finally {
    await prisma.$disconnect();
  }
}

export function get(request, response) {
  return handler(request, response);
}

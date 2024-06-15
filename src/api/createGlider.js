// api/createGlider.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, emptyWeight, aftLimit, forwardLimit } = req.body;

  try {
    const newGlider = await prisma.glider.create({
      data: {
        name,
        emptyWeight: parseFloat(emptyWeight),
        aftLimit: parseFloat(aftLimit),
        forwardLimit: parseFloat(forwardLimit),
      },
    });
    res.status(201).json(newGlider);
  } catch (error) {
    console.error('Error creating glider:', error);
    res.status(500).json({ message: 'Failed to create glider' });
  } finally {
    await prisma.$disconnect();
  }
}

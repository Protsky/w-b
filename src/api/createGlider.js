// Example of setting CORS headers in Vercel serverless function
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust the domain as needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Preflight request handling
    res.status(200).end();
    return;
  }

  // Actual API logic
  if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

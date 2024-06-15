// api/addGlider.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, emptyWeight, aftLimit, forwardLimit } = req.body;

  try {
    const newGlider = await prisma.glider.create({
      data: {
        name,
        emptyWeight,
        aftLimit,
        forwardLimit,
      },
    });

    return res.status(201).json(newGlider);
  } catch (error) {
    console.error('Error adding glider:', error);
    return res.status(500).json({ error: 'Failed to add glider' });
  } finally {
    await prisma.$disconnect();
  }
};

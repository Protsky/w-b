import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getGliders() {
  try {
    const gliders = await prisma.glider.findMany();
    return { gliders: gliders || [] }; // Ensure to return an empty array if gliders is null or undefined
  } catch (error) {
    console.error('Error fetching gliders:', error);
    return { error: 'Error fetching gliders' };
  } finally {
    await prisma.$disconnect();
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { gliders, error } = await getGliders();
    if (error) {
      return res.status(500).json({ error });
    }
    return res.status(200).json(gliders); // gliders will either be an array of gliders or an empty array
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

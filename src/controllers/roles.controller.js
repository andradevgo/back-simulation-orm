import { prisma } from '../db.js';

export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  const roles = await prisma.roles.findMany();
};

export const getRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await prisma.roles.findFirst({
      where: {
        Id: +id,
      },
    });
    return res.status(200).json(role);
  } catch (error) {}
};

export const createRole = async (req, res) => {
  try {
    const { Name } = req.body;
    const newRoles = await prisma.roles.create({
      data: {
        Name,
      },
    });
    res.status(201).json(newRoles);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

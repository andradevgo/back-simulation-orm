import { prisma } from '../db.js';

export const getUserRoles = async (req, res) => {
  try {
    const userRoles = await prisma.user_Roles.findMany();

    res.status(200).json(userRoles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUserRole = async (req, res) => {
  try {
    const { User_Id, Role_Id } = req.body;

    const newUserRole = await prisma.user_Roles.create({
      data: {
        User_Id: +User_Id,
        Role_Id: +Role_Id,
      },
    });

    res.status(201).json(newUserRole);
  } catch (error) {}
};

import { prisma } from '../db.js';
import { calculateAge } from '../utils/calculateAge.js';

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();

    const usersAge = users.map((users) => ({
      ...users,
      Age: calculateAge(users.Birthdate),
      Birthdate: undefined,
    }));

    return res.status(200).json(usersAge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findFirst({
      where: {
        Id: +id,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { Name, Email, Birthdate, Document_Type, Document_Number } = req.body;
  try {
    const newUser = await prisma.users.create({
      data: {
        Name,
        Birthdate: new Date(Birthdate),
        Email,
        Document_Type,
        Document_Number,
      },
    });

    const createRole = await prisma.user_Roles.create({
      data: {
        User_Id: newUser.Id,
        Role_Id: 2,
      },
    });

    console.log(createRole);
    return res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const signout = (req, res) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json({ message: 'Cierre de sesión exitoso' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

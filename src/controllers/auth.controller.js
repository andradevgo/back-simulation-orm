
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { compareFaces } from '../utils/faceService.js';
import { prisma } from '../db.js';

// Registrar un nuevo usuario
export const signup = async (req, res, next) => {
  const { Name, Email, Password, Birthdate, Document_Type, Document_Number } =
    req.body;

  if (
    !Name ||
    !Email ||
    !Password ||
    !Document_Type ||
    !Document_Number ||
    Name === '' ||
    Email === '' ||
    Password === '' ||
    Document_Type === '' ||
    Document_Number === ''
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = bcryptjs.hashSync(Password, 10);

  const userExist = await prisma.users.findFirst({
    where: {
      OR: [{ Email: Email }, { Document_Number: Document_Number }],
    },
  });

  if (userExist) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const createUser = await prisma.users.create({
      data: {
        Name,
        Email,
        Password: hashedPassword,
        Birthdate: new Date(Birthdate),
        Document_Type,
        Document_Number,
      },
    });

    const createRole = await prisma.user_Roles.create({
      data: {
        User_Id: createUser.Id,
        Role_Id: 2,
      },
    });

    const { Password: userPassword, ...user } = createUser;

    const token = jwt.sign(
      { id: user.Id, role: createRole.Role_Id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    );

    return res
      .status(201)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Verificar token
export const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await prisma.users.findFirst({
      where: {
        Id: decoded.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userRole = await prisma.user_Roles.findFirst({
      where: {
        User_Id: user.Id,
      },
      select: {
        Role: true,
      },
    });

    const role = userRole ? userRole.Role.Id : null;

    if (!userRole || role === null) {
      return res.status(400).json({ message: 'User has no role' });
    }

    const newToken = jwt.sign(
      { id: user.Id, role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    );

    const { Password: userPassword, ...userData } = user;

    return res
      .status(200)
      .cookie('access_token', newToken, { httpOnly: true })
      .json(userData);

  } catch (error) {
    res.clearCookie('access_token');
    return res.status(500).json({ message: error.message });
  }
};

// Iniciar sesión de usuario
async function downloadImage(url, filePath) {
  const response = await axios({
    url,
    responseType: 'arraybuffer',
  });
  fs.writeFileSync(filePath, response.data);
}

export const signin = async (req, res) => {
  const { Email, Password, Photo } = req.body;
  try {
    if (!Email || (!Password && !Photo) || Email === '' || Password === '') {
      return res.status(400).json({ message: 'Email and either Password or Photo are required' });
    }

    const user = await prisma.users.findFirst({
      where: { Email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = bcryptjs.compareSync(Password, user.Password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const tempDir = path.join(path.resolve(), 'temp');
    const receivedImagePath = path.join(tempDir, 'receivedImage.jpg');
    const storedImagePath = path.join(tempDir, 'storedImage.jpg');
    
    // Helper function to write image
    const writeImage = (filePath, base64Data) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(filePath, base64Data, 'base64', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    };

    if (Photo) {
      const base64StringReceived = Photo;
      const base64DataReceived = base64StringReceived.replace(/^data:image\/png;base64,/, '');

      const base64StringStored = user.Photo;
      const base64DataStored = base64StringStored.replace(/^data:image\/png;base64,/, '');

      // Verifica si el directorio 'temp' existe, si no, lo crea
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Guarda las imágenes
      await Promise.all([
        writeImage(storedImagePath, base64DataStored),
        writeImage(receivedImagePath, base64DataReceived),
      ]);

      console.log('Imagen guardada correctamente en', storedImagePath);
      console.log('Imagen recibida guardada correctamente en', receivedImagePath);

      try {
        console.log("entra");
        const isSamePerson = await compareFaces(storedImagePath, receivedImagePath);
        console.log("sale");
        // Elimina archivos temporales después de la comparación
        fs.unlinkSync(storedImagePath);
        fs.unlinkSync(receivedImagePath);
        return res.json({ match: isSamePerson });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }

    


    // Consulta de rol del usuario
    const userRole = await prisma.user_Roles.findFirst({
      where: {
        User_Id: user.Id,
      },
      select: {
        Role: true,
      },
    });

    // Extraer el rol del usuario
    const role = userRole ? userRole.Role : null; // Cambia 'defaultRole' por el rol por defecto si no tiene asignado uno
    if (!userRole || role === null) {
      return res.status(400).json({ message: 'User has no role' });
    }
    // Generar token con el rol
    const token = jwt.sign(
      { id: user.Id, role: role.Id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    );

    const { Password: userPassword, ...userData } = user;

    return res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(userData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import jwt from 'jsonwebtoken';

// Middleware para verificar y decodificar el token JWT
export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Almacena el usuario decodificado en el objeto de solicitud
    next();
  });
};

// Función auxiliar para verificar roles
export const checkRole = (requiredRole) => (req, res, next) => {
  const { role } = req.user;

  if (!role || role !== requiredRole) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  next();
};

//SE USARIA EN OTRO ARCHIVO DE RUTAS PROTEGIDAS ALGO ASI
// import express from 'express';
// import { authenticateToken, checkRole } from './middlewares/auth';
// const router = express.Router();

// // Ruta protegida que requiere un rol específico
// router.get('/admin', authenticateToken, checkRole('admin'), (req, res) => {
//   // Si pasa la verificación de autenticación y rol, se ejecuta este bloque
//   res.json({ message: 'Welcome to admin dashboard!' });
// });

// export default router;

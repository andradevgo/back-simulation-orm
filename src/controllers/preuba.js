
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { compareFaces } from '../utils/faceService.js';
import { prisma } from '../db.js';


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


    console.log("entra");
    const isSamePerson = await compareFaces(storedImagePath, receivedImagePath);
    console.log("sale");
    // Elimina archivos temporales después de la comparación
    fs.unlinkSync(storedImagePath);
    fs.unlinkSync(receivedImagePath);
    
 

import * as faceapi from 'face-api.js';
import path from 'path';
import canvas from 'canvas';
import { fileURLToPath } from 'url';

const { Canvas, Image, ImageData } = canvas;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

export async function loadModels() {
    const MODEL_URL = path.join(__dirname, '../../models'); // Asegúrate de que esta ruta sea correcta
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
}

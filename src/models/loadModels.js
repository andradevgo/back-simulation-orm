import faceapi from 'face-api.js';
import path from 'path';
import canvas from 'canvas';
const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function loadModels() {
    const MODEL_URL = path.join(__dirname, '../../models'); // Ruta a tus modelos descargados
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
}

export{ loadModels };

import fs from 'fs';
import path from 'path';
import canvas from 'canvas';
import { loadModels } from '../models/loadModels.js';
import faceapi from 'face-api.js';


async function getFaceDescriptor(image) {
    const img = await canvas.loadImage(image);
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    return detections ? detections.descriptor : null;
}

function compareDescriptors(descriptor1, descriptor2) {
    const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
    console.log(distance);
    return distance < 0.6; 
  
}

async function compareFaces(storedImagePath, receivedImagePath) {
    await loadModels();

    const descriptor1 = await getFaceDescriptor(storedImagePath);
    const descriptor2 = await getFaceDescriptor(receivedImagePath);

    if (descriptor1 && descriptor2) {
        return compareDescriptors(descriptor1, descriptor2);
    } else {
        throw new Error('No se detectaron rostros en una o ambas imágenes.');
    }
}

export { compareFaces };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertImageToBase64 = convertImageToBase64;
// Define el tipo de la función que recibe un Buffer y devuelve un string
function convertImageToBase64(buffer) {
    const base64Data = buffer.toString('base64');
    const base64Image = `data:image/jpeg;base64,${base64Data}`; // Ajusta el tipo de imagen según corresponda
    return base64Image;
}

import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Ruta de la imagen
});

const Image = mongoose.model('Image', imageSchema);

export default Image;

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import Image from './models/imagenimagen.js';

const app = express();
const PORT = 5000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/galeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Servir archivos estáticos

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: 'uploads/', // Carpeta donde se guardarán las imágenes
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para la imagen
  }
});
const upload = multer({ storage });

// Ruta para agregar una imagen
app.post('/api/images', upload.single('image'), async (req, res) => {
  console.log(req.file); // Verifica si el archivo se sube correctamente

  try {
    const { title, description, author } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const newImage = new Image({
      title,
      description,
      author,
      imageUrl
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la imagen' });
  }
});

// Ruta para obtener todas las imágenes
app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las imágenes' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

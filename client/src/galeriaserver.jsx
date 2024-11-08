import { useState } from 'react';
import axios from 'axios';

const GaleriaServer = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', author);

    try {
      await axios.post('http://localhost:5000/api/images', formData);
      fetchImages(); // Recargar las imágenes después de agregar una nueva
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error al obtener las imágenes:', error);
    }
  };

  return (
    <div>
      <h1>Galería Server</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input type="file" onChange={handleImageChange} required />
        <button type="submit">Subir Imagen</button>
      </form>

      <h2>Imágenes Cargadas</h2>
      <button onClick={fetchImages}>Cargar Imágenes</button>
      <div>
        {images.map((image) => (
          <div key={image._id}>
            <img
              src={`http://localhost:5000${image.imageUrl}`}
              alt={image.title}
              width="200"
            />
            <p>{image.title}</p>
            <p>{image.description}</p>
            <p>{image.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaleriaServer;

import { useState, useEffect } from 'react';
import axios from 'axios';

const GaleriaPublic = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Galería Pública</h1>
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

export default GaleriaPublic;

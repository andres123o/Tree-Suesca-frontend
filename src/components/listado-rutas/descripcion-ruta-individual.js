import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import InfoDescripcion from './seccion-descripcion'; 
import Footer from '../common/footer';
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';
import axios from 'axios'
import OptimizedImage from '../common/optimzarImg'
import { MdError } from "react-icons/md";


// Obtener datos
const useDestinoContent = (destinoId = 1) => {
  const { nombre } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchDestinoContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://tree-suesca-backend-production.up.railway.app/api/v1/caracteristicas/${nombre}/content`
        );
        setContent(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinoContent();
  }, [destinoId]);

  return { content, loading, error };
};

const MainComponentRuta = () => {
  const { content, loading, error } = useDestinoContent();
  
  if (loading) return (
      <div className="loading-container">
          <div className="loading-content">
              <div className="loading-spinner"></div>
              <h5 className="loading-text">Cargando Ruta...</h5>
          </div>
      </div>
  );

  if (error) return (
      <div className="error-container">
          <div className="error-content">
              <MdError className="error-icon" />
              <h5 className="error-text">¡Ups! Algo salió mal</h5>
              <p className="error-message">
                  {error}. Por favor, intenta de nuevo más tarde.
              </p>
          </div>
      </div>
  );

  if (!content) return (
      <div className="loading-container">
          <div className="loading-content">
              <div className="loading-spinner"></div>
              <h5 className="loading-text">Estamos trabajando en esta ruta</h5>
          </div>
      </div>
  );

  return <DescripcionRuta rutas={content} />;
}

const DescripcionRuta = ({ rutas }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImage, setBackgroundImg] = useState(rutas.imagenes[0]?.url || rutas.img);


  useEffect(() => {
    // Set initial image when component mounts or rutas changes
    if (rutas.imagenes && rutas.imagenes.length > 0) {
      setBackgroundImg(rutas.imagenes[0].url);
    } else {
      setBackgroundImg(rutas.img);
    }
  }, [rutas]);
  
  const handleImageSelect = (imgSrc, index) => {
    setBackgroundImg(imgSrc);
    setCurrentImageIndex(index);
  };

  const handleNext = () => {
    if (rutas.imagenes && rutas.imagenes.length > 0) {
      const nextIndex = (currentImageIndex + 1) % rutas.imagenes.length;
      setCurrentImageIndex(nextIndex);
      setBackgroundImg(rutas.imagenes[nextIndex].url);
    }
  };
  
  const handlePrevious = () => {
    if (rutas.imagenes && rutas.imagenes.length > 0) {
      const prevIndex = (currentImageIndex - 1 + rutas.imagenes.length) % rutas.imagenes.length;
      setCurrentImageIndex(prevIndex);
      setBackgroundImg(rutas.imagenes[prevIndex].url);
    }
  };

  return (
    <>
      <div className='container-actividades-div'>
        <div className='carousel-main-container'>
          <OptimizedImage className='container-img-principal'
              imageUrl={backgroundImage}
              alt={backgroundImage}
          />
          <button 
              className="carousel-arrow carousel-arrow-left"
              onClick={handlePrevious}
              aria-label="Imagen anterior"
          >
              <IoIosArrowBack />
          </button>
          <button 
              className="carousel-arrow carousel-arrow-right"
              onClick={handleNext}
              aria-label="Siguiente imagen"
          >
              <IoIosArrowForward />
          </button>
        </div>        

        {/* Contenedor principal de la información */}
        <div className='container-info'>

          {/* Container con la descripcion de la ruta  */}
          <InfoDescripcion 
            ruta={rutas} 
            onImageSelect ={handleImageSelect}
            startMap={rutas.nombre}
            currentImageIndex={currentImageIndex}
          />
          
        </div>
      </div>
    </>
  );
};

export default MainComponentRuta;
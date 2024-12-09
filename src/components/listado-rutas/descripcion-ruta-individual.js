import React, { useState, useEffect, useRef } from 'react';
import InfoDescripcion from './seccion-descripcion'; 
import Footer from '../common/footer';
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';
import axios from 'axios'
import OptimizedImage from '../common/optimzarImg'


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
  
  console.log(content)
  if (loading) return <><div>Cargando...</div></>;
  if (error) return <><div>Error: {error}</div></>;
  if (!content) return <><div>No hay contenido disponible</div></>;

  return <DescripcionRuta rutas={content} />;
}

const DescripcionRuta = ({ rutas }) => {
  const navigate = useNavigate()
  const [backgroundImage, setBackgroundImg] = useState(rutas.img);


  useEffect(() => {
    setBackgroundImg(rutas.img)
  }, [rutas.img])

  const handleImageSelect = (imgSrc) => {
    setBackgroundImg(imgSrc);
  };


  return (
    <>
      {/* Ver las imagenes del carrusel */}
      <OptimizedImage className='container-img-principal'
          imageUrl={backgroundImage}
          alt={backgroundImage}
      />

      {/* Contenedor principal de la información */}
      <div className='container-info'>

        {/* Container con la descripcion de la ruta  */}
        <InfoDescripcion 
          ruta={rutas} 
          onImageSelect ={handleImageSelect}
          startMap={() => {
              // Redirige a listaRutas.html con el nombre de la actividad como query param
              navigate(`/ruta/mapa/${rutas.nombre}`);
          }} // aqui va la funcion donde se hace click y se muestra el mapa en mapaFuncionalidades 
        />
        
        {/* Footer comun */}
        <Footer />
      </div>
    </>
  );
};

export default MainComponentRuta;
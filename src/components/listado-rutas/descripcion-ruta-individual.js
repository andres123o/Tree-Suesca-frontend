import React, { useState, useEffect, useRef } from 'react';
import InfoDescripcion from './seccion-descripcion'; 
import Footer from '../common/footer';
import { useNavigate } from "react-router-dom"


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
      <div 
        className='container-img-principal' 
        style={{
          backgroundImage:`url(${backgroundImage})`
        }}
      >
      </div>

      {/* Contenedor principal de la información */}
      <div className='container-info'>

        {/* Container con la descripcion de la ruta  */}
        <InfoDescripcion 
          rutas={rutas} 
          onImageSelect={handleImageSelect}
          startMap={() => {
              // Redirige a listaRutas.html con el nombre de la actividad como query param
              navigate(`/ruta/${rutas.nombre}`);
          }} // aqui va la funcion donde se hace click y se muestra el mapa en mapaFuncionalidades 
        />
        
        {/* Footer comun */}
        <Footer />
      </div>
    </>
  );
};

export default DescripcionRuta;
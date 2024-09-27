import React, { useState, useEffect } from 'react';
import InfoDescripcion from './seccion-descripcion'; 
import Footer from '../common/footer';

const DescripcionRuta = ({ rutas }) => {
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
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <div id='map'></div>
      </div>
      
      {/* Contenedor principal de la información */}
      <div className='container-info'>
        {/* container de la ruta en si misma, con funcionalidades */}
        <div className='container-ruta-funciones'>

        </div>

        {/* Container con la descripcion de la ruta  */}
        <InfoDescripcion rutas={rutas} onImageSelect={handleImageSelect} />

        <Footer />
      </div>
    </>
  );
};

export default DescripcionRuta;
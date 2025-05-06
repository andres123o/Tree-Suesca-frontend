import React from 'react';

// 1. Importa los componentes y módulos necesarios de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'; // Importa Autoplay y Pagination

// 2. Importa los estilos CSS de Swiper (¡Importante!)
import 'swiper/css';
import 'swiper/css/autoplay'; // Estilos para autoplay
import 'swiper/css/pagination'; // Estilos para paginación (opcional, pero útil)

// --- DATOS DE LA PUBLICIDAD ---
// Reemplaza estas URLs con las tuyas cuando las tengas
const adsData = [
  {
    id: 1,
    imageUrl: 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1746505388/Descubrela_kkaxdo.png', // Reemplaza con tu URL de imagen 1
    linkUrl: 'http://localhost:3000/batalla', // Reemplaza con tu URL de destino 1
    alt: 'Publicidad Evento Batalla de Hamburguesas',
  },
  {
    id: 2,
    imageUrl: 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1746507879/caba%C3%B1as_villa_ines_1_sum6rm.png', // Reemplaza con tu URL de imagen 2
    linkUrl: 'http://localhost:3000/batalla', // Reemplaza con tu URL de destino 2 (puede ser interna o externa)
    alt: 'Publicidad Impacto Ambiental Destiplus',
  },
  // Puedes añadir más objetos aquí si necesitas más anuncios en el futuro
];
// --- FIN DATOS DE LA PUBLICIDAD ---


const AdSlider = () => {
  const handleAdClick = (url) => {
     // Opcional: Trackear evento de clic en anuncio con Google Analytics
     if (window && window.gtag) {
       window.gtag('event', 'ad_click', {
         event_category: 'Advertising',
         event_label: url, // Etiqueta con la URL del anuncio
         app_name: 'Home busqueda',
         screen_name: 'Home',
         timestamp: new Date().toISOString(),
         interaction_type: 'click'
       });
     }
     // Navegar a la URL (en nueva pestaña si es externa, o usando navigate si es interna)
     if (url.startsWith('http')) {
        window.open(url, '_blank', 'noopener,noreferrer');
     } else {
        // Si es una ruta interna, podrías usar useNavigate si pasas el hook como prop
        // o simplemente usar window.location si es más sencillo en este contexto
        window.location.href = url;
     }
  };


  return (
    <div className="ad-slider-container">
      <Swiper
        // 3. Configura Swiper
        modules={[Autoplay, Pagination]} // Activa los módulos importados
        spaceBetween={10} // Espacio entre slides (si se vieran más de 1)
        slidesPerView={1} // Mostrar 1 slide a la vez
        loop={true} // Para que el carrusel sea infinito
        autoplay={{
          delay: 5000, // Cambia cada 5 segundos (5000 ms)
          disableOnInteraction: false, // No detener autoplay después de interacción manual
          pauseOnMouseEnter: true, // Pausar al poner el mouse encima (opcional)
        }}
        pagination={{
            clickable: true, // Permite hacer clic en los puntos de paginación
            dynamicBullets: true, // Efecto visual en los puntos (opcional)
        }}
        grabCursor={true} // Muestra el cursor de "agarrar" al pasar por encima
        className="ad-swiper"
      >
        {/* 4. Mapea tus datos de anuncios para crear los Slides */}
        {adsData.map((ad) => (
          <SwiperSlide key={ad.id} className="ad-slide">
            {/* Envolver la imagen en un div o 'a' para el click */}
            <div
              className="ad-slide-content"
              onClick={() => handleAdClick(ad.linkUrl)}
              role="link" // Indica que es un enlace clickeable
              tabIndex="0" // Permite enfocar con teclado
              aria-label={`Publicidad: ${ad.alt}`} // Accesibilidad
              onKeyDown={(e) => { if (e.key === 'Enter') handleAdClick(ad.linkUrl); }} // Permite activar con Enter
            >
              <img
                src={ad.imageUrl}
                alt={ad.alt}
                className="ad-slide-image"
              />
              {/* Podrías añadir texto u otros elementos sobre la imagen si quisieras */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdSlider;
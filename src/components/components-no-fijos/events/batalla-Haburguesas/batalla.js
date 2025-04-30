import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../style/componentes-no-fijos/events/batalla.css';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48px" height="48px">
    <path d="M8 5v14l11-7z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const categoryIds = [
  'panela', 'mango', 'maduro', 'lulo', 'pina', 'naranja',
  'champinones', 'cafe', 'vino', 'maracuya', 'uchuva', 'maiz',
  'frutosRojos', 'pimenton'
];

const BurgerBattle = () => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "La Tropical Smash",
      restaurant: "Terraza",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461759/WhatsApp_Image_2025-04-15_at_9.44.04_AM_oto9bz.jpg",
      visitors: 46,
      price: 16000,
      description: "Pan artesanal, carne de res madurada, queso mozzarella, lechuga romana, mayonesa cítrica y un toque dulce de piña caramelizada.",
      specialIngredient: "Piña caramelizada",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 2,
      name: "Madurita Rebelde",
      restaurant: "Cacique Burguer",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461757/WhatsApp_Image_2025-04-11_at_4.24.15_PM_snn161.jpg",
      visitors: 38,
      price: 16000,
      description: "Una fusión única con carne de cerdo desmechada, queso cheddar, alioli de ajo rostizado y plátano maduro frito en forma de chips.",
      specialIngredient: "Plátano maduro frito",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 3,
      name: "Bacon Jam",
      restaurant: "Arca Rock",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461757/WhatsApp_Image_2025-04-11_at_4.31.51_PM_p8xlds.jpg",
      visitors: 52,
      price: 16000,
      description: "Carne de res en doble medallón, queso americano, cebolla caramelizada y una generosa capa de mermelada de tocineta.",
      specialIngredient: "Mermelada de tocineta",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 4,
      name: "Blue Beast",
      restaurant: "Lo Nuestro",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461756/Coffee_Drinks_Food_banx4d.jpg",
      visitors: 61,
      price: 16000,
      description: "Para paladares osados: carne de cordero, rúgula fresca, cebolla morada crujiente y un potente queso azul que lo cambia todo.",
      specialIngredient: "Queso azul",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 5,
      name: "La Mexa Boom",
      restaurant: "Texas Burguer",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461756/LOGO_-_TEXAS_page-0001_ozhvzn.jpg",
      visitors: 46,
      price: 16000,
      description: "Carne con especias, doble queso, totopos triturados, crema agria y un cremoso y picante guacamole con jalapeño.",
      specialIngredient: "Guacamole con jalapeño",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 6,
      name: "La Beet Queen",
      restaurant: "Crucero",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461755/WhatsApp_Image_2025-04-13_at_5.43.41_PM_uzdwoh.jpg",
      visitors: 38,
      price: 16000,
      description: "Hamburguesa veggie con portobellos grillados, queso de cabra, reducción balsámica y servida en un pan de remolacha que roba miradas.",
      specialIngredient: "Pan de remolacha",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 7,
      name: "Crunch Pork Burger",
      restaurant: "Villa Hamburguesa",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461754/WhatsApp_Image_2025-04-14_at_8.48.49_AM_knawj3.jpg",
      visitors: 52,
      price: 16000,
      description: "Carne mixta (res y cerdo), cebollín, mayonesa de limón y un crocante e irresistible toque de chicharrón crocante.",
      specialIngredient: "Chicharrón crocante",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 8,
      name: "La Samurai Rosa",
      restaurant: "Don Toño",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461754/WhatsApp_Image_2025-04-14_at_8.56.23_AM_lbqbal.jpg",
      visitors: 61,
      price: 16000,
      description: "Inspiración oriental: carne de wagyu, pepino encurtido, mayo sriracha y unos suaves aros de cebolla morada en tempura.",
      specialIngredient: "Aros de cebolla morada en tempura",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 9,
      name: "Verde Letal",
      restaurant: "Palo Santo",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461753/WhatsApp_Image_2025-04-14_at_9.16.35_AM_um1uur.jpg",
      visitors: 46,
      price: 16000,
      description: "Pechuga de pollo grillada, tomate confitado, queso provolone y un intenso pesto de albahaca que le da el alma al bocado.",
      specialIngredient: "Pesto de albahaca",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 10,
      name: "La Vintagemelt",
      restaurant: "Amore Pizza",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461753/LOGO_AMORE_PIZZA_page-0001_ezbtvu.jpg",
      visitors: 38,
      price: 16000,
      description: "Carne sellada en mantequilla, queso suizo, cebolla blanca salteada y unos aromáticos champiñones al vino tinto.",
      specialIngredient: "Champiñones al vino tinto",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 11,
      name: "Golden Yolk",
      restaurant: "La Parrilla de Juancho",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_12.42.09_PM_ughpvt.jpg",
      visitors: 52,
      price: 16000,
      description: "Clásica con sorpresa: carne de res jugosa, cheddar fundido, tocineta ahumada y un brillante huevo pochado encima.",
      specialIngredient: "Huevo pochado",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 12,
      name: "Maracupicante",
      restaurant: "Dorilocos La Roca",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_2.00.32_PM_clg2pu.jpg",
      visitors: 61,
      price: 16000,
      description: "Doble carne, queso pepper jack, vegetales asados y una atrevida salsa de maracuyá picante que te hace sudar.",
      specialIngredient: "Salsa de maracuyá picante",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 13,
      name: "Café & Fuego Burger",
      restaurant: "Cumbamba",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_2.05.28_PM_lwikzf.jpg",
      visitors: 46,
      price: 16000,
      description: "Inspiración dark: pulled pork jugoso, cebolla crispy y una intensa BBQ de café que potencia el sabor de principio a fin.",
      specialIngredient: "Pulled pork en BBQ de café",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    },
    {
      id: 14,
      name: "La Tropical Inferno",
      restaurant: "Monopizza Gourmet",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1746041918/r26tvjcymbxgprb9m51e_euyrpt.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/LOGO_-_MONOPIZZA2_page-0001_m6ytz5.jpg",
      visitors: 38,
      price: 16000,
      description: "Carne a la parrilla, queso costeño, lechuga fresca, cebolla crocante y el vibrante y exótico chutney de mango con habanero.",
      specialIngredient: "Chutney de mango con habanero",
      votes: 0,
      location: {
        "lat": 5.100817,
        "lng": -73.799823
      }
    }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('ajicrema');
  const categoriesRef = useRef(null);
  const autoPlayIntervalRef = useRef(null); 
  const isDraggingRef = useRef(false); 

  const videoRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(true);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === participants.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? participants.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const stopCategoryAutoplay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null; // Limpiar la referencia
      // console.log("Autoplay de categorías detenido"); // Para depuración
    }
  };

  const getItemClassName = (index) => {
    if (index === currentIndex) return 'burger-battle-carousel-item active-b';
    if (index === (currentIndex + 1) % participants.length) return 'burger-battle-carousel-item next';
    if (index === (currentIndex - 1 + participants.length) % participants.length) return 'burger-battle-carousel-item prev';
    return 'burger-battle-carousel-item';
  };

  const handleVisitClick = (burgerId) => {
    navigate(`/burger-profile/${burgerId}`);
  };

  const handleCategoryScroll = (e) => {
    if (isDraggingRef.current) return;

    if (categoriesRef.current) {
      const container = categoriesRef.current;
      const categoryElements = container.querySelectorAll('.burger-battle-category');
      let mostVisibleCategoryData = activeCategory; // Mantener la actual por defecto
      let minDistanceFromCenter = Infinity;
      const containerRect = container.getBoundingClientRect();
      const containerVisibleCenter = containerRect.left + containerRect.width / 2;

      categoryElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.left + rect.width / 2;
          const distanceFromCenter = Math.abs(elementCenter - containerVisibleCenter);

          // Considerar un umbral pequeño para evitar cambios constantes mientras se mueve
           const threshold = element.offsetWidth / 4; // Por ejemplo, 1/4 del ancho del elemento

          if (distanceFromCenter < minDistanceFromCenter && distanceFromCenter < threshold * 4) { // Ajusta el umbral si es necesario
              minDistanceFromCenter = distanceFromCenter;
              const currentDataCategory = element.getAttribute('data-category');
               if (currentDataCategory) { // Asegurarse de que no sea null
                  mostVisibleCategoryData = currentDataCategory;
               }
          }
      });

       // Actualizar solo si cambió y es diferente al actual
      if (activeCategory !== mostVisibleCategoryData) {
          // Solo actualizar si NO estamos en medio de un autoplay o click programático
          // para evitar que el scroll manual interfiera demasiado rápido.
          // Podríamos añadir una lógica más compleja si es necesario, pero por ahora
          // permitimos que el scroll actualice el punto activo.
          setActiveCategory(mostVisibleCategoryData);
      }
    }
  };

  const handleCategoryClick = (category, isAutoplay = false) => {
    // ++ DETENER AUTOPLAY SI FUE INTERACCIÓN DEL USUARIO ++
    if (!isAutoplay) {
       stopCategoryAutoplay();
    }

    setActiveCategory(category); // Actualiza el estado activo

    const index = categoryIds.indexOf(category); // Encuentra el índice del ID

    if (categoriesRef.current && index !== -1) {
      const categoryElements = categoriesRef.current.querySelectorAll('.burger-battle-category');
      if (categoryElements[index]) {
        const elementToScrollTo = categoryElements[index];
        const containerWidth = categoriesRef.current.offsetWidth;
        const elementWidth = elementToScrollTo.offsetWidth;
        // Calcula la posición para centrar el elemento
        const scrollLeftPosition = elementToScrollTo.offsetLeft - (containerWidth / 2) + (elementWidth / 2);

        categoriesRef.current.scrollTo({
          left: scrollLeftPosition,
          behavior: 'smooth' // Scroll suave
        });
      }
    }
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true; // Marcar que se está arrastrando
    stopCategoryAutoplay();
  };

  const handleTouchStart = () => {
    isDraggingRef.current = true; // Marcar que se está arrastrando
    stopCategoryAutoplay();
  };

  // ++ Handler para detectar fin de arrastre (opcional, para reanudar scroll suave o lógica ost-arrastre) ++
  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
       isDraggingRef.current = false;
       // Forzar una revisión de la categoría centrada después de soltar
       // Usamos un pequeño timeout para asegurar que el scroll snap haya terminado
       setTimeout(handleCategoryScroll, 150); // Ajusta el tiempo si es necesario
    }
  };

  const handleTouchEnd = () => {
     if (isDraggingRef.current) {
        isDraggingRef.current = false;
        // Forzar una revisión de la categoría centrada después de soltar
        setTimeout(handleCategoryScroll, 150); // Ajusta el tiempo si es necesario
     }
  };

  useEffect(() => {
    const startCategoryAutoplay = () => {
      stopCategoryAutoplay(); // Asegurar que no haya intervalos duplicados
      autoPlayIntervalRef.current = setInterval(() => {
        setActiveCategory(prevActiveCategory => {
          const currentIndex = categoryIds.indexOf(prevActiveCategory);
          const nextIndex = (currentIndex + 1) % categoryIds.length;
          const nextCategory = categoryIds[nextIndex];
          // Llamar a handleCategoryClick para mover y actualizar, marcando que es por autoplay
          // Es importante llamar handleCategoryClick DESPUÉS de actualizar el estado si depende de él
          // O mejor aún, pasarle directamente nextCategory
          handleCategoryClick(nextCategory, true);
          return nextCategory; // Actualiza el estado para la siguiente iteración
        });
      }, 3000); // Cambia cada 3 segundos
    };

    startCategoryAutoplay();
    return () => stopCategoryAutoplay(); // Limpieza al desmontar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect para carrusel PARTICIPANTES (Autoplay) - ¡RE-AÑADIDO!
useEffect(() => {
  // Verifica que haya participantes antes de iniciar el intervalo
  if (participants.length > 0) {
      const participantsInterval = setInterval(() => {
          // Llama a la función que actualiza el índice de participante
          nextSlide();
      }, 5000); // Intervalo de 5 segundos (ajústalo si quieres)

      // Limpieza: Detiene el intervalo cuando el componente se desmonta
      return () => clearInterval(participantsInterval);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [participants.length]); 

  const redirectToHome = () => {
    window.location.href = "https://www.destiplus.com/";
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play(); // Inicia la reproducción
      setShowPlayButton(false); // Oculta el botón de play y muestra controles
    }
  };

  return (
    <div className="burger-battle-container">
      {/* Header - Fixed at top */}
      <div className="burger-battle-header">
        <div className="burger-battle-title">
          <h5>Desti <span className="burger-battle-brand"><strong>plus</strong></span></h5>
        </div>
        <div className="burger-battle-home-btn" onClick={redirectToHome}>
          <i className="fas fa-home burger-battle-home-icon"></i>
        </div>
      </div>
      
      {/* Hero Section with Countdown */}
      <div className="burger-battle-hero">
        <div className="burger-battle-hero-image">
          <video 
            ref={videoRef}
            src="https://res.cloudinary.com/dmyq0gr14/video/upload/v1745900948/La_batalla_est%C3%A1_por_comenzar_14_establecimientos_15_d%C3%ADas_de_pura_competencia_gastron%C3%B3mica_y_m%C3%A1s_de_8.000_personas_dispuestas_a_vivir_la_experiencia._Desde_el_19_de_junio_hasta_el_3_de_julio_en_Sues_siwnwj.mp4"
            loop
            playsInline
            controls={!showPlayButton}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          {showPlayButton && (
            <button
              className="hero-play-button" // Nueva clase CSS para el botón
              onClick={handlePlayVideo} // Llama a la función al hacer clic
              aria-label="Reproducir video" // Accesibilidad
            >
              <PlayIcon /> {/* Usa el componente SVG o un <i> */}
            </button>
          )}
          <img src='https://res.cloudinary.com/dmyq0gr14/image/upload/v1745463150/WhatsApp_Image_2025-04-04_at_3.33.44_PM-removebg-preview_ajhwmw.png' alt='Logo Batalla de Hamburguesa Suesca' />
        </div>
        <div className="burger-battle-hero-title">
          <h2>PROXIMAMENTE</h2>
            <p>19 de Junio del 2025</p>
        </div>
      </div>

      {/* Description Title Section */}
      <div className="burger-battle-desc-header">
        <div className="burger-battle-desc-title">
          BATALLA DE HAMBURGUESAS <span className="burger-battle-highlight">3.0</span> 
        </div>
        <p className="burger-battle-desc-subtitle">
              <span>¡Participa y elige al número 1 de Suesca!</span>
        </p>
        <div className="burger-battle-line-decor">
          <div className="burger-battle-line"></div>
          <div className="burger-battle-arrow-circle">
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
      </div>

      {/* Description Section */}
      {/* <div className="burger-battle-description">
        <p className="burger-battle-desc-text">
            El evento gastronómico más emocionante llega a Suesca. Disfruta <strong>hamburguesas únicas</strong>, vota por tu <strong>favorita</strong> y apoya a <strong>chefs locales</strong> en esta <strong>batalla de sabor</strong>.
        </p>
      </div> */}

      <div className="burger-battle-info-box">
          <p>Cada restaurante deberá cocinar con un ingrediente secreto</p>
      </div>

      {/* Categories Section MODIFICADA */}
      <div className="burger-battle-categories">
        <h2 className="burger-battle-section-title">¡Ingredientes secretos!</h2>
        <div
          className="burger-battle-categories-wrapper"
          ref={categoriesRef}
          onScroll={handleCategoryScroll} // Sigue detectando scroll manual para puntos
          // ++ AÑADIR HANDLERS para detener autoplay al interactuar ++
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
           // ++ AÑADIR HANDLERS para detectar fin de arrastre ++
           onMouseUp={handleMouseUpOrLeave}
           onMouseLeave={handleMouseUpOrLeave} // Considerar si el cursor sale mientras arrastra
           onTouchEnd={handleTouchEnd}
        >
          {/* Botones de Categoría (usar categoryIds para mapear sería más DRY, pero dejamos tu estructura) */}
          {categoryIds.map((catId) => {
             // Encuentra los detalles de la categoría si los necesitas (ej. imagen, nombre)
             // Por ahora solo usamos el ID para el botón
             let catName = catId.charAt(0).toUpperCase() + catId.slice(1); // Capitalizar ID como nombre simple
             let catImage = `url_de_imagen_para_${catId}`; // Necesitarías un mapeo de ID a URL de imagen
              // Lógica para obtener imagen y nombre basado en catId
              let displayName = catId;
              let imageUrl = ''; // Asigna la URL correcta basada en catId
              switch (catId) {
                  case 'panela': displayName = 'Panela'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745954422/panela_nnxkvx.avif'; break;
                  case 'mango': displayName = 'Mango'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745954419/Mango_pniayz.jpg'; break;
                  case 'maduro': displayName = 'Maduro'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745965709/fried-half-ripe-plantain-slices-isolated-on-white-background-photo-removebg-preview_fhvywo.png'; break;
                  case 'lulo': displayName = 'Lulo'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745954416/lulo_wwg1mk.jpg'; break;
                  case 'pina': displayName = 'Piña'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745954419/pi%C3%B1a_nwe7fp.jpg'; break;
                  case 'naranja': displayName = 'Naranja'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745954416/Naranja_hteu9e.avif'; break;
                  case 'champinones': displayName = 'Champiñones'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745954413/Champi%C3%B1ones_kcabf4.avif'; break;
                  case 'cafe': displayName = 'Café'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745954416/Cafe_rlhpsk.jpg'; break;
                  case 'vino': displayName = 'Vino'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745964873/19056534-mentir-botella-de-vino_jz2eh5.jpg'; break;
                  case 'maracuya': displayName = 'Maracuya'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745954417/Maracuya_kwdgdn.avif'; break;
                  case 'uchuva': displayName = 'Uchuva'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745954416/Uchuva_nqarjk.webp'; break;
                  case 'maiz': displayName = 'Maiz'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745954411/Maiz_vybobv.avif'; break;
                  case 'frutosRojos': displayName = 'Rojos'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745966336/depositphotos_82442292-stock-photo-big-pile-of-fresh-berries_eltwqp.webp'; break;
                  case 'pimenton': displayName = 'Pimentón'; imageUrl = 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1745965015/pimen_tdrr9e.jpg'; break;
                  default: displayName = catId; imageUrl = ''; // Fallback
              }

             return (
                <button
                  key={catId}
                  className={`burger-battle-category ${activeCategory === catId ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick(catId)} // Llama a handleCategoryClick y detiene autoplay
                  data-category={catId}
                >
                  <img className='img-ingredientes' src={imageUrl} alt={displayName}/>
                  <span>{displayName}</span>
                </button>
             );
          })}

        </div>

        {/* Puntos de navegación (sin cambios funcionales) */}
        <div className="burger-battle-categories-dots">
          {categoryIds.map((category) => (
            <button
              key={category}
              className={`burger-battle-categories-dot ${activeCategory === category ? 'active-b' : ''}`}
              onClick={() => handleCategoryClick(category)} // Llama a handleCategoryClick y detiene autoplay
              aria-label={`Ir a categoría ${category}`}
            />
          ))}
        </div>
      </div>

      {/* Carousel Section - Main Content */}
      <div className="burger-battle-carousel">
        <h2 className="burger-battle-section-title">Participantes</h2>
        <div className="burger-battle-carousel-container">
          <div className="burger-battle-carousel-wrapper">
            {participants.map((participant, index) => (
              <div
                key={participant.id}
                className={getItemClassName(index)}
              >
                <div className="burger-battle-card">
                  <div className="burger-battle-card-image">
                    <img src={participant.image} alt={participant.name} />
                    </div>
                  <div className="burger-battle-card-details">
                    <div className="burger-battle-info-container">
                      <div className="burger-battle-restaurant-logo">
                        <img src={participant.logo} alt={participant.restaurant} />
                      </div>
                      <div className="burger-battle-text-container">
                        <h3 className="burger-battle-burger-name">{participant.name}</h3>
                        <p className="burger-battle-restaurant-name">{participant.restaurant}</p>
                      </div>
                    </div>
                    <div className="burger-battle-price-area"> 
                      <p className="burger-battle-card-price">
                          <strong>
                            { // Formateo de precio sin cambios
                              !isNaN(parseFloat(participant.price))
                                ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(parseFloat(participant.price))
                                : 'Precio no disponible'
                            }
                          </strong>
                      </p>
                    </div>
                    <div className="burger-battle-stats">
                      <span className="burger-battle-visitors">
                        <i className="fas fa-users"></i> {participant.visitors}
                      </span>
                      <button
                        className="burger-battle-cta-btn" // ++ Usaremos esta clase mejorada ++
                        onClick={() => handleVisitClick(participant.id)}
                      >
                        {/* ++ Elige UNA de estas opciones de texto ++ */}
                        {/* <span>Conocer Más</span> */}
                        <span>Descúbrela</span>
                        {/* <span>Ver Detalles</span> */}

                        <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i> {/* Icono */}
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          <button className="burger-battle-carousel-arrow left" onClick={prevSlide}>
              <i className="fas fa-chevron-left"></i>
            </button>
          <button className="burger-battle-carousel-arrow right" onClick={nextSlide}>
              <i className="fas fa-chevron-right"></i>
            </button>
          <div className="burger-battle-carousel-dots">
            {participants.map((_, index) => (
              <div
                key={index}
                className={`burger-battle-carousel-dot ${index === currentIndex ? 'active-b' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* === Nueva Sección Promocional: Descubre Suesca === */}
      {/* ===================================================== */}
      <div className="suesca-promo-section">

        {/* --- Título y Subtítulo (Mantenemos el anterior) --- */}
        <div className="promo-section-header">
          <h2 className="promo-section-title">
            ¿Y Después de la Burger?
          </h2>
          <p className="promo-section-subtitle">
            Encuéntralo todo en <span className="destiplus-brand">Desti <span className="mas-promo">plus</span></span>
          </p>
        </div>

        {/* === NUEVO: Grid de Tarjetas de Inspiración === */}
        <div className="inspiration-cards-grid">

          {/* Tarjeta 1: Aventura (Ej: Escalada) */}
          <a href="https://www.destiplus.com/actividades/1" className="inspiration-card">
            <div className="inspiration-card-image" style={{backgroundImage: 'url(https://res.cloudinary.com/destinoplus/image/upload/v1734236561/cajbjyr4g2g7oizfgweu.jpg)'}}></div>
            <div className="inspiration-card-overlay"></div> {/* Overlay para legibilidad */}
            <div className="inspiration-card-content">
              <i className="fas fa-hiking"></i> {/* Icono sutil opcional */}
              <h4>Aventuras</h4>
            </div>
          </a>

          {/* Tarjeta 2: Alojamiento */}
          <a href="https://www.destiplus.com/alojamientos/1" className="inspiration-card">
            <div className="inspiration-card-image" style={{backgroundImage: 'url(https://res.cloudinary.com/destinoplus/image/upload/v1733937504/alojamientos/casona-quesada/e2pi6ecstwuou0ghf7xa.jpg)'}}></div>
            <div className="inspiration-card-overlay"></div>
            <div className="inspiration-card-content">
               <i className="fas fa-bed"></i>
              <h4>Alojamientos</h4>
            </div>
          </a>

          {/* Tarjeta 3: Rutas / Naturaleza */}
           <a href="https://www.destiplus.com/rutas/Senderismo/1" className="inspiration-card">
            <div className="inspiration-card-image" style={{backgroundImage: 'url(https://res.cloudinary.com/destinoplus/image/upload/v1736911873/rutas/la-lucirnaga/wlzdyxviuowjjyexjelq.jpg)'}}></div>
            <div className="inspiration-card-overlay"></div>
            <div className="inspiration-card-content">
              <i className="fas fa-map-marked-alt"></i>
              <h4>Rutas y Paisajes</h4>
            </div>
          </a>

          {/* Tarjeta 4: Gastronomía (Opcional, o dejar 3 más grandes) */}
          <a href="https://www.destiplus.com/restaurantes/1" className="inspiration-card">
            <div className="inspiration-card-image" style={{backgroundImage: 'url(https://res.cloudinary.com/destinoplus/image/upload/v1735271082/zataxjvehdporgk9oasa.jpg)'}}></div>
             <div className="inspiration-card-overlay"></div>
            <div className="inspiration-card-content">
              <i className="fas fa-utensils"></i>
              <h4>Sabores Únicos</h4>
            </div>
          </a>

        </div>
        {/* === Fin Grid de Tarjetas === */}


        {/* --- Botón de Llamada a la Acción (Mantenemos el anterior) --- */}
        <button
          className="promo-cta-button"
          onClick={() => window.location.href = 'https://www.destiplus.com/home/destino/Suesca'}
        >
          <span>¡Anímate a Explorar Suesca!</span>
          <i className="fas fa-arrow-right arrow-icon"></i>
        </button>

      </div>
      {/* === Fin Nueva Sección Promocional === */}


      {/* Footer */}
      <footer style={{ width: '100%', padding: '40px 7%', backgroundColor: '#ffffff', borderTop: '1px solid #eaeaea' /* Borde superior opcional */, marginTop: '20px' }}>

        {/* Enlaces Sociales - Estilo más minimalista */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '25px' }}>
          <a
            href="https://www.facebook.com/profile.php?id=100092877753209&locale=es_LA"
            aria-label="Facebook"
            style={{ color: '#666', textDecoration: 'none', fontSize: '24px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00cd70'} // Hover verde
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/batalladehamburguesas_/"
            aria-label="Instagram"
            style={{ color: '#666', textDecoration: 'none', fontSize: '24px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00cd70'} // Hover verde
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            <i className="fab fa-instagram"></i>
          </a>
          {/* Añade más redes si es necesario */}
        </div>

        {/* Enlaces Rápidos - Estilo estándar de enlaces */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px 25px', marginBottom: '25px' }}>
          <a
            href="https://www.destiplus.com/"
            // Podrías usar una clase como .quick-link si la tienes definida
            style={{ color: '#666', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00cd70'}
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            Inicio
          </a>
          <a
            href="https://www.google.com/maps/place/Suesca,+Cundinamarca/@5.1023645,-73.8008345,376m/data=!3m1!1e3!4m6!3m5!1s0x8e401481a06da0a7:0x8dcabdf79b176aca!8m2!3d5.103929!4d-73.798632!16s%2Fm%2F02qnm70?entry=ttu&g_ep=EgoyMDI1MDQyMS4wIKXMDSoASAFQAw%3D%3D" // Revisa este enlace
            style={{ color: '#666', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00cd70'}
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            Ubicación
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100092877753209&locale=es_LA" // Enlace a FB para términos? Revisar.
            style={{ color: '#666', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00cd70'}
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            Términos y Condiciones
          </a>
          {/* Añade más enlaces rápidos si es necesario */}
        </div>

        {/* Información de Contacto */}
        <div style={{ textAlign: 'center', fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
          <p style={{ margin: '5px 0' }}>
            <i className="fas fa-phone" style={{ marginRight: '8px', color: '#fd5959' }}></i>
            {/* Enlace telefónico */}
            <a href="tel:+573192505218" style={{ color: '#666', textDecoration: 'none' }}>+57 319 2505218</a>
          </p>
          <p style={{ margin: '5px 0' }}>
            <i className="fas fa-envelope" style={{ marginRight: '8px', color: '#fd5959' }}></i>
            {/* Enlace de correo */}
            <a href="mailto:batalladehamburguesas@gmail.com" style={{ color: '#666', textDecoration: 'none' }}>batalladehamburguesas@gmail.com</a>
          </p>
          {/* Podrías añadir un copyright o el nombre de tu empresa */}
          <p style={{ marginTop: '20px', fontSize: '12px', opacity: '0.8' }}>
            &copy; {new Date().getFullYear()} Destiplus.com | Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BurgerBattle;
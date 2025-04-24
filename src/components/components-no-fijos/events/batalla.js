import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../style/componentes-no-fijos/events/batalla.css';

const BurgerBattle = () => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "La Tropical Smash",
      restaurant: "Terraza",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461759/WhatsApp_Image_2025-04-15_at_9.44.04_AM_oto9bz.jpg",
      visitors: 46,
      price: "4.99",
      description: "Pan artesanal, carne de res madurada, queso mozzarella, lechuga romana, mayonesa cítrica y un toque dulce de piña caramelizada.",
      specialIngredient: "Piña caramelizada",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 2,
      name: "Madurita Rebelde",
      restaurant: "Cacique Burguer",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461757/WhatsApp_Image_2025-04-11_at_4.24.15_PM_snn161.jpg",
      visitors: 38,
      price: "5.99",
      description: "Una fusión única con carne de cerdo desmechada, queso cheddar, alioli de ajo rostizado y plátano maduro frito en forma de chips.",
      specialIngredient: "Plátano maduro frito",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 3,
      name: "Explosiva Bacon",
      restaurant: "Arca Rock",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461757/WhatsApp_Image_2025-04-11_at_4.31.51_PM_p8xlds.jpg",
      visitors: 52,
      price: "6.49",
      description: "Carne de res en doble medallón, queso americano, cebolla caramelizada y una generosa capa de mermelada de tocineta.",
      specialIngredient: "Mermelada de tocineta",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 4,
      name: "Blue Beast",
      restaurant: "Lo Nuestro",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461756/Coffee_Drinks_Food_banx4d.jpg",
      visitors: 61,
      price: "7.29",
      description: "Para paladares osados: carne de cordero, rúgula fresca, cebolla morada crujiente y un potente queso azul que lo cambia todo.",
      specialIngredient: "Queso azul",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 5,
      name: "La Mexa Boom",
      restaurant: "Texas Burguer",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461756/LOGO_-_TEXAS_page-0001_ozhvzn.jpg",
      visitors: 46,
      price: "4.99",
      description: "Carne con especias, doble queso, totopos triturados, crema agria y un cremoso y picante guacamole con jalapeño.",
      specialIngredient: "Guacamole con jalapeño",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 6,
      name: "La Beet Queen",
      restaurant: "Crucero",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461755/WhatsApp_Image_2025-04-13_at_5.43.41_PM_uzdwoh.jpg",
      visitors: 38,
      price: "5.99",
      description: "Hamburguesa veggie con portobellos grillados, queso de cabra, reducción balsámica y servida en un pan de remolacha que roba miradas.",
      specialIngredient: "Pan de remolacha",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 7,
      name: "Crunch Pork Burger",
      restaurant: "Villa Hamburguesa",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461754/WhatsApp_Image_2025-04-14_at_8.48.49_AM_knawj3.jpg",
      visitors: 52,
      price: "6.49",
      description: "Carne mixta (res y cerdo), cebollín, mayonesa de limón y un crocante e irresistible toque de chicharrón crocante.",
      specialIngredient: "Chicharrón crocante",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 8,
      name: "La Samurai Rosa",
      restaurant: "Don Toño",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461754/WhatsApp_Image_2025-04-14_at_8.56.23_AM_lbqbal.jpg",
      visitors: 61,
      price: "7.29",
      description: "Inspiración oriental: carne de wagyu, pepino encurtido, mayo sriracha y unos suaves aros de cebolla morada en tempura.",
      specialIngredient: "Aros de cebolla morada en tempura",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 9,
      name: "Verde Letal",
      restaurant: "Palo Santo",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461753/WhatsApp_Image_2025-04-14_at_9.16.35_AM_um1uur.jpg",
      visitors: 46,
      price: "4.99",
      description: "Pechuga de pollo grillada, tomate confitado, queso provolone y un intenso pesto de albahaca que le da el alma al bocado.",
      specialIngredient: "Pesto de albahaca",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 10,
      name: "La Vintagemelt",
      restaurant: "Amore Pizza",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461753/LOGO_AMORE_PIZZA_page-0001_ezbtvu.jpg",
      visitors: 38,
      price: "5.99",
      description: "Carne sellada en mantequilla, queso suizo, cebolla blanca salteada y unos aromáticos champiñones al vino tinto.",
      specialIngredient: "Champiñones al vino tinto",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 11,
      name: "Golden Yolk",
      restaurant: "La Parrilla de Juancho",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_12.42.09_PM_ughpvt.jpg",
      visitors: 52,
      price: "6.49",
      description: "Clásica con sorpresa: carne de res jugosa, cheddar fundido, tocineta ahumada y un brillante huevo pochado encima.",
      specialIngredient: "Huevo pochado",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 12,
      name: "Maracupicante",
      restaurant: "Dorilocos La Roca",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_2.00.32_PM_clg2pu.jpg",
      visitors: 61,
      price: "7.29",
      description: "Doble carne, queso pepper jack, vegetales asados y una atrevida salsa de maracuyá picante que te hace sudar.",
      specialIngredient: "Salsa de maracuyá picante",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 13,
      name: "Café & Fuego Burger",
      restaurant: "Cumbamba",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_2.05.28_PM_lwikzf.jpg",
      visitors: 46,
      price: "4.99",
      description: "Inspiración dark: pulled pork jugoso, cebolla crispy y una intensa BBQ de café que potencia el sabor de principio a fin.",
      specialIngredient: "Pulled pork en BBQ de café",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 14,
      name: "La Tropical Inferno",
      restaurant: "Monopizza Gourmet",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/LOGO_-_MONOPIZZA2_page-0001_m6ytz5.jpg",
      visitors: 38,
      price: "7.29",
      description: "Carne a la parrilla, queso costeño, lechuga fresca, cebolla crocante y el vibrante y exótico chutney de mango con habanero.",
      specialIngredient: "Chutney de mango con habanero",
      votes: 0,
      location: "Ingrediente secreto"
    }
  ]);
  

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('ajicrema');
  const categoriesRef = useRef(null);

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
    const container = e.currentTarget;
    const categories = [
      'pinaCaramelizada', 'platanoMaduro', 'mermeladaTocineta', 'quesoAzul', 
      'guacamoleJalapeno', 'panRemolacha', 'chicharronCrocante', 'arosDecebollaTemplra', 
      'pestoAlbahaca', 'championesVino', 'huevoPochado', 'salsaMaracuya', 
      'pulledPorkCafe', 'chutneyMango'
    ];
    
    // Calcular qué categoría está más visible en el centro
    const categoryElements = container.querySelectorAll('.burger-battle-category');
    let mostVisibleCategory = 'pinaCaramelizada';
    let maxVisibility = 0;

    categoryElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const elementCenter = rect.left + rect.width / 2;
      const containerCenter = containerRect.left + containerRect.width / 2;
      const distanceFromCenter = Math.abs(elementCenter - containerCenter);
      
      if (distanceFromCenter < maxVisibility || maxVisibility === 0) {
        maxVisibility = distanceFromCenter;
        mostVisibleCategory = categories[index];
      }
    });

    setActiveCategory(mostVisibleCategory);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const categories = ['ajicrema', 'guacamango', 'costillao', 'chocorico', 'cebechada'];
    const index = categories.indexOf(category);
    if (categoriesRef.current) {
      const categoryWidth = 120; // Ancho de cada categoría
      const gap = 20; // Espacio entre categorías
      const scrollPosition = index * (categoryWidth + gap);
      categoriesRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const redirectToHome = () => {
    window.location.href = "https://www.destiplus.com/";
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
            src="https://res.cloudinary.com/destinoplus/video/upload/v1744310054/p1ilfxzqdkqtpyox9bhk.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <img src='https://res.cloudinary.com/dmyq0gr14/image/upload/v1745463150/WhatsApp_Image_2025-04-04_at_3.33.44_PM-removebg-preview_ajhwmw.png' alt='Logo Batalla de Hamburguesa Suesca' />
        </div>
        <div className="burger-battle-hero-title">
          <h2>PROXIMAMENTE</h2>
            <p>15 de Julio de 2025</p>
        </div>
      </div>

      {/* Description Title Section */}
      <div className="burger-battle-desc-header">
        <div className="burger-battle-desc-title">
          LA MEJOR BATALLA DE <span className="burger-battle-highlight">HAMBURGUESAS</span> VUELVE A SUESCA
        </div>
        <p className="burger-battle-desc-subtitle">
              <span>Disfruta y vota</span>
        </p>
        <div className="burger-battle-line-decor">
          <div className="burger-battle-line"></div>
          <div className="burger-battle-arrow-circle">
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>

        {/* Description Section */}
      <div className="burger-battle-description">
            <p className="burger-battle-desc-text">
                El evento gastronómico más emocionante llega a Suesca. Disfruta <strong>hamburguesas únicas</strong>, vota por tu <strong>favorita</strong> y apoya a <strong>chefs locales</strong> en esta <strong>batalla de sabor</strong>.
        </p>
      </div>

      {/* Categories Section */}
      <div className="burger-battle-categories">
        <h2 className="burger-battle-section-title">¡Ingredientes secretos!</h2>
        <div className="burger-battle-categories-wrapper" 
             ref={categoriesRef}
             onScroll={handleCategoryScroll}>
          <button className={`burger-battle-category ${activeCategory === 'pinaCaramelizada' ? 'active-b' : ''}`} 
                  onClick={() => handleCategoryClick('pinaCaramelizada')}
                  data-category="pinaCaramelizada">
            <i className="fas fa-apple-alt"></i>
            <span>Piña caramelo</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'platanoMaduro' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('platanoMaduro')}
                  data-category="platanoMaduro">
            <i className="fas fa-carrot"></i>
            <span>Maduro frito</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'mermeladaTocineta' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('mermeladaTocineta')}
                  data-category="mermeladaTocineta">
            <i className="fas fa-bacon"></i>
            <span>Mermelada tocineta</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'quesoAzul' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('quesoAzul')}
                  data-category="quesoAzul">
            <i className="fas fa-cheese"></i>
            <span>Queso azul</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'guacamoleJalapeno' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('guacamoleJalapeno')}
                  data-category="guacamoleJalapeno">
            <i className="fas fa-pepper-hot"></i>
            <span>Guacamole jalapeño</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'panRemolacha' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('panRemolacha')}
                  data-category="panRemolacha">
            <i className="fas fa-bread-slice"></i>
            <span>Pan remolacha</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'chicharronCrocante' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('chicharronCrocante')}
                  data-category="chicharronCrocante">
            <i className="fas fa-drumstick-bite"></i>
            <span>Chicharrón crocante</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'arosDecebollaTemplra' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('arosDecebollaTemplra')}
                  data-category="arosDecebollaTemplra">
            <i className="fas fa-ring"></i>
            <span>Cebolla morada</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'pestoAlbahaca' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('pestoAlbahaca')}
                  data-category="pestoAlbahaca">
            <i className="fas fa-seedling"></i>
            <span>Pesto albahaca</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'championesVino' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('championesVino')}
                  data-category="championesVino">
            <i className="fas fa-wine-glass-alt"></i>
            <span>Champiñones vino tinto</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'huevoPochado' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('huevoPochado')}
                  data-category="huevoPochado">
            <i className="fas fa-egg"></i>
            <span>Huevo pochado</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'salsaMaracuya' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('salsaMaracuya')}
                  data-category="salsaMaracuya">
            <i className="fas fa-fire"></i>
            <span>Maracuyá picante</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'pulledPorkCafe' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('pulledPorkCafe')}
                  data-category="pulledPorkCafe">
            <i className="fas fa-coffee"></i>
            <span>Pulled pork</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'chutneyMango' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('chutneyMango')}
                  data-category="chutneyMango">
            <i className="fas fa-pepper-hot"></i>
            <span>Chutney mango</span>
          </button>
        </div>
        <div className="burger-battle-categories-dots">
          {[
            'pinaCaramelizada', 'platanoMaduro', 'mermeladaTocineta', 'quesoAzul', 
            'guacamoleJalapeno', 'panRemolacha', 'chicharronCrocante', 'arosDecebollaTemplra', 
            'pestoAlbahaca', 'championesVino', 'huevoPochado', 'salsaMaracuya', 
            'pulledPorkCafe', 'chutneyMango'
          ].map((category) => (
            <button
              key={category}
              className={`burger-battle-categories-dot ${activeCategory === category ? 'active-b' : ''}`}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>

      <div className="burger-battle-info-box">
          <p>Cada restaurante deberá cocinar con un ingrediente que se le será asignado aleatoriamente</p>
      </div>

      {/* Carousel Section - Main Content */}
      <div className="burger-battle-carousel">
        <h2 className="burger-battle-section-title">Participantes</h2>
        <div className="burger-battle-carousel-container">
          <div className="burger-battle-carousel-wrapper">
            {participants.map((participant, index) => (
              <div
                key={participant.id}
                className={`burger-battle-carousel-item ${
                  index === currentIndex
                    ? 'active-b'
                    : index === currentIndex - 1 || (currentIndex === 0 && index === participants.length - 1)
                    ? 'prev'
                    : index === currentIndex + 1 || (currentIndex === participants.length - 1 && index === 0)
                    ? 'next'
                    : ''
                }`}
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
                    <div className="burger-battle-stats">
                      <span className="burger-battle-visitors">
                        <i className="fas fa-users"></i> {participant.visitors}
                      </span>
                      <button 
                        className="burger-battle-visit-btn"
                        onClick={() => handleVisitClick(participant.id)}
                      >
                        Visitar
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

      {/* Steps Section - How to Participate */}
      <div className="burger-battle-steps">
        <h2 className="burger-battle-section-title">¿Cómo Participar?</h2>
        <div className="burger-battle-steps-container">
          <div className="burger-battle-step">
            <div className="burger-battle-step-number">1</div>
            <p>Visita los restaurantes participantes</p>
          </div>
          <div className="burger-battle-step">
            <div className="burger-battle-step-number">2</div>
            <p>Prueba sus hamburguesas especiales</p>
          </div>
          <div className="burger-battle-step">
            <div className="burger-battle-step-number">3</div>
            <p>Vota por tu favorita en nuestra app</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="burger-battle-cta">
        <h2>Descubre todo lo que Suesca tiene para ti</h2>
        <button 
          className="burger-battle-cta-button"
          onClick={() => window.location.href = 'https://www.destiplus.com/home/destino/1'}
        >
          Explorar Más
        </button>
      </div>

      {/* Footer */}
      <footer className="burger-battle-footer">
        <div className="burger-battle-social-links">
          <a href="https://www.facebook.com/profile.php?id=100092877753209&locale=es_LA" className="burger-battle-social-link"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/batalladehamburguesas_/" className="burger-battle-social-link"><i className="fab fa-instagram"></i></a>
        </div>
        <div className="burger-battle-quick-links">
          <a href="https://www.destiplus.com/" className="burger-battle-quick-link">Inicio</a>
          <a href="https://www.google.com/maps/place/Suesca,+Cundinamarca/@5.1023645,-73.8008345,376m/data=!3m1!1e3!4m6!3m5!1s0x8e401481a06da0a7:0x8dcabdf79b176aca!8m2!3d5.103929!4d-73.798632!16s%2Fm%2F02qnm70?entry=ttu&g_ep=EgoyMDI1MDQyMS4wIKXMDSoASAFQAw%3D%3D" className="burger-battle-quick-link">Ubicación</a>
          <a href="https://www.facebook.com/profile.php?id=100092877753209&locale=es_LA" className="burger-battle-quick-link">Términos y Condiciones</a>
        </div>
        <div className="burger-battle-contact">
          <p><i className="fas fa-phone"></i>+57 319 2505218</p>
          <p><i className="fas fa-envelope"></i>batalladehamburguesas@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default BurgerBattle;
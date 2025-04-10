import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../style/componentes-no-fijos/events/batalla.css';

const BurgerBattle = () => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "Egg Surfer",
      restaurant: "The Burger Joint",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1744317960/r26tvjcymbxgprb9m51e.jpg",
      logo: "https://i.pinimg.com/736x/4e/bf/8b/4ebf8b1f2d4b52c7a5776271aa8e4366.jpg",
      visitors: 46,
      price: "4.99"
    },
    {
      id: 2,
      name: "Classic Deluxe",
      restaurant: "Burger Palace",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1744317960/r26tvjcymbxgprb9m51e.jpg",
      logo: "https://i.pinimg.com/736x/4e/bf/8b/4ebf8b1f2d4b52c7a5776271aa8e4366.jpg",
      visitors: 38,
      price: "5.99"
    },
    {
      id: 3,
      name: "Spicy Avocado",
      restaurant: "Fire Grill",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1744317960/r26tvjcymbxgprb9m51e.jpg",
      logo: "https://i.pinimg.com/736x/4e/bf/8b/4ebf8b1f2d4b52c7a5776271aa8e4366.jpg",
      visitors: 52,
      price: "6.49"
    },
    {
      id: 4,
      name: "BBQ Bacon",
      restaurant: "Smokey's",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1744317960/r26tvjcymbxgprb9m51e.jpg",
      logo: "https://i.pinimg.com/736x/4e/bf/8b/4ebf8b1f2d4b52c7a5776271aa8e4366.jpg",
      visitors: 61,
      price: "7.29"
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
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const categories = ['ajicrema', 'guacamango', 'costillao', 'chocorico', 'cebechada'];
    
    // Calcular qué categoría está más visible en el centro
    const categoryElements = container.querySelectorAll('.burger-battle-category');
    let mostVisibleCategory = 'ajicrema';
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
          <button className={`burger-battle-category ${activeCategory === 'ajicrema' ? 'active-b' : ''}`} 
                  onClick={() => handleCategoryClick('ajicrema')}
                  data-category="ajicrema">
            <i className="fas fa-pepper-hot"></i>
            <span>Ajicrema</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'guacamango' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('guacamango')}
                  data-category="guacamango">
            <i className="fas fa-leaf"></i>
            <span>Guacamango</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'costillao' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('costillao')}
                  data-category="costillao">
            <i className="fas fa-drumstick-bite"></i>
            <span>Costillao</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'chocorico' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('chocorico')}
                  data-category="chocorico">
            <i className="fas fa-cookie"></i>
            <span>Chocorico</span>
          </button>
          <button className={`burger-battle-category ${activeCategory === 'cebechada' ? 'active-b' : ''}`}
                  onClick={() => handleCategoryClick('cebechada')}
                  data-category="cebechada">
            <i className="fas fa-lemon"></i>
            <span>Cebechada</span>
          </button>
        </div>
        <div className="burger-battle-categories-dots">
          {['ajicrema', 'guacamango', 'costillao', 'chocorico', 'cebechada'].map((category) => (
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
        <h2>¿Quieres conocer más sobre Suesca?</h2>
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
          <a href="#" className="burger-battle-social-link"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="burger-battle-social-link"><i className="fab fa-instagram"></i></a>
        </div>
        <div className="burger-battle-quick-links">
          <a href="#" className="burger-battle-quick-link">Inicio</a>
          <a href="#" className="burger-battle-quick-link">Participantes</a>
          <a href="#" className="burger-battle-quick-link">Cómo Votar</a>
          <a href="#" className="burger-battle-quick-link">Ubicación</a>
          <a href="#" className="burger-battle-quick-link">Términos y Condiciones</a>
        </div>
        <div className="burger-battle-contact">
          <p><i className="fas fa-phone"></i> +57 300 123 4567</p>
          <p><i className="fas fa-envelope"></i> info@burgerbattlesuesca.com</p>
        </div>
      </footer>
    </div>
  );
};

export default BurgerBattle;
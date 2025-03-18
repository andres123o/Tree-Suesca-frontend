import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WelcomeModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  
  useEffect(() => {
    // Verificar si el banner debe mostrarse basado en la última vez que se mostró
    const checkLastShown = () => {
      const lastShown = localStorage.getItem('destiplus_banner_last_shown');
      
      if (!lastShown) {
        // Primera visita, mostrar banner
        showBanner();
        return;
      }
      
      const lastShownDate = new Date(lastShown);
      const now = new Date();
      const daysDifference = Math.floor((now - lastShownDate) / (1000 * 60 * 60));
      
      // Mostrar banner si han pasado al menos 2 días desde la última vez
      if (daysDifference >= 2) {
        showBanner();
      } else {
        // No mostrar banner
        setShouldRender(false);
      }
    };
    
    // Pequeño delay para que la página cargue primero
    setTimeout(checkLastShown, 1000);
  }, []);
  
  const showBanner = () => {
    // Mostrar el banner
    setIsVisible(true);
    
    // Registrar cuándo se mostró
    localStorage.setItem('destiplus_banner_last_shown', new Date().toISOString());
    
    // Configurar temporizador para ocultar automáticamente
    setTimeout(() => {
      handleClose();
    }, 10000); // 8 segundos de visualización
  };
  
  const handleClose = () => {
    setIsVisible(false);
    
    // Esperar a que termine la animación antes de remover del DOM
    setTimeout(() => {
      setShouldRender(false);
      if (onClose) onClose();
    }, 400);
  };
  
  // Si no debe renderizarse, retornar null
  if (!shouldRender) return null;
  
  return (
    <div className={`banner-publicitario-vertical ${isVisible ? 'banner-visible' : 'banner-hidden'}`}>
      <div className="banner-overlay"></div>
      <div className="banner-container">
        <button className="banner-close" onClick={handleClose} aria-label="Cerrar publicidad">
          <X size={20} />
        </button>
        
        <div className="banner-content">
          <img 
            src="https://res.cloudinary.com/destinoplus/image/upload/v1742323212/hxl0wluoczaqbjbb0xoo.jpg" 
            alt="¡Atención! Solo hoy 2x1. Reserva y deja huella" 
            className="banner-image"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
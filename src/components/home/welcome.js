import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import OptimizedImage from '../common/optimzarImg'

const WelcomeModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  
  useEffect(() => {
    // Verificar si el banner debe mostrarse
    const checkLastShown = () => {
      try {
        const lastShown = localStorage.getItem('destiplus_banner_last_shown');
        const now = new Date().getTime(); // Timestamp actual en milisegundos
        
        // Si nunca se ha mostrado o si el valor no es válido
        if (!lastShown) {
          console.log("Primera vez mostrando el banner");
          showBanner();
          return;
        }
        
        const lastShownTime = parseInt(lastShown, 10); // Convertir a número
        const hoursDifference = (now - lastShownTime) / (1000 * 60 * 60);
        
        console.log("Horas desde última visualización:", hoursDifference);
        
        // Mostrar banner si ha pasado al menos 0.01 horas (36 segundos)
        if (hoursDifference >= 0.01) {
          console.log("Ha pasado 36 segundos o más, mostrando banner");
          showBanner();
        } else {
          console.log("No ha pasado suficiente tiempo, ocultando banner");
          setShouldRender(false);
        }
      } catch (error) {
        console.error("Error al verificar el tiempo:", error);
        // En caso de error, mostrar el banner de todos modos
        showBanner();
      }
    };
    
    // Pequeño delay para que la página cargue primero
    setTimeout(checkLastShown, 1000);
  }, []);
  
  const showBanner = () => {
    // Mostrar el banner
    setIsVisible(true);
    
    // Guardar el timestamp actual en milisegundos
    const now = new Date().getTime();
    localStorage.setItem('destiplus_banner_last_shown', now.toString());
    console.log("Banner mostrado y timestamp guardado:", now);
    
    // Configurar temporizador para ocultar automáticamente
    setTimeout(() => {
      handleClose();
    }, 10000); // 10 segundos de visualización
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
          <OptimizedImage
            imageUrl={"https://res.cloudinary.com/destinoplus/image/upload/v1743744434/hxl0wluoczaqbjbb0xoo.jpg"}
            alt={"¡Atención! Solo hoy 2x1. Reserva y deja huella"}
            className={"banner-image"}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
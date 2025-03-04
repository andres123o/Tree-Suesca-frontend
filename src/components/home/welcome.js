import React, { useState, useEffect } from 'react';
import { X, Heart, MapPin, Map, Users, Star } from 'lucide-react';

const WelcomeModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  
  useEffect(() => {
    // Cerrar automáticamente después de 7 segundos
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, 15000);
    
    return () => {
      clearTimeout(autoCloseTimer);
    };
  }, []);
  
  // Efecto para manejar la animación de salida
  useEffect(() => {
    if (!isVisible) {
      // Esperar a que termine la animación antes de remover del DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (onClose) onClose();
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  
  const handleClose = () => {
    // Solo iniciar la animación de salida
    setIsVisible(false);
  };
  
  // Si no debe renderizarse, retornar null
  if (!shouldRender) return null;
  
  return (
    <div className={`welcome-modal-overlay ${isVisible ? 'modal-visible' : 'modal-hidden'}`}>
      <div className="welcome-modal-content">
        <button className="welcome-modal-close" onClick={handleClose}>
          <X size={20} />
        </button>
        
        <div className="welcome-modal-header">
          <div className="welcome-modal-logo">
            <h2>Desti<span className="welcome-modal-plus">plus</span></h2>
          </div>
        </div>
        
        <div className="welcome-modal-body">
          <h3 className="welcome-modal-title">¡Encontrar lo que buscas debería ser fácil!</h3>
          
          <div className="welcome-modal-mission">
            <p>Estamos resolviendo la fragmentación en la información turística, para que puedas:</p>
            
            <div className="welcome-modal-benefits">
              <div className="welcome-modal-benefit">
                <div className="benefit-icon green">
                  <MapPin size={20} />
                </div>
                <span>Descubrir lugares auténticos</span>
              </div>
              
              <div className="welcome-modal-benefit">
                <div className="benefit-icon blue">
                  <Map size={20} />
                </div>
                <span>Planificar en minutos, no horas</span>
              </div>
              
              <div className="welcome-modal-benefit">
                <div className="benefit-icon orange">
                  <Heart size={20} />
                </div>
                <span>Obtener recomendaciones personalizadas</span>
              </div>
            </div>
          </div>
          
          <div className="welcome-modal-collaboration">
            <div className="collaboration-header">
              <Users size={24} className="collaboration-icon" />
              <h4>¡Tu apoyo es clave para crecer!</h4>
            </div>
            
            <h5>Con cada ruta completada y reserva generada, nos ayudas a</h5>
            <ul className="collaboration-list">
              <li>Descubrir nuevos destinos más auténticos y menos masificados</li>
              <li>Mejorar nuestras recomendaciones personalizadas</li>
              <li>Construir una comunidad de viajeros auténticos</li>
            </ul>
          </div>
          
          <div className="welcome-modal-cta">
            <button className="welcome-modal-button primary" onClick={handleClose}>
              ¡Explorar ahora!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
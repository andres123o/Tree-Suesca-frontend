// NotificationModal.js
import React, { useEffect } from 'react';
// Opcional: Importa estilos si los separas
// import './NotificationModal.css'; 

const NotificationModal = ({ isOpen, message, duration = 8000, onClose, type = 'error' }) => {

  // Efecto para manejar el cierre automático
  useEffect(() => {
    let timerId = null;
    if (isOpen) {
      // Establecer un temporizador para llamar a onClose después de 'duration'
      timerId = setTimeout(() => {
        onClose();
      }, duration);
    }

    // Función de limpieza: se ejecuta si el componente se desmonta
    // o si isOpen cambia ANTES de que termine el temporizador.
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isOpen, duration, onClose]); // Dependencias del efecto

  // Si no está abierto, no renderizar nada
  if (!isOpen) {
    return null;
  }

  // Clases CSS dinámicas basadas en el tipo (opcional)
  const modalTypeClass = `notification-modal-${type}`; // Ej: notification-modal-error

  return (
    // Usamos nombres de clase similares al modal de votación para reutilizar estilos si es posible
    <div className="voting-modal-overlay notification-modal-overlay"> {/* Overlay semitransparente */}
      <div className={`voting-modal-content notification-modal-content ${modalTypeClass}`}> {/* Contenido del modal */}
        <p className="notification-modal-message">{message}</p>
        {/* Podrías añadir un icono aquí basado en 'type' */}
         {/* No necesita botón de cierre explícito ya que se cierra solo */}
      </div>
    </div>
  );
};

export default NotificationModal;
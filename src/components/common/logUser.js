import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './auth';
import MapComponent from '../common/mapaUbicacion';

const AuthButtons = ({ isNewListing = false, contactInfo, location, name, tipo, onLocationClick, onContactClick}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [error, setError] = useState(null);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        handleUserAuthenticated(user);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && pendingAction) {
      if (pendingAction === 'map') {
        setIsMapOpen(true);
      } else if (pendingAction === 'contact') {
        handleWhatsAppClick();
      }
      setPendingAction(null);
    }
  }, [user, pendingAction]);

  const handleUserAuthenticated = async (user) => {
    try {
      setError(null);
      const response = await fetch('https://tree-suesca-backend-production.up.railway.app/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          nombre: user.displayName,
          foto_perfil: user.photoURL,
          fecha_registro: new Date().toISOString(),
          ultima_conexion: new Date().toISOString(),
          estado: true
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }

      const data = await response.json();
      
      const userData = {
        email: user.email,
        nombre: user.displayName,
        foto_perfil: user.photoURL,
        auth: true
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

    } catch (error) {
      console.error('Error:', error);
      setError('Error al verificar/registrar usuario. Intente nuevamente.');
      setPendingAction(null);
    }
  };

  const handleAuthClick = async (action) => {
    if (!user) {
      setPendingAction(action);
      try {
        setError(null);

        window.gtag('event', 'intento_login', {
            tipo_negocio: tipo
        });

        await signInWithPopup(auth, provider);

        // Track login exitoso
        window.gtag('event', 'login_exitoso', {
            tipo_negocio: tipo
        });
      } catch (error) {
        console.error('Error:', error);
        setError('Error al iniciar sesión. Intente nuevamente.');

        // Track error login
        window.gtag('event', 'error_login', {
            tipo_negocio: tipo,
            error_mensaje: error.message
        });

        setPendingAction(null);
      }
    } else {
      if (action === 'map') {
        setIsMapOpen(true);
      } else if (action === 'contact') {
        handleWhatsAppClick();
      }
    }
  };

  const handleWhatsAppClick = () => {
    if (contactInfo) {
        // Trackear el evento cuando realmente se hace el contacto
        onContactClick?.(); // El ?. es para que no falle si no se pasa la función
        
        const message = isNewListing 
            ? `¡Hola! Me interesa ser el primero en reservar: ${tipo}`
            : `¡Hola! Me interesa reservar: ${tipo}`;
        
        window.open(`https://wa.me/${contactInfo}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handleMapOpen = () => {
    // PRIMERO disparar el evento
    if (onLocationClick) {
        window.gtag('event', 'ver_ubicacion', {
            tipo_negocio: tipo || 'desconocido',
            nombre_establecimiento: name || 'desconocido'
        });
    }
    // LUEGO abrir el mapa
    setIsMapOpen(true);
};

  useEffect(() => {
    if (user && pendingAction) {
        if (pendingAction === 'map') {
            handleMapOpen(); // Usar la nueva función
        } else if (pendingAction === 'contact') {
            handleWhatsAppClick();
        }
        setPendingAction(null);
    }
  }, [user, pendingAction]);

  return (
    <div className="container-contacto-aloja">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <button 
        className="como-llegar-aloja"
        onClick={() => handleAuthClick('map')}
      >
        <img src="/utils/icons8-gps-50.png" alt="GPS icon" />
        Ver ubicación
      </button>
      
      <button 
        className="contacto-aloja"
        onClick={() => handleAuthClick('contact')}
      >
        <span>
          {isNewListing ? '¡Sé el primero en reservar!' : 'Reservar ahora'}
        </span>
        <img src="/utils/icons8-whatsapp-48.png" alt="WhatsApp icon" />
      </button>

      {isMapOpen && location && (
        <MapComponent
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          coordinates={location}
          establishmentName={name}
        />
      )}
    </div>
  );
};

export default AuthButtons;
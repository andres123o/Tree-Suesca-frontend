import React, { useState, useEffect } from 'react';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from './auth';
import MapComponent from '../common/mapaUbicacion';
// import { AlertCircle } from 'lucide-react';
// import { Chrome, ArrowRight, ShieldCheck } from 'lucide-react';

const AuthButtons = ({ isNewListing = false, contactInfo, location, name, tipo, onLocationClick, onContactClick, uniqueClassNmae = 'container-contacto-aloja'}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  // const [user, setUser] = useState(null);
  // const [pendingAction, setPendingAction] = useState(null);
  // const [error, setError] = useState(null);
  // const [showRedirectModal, setShowRedirectModal] = useState(false);
  // const [showIOSRedirectModal, setShowIOSRedirectModal] = useState(false);
  // const provider = new GoogleAuthProvider();

  // Detector de navegador in-app
  // const isInAppBrowser = () => {
  //   const ua = navigator.userAgent || navigator.vendor || window.opera;
  //   return (
  //     ua.includes('FBAN') || 
  //     ua.includes('FBAV') || 
  //     ua.includes('Instagram') || 
  //     ua.includes('TikTok') 
  //   );
  // };

  // const getBrowserType = () => {
  //   const ua = navigator.userAgent.toLowerCase();
  //   if (ua.includes('instagram')) return 'instagram';
  //   if (ua.includes('fbav') || ua.includes('fban')) return 'facebook';
  //   if (ua.includes('tiktok')) return 'tiktok';
  //   return 'other';
  // };

  // const handleBrowserRedirect = () => {
  //   const browserType = getBrowserType();
  //   const isAndroid = /android/i.test(navigator.userAgent);
  //   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  //   // Primer intento: Redirección específica según plataforma y navegador
  //   switch (browserType) {
  //     case 'instagram':
  //     case 'facebook':
  //     case 'tiktok':
  //     case 'other':
  //       if (isAndroid) {
  //         // Intent URL funciona para la mayoría de navegadores Android in-app
  //         window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
  //       } else if (isIOS) {
  //         setShowIOSRedirectModal(true);
  //         return; 
  //       }
  //       break;
  //   }

  //   // Segundo intento: URL normal después de 1 segundo (funciona como fallback para cualquier navegador)
  //   setTimeout(() => {
  //     window.location.href = `https://${window.location.host}${window.location.pathname}`;
  //   }, 1000);

  //   // Tercer intento: Si todo falla, sugerimos instalar Chrome
  //   setTimeout(() => {
  //     if (isAndroid) {
  //       window.location.href = 'market://details?id=com.android.chrome';
  //     } 
  //   }, 2000);
  // };

  // const RedirectModal = ({ onClose }) => {
  //   const [countdown, setCountdown] = useState(5);

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setCountdown((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer);
  //           handleBrowserRedirect();
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, []);

  //   return (
  //     <div className="redirect-modal-overlay">
  //       <div className="redirect-modal-container">
  //         <div className="redirect-modal-content">
  //           <div className="redirect-modal-header">
  //             <div className="chrome-icon-container">
  //               <Chrome size={24} />
  //             </div>
  //           </div>
            
  //           <h4 className="redirect-modal-title">
  //             Tu Seguridad Primero
  //           </h4>
            
  //           <p className="redirect-modal-description">
  //             Para mayor seguridad, abriremos tu navegador de confianza
  //           </p>
    
  //           <div className="redirect-modal-icons">
  //             <Chrome size={24} className="browser-icon" />
  //             <div className="arrow-container">
  //               <ArrowRight size={18} />
  //             </div>
  //             <Chrome size={24} className="browser-icon-active" />
  //           </div>
    
  //           <div className="redirect-modal-security">
  //             <ShieldCheck size={16} />
  //             <span>No instalarás nada nuevo</span>
  //           </div>
    
  //           <div className="redirect-modal-progress">
  //             <div className="redirect-modal-countdown">
  //               Continuando en {countdown}...
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const RedirectModalIOS = ({ onClose }) => {

  //   return (
  //     <div className="redirect-modal-overlay">
  //       <div className="redirect-modal-container">
  //         <div className="redirect-modal-content">
  //           <div className="redirect-modal-header">
  //             <div className="chrome-icon-container">
  //               <Chrome size={24} />
  //             </div>
  //           </div>
            
  //           <h4 className="redirect-modal-title">
  //             Tu Seguridad Primero
  //           </h4>
            
  //           <p className="redirect-modal-description">
  //             En la esquina superior derecha, dale en abrir en navegador externo.
  //           </p>
    
  //           <div className="redirect-modal-icons">
  //             <Chrome size={24} className="browser-icon" />
  //             <div className="arrow-container">
  //               <ArrowRight size={18} />
  //             </div>
  //             <Chrome size={24} className="browser-icon-active" />
  //           </div>
    
  //           <div className="redirect-modal-security">
  //             <ShieldCheck size={16} />
  //             <span>No instalarás nada nuevo</span>
  //           </div>
    
  //           <div className="redirect-modal-progress">
  //             <div className="redirect-modal-countdown">
  //               Despues continuaremos en modo seguro
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const ErrorAlert = ({ message, onClose }) => {
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       onClose();
  //     }, 5000); // El error se ocultará después de 5 segundos

  //     return () => clearTimeout(timer);
  //   }, [onClose]);

  //   return (
  //     <div className="error-alert">
  //       <div className="error-alert-content">
  //         <AlertCircle size={20} color="#dc3545" />
  //         {message}
  //       </div>
  //     </div>
  //   );
  // };

  // useEffect(() => {
  //   const savedUser = localStorage.getItem('user');
  //   if (savedUser) {
  //     setUser(JSON.parse(savedUser));
  //   }

  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       handleUserAuthenticated(user);
  //     } else {
  //       localStorage.removeItem('user');
  //       setUser(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  // const handleUserAuthenticated = async (user) => {
  //   try {
  //     setError(null);
  //     const response = await fetch('https://tree-suesca-backend-production.up.railway.app/api/v1/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: user.email,
  //         nombre: user.displayName,
  //         foto_perfil: user.photoURL,
  //         fecha_registro: new Date().toISOString(),
  //         ultima_conexion: new Date().toISOString(),
  //         estado: true
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Error al registrar usuario');
  //     }

  //     const data = await response.json();
      
  //     const userData = {
  //       email: user.email,
  //       nombre: user.displayName,
  //       foto_perfil: user.photoURL,
  //       auth: true
  //     };
      
  //     localStorage.setItem('user', JSON.stringify(userData));
  //     setUser(userData);

  //   } catch (error) {
  //     console.error('Error:', error);
  //     setError('Error al verificar/registrar usuario. Intente nuevamente.');
  //     setPendingAction(null);
  //   }
  // };

  // const handleAuthClick = async (action) => {
  //   // Verificar si es navegador in-app
  //   if (isInAppBrowser()) {
  //     window.gtag('event', 'in_app_browser_detected', {
  //       tipo_negocio: tipo,
  //       action: action
  //     });
  //     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  //     if (isIOS) {
  //       setShowIOSRedirectModal(true);
  //     } else {
  //       setShowRedirectModal(true);
  //     }
  //     return;
  //   }
  //   if (!user) {
  //     setPendingAction(action);
  //     try {
  //       setError(null);

  //       window.gtag('event', 'intento_login', {
  //           tipo_negocio: tipo
  //       });

  //       await signInWithPopup(auth, provider);

  //       // Track login exitoso
  //       window.gtag('event', 'login_exitoso', {
  //           tipo_negocio: tipo
  //       });
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setError('Error al iniciar sesión. Intente nuevamente.');

  //       // Track error login
  //       window.gtag('event', 'error_login', {
  //           tipo_negocio: tipo,
  //           error_mensaje: error.message
  //       });

  //       setPendingAction(null);
  //     }
  //   } else {
  //     if (action === 'map') {
  //       handleMapOpen()
  //     } else if (action === 'contact') {
  //       handleWhatsAppClick();
  //     }
  //   }
  // };

  const handleWhatsAppClick = () => {
    if (contactInfo) {
        // Trackear el evento cuando realmente se hace el contacto
        onContactClick?.(); // El ?. es para que no falle si no se pasa la función
        
        const message = isNewListing 
            ? `¡Hola! vengo de Desti Plus, me interesa ser el primero en reservar: ${tipo}`
            : `¡Hola! vengo de Desti Plus, me interesa reservar: ${tipo}`;
        
        window.open(`https://wa.me/${contactInfo}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handleMapOpen = () => {
      setIsMapOpen(true);
      onLocationClick()
  };

  // useEffect(() => {
  //   if (user && pendingAction) {
  //       if (pendingAction === 'map') {
  //           handleMapOpen(); // Usar la nueva función
  //       } else if (pendingAction === 'contact') {
  //           handleWhatsAppClick();
  //       }
  //       setPendingAction(null);
  //   }
  // }, [user, pendingAction]);

  return (
    <>
      {/* {showRedirectModal && <RedirectModal onClose={() => setShowRedirectModal(false)} />}
      {showIOSRedirectModal && <RedirectModalIOS onClose={() => setShowIOSRedirectModal(false)} />}
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />} */}

      <div className={uniqueClassNmae}>       
        <button 
          className="como-llegar-aloja"
          onClick={handleMapOpen}
        >
          <img src="/utils/icons8-gps-50.png" alt="GPS icon" />
          Ver ubicación
        </button>
        
        <button 
          className="contacto-aloja"
          onClick={handleWhatsAppClick}
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
    </>
  );
};

export default AuthButtons;
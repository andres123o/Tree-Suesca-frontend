import React, { useState, useEffect } from 'react';
import {  Navigation2, Clock, Mountain, Star, Award, Users  } from 'lucide-react'; // Importamos los iconos
import { IoIosArrowForward } from "react-icons/io";
import OptimizedImage from '../common/optimzarImg'
import OptimizedImageLarge from '../common/optimizarImagenesVersion'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../common/auth';
import { useNavigate } from "react-router-dom"
// import { Chrome, ArrowRight, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';



const InfoDescripcion = ({ ruta, onImageSelect, startMap, currentImageIndex }) => {
  const navigate = useNavigate()
  const [selectedImgIndex, setSelectedImgIndex] = useState(currentImageIndex || null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isNewRoute = !ruta.calificacion || ruta.calificacion === 0;
  const [maxTextLength, setMaxTextLength] = useState(100); // Estado dinámico
  
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);
  // const [showRedirectModal, setShowRedirectModal] = useState(false);
  // const [showIOSRedirectModal, setShowIOSRedirectModal] = useState(false);
  // const provider = new GoogleAuthProvider();

  // Efecto para manejar el tamaño de la pantalla
  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth < 768) {
          setMaxTextLength(100);
          } else {
          setMaxTextLength(Infinity); // Mostrar todo el texto en pantallas grandes
          }
      };

      // Ejecutar al montar y al cambiar tamaño
      handleResize();
      window.addEventListener("resize", handleResize);

      // Limpiar evento al desmontar
      return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  // // Primero agregamos las funciones de detección y redirección
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
  //         // Para Android: Intent URL para abrir Chrome
  //         window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
  //       } else if (isIOS) {
  //         setShowIOSRedirectModal(true);
  //         return; 
  //       }
  //       break;
  //   }

  //   // Segundo intento después de 1 segundo
  //   setTimeout(() => {
  //     window.location.href = `https://${window.location.host}${window.location.pathname}`;
  //   }, 1000);

  //   // Tercer intento - sugerir instalar navegador si todo falla
  //   setTimeout(() => {
  //     if (isAndroid) {
  //       window.location.href = 'market://details?id=com.android.chrome';
  //     } 
  //   }, 2000);
  // };

  // // Componente para el modal de redirección
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
  
  //     return (
  //       <div className="redirect-modal-overlay">
  //         <div className="redirect-modal-container">
  //           <div className="redirect-modal-content">
  //             <div className="redirect-modal-header">
  //               <div className="chrome-icon-container">
  //                 <Chrome size={24} />
  //               </div>
  //             </div>
              
  //             <h4 className="redirect-modal-title">
  //               Tu Seguridad Primero
  //             </h4>
              
  //             <p className="redirect-modal-description">
  //               En la esquina superior derecha, dale en abrir en navegador externo.
  //             </p>
      
  //             <div className="redirect-modal-icons">
  //               <Chrome size={24} className="browser-icon" />
  //               <div className="arrow-container">
  //                 <ArrowRight size={18} />
  //               </div>
  //               <Chrome size={24} className="browser-icon-active" />
  //             </div>
      
  //             <div className="redirect-modal-security">
  //               <ShieldCheck size={16} />
  //               <span>No instalarás nada nuevo</span>
  //             </div>
      
  //             <div className="redirect-modal-progress">
  //               <div className="redirect-modal-countdown">
  //                 Despues continuaremos en modo seguro
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
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
  //   }
  // };

  // const handleAuthClick = async () => {
  //   // Verificar si está en navegador in-app
  //   if (isInAppBrowser()) {
  //     window.gtag('event', 'in_app_browser_detected', {
  //       tipo_negocio: 'miradores',
  //       nombre_ruta: ruta.nombre || 'Ruta Desconocida',
  //       tipo_interaccion: 'click'
  //     });
  //     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  //     if (isIOS) {
  //       setShowIOSRedirectModal(true);
  //     } else {
  //       setShowRedirectModal(true);
  //     }
  //     return;
  //   }

  //   // Trackear click en iniciar aventura
  //   window.gtag('event', 'iniciar_aventura', {
  //     tipo_negocio: 'miradores',
  //     nombre_ruta: ruta.nombre || 'Ruta Desconocida',
  //     tipo_interaccion: 'click'
  // });

  //   if (!user) {
  //     try {
  //       setError(null);
  //       const result = await signInWithPopup(auth, provider);
  //       if (result.user) {
  //         await handleUserAuthenticated(result.user);
  //         navigate(`/ruta/mapa/${startMap}`);

  //         // Trackear inicio exitoso de ruta
  //         window.gtag('event', 'ruta_iniciada', {
  //             tipo_negocio: 'miradores',
  //             nombre_ruta: ruta.nombre || 'Ruta Sin Nombre',
  //             tipo_interaccion: 'conversion'
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setError(error.message || 'Error al iniciar sesión. Intente nuevamente.');
  //     }
  //   } else {
  //     // Trackear inicio directo de ruta (usuario ya logueado)
  //     window.gtag('event', 'ruta_iniciada', {
  //         tipo_negocio: 'miradores',
  //         nombre_ruta: ruta.nombre || 'Ruta Sin Nombre',
  //         tipo_interaccion: 'conversion'
  //     });
      
  //     navigate(`/ruta/mapa/${startMap}`)
  //   }
  // };

  useEffect(() => {
    if (currentImageIndex !== undefined) {
      setSelectedImgIndex(currentImageIndex);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    function crearMapaIlustrativo(containerId) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "auto");
      svg.setAttribute("viewBox", "0 30 500 210");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  
      // Usando los datos de la API para las estaciones
      const estaciones = ruta.estaciones.map(estacion => {
        // Asignar posiciones basadas en el índice para distribuir uniformemente
        const index = ruta.estaciones.indexOf(estacion);
        const totalEstaciones = ruta.estaciones.length;
        return {
          x: 20 + (460 * index / (totalEstaciones - 1)),
          y: 200 - (index * 20), // Ajustar Y para crear efecto de elevación
          nombre: estacion.nombre,
          dificultad: estacion.dificultad
        };
      });
  
      // Usando los datos de la API para los atajos
      const atajos = ruta.atajos.map((atajo, index) => {
        const totalAtajos = ruta.atajos.length;
        // Crear puntos de inicio y fin distribuidos a lo largo del camino
        return {
          start: { 
            x: 90 + (100 * index), 
            y: 205 - (index * 30)
          },
          end: { 
            x: 210 + (100 * index), 
            y: 135 - (index * 20)
          },
          nombre: atajo.nombre,
          dificultad: atajo.dificultad
        };
      });

      // El resto del código del mapa se mantiene igual...
      function generarRutaAscendente() {
          let d = "M20,180 "; 
          for (let i = 20; i <= 480; i += 1) {
          const y = 180 - Math.pow((i - 8) / 310, 1) * 70;
          const ondulacion = Math.sin((i - 20) / 30) * 50;
          d += `L${i},${y + ondulacion} `;
          }
          return d.trim();
      }
  
      const rutaPrincipal = document.createElementNS("http://www.w3.org/2000/svg", "path");
      rutaPrincipal.setAttribute("d", generarRutaAscendente());
      rutaPrincipal.setAttribute("stroke", "black");
      rutaPrincipal.setAttribute("stroke-width", "3");
      rutaPrincipal.setAttribute("fill", "none");
      svg.appendChild(rutaPrincipal);

      // Crear atajos y marcadores
      atajos.forEach(atajo => {
          const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
          linea.setAttribute("x1", atajo.start.x);
          linea.setAttribute("y1", atajo.start.y);
          linea.setAttribute("x2", atajo.end.x);
          linea.setAttribute("y2", atajo.end.y);
          linea.setAttribute("stroke", "#FFA500");
          linea.setAttribute("stroke-width", "3");
          linea.setAttribute("stroke-dasharray", "5,5");
          svg.appendChild(linea);
  
          const marcador = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          marcador.setAttribute("cx", atajo.start.x);
          marcador.setAttribute("cy", atajo.start.y);
          marcador.setAttribute("r", "10");
          marcador.setAttribute("fill", "#FFA500");
          marcador.setAttribute("stroke", "black");
          marcador.setAttribute("stroke-width", "0");
          marcador.addEventListener('click', () => mostrarTooltip(atajo.nombre, atajo.dificultad, atajo.start.x, atajo.start.y))
          svg.appendChild(marcador);
      });
  
      // Crear estaciones con banderas
      estaciones.forEach(estacion => {
          const grupoEstacion = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
          const triangulo = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
          triangulo.setAttribute("points", `${estacion.x - 17},${estacion.y - 12} ${estacion.x + 17},${estacion.y - 12} ${estacion.x},${estacion.y - 40}`);
          triangulo.setAttribute("fill", "#00cd70");
          grupoEstacion.appendChild(triangulo);
  
          grupoEstacion.addEventListener('click', () => mostrarTooltip(estacion.nombre, estacion.dificultad, estacion.x, estacion.y - 20));
          svg.appendChild(grupoEstacion);
      });
  
      const contenedor = document.getElementById(containerId);
      contenedor.innerHTML = '';
      contenedor.appendChild(svg);
  
      function mostrarTooltip(nombre, dificultad, x, y) {
        const tooltipExistente = document.getElementById('mapa-tooltip');
        if (tooltipExistente) {
            tooltipExistente.remove();
        }
    
        const tooltip = document.createElement('div');
        tooltip.id = 'mapa-tooltip';
        tooltip.innerHTML = `<strong>${nombre}</strong><br>Dificultad: ${dificultad}`;
    
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'rgba(255, 255, 255, 0.9)';
        tooltip.style.padding = '3%';
        tooltip.style.borderRadius = '1em';
        tooltip.style.zIndex = '1000';
        tooltip.style.fontSize = '0.8em';
        tooltip.style.maxWidth = '80%';
        tooltip.style.boxShadow = '0 5px 5px rgba(0, 0, 0, 0.2)';
        tooltip.style.transition = 'opacity 0.3s';
    
        document.body.appendChild(tooltip);
    
        const svgRect = svg.getBoundingClientRect();
        const escalaX = svgRect.width / svg.viewBox.baseVal.width;
        const escalaY = svgRect.height / svg.viewBox.baseVal.height;
    
        const desplazamientoX = window.pageXOffset || document.documentElement.scrollLeft;
        const desplazamientoY = window.pageYOffset || document.documentElement.scrollTop;
    
        let posX = (x * escalaX) + svgRect.left + desplazamientoX;
        let posY = (y * escalaY) + svgRect.top + desplazamientoY;
    
        posX = posX - (tooltip.offsetWidth / 2);
        posY = posY - tooltip.offsetHeight - 10;
    
        if (posY < 0) {
            posY = y + 20;
        }
        if (posX < 0) {
            posX = 0;
        } else if (posX + tooltip.offsetWidth > window.innerWidth) {
            posX = window.innerWidth - tooltip.offsetWidth;
        }
    
        tooltip.style.left = `${posX}px`;
        tooltip.style.top = `${posY}px`;
    
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
    
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 100);
        }, 1000);
      }
  
      function ajustarTamanoSVG() {
          const anchoContenedor = contenedor.clientWidth;
          const altoCalculado = (anchoContenedor * 150) / 400;
          svg.style.height = `${altoCalculado}px`;
      }
      
      ajustarTamanoSVG();
      window.addEventListener('resize', ajustarTamanoSVG);
  
      return () => {
        window.removeEventListener('resize', ajustarTamanoSVG);
      };
    }

    const limpiar = crearMapaIlustrativo('container-mapa-interactivo-example');

    return () => {
      if (limpiar) limpiar();
      const contenedor = document.getElementById('container-mapa-interactivo-example');
      if (contenedor) contenedor.innerHTML = '';
    };
  }, [ruta]);

  const handleImageClick = (imgSrc, index) => {
    setSelectedImgIndex(index);
    onImageSelect(imgSrc, index);
  };


  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStartAdventure = () => {
    // Trackear click en iniciar aventura
    window.gtag('event', 'iniciar_aventura', {
      tipo_negocio: 'miradores',
      nombre_ruta: ruta.nombre || 'Ruta Desconocida',
      tipo_interaccion: 'click'
    });

    // Trackear inicio de ruta
    window.gtag('event', 'ruta_iniciada', {
      tipo_negocio: 'miradores',
      nombre_ruta: ruta.nombre || 'Ruta Sin Nombre',
      tipo_interaccion: 'conversion'
    });
    
    navigate(`/ruta/mapa/${startMap}`);
  };

  // Calcular texto visible
  const needsTruncation = ruta.descripcion.length > maxTextLength;
  const truncatedText = ruta.descripcion.slice(0, maxTextLength);
  const visibleText = isExpanded 
      ? ruta.descripcion 
      : `${truncatedText}${needsTruncation ? "..." : ""}`;
  
  return (
    <>
      <Helmet>
          <title>{ruta.nombre}</title>
          <meta name="description" content={ruta.nombre} />
      </Helmet>
      {/* {showRedirectModal && <RedirectModal onClose={() => setShowRedirectModal(false)} />}
      {showIOSRedirectModal && <RedirectModalIOS onClose={() => setShowIOSRedirectModal(false)} />} */}


      <div className='container-info-descrip'>
        <div className='container-carrusel-imgs'>
          <div className='carrusel-imgs'>
            {ruta.imagenes.map((img, index) => (
              <OptimizedImageLarge
                key={img.id}
                imageUrl={img.url}
                alt={`Imagen ${index + 1} del establecimiento`}
                onClick={() => handleImageClick(img.url, index)}
                className={index === selectedImgIndex ? 'selected' : ''}
              />
            ))}
          </div>
        </div>

        <div className='container-recuadro-info-title'>
          <h4>{ruta.nombre}</h4>
          <div className='container-dificultad-distancia-timpo'>
            <div className='section'>
              <h5>
                <Navigation2 className="info-icon" size={18} />
                Distancia
              </h5>
              <p>{ruta.distancia} Km</p>
            </div>
            <div className='section'>
              <h5>
                <Clock className="info-icon" size={18} />
                Tiempo
              </h5>
              <p>{ruta.tiempo} Min</p>
            </div>
            <div className='section'>
              <h5>
                <Mountain className="info-icon" size={18} />
                Dificultad
              </h5>
              <p>{ruta.dificultad}</p>
            </div>
          </div>
        </div>

        <div className='separador'></div>

        <div className='container-mapa-atajos-estaciones'>
          <div id='container-mapa-interactivo-example'></div>
        </div>

        <div className='container-leyenda-mapa-interactivo-arriba'>
          <div className='container-leyenda'>
            <h5>Estaciones</h5>
            <div className='circulo' style={{ backgroundColor: '#00cd70' }}></div>
          </div>
        </div>

        <div className='separador'></div>

        <div className='container-descripcion'>
          <p className='descripcion' id="descripcion-texto">
            {visibleText}
            {needsTruncation && (
              <button onClick={toggleExpand} className='show-more-btn'>
              {isExpanded ? 'less' : 'more'}
              </button>
            )}
          </p>
        </div>

        <div className='separador'></div>

        {/* Nueva sección de estadísticas */}
          {isNewRoute ? (
            <div className='new-route-banner'>
              <div className='new-route-header'>
                <Award className="award-icon" />
                <h3>¡Nueva Ruta Descubierta!</h3>
              </div>
              <div className='container-pioneros-nuevos'>
                <div className='p-del-pionero-nueva-ruta'>
                  <p>Sé el primero en explorar este emocionante sendero</p>
                </div>
                <div className='pioneer-badge'>
                  <Users className="users-icon" />
                  <span>¡Conviértete en pionero de esta aventura!</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="sub-stats-container">
                <div className="calificacion">
                  <span className="rating-number">{ruta.calificacion}</span>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={20}
                        fill={index < Math.floor(ruta.calificacion) ? "#FFB800" : "none"}
                        color={index < Math.floor(ruta.calificacion) ? "#FFB800" : "#e0e0e0"}
                      />
                    ))}
                  </div>
                  <div className="recomendacion">
                    <p>Recomendada: <strong>{ruta.veces_recomendada}</strong> veces</p>
                    <p>Completada: <strong>{ruta.completaron_ruta}</strong> veces</p>
                  </div>
                </div>
                <div className="testimonial-preview">
                  "Una experiencia única en la ruta. El recorrido superó mis expectativas, los puntos de descanso están perfectamente ubicados y las vistas son espectaculares..."
                </div>
              </div>
            </>
          )}

        {/* Botón CTA mejorado */}
        <div className='container-boton'>
          <button 
            className="adventure-button"
            onClick={handleStartAdventure}
          >
            <span className="button-main-text">¡Iniciar Aventura!</span>
            <span className="button-sub-text">
              {isNewRoute ? '¡Sé el primero en explorar!' : '¡Únete a la aventura!'}
            </span>
          </button>
        </div>

        <div className='separador'></div>

        <div className='accordion'>
          {Object.entries(ruta.instrucciones[0]).map(([key, value], index) => {
            if (key === 'id') return null;
            
            return (
              <div key={key} className='accordion-item1'>
                <button 
                  className={`accordion-header ${expandedSection === index ? 'active' : ''}`}
                  onClick={() => toggleSection(index)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <IoIosArrowForward className={`icon ${expandedSection === index ? 'rotated' : ''}`} />
                </button>
                <div 
                  className='accordion-content'
                  style={{ display: expandedSection === index ? 'block' : 'none' }}
                >
                  <p>{value}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
};

export default InfoDescripcion;
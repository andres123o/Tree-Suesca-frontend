import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MdExplore } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import OptimizedImage from "../common/optimzarImg";
import { MdError } from "react-icons/md";
import SearchBox from '../home-destino/searchBox'
import AIResponse from "./responseIA";
import { consultarOpenAI } from "../../service/openIAService";
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';
import FeedbackSection from './feedback';
import WelcomeModal from "./welcome";


const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1/destinos/filtros';

const CategoriasBurbujas = () => {
    return (
      <div className="categorias-burbujas-container">
        <div className="categorias-burbujas-wrapper">
          <button className="categoria-burbuja">
            No sé a dónde ir, ¡sorpréndeme! 🌍
          </button>
          <button className="categoria-burbuja">
            Quiero comer rico, ¿dónde voy? 🍽️ 
          </button>
          <button className="categoria-burbuja">
            Quiero un mirador con la mejor vista 🌄
          </button>
        </div>
      </div>
    );
};

const formatMarkdownText = (text) => {
    if (!text) return '';
    
    // Paso 1: Escapar caracteres HTML para evitar inyección
    let formattedText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Paso 2: Formatear enlaces markdown [texto](url)
    formattedText = formattedText.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g, 
      (match, text, url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${text}</a>`;
      }
    );
    
    // Paso 3: Formatear texto en negrita con **
    formattedText = formattedText.replace(
      /\*\*([^*]+)\*\*/g, 
      (match, text) => {
        return `<strong>${text}</strong>`;
      }
    );
    
    // Paso 4: Formatear texto en cursiva con *
    formattedText = formattedText.replace(
      /(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g, 
      (match, text) => {
        return `<em>${text}</em>`;
      }
    );
    
    // Paso 5: Preservar saltos de línea
    formattedText = formattedText.replace(/\n/g, '<br>');
    
    return formattedText;
};
  
  // Versión actualizada del componente ChatAI usando la función de formateo completa
  const ChatAI = ({ messages, isLoading, onClose }) => {
    return (
        <div className="chat-ai-container">
            <div className="chat-ai-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        {msg.sender === 'ai' ? (
                            <div 
                                className="message-content"
                                dangerouslySetInnerHTML={{ 
                                    __html: formatMarkdownText(msg.text)
                                }}
                            />
                        ) : (
                            <div className="message-content">{msg.text}</div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="chat-message ai">
                        <div className="message-content typing-indicator">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Home = () => {
    const navigate = useNavigate();
    const [destinos, setDestinos] = useState([]);
    const [datosCompletos, setDatosCompletos] = useState(null);
    const [filtros, setFiltros] = useState({});
    const [rutasFiltradas, setRutasFiltradas] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);
    const [filtroAbierto, setFiltroAbierto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);

    const handleCloseWelcomeModal = () => {
        console.log("Modal cerrado"); // Para depuración
        setShowWelcomeModal(false);
        // Opcionalmente, guardar en localStorage para no mostrar el modal en futuras visitas
        localStorage.setItem('destiplus_welcome_shown', 'true');
    };

    useEffect(() => {
        // Verificar si el usuario ya ha visto el modal anteriormente
        const hasSeenWelcome = localStorage.getItem('destiplus_welcome_shown');
        
        if (hasSeenWelcome === 'true') {
          setShowWelcomeModal(false);
        }
    }, []);

    // Estados para la integración de IA
    const [aiResponse, setAiResponse] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [showAiResponse, setShowAiResponse] = useState(false);

    // Nuevos estados para el chat
    const [chatMessages, setChatMessages] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [titleVisible, setTitleVisible] = useState(true);

    useEffect(() => {
        const fetchDestinos = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                setDestinos(response.data);
                setRutasFiltradas(response.data);
                initializeFiltros(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinos();
    }, []);

    useEffect(() => {
        // Script para el auto-crecimiento del textarea
        const handleInput = function(e) {
            if (e.target && e.target.className.includes('search-input')) {
            // Resetear altura
            e.target.style.height = 'auto';
            
            // Establecer nueva altura basada en el contenido
            const newHeight = Math.min(e.target.scrollHeight, 150);
            e.target.style.height = newHeight + 'px';
            }
        };

        // Añadir listener
        document.addEventListener('input', handleInput);

        // Limpiar listener al desmontar
        return () => {
            document.removeEventListener('input', handleInput);
        };
    }, []);

    const initializeFiltros = (data) => {
        const nuevosFiltros = {};
        data.forEach((destino) => {
            Object.entries(destino.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                    nuevosFiltros[key] = new Set();
                }
                if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                    nuevosFiltros[key].add({value});
                }
            });
        });
        setFiltros(nuevosFiltros);
    };


    // Función separada para manejar la búsqueda normal
    const handleSearch = (value) => {
        // setSearchTerm(value);
        
        // if (!value.trim()) {
        //     setSearchResults(destinos);
        //     // Si hay filtros activos, mostrar solo los resultados filtrados
        //     if (Object.keys(activeFilters).length > 0) {
        //         setRutasFiltradas(filteredResults);
        //     } else {
        //         setRutasFiltradas(destinos);
        //     }
        //     return;
        // }

        // const searchLower = value.toLowerCase();
        // const results = destinos.filter(destino => 
        //     destino.municipio.toLowerCase().includes(searchLower) ||
        //     destino.departamento.toLowerCase().includes(searchLower) ||
        //     destino.frase.toLowerCase().includes(searchLower)
        // );
        
        // setSearchResults(results);
        
        // // Si hay filtros activos, aplicar la búsqueda sobre los resultados filtrados
        // if (Object.keys(activeFilters).length > 0) {
        //     const combinedResults = results.filter(destino => 
        //         filteredResults.some(filtered => filtered.id === destino.id)
        //     );
        //     setRutasFiltradas(combinedResults);
        // } else {
        //     setRutasFiltradas(results);
        // }
    };

    // Función para manejar la búsqueda con IA
    const handleAISearch = async (query) => {
        // Mostrar el chat y comenzar la animación para ocultar el título
        setShowChat(true);

        // Animación suave para el título
        const titleElement = document.querySelector('.titulo-landing');
        if (titleElement) {
            titleElement.classList.add('title-fade-out');
            setTimeout(() => {
                setTitleVisible(false);
            }, 600); // Tiempo de animación
        } else {
            setTitleVisible(false);
        }

        setAiLoading(true);
                

        // Agregar el mensaje del usuario al chat
        setChatMessages(prev => [...prev, { text: query, sender: 'user' }]);

        // Limpiar el input después de enviar el mensaje
        // Buscar el input y limpiarlo sin tocar el componente SearchBox
        setTimeout(() => {
            const searchInput = document.querySelector('.container-box-filter input');
            if (searchInput) {
                // Crear un evento para limpiar el input
                const event = new Event('input', { bubbles: true });
                searchInput.value = '';
                searchInput.dispatchEvent(event);
            }
        }, 100);

        
        try {
            // Utilizamos directamente la función consultarOpenAI que ya tiene acceso a los datos
            const response = await consultarOpenAI(query);
            setChatMessages(prev => [...prev, { text: response, sender: 'ai' }]);
            setAiResponse(response);
        } catch (err) {
            console.error('Error al consultar la IA:', err);
            const errorMsg = 'Lo siento, tuve un problema al procesar tu consulta. Por favor, intenta de nuevo más tarde.';
            setChatMessages(prev => [...prev, { text: errorMsg, sender: 'ai' }]);
            setAiResponse(errorMsg);
        } finally {
            setAiLoading(false);
        }
    };

    // Función para cerrar el chat y restaurar el título
    const handleCloseChat = () => {
        // Animación para cerrar el chat y mostrar el título nuevamente
        setShowChat(false);
        setTimeout(() => {
            setTitleVisible(true);
            setChatMessages([]);
        }, 300); // Tiempo para la animación de desaparición
    };
   
    const handle = (destino_id, municipio) => {
        if (window && window.gtag) {
            window.gtag('event', 'destination_click', {
                event_category: 'Navigation',
                event_label: municipio,
                value: destino_id,
                app_name: 'Home busqueda',
                screen_name: municipio,
                // Añadir más contexto útil
                timestamp: new Date().toISOString(),
                interaction_type: 'click'
            });
        } else {
            console.warn('Google Analytics no está disponible');
        }

        navigate(`/home/destino/${destino_id}`, {
            state: { destino_id }
        });
    };

    // Función para determinar el tipo de badge basado en la calificación
    const getBadgeType = (calificacion) => {
        if (calificacion === 0) return 'new';
        if (calificacion >= 4.6) return 'popular';
        return null;
    };

    // Función para determinar el tipo de destino (simulado por ahora)
    const getDestinationType = (municipio) => {
        // Esto sería reemplazado por datos reales de la API
        return municipio === "Suesca" ? "Aventura" : "Trekking";
    };

    // Función para cerrar la respuesta de la IA
    const handleCloseAIResponse = () => {
        setShowAiResponse(false);
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-spinner"></div>
                <h5 className="loading-text">Cargando destinos...</h5>
            </div>
        </div>
    );

    if (error) return (
        <div className="error-container">
            <div className="error-content">
                <MdError className="error-icon" />
                <h5 className="error-text">¡Ups! Algo salió mal</h5>
                <p className="error-message">
                    {error}. Por favor, intenta de nuevo más tarde.
                </p>
            </div>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>Destiplus | Descubre experiencias únicas</title>
                <meta name="description" content="Descubre las mejores destinos y experiencias"/>
            </Helmet>
            <div className="header">
                <div className="title-header">
                    <h5>Desti <span className="mas-home"><strong>plus</strong></span></h5>
                </div>
                <div className="back-home">   
                    <img src="https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png" alt="destiplus home" />
                </div>
            </div>

            {/* Sección que cambia entre título y chat */}
            <div className='container-landing-2'>
                {titleVisible ? (
                    <div className={`titulo-landing ${showChat ? 'fade-out' : ''}`}>
                        <h2>Descubre tu próximo destino sin perder tiempo. Explora más, planea menos.</h2>
                    </div>
                ) : (
                    <div className={`chat-container ${showChat ? 'fade-in' : ''}`}>
                        <ChatAI 
                            messages={chatMessages}
                            isLoading={aiLoading} 
                        />
                        {chatMessages.length > 0 && (
                            <div className="close-chat-btn" onClick={handleCloseChat}>
                                Cerrar conversación
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="container-box-filter">
                <SearchBox 
                    placeholder="" 
                    onSearch={handleSearch}
                    onAISearch={handleAISearch}
                />
            </div>

            <CategoriasBurbujas/>

            {/* Encabezado atractivo con llamado a la acción */}
            <div className="destinations-header">
                <div className="destinations-title-container">
                    <h2 className="destinations-title">Destinos recomendados para ti</h2>
                    <p className="destinations-subtitle">
                        <ChevronDown size={18} className="arrow-down" />
                        Da click en alguno y empieza a explorar
                        <ChevronDown size={18} className="arrow-down" />
                    </p>    
                </div>
            </div>
            
            <div className="container-seccion-lista-home">
                {rutasFiltradas.map((item) => (
                    <div 
                        key={item.id} 
                        className="destination-card"
                        onClick={() => handle(item.id, item.municipio)}
                    >
                        <div className="image-section">
                            <OptimizedImage
                                imageUrl={item.img}
                                alt={item.municipio}
                                className={'destination-image'}
                            />
                            <div className="destination-badges">
                                {getBadgeType(item.calificacion) && (
                                    <span className={`badge ${getBadgeType(item.calificacion)}`}>
                                        {getBadgeType(item.calificacion) === 'new' ? 'Nuevo' : 'Popular'}
                                    </span>
                                )}
                            </div>
                            <div className="destination-rating">
                                {item.calificacion > 0 ? (
                                    <>
                                        <span>{item.calificacion}</span>
                                        <img src="/utils/icons8-estrella-48.png" alt="estrella" />
                                    </>
                                ) :
                                    <>
                                        <img src="/utils/icons8-estrella-48.png" alt="estrella" />
                                    </>
                                }
                            </div>
                        </div>

                        <div className="destination-info">
                            <div className="destination-header">
                                <h3>{item.municipio}, {item.departamento}</h3>
                                <span className="destination-type">
                                    {getDestinationType(item.municipio)}
                                </span>
                            </div>
                            <div className="destination-description">
                                <MdExplore className="explore-icon" />
                                <p>{item.frase}</p>
                            </div>
                            <div className="explorar-boton">
                                <div className="destination-stats">
                                    <FaUserGroup className="visitors-icon" />
                                    <span>¡Sé de los primeros en explorar!</span>
                                </div>
                                <button className="book-btn" onClick={() => handle(item.id, item.municipio)}>Explorar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <FeedbackSection/>
            {showWelcomeModal && (
            <WelcomeModal 
                onClose={handleCloseWelcomeModal} 
            />
            )}
        </>
    );
};

export default Home;
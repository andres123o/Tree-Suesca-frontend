import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import OptimizedImage from '../common/optimzarImg'
import { Star, Clock, Award } from 'lucide-react';
import AuthButtons from '../common/logUser'; 
import { MdError } from "react-icons/md";
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';

// Obtener datos
const useDestinoContent = (destinoId = 1) => {
    const { description } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [content, setContent] = useState(null);
  
    useEffect(() => {
      const fetchDestinoContent = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://tree-suesca-backend-production.up.railway.app/api/v1/evento/${description}/content`
          );
          setContent(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDestinoContent();
    }, [destinoId]);
  
    return { content, loading, error };
};

const MainComponentEvent = () => {
    const { content, loading, error } = useDestinoContent();
    
    if (loading) return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-spinner"></div>
                <h5 className="loading-text">Cargando Evento...</h5>
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

    if (!content) return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-spinner"></div>
                <h5 className="loading-text">Estamos trabajando en este evento</h5>
            </div>
        </div>
    );
    

    return <DescripcionEventos evento={content.evento[0]} oferente={content} />;
}


const DescripcionEventos = ( {evento, oferente} ) => {
    const [expandedSection, setExpandedSection] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const isNewListing = !evento.calificacion || evento.calificacion === 0;
    const [maxTextLength, setMaxTextLength] = useState(100); // Estado dinámico

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
    
    // 1. Tracking tiempo en página
    useEffect(() => {
        const startTime = Date.now();
        
        return () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            ReactGA.event({
                category: 'Event_Engagement',
                action: 'Time_On_Activity',
                label: evento.name,
                value: timeSpent
            });
        };
    }, [evento.name]);

    const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
    };

    const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    };

    // Calcular texto visible
    const needsTruncation = evento.itinerario.length > maxTextLength;
    const truncatedText = evento.itinerario.slice(0, maxTextLength);
    const visibleText = isExpanded 
        ? evento.itinerario 
        : `${truncatedText}${needsTruncation ? "..." : ""}`;

    return (
        <>
            <Helmet>
                <title>{evento.name}</title>
                <meta name="description" content={evento.name} />
            </Helmet>
            <div className='container-actividades-div'>
                <div className='carousel-main-container'>
                    {/* Ver las imagenes del carrusel */}
                    <OptimizedImage className='container-img-principal'
                        imageUrl={evento.img}
                        alt={evento.img}
                    />
                </div>
                    
                {/* Container principal de la informacion */}
                <div className="container-info">

                    {/* Sección de título actualizada */}
                    <div className='container-logo-nombre-calificacion-alojamiento'>
                        <div className='container-info-titulo-calificacion-logo'>
                            <div className='logo-establecimiento'>
                                <img src={oferente.logo} alt={oferente.oferente} />
                            </div>
                            <div className='nombre-establecimiento-alojamiento'>
                                <h5>{evento.name}</h5>
                                <div className='container-horario-modal-nuevo'>
                                    <div className="check-times">
                                        <Clock size={14} className="check-icon" />
                                        <p>{`${evento.fecha} - ${evento.hora}`}</p>
                                    </div>
                                    {isNewListing && (
                                        <div className="new-listing-badge">
                                            <Award size={14} className="award-icon" />
                                            <span>¡Nuevo Evento!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Caracteriticas  */}
                    <div className='container-caracteristicas'>
                        <div className='sub-container'>
                            <div className='container-individual'>
                                <div>
                                    <h5>Oferente</h5>
                                    <FaGripfire className='fa-grip-fire'/>
                                </div>
                                <h5>
                                    {oferente.oferente}
                                </h5>
                            </div>
                            <div className='container-individual'>
                                <div>
                                    <h5>Duración</h5>
                                    <FaRegClock className='fa-clock'/>
                                </div>
                                <h5>{evento.duracion} Hrs</h5>
                            </div>
                            <div className='container-individual'>
                                <div>
                                    <h5>Capacidad</h5>
                                    <FaPerson className='fa-person'/>
                                </div>
                                <h5>{evento.cupos}</h5>
                            </div>
                        </div>
                    </div>

                    <div className='separador'></div>
                    
                    {/* Descripcion */}
                    <div className='container-descripcion'>
                        <p className='descripcion' id="descripcion-texto">
                            {visibleText}
                            {/* Mostrar botón solo si es necesario */}
                            {needsTruncation && (
                                <button onClick={toggleExpand} className='show-more-btn'>
                                {isExpanded ? 'less' : 'more'}
                                </button>
                            )}
                        </p>
                    </div>

                    <div className='separador'></div>
                    
                    {!isNewListing && (
                        <div className="social-proof-container">
                            <div className="rating-overview">
                                <div className="rating-number">{evento.calificacion}</div>
                                <div className="rating-stats">
                                    <div className="rating-stars">
                                        {[...Array(5)].map((_, index) => (
                                            <Star
                                                key={index}
                                                size={20}
                                                fill={index < Math.floor(evento.calificacion) ? "#FFB800" : "none"}
                                                color={index < Math.floor(evento.calificacion) ? "#FFB800" : "#e0e0e0"}
                                            />
                                        ))}
                                    </div>
                                    <p className="rating-text">Calificación de Usuaior</p>
                                </div>
                            </div>
                            <div className="testimonial-preview">
                                "Una experiencia única en Suesca. El evento superó nuestras expectativas..."
                            </div>
                        </div>
                    )}

                    {/* Seccion metodos de pago */}
                    <div className='container-principal-precio-metodo'>
                        <div className='container-precio-metodo-pago'>
                            <div className='container-precio'>
                                <h5>
                                    $ {evento.precio.toLocaleString('es-CO', {
                                        style: 'currency',
                                        currency: 'COP',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    })}
                                </h5>
                                <p>Por persona</p>
                                {isNewListing && <span className="promo-tag">¡Precio de lanzamiento!</span>}
                            </div>
                            <div className='container-metodo'>
                                <h4>Métodos de pago</h4>
                                <p>{oferente.metodosdepago}</p>
                            </div>
                        </div>
                    </div>

                    {/* Reemplazar el div container-contacto-aloja por AuthButtons */}
                    <AuthButtons 
                        isNewListing={isNewListing}
                        contactInfo={oferente.contacto}
                        location={oferente.coordenadas}
                        name={oferente.name}
                        tipo={evento.name}
                        onLocationClick={() => {
                            ReactGA.event({
                                category: 'Event_Location',
                                action: 'Map_View',
                                label: evento.name
                            });
                        }}
                        onContactClick={() => {
                            ReactGA.event({
                                category: 'Event_Contact',
                                action: 'WhatsApp_Click',
                                label: evento.name
                            });
                        }}
                    />
                    

                    {/* seccion de accordean, recomendaciones y mas */}
                    <div className='accordion-aloja'>
                        {Object.entries(evento.requisitos).map(([key, value], index) => (
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
                                {typeof value === 'string' ? (
                                <p>{value}</p>
                                ) : typeof value === 'object' ? (
                                Object.entries(value).map(([subKey, subValue]) => (
                                    <div className='emergencia-item' key={subKey}>
                                    <p>{subKey}: </p>
                                    <a href={subValue}>{subValue}</a>
                                    </div>
                                ))
                                ) : null}
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default MainComponentEvent;
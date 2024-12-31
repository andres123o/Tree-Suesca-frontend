import React, { useEffect, useState } from 'react'
import Footer  from '../common/footer'
import { FaPerson } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import OptimizedImage from '../common/optimzarImg'
import OptimizedImageLarge from '../common/optimizarImagenesVersion'
import { MapPin, Star, Clock, Award, MessageCircle } from 'lucide-react';
import AuthButtons from '../common/logUser';
import { MdError } from "react-icons/md";

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
            `https://tree-suesca-backend-production.up.railway.app/api/v1/actividad/${description}/content`
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

const MainComponentActivity = () => {
    const { content, loading, error } = useDestinoContent();
    
    if (loading) return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-spinner"></div>
                <h5 className="loading-text">Cargando Actividad...</h5>
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
                <h5 className="loading-text">Estamos trabajando en esta actividad</h5>
            </div>
        </div>
    );

    return <DescripcionActividades actividad={content.actividad[0]} oferente={content} />;
}

const DescripcionActividades = ( {actividad, oferente} ) => {
    const [backgroundImage, setBackgroundImg] = useState(actividad.img);
    const [selectedImgIndex, setSelectedImgIndex] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const isNewListing = !actividad.calificacion || actividad.calificacion === 0;    

    const maxTextLength = 100;

    useEffect(() => {
      setBackgroundImg(actividad.img)
    }, [actividad.img])
  
    const handleImageClick = (imgSrc, index) => {
        setSelectedImgIndex(index);
        setBackgroundImg(imgSrc);
      };

    const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
    };

    const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    };

    const visibleText = isExpanded ? actividad.itinerario : `${actividad.itinerario.slice(0, maxTextLength)}...`;


    return (
        <>
            {/* Ver las imagenes del carrusel */}
            <OptimizedImage className='container-img-principal'
                imageUrl={backgroundImage}
                alt={backgroundImage}
            />
                
            {/* Container principal de la informacion */}
            <div className="container-info">

                {/* Container de carrusel */}
                <div className='container-carrusel-imgs'>
                    <div className='carrusel-imgs'>
                        {actividad.imgs.Imagenes.map((imgSrc, index) => (
                        <OptimizedImageLarge
                            key={index}
                            imageUrl={imgSrc}
                            alt={`Imagen ${index + 1} del establecimiento`}
                            onClick={() => handleImageClick(imgSrc, index)}
                            className={index === selectedImgIndex ? 'selected' : ''}
                        />
                        ))}
                    </div>
                </div>

                {/* Sección de título actualizada */}
                <div className='container-logo-nombre-calificacion-alojamiento'>
                    <div className='container-info-titulo-calificacion-logo'>
                        <div className='logo-establecimiento'>
                            <img src={oferente.logo} alt={oferente.oferente} />
                        </div>
                        <div className='nombre-establecimiento-alojamiento'>
                            <h5>{actividad.name}</h5>
                            <div className="check-times">
                                <Clock size={14} className="check-icon" />
                                <p>{`Horario: ${oferente.horario.abren} - ${oferente.horario.cierran}`}</p>
                            </div>
                            {isNewListing && (
                                <div className="new-listing-badge">
                                    <Award size={14} className="award-icon" />
                                    <span>¡Nueva Actividad!</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Caracteriticas  */}
                <div className='container-caracteristicas'>
                    <div className='sub-container'>
                        <div className='container-individual'>
                            <div>
                                <h5>Dificultad</h5>
                                <FaGripfire className='fa-grip-fire'/>
                            </div>
                            <h5>
                                {actividad.dificultad}
                            </h5>
                        </div>
                        <div className='container-individual'>
                            <div>
                                <h5>Duración</h5>
                                <FaRegClock className='fa-clock'/>
                            </div>
                            <h5>{actividad.duracion} Min</h5>
                        </div>
                        <div className='container-individual'>
                            <div>
                                <h5>Capacidad</h5>
                                <FaPerson className='fa-person'/>
                            </div>
                            <h5>{actividad.capacidad}</h5>
                        </div>
                    </div>
                </div>

                <div className='separador'></div>
                
                {/* Descripcion */}
                <div className='container-descripcion'>
                    <p className='descripcion' id="descripcion-texto">
                        {visibleText}
                        <button onClick={toggleExpand} className='show-more-btn'>
                        {isExpanded ? 'less' : 'more'}
                        </button>
                    </p>
                </div>

                <div className='separador'></div>

                {!isNewListing && (
                    <div className="social-proof-container">
                        <div className="rating-overview">
                            <div className="rating-number">{actividad.calificacion}</div>
                            <div className="rating-stats">
                                <div className="rating-stars">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            size={20}
                                            fill={index < Math.floor(actividad.calificacion) ? "#FFB800" : "none"}
                                            color={index < Math.floor(actividad.calificacion) ? "#FFB800" : "#e0e0e0"}
                                        />
                                    ))}
                                </div>
                                <p className="rating-text">Calificación de Usuaior</p>
                            </div>
                        </div>
                        <div className="testimonial-preview">
                            "Una experiencia única en Suesca. La actividad superó nuestras expectativas..."
                        </div>
                    </div>
                )}

                {/* Seccion metodos de pago */}
                <div className='container-principal-precio-metodo'>
                    <div className='container-precio-metodo-pago'>
                        <div className='container-precio'>
                            <h5>
                                {actividad.precio.toLocaleString('es-CO', {
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
                            <p>{oferente.metodosDePago}</p>
                        </div>
                    </div>
                </div>

                {/* Reemplazar el div container-contacto-aloja por AuthButtons */}
                <AuthButtons 
                    isNewListing={isNewListing}
                    contactInfo={oferente.contacto}
                    location={oferente.coordenadas}
                    name={oferente.oferente}
                    tipo={actividad.name}
                    onLocationClick={() => {
                        window.gtag('event', 'ver_como_llegar', {
                            tipo_negocio: 'actividad',
                            nombre_actividad: actividad.name
                        });
                    }}
                    onContactClick={() => {
                        window.gtag('event', 'contacto_whatsapp', {
                            tipo_negocio: 'actividad',
                            nombre_actividad: actividad.name
                        });
                    }}
                />

                {/* seccion de accordean, recomendaciones y mas */}
                <div className='accordion-aloja'>
                    {Object.entries(actividad.requisitosRecomendaciones).map(([key, value], index) => (
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
        </>
    )
}

export default MainComponentActivity;
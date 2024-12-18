import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import OptimizedImage from '../common/optimzarImg'
import { MapPin, Star, Clock, Award, MessageCircle } from 'lucide-react';
import OptimizedImageLarge from '../common/optimizarImagenesVersion'

const getIconComponent = (serviceName) => {
    // Mapeo directo de servicios a iconos de Lucide
    const iconMapping = {
        'Wi-Fi': 'Wifi',
        'Baño privado': 'ShowerHead',
        'TV': 'Tv',
        'Desayuno incluido': 'Coffee',
        'Petfriendly': 'PawPrint',
        'Estacionamiento': 'SquareParking',
        'Balcón privado': 'MountainSnow',
        'Jacuzzi': 'Bath'
    };

    // Obtiene el nombre del icono directamente del mapping o usa un fallback
    const iconName = iconMapping[serviceName] || 'CircleDot';
    
    // Obtiene el componente del ícono de Lucide
    return LucideIcons[iconName];
};


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
            `https://tree-suesca-backend-production.up.railway.app/api/v1/alojamiento/${description}/content`
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

const MainComponentAlojamiento = () => {
    const { content, loading, error } = useDestinoContent();
    
    if (loading) return <><div>Cargando...</div></>;
    if (error) return <><div>Error: {error}</div></>;
    if (!content) return <><div>No hay contenido disponible</div></>;

    return <AlojamientoDescripcion alojamiento={content.alojamiento[0]} oferente={content} />;
}



const AlojamientoDescripcion = ( {alojamiento, oferente} ) => {
    const [backgroundImage, setBackgroundImg] = useState(alojamiento.img);
    const [selectedImgIndex, setSelectedImgIndex] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const isNewListing = !alojamiento.calificacion || alojamiento.calificacion === 0;

    const maxTextLength = 150;

    useEffect(() => {
      setBackgroundImg(alojamiento.img)
    }, [alojamiento.img])
  
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

    const visibleText = isExpanded ? alojamiento.detalle : `${alojamiento.detalle.slice(0, maxTextLength)}...`;

    const handleWhatsAppClick = () => {
        const message = `¡Hola! Me interesa reservar ${alojamiento.name} para mi estadía en Suesca`;
        const whatsappUrl = `https://wa.me/${oferente.contacto}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
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
                        {alojamiento.imgs.map((imgSrc, index) => (
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
                            <img src={oferente.logo} alt={alojamiento.name} />
                        </div>
                        <div className='nombre-establecimiento-alojamiento'>
                            <h5>{alojamiento.name}</h5>
                            <div className="check-times">
                                <Clock size={14} className="check-icon" />
                                <p>Check In: {oferente.checkIn} - Check Out: {oferente.checkOut}</p>
                            </div>
                            {isNewListing && (
                                <div className="new-listing-badge">
                                    <Award size={14} className="award-icon" />
                                    <span>¡Nuevo Alojamiento!</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                                
                {/* Carrusel servicios mejorado */}
                <div className='container-carrusel-servicios'>
                    <div className='sub-container-carrusel-servicios'>
                        {alojamiento.servicios.servicios.map((servicio, index) => {
                            const IconComponent = getIconComponent(servicio);
                            return (
                                <p key={index} className="servicio-item">
                                    <IconComponent size={18} />
                                    {servicio}
                                </p>
                            );
                        })}
                    </div>
                </div>

                {/* Seccion numero de habitacioens, camas, baños */}
                <div className='container-hab-camas-baños'>
                    <div>
                        <p>
                            Habitaciones: <strong>{alojamiento.equipamento.habitaciones}</strong>
                        </p>
                        <p>
                            Camas: <strong>{alojamiento.equipamento.camas}</strong>
                        </p>
                        <p>
                            Baños: <strong>{alojamiento.equipamento.baños}</strong>
                        </p>
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
                            <div className="rating-number">{alojamiento.calificacion}</div>
                            <div className="rating-stats">
                                <div className="rating-stars">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            size={20}
                                            fill={index < Math.floor(alojamiento.calificacion) ? "#FFB800" : "none"}
                                            color={index < Math.floor(alojamiento.calificacion) ? "#FFB800" : "#e0e0e0"}
                                        />
                                    ))}
                                </div>
                                <p className="rating-text">Calificación de huéspedes</p>
                            </div>
                        </div>
                        <div className="testimonial-preview">
                            "Una experiencia única en Suesca. El alojamiento superó nuestras expectativas..."
                        </div>
                    </div>
                )}

                {/* Seccion metodos de pago */}
                <div className='container-principal-precio-metodo'>
                    <div className='container-precio-metodo-pago'>
                        <div className='container-precio'>
                            <h5>
                                {alojamiento.precio.toLocaleString('es-CO', {
                                    style: 'currency',
                                    currency: 'COP',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                })}
                            </h5>
                            <p>Por noche</p>
                            {isNewListing && <span className="promo-tag">¡Precio de lanzamiento!</span>}
                        </div>
                        <div className='container-metodo'>
                            <h4>Métodos de pago</h4>
                            <p>{oferente.metodosDePago}</p>
                        </div>
                    </div>
                </div>

                <div className='container-contacto-aloja'>
                    <button 
                        className='como-llegar-aloja'
                        onClick={() => window.open(oferente.address, '_blank')}
                    >
                        <img src="/utils/icons8-gps-50.png" alt="GPS icon" />
                        Ver ubicación
                    </button>
                    <button 
                        className='contacto-aloja'
                        onClick={handleWhatsAppClick}
                    >
                        <span>{isNewListing ? '¡Sé el primero en reservar!' : 'Reservar ahora'}</span>
                        <img src="/utils/icons8-whatsapp-48.png" alt="WhatsApp icon" />
                    </button>
                </div>

                 {/* seccion de accordean, recomendaciones y mas */}
                 <div className='accordion-aloja'>
                    {Object.entries(oferente.politicas).map(([key, value], index) => (
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

export default MainComponentAlojamiento
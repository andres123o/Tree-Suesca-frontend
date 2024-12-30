import Footer from './footer';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPerson } from "react-icons/fa6";
import axios from 'axios'
import { FaRegClock } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";
import OptimizedImageLarge from '../common/optimizarImagenesVersion'
import OptimizedImage from '../common/optimzarImg'
import { MapPin, Star, Clock, Award, MessageCircle } from 'lucide-react';
import AuthButtons from '../common/logUser'; 
import { MdError } from "react-icons/md";
import ReactGA from 'react-ga4';

// Componentes reutilizables que mantienen la estructura exacta del JSX
const ImageCarousel = ({ images, selectedIndex, onImageClick }) => (
    <div className='container-carrusel-imgs'>
        <div className='carrusel-imgs'>
            {images.map((imgSrc, index) => (
                <OptimizedImageLarge
                    key={index}
                    imageUrl={imgSrc}
                    alt={`Imagen ${index + 1} del establecimiento`}
                    onClick={() => onImageClick(imgSrc, index)}
                    className={`carrusel-img ${index === selectedIndex ? 'selected' : ''}`}
                />
            ))}
        </div>
    </div>
);

const HeaderInfo = ({ establecimiento, nombre }) => {
    const isNewListing = !establecimiento.calificacion || establecimiento.calificacion === 0;

    return (
        <>
            <div className='container-logo-nombre-calificacion-alojamiento'>
                <div className='container-info-titulo-calificacion-logo'>
                    <div className='logo-establecimiento'>
                        <img src={establecimiento.logo} alt={establecimiento.logo} />
                    </div>
                    <div className='nombre-establecimiento-alojamiento'>
                        <h5>{establecimiento.name}</h5>
                        <div className="check-times">
                            <Clock size={14} className="check-icon" />
                            <p>{`Horario: ${establecimiento.horario.abren} - ${establecimiento.horario.cierran}`}</p>
                        </div>
                        {isNewListing && (
                            <div className="new-listing-badge">
                                <Award size={14} className="award-icon" />
                                <span>¡Nuevo lugar!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

const Description = ({ texto, isExpanded, toggleExpand, maxLength = 100 }) => {
    const visibleText = isExpanded ? texto : `${texto.slice(0, maxLength)}...`;
    return (
        <div className='container-descripcion'>
            <p className='descripcion' id="descripcion-texto">
                {visibleText}
                <button onClick={toggleExpand} className='show-more-btn'>
                {isExpanded ? 'less' : 'more'}
                </button>
            </p>
        </div>
    );
};

const BebidaSection = ({ title, items }) => (
    <div className='container-top-5'>
        <div className='container-title'>
            <h4>{title}</h4>
        </div>
        <div className='container-carrusel-bebidas'> 
            {items.map((item, index) => (
                <div className='bebida' key={index}>
                    <div className='ofertaBebida'>
                        <img src={item.img} alt={item.nombre} />
                        <div className='container-info-bebidas'>
                            <h5>{item.nombre}</h5>
                            <p>${item.costo.toLocaleString()}</p>
                        </div>
                        <p className='descripcion-bebidas-antojos'>
                            {item.descripcion}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const PopularSection = ({ title, items }) => (
    <div className='container-top-5'>
        <div className='container-title'>
            <h4>{title}</h4>
        </div>
        {items.map((item, index) => (
            <div className='popular' key={index}>
                <div className='oferta'>
                    <img src={item.img} alt={item.nombre} />
                </div>
                <div className='descripcion-oferta'>
                    <h5>{item.nombre}</h5>
                    <p>{item.descripcion}</p>
                    <h5 className='precio-top'>${item.costo.toLocaleString()}</h5>
                </div>
            </div>
        ))}
    </div>
);

const ContactButtons = ({ establecimiento }) => (
    <div className='container-contacto'>
        <button 
            className='como-llegar'
            onClick={() => window.open(establecimiento.address, '_blank')}  
        >
            ¿Como llegar?
            <img src="/utils/icons8-gps-50.png" />
        </button>
        <button 
            className='contacto'
            onClick={() => window.open(`https://wa.me/${establecimiento.contacto}`, '_blank')}    
        >
            Escribe por Whats
            <img src="/utils/icons8-whatsapp-48.png" />
        </button>
    </div>
);

// Obtener datos
const useDestinoContent = (destinoId = 1) => {
    const { tipo, nombre } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [content, setContent] = useState(null);
  
    useEffect(() => {
      const fetchDestinoContent = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://tree-suesca-backend-production.up.railway.app/api/v1/${tipo}/${nombre}/content`
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

const MainComponent = () => {
    const { content, loading, error } = useDestinoContent();
    
    if (loading) return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-spinner"></div>
                <h5 className="loading-text">Cargando Establecimiento...</h5>
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
                <h5 className="loading-text">Estamos trabajando en este establecimiento</h5>
            </div>
        </div>
    );

    return <DescripcionEstablecimientos establecimiento={content} />;
}

const DescripcionEstablecimientos = ({establecimiento}) => {
    const [selectedImgIndex, setSelectedImgIndex] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const isNewListing = !establecimiento.calificacion || establecimiento.calificacion === 0;

     // 1. Tracking tiempo en página
     useEffect(() => {
        const startTime = Date.now();
        
        return () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            ReactGA.event({
                category: 'Establishment_Engagement',
                action: 'Time_On_Establishment',
                label: establecimiento.name,
                value: timeSpent
            });
        };
    }, [establecimiento.name]);

    useEffect(() => {
        setBackgroundImage(establecimiento.img);
    }, [establecimiento.img]);
    
    const handleImageClick = (imgSrc, index) => {
        setSelectedImgIndex(index);
        setBackgroundImage(imgSrc);
    };

    return (
        <>
            {!establecimiento.servicios.delivery ? (
                <>
                    <OptimizedImage className='container-img-principal'
                            imageUrl={backgroundImage}
                    />
                    <div className="container-info">
                        <ImageCarousel 
                            images={establecimiento.imgs.imagenes}
                            selectedIndex={selectedImgIndex}
                            onImageClick={handleImageClick}
                        />

                        <HeaderInfo establecimiento={establecimiento} />

                        <div className='container-caracteristicas'>
                            <div className='sub-container'>
                                <div className='container-individual'>
                                    <div>
                                        <h5>Cover</h5>
                                        <FaPerson className="fa-grip-fire"/>
                                    </div>
                                    <h5>
                                        {establecimiento.servicios.cover.toLocaleString('es-CO', {
                                            style: 'currency',
                                            currency: 'COP',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                        })}
                                    </h5>
                                </div>
                                <div className='container-individual'>
                                    <div>
                                        <h5>Reservas</h5>
                                        <FaRegClock className='fa-clock'/>
                                    </div>
                                    <h5 className='disponibilidad'>{establecimiento.servicios.reservas}</h5>
                                </div>
                                <div className='container-individual'>
                                    <div>
                                        <h5>Parking</h5>
                                        <FaPerson className='fa-person'/>
                                    </div>
                                    <h5 className='disponibilidad'>{establecimiento.servicios.parking}</h5>
                                </div>
                            </div>
                        </div>

                        <div className='separador'></div>


                        <Description 
                            texto={establecimiento.concepto}
                            isExpanded={isExpanded}
                            toggleExpand={() => setIsExpanded(!isExpanded)}
                        />

                        <div className='separador'></div>

                        {!isNewListing && (
                            <div className="social-proof-container">
                                <div className="rating-overview">
                                    <div className="rating-number">{establecimiento.calificacion}</div>
                                    <div className="rating-stats">
                                        <div className="rating-stars">
                                            {[...Array(5)].map((_, index) => (
                                                <Star
                                                    key={index}
                                                    size={20}
                                                    fill={index < Math.floor(establecimiento.calificacion) ? "#FFB800" : "none"}
                                                    color={index < Math.floor(establecimiento.calificacion) ? "#FFB800" : "#e0e0e0"}
                                                />
                                            ))}
                                        </div>
                                        <p className="rating-text">Calificación de Usuaior</p>
                                    </div>
                                </div>
                                <div className="testimonial-preview">
                                    "Una experiencia única en Suesca. El restaurante superó nuestras expectativas..."
                                </div>
                            </div>
                        )}
                        
                        
                        {/* Seccion metodos de pago */}
                        <div className='container-principal-precio-metodo-es'>
                            <div className='container-precio-metodo-pago'>
                                <div className='container-precio'>
                                    <h5>
                                        $ 0.0
                                    </h5>
                                    <p>Reserva</p>
                                    {isNewListing && <span className="promo-tag">¡Precio de reserva!</span>}
                                </div>
                                <div className='container-metodo'>
                                    <h4>Aquí puedes pagar con</h4>
                                    <p>{establecimiento.metodos_de_pago}</p>
                                </div>
                            </div>
                        </div>


                        <div className='separador'></div>

                        <BebidaSection title="Antojos" items={establecimiento.antojos} />
                        <PopularSection title="¡Recomendado!" items={establecimiento.destacados} />
                        <BebidaSection title="Bebidas" items={establecimiento.bebidas} />

                        <div className='separador-res'></div>

                        {/* Reemplazar el div container-contacto-aloja por AuthButtons */}
                        <AuthButtons 
                            isNewListing={isNewListing}
                            contactInfo={establecimiento.contacto}
                            location={establecimiento.coordenadas}
                            name={establecimiento.name}
                            tipo={'Una mesa'}
                            onLocationClick={() => {
                                ReactGA.event({
                                    category: 'Establishment_Location',
                                    action: 'Map_View',
                                    label: establecimiento.name
                                });
                            }}
                            onContactClick={() => {
                                ReactGA.event({
                                    category: 'Establishment_Contact',
                                    action: 'WhatsApp_Click',
                                    label: establecimiento.name
                                });
                            }}
                        />

                    </div>
                </>
            ) : (
                <>
                    <OptimizedImage className='container-img-principal'
                            imageUrl={backgroundImage}
                    />
                    <div className="container-info">
                        <ImageCarousel 
                            images={establecimiento.imgs.imagenes}
                            selectedIndex={selectedImgIndex}
                            onImageClick={handleImageClick}
                        />

                        <HeaderInfo establecimiento={establecimiento} />

                        <div className='container-caracteristicas'>
                            <div className='sub-container'>
                                <div className='container-individual'>
                                    <div>
                                        <h5>Domicilios</h5>
                                        <FaGripfire className='fa-grip-fire'/>
                                    </div>
                                    <h5 className='disponibilidad'>{establecimiento.servicios.delivery}</h5>
                                </div>
                                <div className='container-individual'>
                                    <div>
                                        <h5>Reservas</h5>
                                        <FaRegClock className='fa-clock'/>
                                    </div>
                                    <h5 className='disponibilidad'>{establecimiento.servicios.reservas}</h5>
                                </div>
                                <div className='container-individual'>
                                    <div>
                                        <h5>Parking</h5>
                                        <FaPerson className='fa-person'/>
                                    </div>
                                    <h5 className='disponibilidad'>{establecimiento.servicios.parking}</h5>
                                </div>
                            </div>
                        </div>

                        <div className='separador'></div>


                        <Description 
                            texto={establecimiento.concepto}
                            isExpanded={isExpanded}
                            toggleExpand={() => setIsExpanded(!isExpanded)}
                        />

                        <div className='separador'></div>

                        {!isNewListing && (
                            <div className="social-proof-container">
                                <div className="rating-overview">
                                    <div className="rating-number">{establecimiento.calificacion}</div>
                                    <div className="rating-stats">
                                        <div className="rating-stars">
                                            {[...Array(5)].map((_, index) => (
                                                <Star
                                                    key={index}
                                                    size={20}
                                                    fill={index < Math.floor(establecimiento.calificacion) ? "#FFB800" : "none"}
                                                    color={index < Math.floor(establecimiento.calificacion) ? "#FFB800" : "#e0e0e0"}
                                                />
                                            ))}
                                        </div>
                                        <p className="rating-text">Calificación de Usuaior</p>
                                    </div>
                                </div>
                                <div className="testimonial-preview">
                                    "Una experiencia única en Suesca. El restaurante superó nuestras expectativas..."
                                </div>
                            </div>
                        )}
                        

                        {/* Seccion metodos de pago */}
                        <div className='container-principal-precio-metodo-es'>
                            <div className='container-precio-metodo-pago'>
                                <div className='container-precio'>
                                    <h5>
                                        $ 0.0
                                    </h5>
                                    <p>Reserva</p>
                                    {isNewListing && <span className="promo-tag">¡Precio de reserva!</span>}
                                </div>
                                <div className='container-metodo'>
                                    <h4>Aquí puedes pagar con</h4>
                                    <p>{establecimiento.metodosdepago}</p>
                                </div>
                            </div>
                        </div>

                        <div className='separador'></div>

                        <div className='container-top-5'>
                            <div className='container-title'>
                                <h4>Recurrentes</h4>
                            </div>
                            <div className='container-carrusel-recurrentes'> 
                                {establecimiento.recurrentes.map((item, index) => (
                                    <div className='recurrente' key={index}>
                                        <div className='oferta'>
                                            <img src={item.img} alt={item.nombre} />
                                        </div>
                                        <div className='descripcion-oferta'>
                                            <h5>{item.nombre}</h5>
                                            <p>{item.descripcion}</p>
                                            <h5>${item.costo.toLocaleString()}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <PopularSection title="Top 3 Platos!" items={establecimiento.destacados} />
                        <BebidaSection title="Antojos" items={establecimiento.antojos} />
                        <BebidaSection title="Bebidas" items={establecimiento.bebidas} />

                        <div className='separador-res'></div>

                        {/* Reemplazar el div container-contacto-aloja por AuthButtons */}
                        <AuthButtons 
                            isNewListing={isNewListing}
                            contactInfo={establecimiento.contacto}
                            location={establecimiento.coordenadas}
                            name={establecimiento.name}
                            tipo={'Una mesa'}
                            onLocationClick={() => {
                                ReactGA.event({
                                    category: 'Establishment_Location',
                                    action: 'Map_View',
                                    label: establecimiento.name
                                });
                            }}
                            onContactClick={() => {
                                ReactGA.event({
                                    category: 'Establishment_Contact',
                                    action: 'WhatsApp_Click',
                                    label: establecimiento.name
                                });
                            }}
                        />
                    </div>
                </>
            )}
        </>
    );
};


export default MainComponent;
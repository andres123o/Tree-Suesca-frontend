import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { IoIosArrowForward } from "react-icons/io";

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

const AlojamientoDescripcion = ( {alojamiento} ) => {
    const [backgroundImage, setBackgroundImg] = useState(alojamiento.img);
    const [selectedImgIndex, setSelectedImgIndex] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

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
    
    return (
        <>
            {/* Ver las imagenes del carrusel */}
            <div 
                className='container-img-principal' 
                style={{
                backgroundImage:`url(${backgroundImage})`
                }}
            >
            </div>
                
            {/* Container principal de la informacion */}
            <div className="container-info">

                {/* Container de carrusel */}
                <div className='container-carrusel-imgs'>
                    <div className='carrusel-imgs'>
                        {alojamiento.imgs.map((imgSrc, index) => (
                        <img 
                            key={index}
                            src={imgSrc}
                            alt="Imagen de la ruta"
                            onClick={() => handleImageClick(imgSrc, index)}
                            className={index === selectedImgIndex ? 'selected' : ''}
                        />
                        ))}
                    </div>
                </div>

                {/* Titulo */}
                <div className='container-logo-nombre-calificacion-alojamiento'>
                    <div className='container-name-calificacion'>
                        <h4>{alojamiento.name}</h4>
                        <div className='calificacion-establecimiento'>
                            <p>{alojamiento.calificacion}</p>
                            <img src='/utils/icons8-estrella-48.png' />
                        </div>
                    </div>
                    <div className='container-info-titulo-calificacion-logo'>
                        <div className='logo-establecimiento'>
                            <img src={alojamiento.logo} />
                        </div>
                        <div className='nombre-establecimiento-alojamiento'>
                            <h5>{alojamiento.oferente}</h5>
                            <p>{`Chek In: ${alojamiento.checkIn} Chek Out: ${alojamiento.checkOut}`}</p>
                        </div>
                    </div>
                </div>
                                
                {/* Carusel servicios */}
                <div className='container-carrusel-servicios'>
                    <div className='sub-container-carrusel-servicios'>
                        {alojamiento.servicios.map((servicio, index) => {
                            const IconComponent = getIconComponent(servicio);
                            return (
                                <p key={index}>
                                    <IconComponent size={18} className="mr-2" /> {servicio}
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

                 {/* seccion de accordean, recomendaciones y mas */}
                <div className='accordion'>
                    {Object.entries(alojamiento.politicas).map(([key, value], index) => (
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

                {/* Seccion metodos de pago */}
                <div className='container-principal-precio-metodo'>
                    <div className='container-precio-metodo-pago'>
                        <div className='container-precio'>
                            <h5>
                                {alojamiento.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </h5>
                            <p>Por noche</p>
                        </div>
                        <div className='container-metodo'>
                            <h4>Metodos de pago</h4>
                            <p>
                                {alojamiento.metodosDePago}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contacto */}
                <div className='container-contacto'>
                    <button 
                        className='como-llegar'
                        onClick={() => window.open(alojamiento.address, '_blank')}  
                    >
                        ¿Como llegar?
                        <img src="/utils/icons8-gps-50.png" />
                    </button>
                    <button 
                        className='contacto'
                        onClick={() => window.open(`https://wa.me/${alojamiento.contacto}`, '_blank')}    
                    >
                        Escribe por Whats
                        <img src="/utils/icons8-whatsapp-48.png" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default AlojamientoDescripcion
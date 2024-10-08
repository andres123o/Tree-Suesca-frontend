import React, { useEffect, useState } from 'react'
import Footer  from '../common/footer'
import { FaPerson } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const DescripcionActividades = ( {actividad} ) => {
    const [backgroundImage, setBackgroundImg] = useState(actividad.img);
    const [selectedImgIndex, setSelectedImgIndex] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

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
                        {actividad.imgs.map((imgSrc, index) => (
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
                <div className='container-logo-nombre-calificacion'>
                    <div className='logo-establecimiento'>
                        <img src={actividad.logo} />
                    </div>
                    <div className='nombre-establecimiento'>
                        <h4>{actividad.name}</h4>
                        <p>{`Horario: ${actividad.horario.abren} - ${actividad.horario.cierran}`}</p>
                    </div>
                    <div className='calificacion-establecimiento'>
                        <p>{actividad.calificacion}</p>
                        <img src='/utils/icons8-estrella-48.png' />
                    </div>
                </div>
                
                {/* Descripcion */}
                <div className='container-descripcion'>
                    <p className='descripcion' id="descripcion-texto">
                        {visibleText}
                        <button onClick={toggleExpand} className='show-more-btn'>
                        {isExpanded ? 'less' : 'more'}
                        </button>
                    </p>
                </div>
                    
                {/* Caracteriticas  */}
                <div className='container-caracteristicas'>
                    <div className='sub-container'>
                        <div className='container-individual'>
                            <div>
                                <h5>Dificultad</h5>
                                <FaGripfire />
                            </div>
                            <h5>
                                {actividad.dificultad}
                            </h5>
                        </div>
                        <div className='container-individual'>
                            <div>
                                <h5>Duración</h5>
                                <FaRegClock />
                            </div>
                            <h5>{actividad.duracion} Min</h5>
                        </div>
                        <div className='container-individual'>
                            <div>
                                <h5>Capacidad</h5>
                                <FaPerson />
                            </div>
                            <h5>{actividad.capacidad}</h5>
                        </div>
                    </div>
                </div>

                <div className='separador'></div>

                {/* seccion de accordean, recomendaciones y mas */}
                <div className='accordion'>
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

                <div className='separador'></div>
                
                {/* Seccion metodos de pago */}
                <div className='container-principal-precio-metodo'>
                    <div className='container-precio-metodo-pago'>
                        <div className='container-precio'>
                            <h5>
                                {actividad.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </h5>
                            <p>Por persona</p>
                        </div>
                        <div className='container-metodo'>
                            <h4>Metodos de pago</h4>
                            <p>
                                {actividad.metodosDePago}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contacto */}
                <div className='container-contacto'>
                    <button 
                        className='como-llegar'
                        onClick={() => window.open(actividad.address, '_blank')}  
                    >
                        ¿Como llegar?
                        <img src="/utils/icons8-gps-50.png" />
                    </button>
                    <button 
                        className='contacto'
                        onClick={() => window.open(`https://wa.me/${actividad.contacto}`, '_blank')}    
                    >
                        Escribe por Whats
                        <img src="/utils/icons8-whatsapp-48.png" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default DescripcionActividades;
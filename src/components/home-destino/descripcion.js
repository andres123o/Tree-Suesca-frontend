import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { BsCalendarDate } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TbLockCheck } from "react-icons/tb";
import { FaBus } from "react-icons/fa6";



const Descripcion = ({destino}) => {
    const [expandedSection, setExpandedSection] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const maxTextLength = 150;

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
      };
    
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const accordionSections = [
        {   
            title: 'Épocas para viajar',
            content: destino.epocas,
            icon: <BsCalendarDate className="accordion-icon" />
        },
        {   
            title: 'Clima y que llevar',
            content: destino.clima,
            icon: <TiWeatherPartlySunny className="accordion-icon" />
        },
        {   
            title: 'Tips de seguridad',
            content: destino.seguridad,
            icon: <TbLockCheck className="accordion-icon" />
        },
        {   
            title: 'Como llegar',
            content: destino.transporte,
            icon: <FaBus className="accordion-icon" />
        }
    ];
    
    const visibleText = isExpanded ? destino.descripcion : `${destino.descripcion.slice(0, maxTextLength)}...`;
    return (
        <>
            {/* Carrusel */}
            <div className="container-mas-populares-2">
                <div className="container-carrusel-actividades-populares-2">
                    <div className="container-carrusel-categorias-actividades-2">
                        {
                            destino.imagenes.map((item)  => {
                                return (
                                <div 
                                    key={item.id} 
                                    className="contenidoDestino" 
                                    style={{ 
                                        backgroundImage: `url(${item.img})`,
                                    }}
                                >

                                </div>
                                ) 
                            })
                        }
                    </div>
                </div>
            </div>  

            {/* Descripcion */}
            <div className="container-title-destino">
                <h5>{destino.frase}</h5>
            </div>

            <div className='container-descripcion-destino'>
                <p className='descripcion-destino' id="descripcion-texto">
                    {visibleText}
                        <button onClick={toggleExpand} className='show-more-btn-destino'>
                    {isExpanded ? 'menos' : 'más'}
                    </button>
                </p>
            </div>

            {/* Acordeón de información */}
            <div className='accordion2'>
                {accordionSections.map((section, index) => (
                    <div key={index} className='accordion-item12'>
                        <button 
                            className={`accordion-header2 ${expandedSection === section.title ? 'active2' : ''}`}
                            onClick={() => toggleSection(section.title)}
                        >
                            <div className="header-content2">
                                {section.icon}
                                <span>{section.title}</span>
                            </div>
                            <IoIosArrowForward className={`arrow-icon2 ${expandedSection === section.title ? 'rotated' : ''}`} />
                        </button>
                        <div 
                            className='accordion-content2'
                            style={{ display: expandedSection === section.title ? 'block' : 'none' }}
                        >
                            <p>{section.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='separador'></div>
        </>
    )
}

export default Descripcion;
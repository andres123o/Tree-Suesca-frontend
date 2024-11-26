import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";


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
        {   'Épocas para viajar': destino.epocas },
        {   'Clima y que llevar': destino.clima   },
        {   'Tips de seguridad': destino.seguridad  },
        {   'Como llegar': destino.transporte  }
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

            <div className='container-descripcion-destino'>
                <p className='descripcion-destino' id="descripcion-texto">
                    {visibleText}
                        <button onClick={toggleExpand} className='show-more-btn-destino'>
                    {isExpanded ? 'menos' : 'más'}
                    </button>
                </p>
            </div>

            {/* Acordeón de información */}
            <div className='accordion'>
                {accordionSections.map((instruccion, index) => (
                    <div key={instruccion.id} className='accordion-item1'>
                    {Object.entries(instruccion).map(([key, value]) => {
                        if (key !== 'id') {
                        return (
                            <div key={key}>
                            <button 
                                className={`accordion-header ${expandedSection === `${index}-${key}` ? 'active' : ''}`}
                                onClick={() => toggleSection(`${index}-${key}`)}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                <IoIosArrowForward className={`icon ${expandedSection === `${index}-${key}` ? 'rotated' : ''}`} />
                            </button>
                            <div 
                                className='accordion-content'
                                style={{ display: expandedSection === `${index}-${key}` ? 'block' : 'none' }}
                            >
                                <p>{value}</p>
                            </div>
                            </div>
                        );
                        }
                        return null;
                    })}
                    </div>
                ))}
            </div>
            <div className='separador'></div>
        </>
    )
}

export default Descripcion;
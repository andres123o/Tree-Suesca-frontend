import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { BsCalendarDate } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TbLockCheck } from "react-icons/tb";
import { FaBus } from "react-icons/fa6";
import OptimizedImage from "../common/optimzarImg";


const Descripcion = ({destino, destino_id}) => {
    const [expandedSection, setExpandedSection] = useState(null);

    const handleImageClick = (img) => {
        // Trackear cuando hacen click en una imagen del carrusel
        window.gtag('event', 'interaccion_carrusel', {
            nombre_destino: destino.municipio || 'desconocido',
            tipo_contenido: 'imagen',
            tipo_interaccion: 'click',
            contenido_id: img.id // Para saber qué imagen específica vieron
        });
    };
    
    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    
    return (
        <>
            {/* Carrusel */}
            <div className="container-mas-populares-2">
                <div className="container-carrusel-actividades-populares-2">
                    <div className="container-carrusel-categorias-actividades-2">
                        {
                            destino.imagenes.map((item)  => {
                                return (
                                    <OptimizedImage className="contenidoDestino"
                                        imageUrl={item.img}
                                        key={item.id}
                                        onClick={() => handleImageClick(item)} 
                                    />
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
                    {destino.descripcion}
                </p>
            </div>

            <div className='separador'></div>
        </>
    )
}

export default Descripcion;
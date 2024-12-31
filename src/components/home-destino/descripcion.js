import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { BsCalendarDate } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TbLockCheck } from "react-icons/tb";
import { FaBus } from "react-icons/fa6";
import OptimizedImage from "../common/optimzarImg";


const Descripcion = ({destino, destino_id}) => {
    const [expandedSection, setExpandedSection] = useState(null);

    // Trackear cuando ven la descripción
    useEffect(() => {
        if (destino?.municipio) {
            window.gtag('event', 'vista_contenido_destino', {
                nombre_destino: destino.municipio,
                tipo_contenido: 'descripcion',
                tipo_interaccion: 'vista'
            });
        }
    }, [destino?.municipio]);
    
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
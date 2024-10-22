import React, { useEffect, useState } from 'react'
import { FaPerson } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import { useParams } from 'react-router-dom';
import axios from 'axios'

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
    
    console.log(content)
    if (loading) return <><div>Cargando...</div></>;
    if (error) return <><div>Error: {error}</div></>;
    if (!content) return <><div>No hay contenido disponible</div></>;

    return <DescripcionEventos evento={content} />;
}


const DescripcionEventos = ( {evento} ) => {
    const [expandedSection, setExpandedSection] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    

    const maxTextLength = 100;

    const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
    };

    const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    };

    const visibleText = isExpanded ? evento.itinerario : `${evento.itinerario.slice(0, maxTextLength)}...`;

    return (
        <>
            {/* Ver las imagenes del carrusel */}
            <div 
                className='container-img-principal' 
                style={{
                backgroundImage:`url(${evento.img})`
                }}
            >
            </div>
                
            {/* Container principal de la informacion */}
            <div className="container-info">

                {/* Titulo */}
                <div className='container-logo-nombre-calificacion'>
                    <div className='logo-establecimiento'>
                        <img src={evento.logo} />
                    </div>
                    <div className='nombre-establecimiento'>
                        <h4>{evento.name}</h4>
                        <p>{`Fecha: ${evento.fecha} - ${evento.hora}`}</p>
                    </div>
                    <div className='calificacion-establecimiento'>
                        <p>{evento.calificacion}</p>
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
                                <h5>Oferente</h5>
                                <IoMdPeople />
                            </div>
                            <h5>
                                {evento.oferente}
                            </h5>
                        </div>
                        <div className='container-individual'>
                            <div>
                                <h5>Duración</h5>
                                <FaRegClock />
                            </div>
                            <h5>{evento.duracion} Hora(s)</h5>
                        </div>
                        <div className='container-individual'>
                            <div>
                                <h5>Cupos</h5>
                                <FaPerson />
                            </div>
                            <h5>{evento.cupos}</h5>
                        </div>
                    </div>
                </div>

                <div className='separador'></div>

                {/* seccion de accordean, recomendaciones y mas */}
                <div className='accordion'>
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

                <div className='separador'></div>
                
                {/* Seccion metodos de pago */}
                <div className='container-principal-precio-metodo'>
                    <div className='container-precio-metodo-pago'>
                        <div className='container-precio'>
                            <h5>
                                {evento.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </h5>
                            <p>Por persona</p>
                        </div>
                        <div className='container-metodo'>
                            <h4>Metodos de pago</h4>
                            <p>
                                {evento.metodosDePago}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contacto */}
                <div className='container-contacto'>
                    <button 
                        className='como-llegar'
                        onClick={() => window.open(evento.address, '_blank')}  
                    >
                        ¿Como llegar?
                        <img src="/utils/icons8-gps-50.png" />
                    </button>
                    <button 
                        className='contacto'
                        onClick={() => window.open(`https://wa.me/${evento.contacto}`, '_blank')}    
                    >
                        Escribe por Whats
                        <img src="/utils/icons8-whatsapp-48.png" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default MainComponentEvent;
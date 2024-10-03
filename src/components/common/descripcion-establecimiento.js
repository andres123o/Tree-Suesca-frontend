import Footer  from './footer';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const DescripcionEstablecimientos = ({ establecimiento }) => {
    const { nombre } = useParams();
    const [selectedImgIndex, setSelectedImgIndex] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    
    useEffect(() => {
        // Establecer la imagen inicial
        setBackgroundImage(establecimiento.img);
    }, [establecimiento.img]);
    
    const handleImageClick = (imgSrc, index) => {
        setSelectedImgIndex(index);
        setBackgroundImage(imgSrc);
    };
    
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const maxTextLength = 100;
    const visibleText = isExpanded ? establecimiento.concepto : `${establecimiento.concepto.slice(0, maxTextLength)}...`;
    

    return (
        <>
            <div 
                className='container-img-principal' 
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            />
            <div className="container-info">
                {/* Container carrusel */}
                <div className='container-carrusel-imgs'>
                    <div className='carrusel-imgs'>
                        {establecimiento.imgs.map((imgSrc, index) => (
                            <img 
                                key={index}
                                src={imgSrc}
                                alt={`Imagen ${index + 1} del establecimiento`}
                                onClick={() => handleImageClick(imgSrc, index)}
                                className={`carrusel-img ${index === selectedImgIndex ? 'selected' : ''}`}
                            />
                        ))}
                    </div>
                </div>

                {/* container titulo - logo - nombre */}
                <div className = 'container-logo-nombre-calificacion'>
                    <div className='logo-establecimiento'>
                        <img src={establecimiento.logo} />
                    </div>
                    <div className='nombre-establecimiento'>
                        <h4>
                            {establecimiento.name}
                        </h4>
                        <p>
                            {`Horario: ${establecimiento.horario.abren} - ${establecimiento.horario.cierran}`}
                        </p>
                    </div>
                    <div className='calificacion-establecimiento'>
                         <p>{establecimiento.calificacion}</p>
                        <img src='/utils/icons8-estrella-48.png' />
                    </div>
                </div>

                {/* Desripcion establecimiento */}
                <div className='descripcion-establecimiento'>
                    <p className='descripcion' id="descripcion-texto">
                        {visibleText}   
                        <button onClick={toggleExpand} className='show-more-btn'>
                            {isExpanded ? 'less' : 'more'}
                        </button>
                    </p>
                </div>

                {/* Caracteristicas */}
                <div className='container-caracteristicas'>
                    <div className='sub-container'>
                        <div className='container-individual'>
                            <div>
                                <h5>Domicilios</h5>
                                <img src='/utils/icons8-entrega-moto-caja-sola-50.png'/>
                            </div>
                            <h5 className='disponibilidad'>{establecimiento.servicios.delivery}</h5>
                        </div>
                        <div className='container-individual'>
                            <div>
                                <h5>Reservas</h5>
                                <img src='/utils/icons8-reserva-50.png'/>
                            </div>
                            <h5 className='disponibilidad'>{establecimiento.servicios.reservas}</h5>
                        </div>
                        <div className='container-individual'>
                            <div>
                                <h5>Parking</h5>
                                <img src='/utils/icons8-estacionamiento-50.png'/>
                            </div>
                            <h5 className='disponibilidad'>{establecimiento.servicios.parking}</h5>
                        </div>
                    </div>
                </div>

                {/* Seccion top 5 populares */}
                <div className='container-top-5'>
                    <div className='container-title'>
                        <h4>Top 3 platos!</h4>
                    </div>
                    {
                        establecimiento.destacados.map((item, index) => (
                            <div className='popular' key={index}>
                                <div className='oferta'>
                                    <img src={item.img} alt={item.nombre} />
                                </div>
                                <div className='descripcion-oferta'>
                                    <h5>{item.nombre}</h5>
                                    <p>{item.descripcion}</p>
                                    <h5>${item.costo.toLocaleString()}</h5>
                                </div>
                            </div>
                        ))
                   }
                </div>

                {/* Seccion top 5 populares */}
                <div className='container-top-5'>
                    <div className='container-title'>
                        <h4>Recurrentes!</h4>
                    </div>
                    {
                        establecimiento.recurrente.map((item, index) => (
                            <div className='popular' key={index}>
                                <div className='oferta'>
                                    <img src={item.img} alt={item.nombre} />
                                </div>
                                <div className='descripcion-oferta'>
                                    <h5>{item.nombre}</h5>
                                    <p>{item.descripcion}</p>
                                    <h5>${item.costo.toLocaleString()}</h5>
                                </div>
                            </div>
                        ))
                   }
                </div>

                {/* Seccion de contacto */}
                <div className='container-contacto'>
                    <button 
                        className='como-llegar'
                        onClick={() => window.open(establecimiento.address, '_blank')}  
                    >
                        <img src="/utils/icons8-gps-50.png" />
                    </button>
                    <button 
                        className='contacto'
                        onClick={() => window.open(`https://wa.me/${establecimiento.contacto}`, '_blank')}    
                    >
                        <img src="/utils/icons8-whatsapp-48.png" />
                    </button>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
};

// Asegúrate de exportar el componente correctamente
export default DescripcionEstablecimientos;
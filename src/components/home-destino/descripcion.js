import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import OptimizedImage from "../common/optimzarImg";


const Descripcion = ({destino, destino_id}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    const scrollToImage = (index) => {
        if (!containerRef.current) return;
        
        requestAnimationFrame(() => {
            const container = containerRef.current;
            const images = container.getElementsByClassName('carousel-item');
            if (!images[index]) return;
    
            const containerWidth = container.clientWidth; // Usar clientWidth
            const imageWidth = images[index].offsetWidth;
            const scrollPosition = images[index].offsetLeft - (containerWidth / 2) + (imageWidth / 2);
            
            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    };

    useEffect(() => {
        scrollToImage(currentIndex);
    }, [currentIndex]);

    const handleImageClick = (img, index) => {
        setCurrentIndex(index);
        window.gtag('event', 'interaccion_carrusel', {
            nombre_destino: destino.municipio || 'desconocido',
            tipo_contenido: 'imagen',
            tipo_interaccion: 'click',
            contenido_id: img.id
        });
    };

    const scroll = (direction) => {
        const newIndex = direction === 'left' 
            ? Math.max(0, currentIndex - 1)
            : Math.min(destino.imagenes.length - 1, currentIndex + 1);
        
        setCurrentIndex(newIndex);
    };

    return (
        <>
            {/* Carrusel */}
            <div className='container-carr-des'>
                <div className="container-mas-populares-2">
                    <button className="carousel-arrow left" onClick={() => scroll('left')} disabled={currentIndex === 0}>
                        <IoIosArrowBack size={24} />
                    </button>
                    <div className="container-carrusel-actividades-populares-2">
                        <div className="container-carrusel-categorias-actividades-2"  ref={containerRef}>
                            <div 
                                className="dummy-spacer" 
                                style={{ flex: `0 0 calc(50% - 17.5vh)` }} 
                            />
                            {destino.imagenes.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        className={`carousel-item ${currentIndex === index ? 'active-img' : ''}`}
                                        onClick={() => handleImageClick(item, index)}
                                    >
                                        <OptimizedImage
                                            imageUrl={item.img}
                                            className="contenidoDestino"
                                        />
                                    </div>
                            ))}
                            <div 
                                className="dummy-spacer" 
                                style={{ flex: `0 0 calc(50% - 17.5vh)` }} 
                            />
                        </div>
                    </div>
                    <button className="carousel-arrow right" onClick={() => scroll('right')} disabled={currentIndex === destino.imagenes.length - 1}>
                        <IoIosArrowForward size={24} />
                    </button>
                </div>  

                {/* Descripcion */}
                <div className='container-descri-home'>
                    <div className="container-title-destino">
                        <h5 className='title-destino'>{destino.frase}</h5>
                    </div>
                    <div className='container-descripcion-destino'>
                        <p className='descripcion-destino' id="descripcion-texto">
                            {destino.descripcion}
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Descripcion;
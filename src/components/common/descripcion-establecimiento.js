import Footer from './footer';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPerson } from "react-icons/fa6";
import axios from 'axios'

// Componentes reutilizables que mantienen la estructura exacta del JSX
const ImageCarousel = ({ images, selectedIndex, onImageClick }) => (
    <div className='container-carrusel-imgs'>
        <div className='carrusel-imgs'>
            {images.map((imgSrc, index) => (
                <img 
                    key={index}
                    src={imgSrc}
                    alt={`Imagen ${index + 1} del establecimiento`}
                    onClick={() => onImageClick(imgSrc, index)}
                    className={`carrusel-img ${index === selectedIndex ? 'selected' : ''}`}
                />
            ))}
        </div>
    </div>
);

const HeaderInfo = ({ establecimiento, nombre }) => (
    <div className='container-logo-nombre-calificacion'>
        <div className='logo-establecimiento'>
            <img src={establecimiento.logo} />
        </div>
        <div className='nombre-establecimiento'>
            <h4>{establecimiento.name}</h4>
            <p>{`Horario: ${establecimiento.horario.abren} - ${establecimiento.horario.cierran}`}</p>
        </div>
        <div className='calificacion-establecimiento'>
            <p>{establecimiento.calificacion}</p>
            <img src='/utils/icons8-estrella-48.png' />
        </div>
    </div>
);

const Description = ({ texto, isExpanded, toggleExpand, maxLength = 100 }) => {
    const visibleText = isExpanded ? texto : `${texto.slice(0, maxLength)}...`;
    return (
        <div className='descripcion-establecimiento'>
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
    
    console.log(content)
    if (loading) return <><div>Cargando...</div></>;
    if (error) return <><div>Error: {error}</div></>;
    if (!content) return <><div>No hay contenido disponible</div></>;

    return <DescripcionEstablecimientos establecimiento={content} />;
}

const DescripcionEstablecimientos = ({establecimiento}) => {
    const [selectedImgIndex, setSelectedImgIndex] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    
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
                    <div 
                        className='container-img-principal' 
                        style={{backgroundImage: `url(${backgroundImage})`}}
                    />
                    <div className="container-info">
                        <ImageCarousel 
                            images={establecimiento.imgs.imagenes}
                            selectedIndex={selectedImgIndex}
                            onImageClick={handleImageClick}
                        />

                        <HeaderInfo establecimiento={establecimiento} />

                        <Description 
                            texto={establecimiento.concepto}
                            isExpanded={isExpanded}
                            toggleExpand={() => setIsExpanded(!isExpanded)}
                        />

                        <div className='container-caracteristicas'>
                            <div className='sub-container'>
                                <div className='container-individual'>
                                    <div>
                                        <h5>Cover</h5>
                                        <FaPerson className="Faperson"/>
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

                        <BebidaSection title="Antojos" items={establecimiento.antojos} />
                        <PopularSection title="Top 3 Cocteles!" items={establecimiento.destacados} />
                        <BebidaSection title="Bebidas" items={establecimiento.bebidas} />
                        
                        
                        <ContactButtons establecimiento={establecimiento} />
                        <Footer />
                    </div>
                </>
            ) : (
                <>
                    <div 
                        className='container-img-principal' 
                        style={{backgroundImage: `url(${backgroundImage})`}}
                    />
                    <div className="container-info">
                        <ImageCarousel 
                            images={establecimiento.imgs.imagenes}
                            selectedIndex={selectedImgIndex}
                            onImageClick={handleImageClick}
                        />

                        <HeaderInfo establecimiento={establecimiento} />

                        <Description 
                            texto={establecimiento.concepto}
                            isExpanded={isExpanded}
                            toggleExpand={() => setIsExpanded(!isExpanded)}
                        />

                        <div className='container-caracteristicas'>
                            <div className='sub-container'>
                                <div className='container-individual'>
                                    <div>
                                        <h5>Domicilios</h5>
                                        <img src='/utils/icons8-entrega-moto-caja-sola-50.png' />
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
                        

                        <ContactButtons establecimiento={establecimiento} />
                        <Footer />
                    </div>
                </>
            )}
        </>
    );
};


export default MainComponent;
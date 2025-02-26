import React from 'react';
import { Heart, Star, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OptimizedImageLarge from '../common/optimizarImagenesVersion'


const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const transformAlojamientosData = (alojamientos) => {
  return alojamientos
    .flatMap(lugar => {
      if (!lugar.alojamiento || lugar.alojamiento.length === 0) return [];
      
      return lugar.alojamiento.map(accommodation => ({
        id: `${lugar.id}-${accommodation.name}`,
        title: accommodation.name,
        rating: accommodation.calificacion || 0,
        details: {
          rooms: accommodation.equipamento.habitaciones,
          beds: accommodation.equipamento.camas,
          bathrooms: accommodation.equipamento.baños
        },
        price: accommodation.precio,
        isSuperhost: accommodation.calificacion >= 4.8 || false,
        isNew: accommodation.calificacion === 0 || true,
        image: accommodation.img
      }));
    });
};

const AccommodationsSection = ({ alojamientos = [], destino_id }) => {
    const navigate = useNavigate();
    const accommodations = transformAlojamientosData(alojamientos);

    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleNavigateToAll = () => {
        navigate(`/alojamientos/${encodeURIComponent(destino_id)}`);
    };

    const handleCardClick = (title) => {
        navigate(`/alojamiento/${encodeURIComponent(title)}`);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Evita que el clic se propague a la tarjeta
        // Aquí puedes agregar la lógica para los favoritos
    };

    const handleBookClick = (e) => {
        e.stopPropagation(); // Evita que el clic se propague a la tarjeta
        // Aquí puedes agregar la lógica para las reservas
    };

     // Iniciar arrastre
     const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    // Mientras se arrastra
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Velocidad de desplazamiento
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    // Terminar arrastre
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    return (
        <>
        <section className="accommodations-section">
            <div className="overview-header">
            <h2 className="overview-title">Estadías imperdibles</h2>
            <button className="see-more-btn" onClick={handleNavigateToAll}>
                Ver todos
                <ChevronRight size={16} />
            </button>
            </div>
            <div 
                className="carousel-container" 
                ref={carouselRef} 
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
            <div className="accommodations-grid">
                {accommodations.map((accommodation) => (
                <div
                    key={accommodation.id}
                    className="accommodation-card"
                    onClick={() => handleCardClick(accommodation.title)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="image-container">
                    <OptimizedImageLarge className='accommodation-image'
                        imageUrl={accommodation.image}
                        alt={accommodation.title}
                    />
                    <button 
                        className="favorite-btn"
                        onClick={handleFavoriteClick}
                    >
                        <Heart size={18} />
                    </button>
                    {accommodation.isSuperhost && (
                        <span className="badge">Superhost</span>
                    )}
                    {accommodation.isNew && (
                        <span className="badge">Nuevo</span>
                    )}
                    </div>

                    <div className="content">
                    <div className="title-row">
                        <h3 className="accommodation-title">{accommodation.title}</h3>
                        <div className="rating">
                        <Star size={14} className='star-icon' />
                        {accommodation.rating > 0 ? (
                            <>
                                accommodation.rating
                            </>
                        ) : ''}
                        </div>
                    </div>

                    <p className="details">
                        {accommodation.details.rooms} habitación{accommodation.details.rooms !== 1 ? 'es' : ''} · {' '}
                        {accommodation.details.beds} cama{accommodation.details.beds !== 1 ? 's' : ''} · {' '}
                        {accommodation.details.bathrooms} baño{accommodation.details.bathrooms !== 1 ? 's' : ''}
                    </p>

                    <div className="price-row">
                        <span className="price">
                        {formatCurrency(accommodation.price)} <span className="nights">noche</span>
                        </span>
                        <button 
                        className="book-btn"
                        onClick={() => handleCardClick(accommodation.title)}
                        >
                        Reservar
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
        </>
    );
};

export default AccommodationsSection;
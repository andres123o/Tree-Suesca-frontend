import React from 'react';
import { Mountain, Navigation, Camera, ChevronRight } from 'lucide-react';
import OptimizedImageLarge from '../common/optimizarImagenesVersion';
import { useNavigate } from 'react-router-dom';

const ViewpointsSection = ({ imagenes = [], destino_id, municipio }) => {
  const navigate = useNavigate()
  // Usar la primera imagen del array si existe, o una imagen por defecto si no hay imágenes
  const mainImage = imagenes?.[0]?.img || "https://res.cloudinary.com/destinoplus/image/upload/v1733759892/rutas/mirador-del-halcon/mxxupbqr7ls8uhzasdmg.jpg";

  const handleClick = () => {
    navigate(`/rutas/Senderismo/${encodeURIComponent(destino_id)}`)
  }


  return (
    <>
      <div className="container-landing">
        <div className="overview-header">
          <h2 className="overview-title">Paisajes épicos para explorar</h2>
          <button className="see-more-btn" onClick={handleClick}>
            Ver todos
            <ChevronRight size={16} />
          </button>
        </div>
        
        {/* Card Principal */}
        <div className="viewpoints-main-card"
          onClick={handleClick}
        >
          {/* Contenedor de imagen principal */}
          <div className="viewpoints-image-container">
            <OptimizedImageLarge className='viewpoints-image'
                imageUrl={mainImage}
            />
            {/* Overlay con gradiente */}
            <div className="viewpoints-overlay">
              {/* Badges superiores */}
              <div className="viewpoints-badges">
                <span className="viewpoints-badge">
                  <Mountain size={14} className="viewpoints-badge-icon" />
                  Spots
                </span>
              </div>

              {/* Información del mirador */}
              <div className="viewpoints-content">
                <h3 className="viewpoints-title-text">
                  Descubre los mejores spots de {municipio}
                </h3>
                <div className="viewpoints-tags">
                  <span className="viewpoints-tag">Sin costo</span>
                  <span className="viewpoints-tag">Facil</span>
                  <span className="viewpoints-tag">Rapido</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menú inferior de acciones */}
          <div className="viewpoints-actions">
            <button className="viewpoints-action-button">
              <Mountain size={20} className="viewpoints-action-icon" />
              <span className="viewpoints-action-text">Aventúrate sin guía</span>
            </button>
            <button className="viewpoints-action-button">
              <Navigation size={20} className="viewpoints-action-icon" />
              <span className="viewpoints-action-text">Encuéntralos fácil</span>
            </button>
            <button className="viewpoints-action-button">
              <Camera size={20} className="viewpoints-action-icon" />
              <span className="viewpoints-action-text">Vívelo antes de ir</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewpointsSection;
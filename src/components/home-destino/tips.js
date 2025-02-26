import React, { useState } from 'react';
import { Calendar, CloudSun, Shield, Bus, ChevronRight, X } from 'lucide-react';

const DestinationInfo = ({ destino }) => {
  const [showModal, setShowModal] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const { epocas, clima, seguridad, transporte } = destino || {};

  // Función para crear una descripción corta
  const createShortDesc = (text) => {
    if (!text) return '';
    const shortened = text.substring(0, 65).split(' ').slice(0, -1).join(' ');
    return `${shortened}...`;
  };

  const sections = [
    {
      id: 'epocas',
      icon: <Calendar size={24} />,
      title: 'Mejores épocas',
      content: epocas,
      bgColor: 'bg-icon-epocas',
      iconColor: 'icon-epocas'
    },
    {
      id: 'clima',
      icon: <CloudSun size={24} />,
      title: 'Clima y qué llevar',
      content: clima,
      bgColor: 'bg-icon-clima',
      iconColor: 'icon-clima'
    },
    {
      id: 'seguridad',
      icon: <Shield size={24} />,
      title: 'Tips de seguridad',
      content: seguridad,
      bgColor: 'bg-icon-seguridad',
      iconColor: 'icon-seguridad'
    },
    {
      id: 'transporte',
      icon: <Bus size={24} />,
      title: 'Cómo llegar',
      content: transporte,
      bgColor: 'bg-icon-transporte',
      iconColor: 'icon-transporte'
    }
  ].map(section => ({
    ...section,
    shortDesc: createShortDesc(section.content)
  }));

  const handleOpenModal = () => {
    window.gtag('event', 'vista_info_destino', {
      nombre_destino: destino.municipio || 'desconocido',
      tipo_contenido: 'sugerencias',
      tipo_interaccion: 'vista'
    });
    
    setShowModal(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalActive(true);
      });
    });
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  if (!destino) return null;

  return (
    <>
      <div className="overview-section">
        <div className="overview-header">
          <h2 className="overview-title">No viajes sin leer esto</h2>
          <button 
            onClick={handleOpenModal}
            className="see-more-btn"
          >
            Ver detalles
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="preview-cards">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className="preview-card"
              onClick={handleOpenModal}
            >
              <div className={`card-icon ${section.bgColor}`}>
                <span className={section.iconColor}>{section.icon}</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">{section.title}</h3>
                <p className="card-description">{section.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div 
          className={`modal-overlay ${isModalActive ? 'active' : ''}`}
          onClick={handleCloseModal}
        >
          <div 
            className={`modal-content ${isModalActive ? 'active' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Todo sobre {destino.municipio || 'el destino'}</h2>
              <button 
                onClick={handleCloseModal}
                className="close-btn"
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {sections.map((section) => (
                <div key={section.id} className="info-section">
                  <div className="section-header">

                    <h3 className="section-title">{section.title}</h3>
                    <div className={`section-icon ${section.bgColor}`}>
                      <span className={section.iconColor}>{section.icon}</span>
                    </div>
                    
                  </div>
                  <p className="section-content">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DestinationInfo;
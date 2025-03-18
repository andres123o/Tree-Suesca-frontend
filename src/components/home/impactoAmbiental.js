import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ImpactoAmbiental = () => {
  const navigate = useNavigate();
  const [impactoData, setImpactoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('resumen');

  useEffect(() => {
    const fetchImpactoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://tree-suesca-backend-production.up.railway.app/api/v1/arboles-info');
        setImpactoData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos de impacto ambiental');
        setLoading(false);
        console.error('Error fetching environmental impact data:', err);
      }
    };

    fetchImpactoData();
  }, []);

  if (loading) {
    return (
      <div className="impacto-loading">
        <div className="impacto-loader"></div>
        <p>Cargando datos de impacto ambiental...</p>
      </div>
    );
  }

  if (error) {
    return <div className="impacto-error">{error}</div>;
  }

  return (
    <div className="impacto-container">
      <div className="impacto-header">
        <h2>Impacto Ambiental</h2>
        <p className="impacto-subtitle">Juntos construimos un futuro más verde con cada viaje</p>
      </div>

      <div className="impacto-stats-container">
        <div className="impacto-stat-card">
          <div className="impacto-stat-icon">🌳</div>
          <div className="impacto-stat-value">{impactoData?.cantidad_total || 0}</div>
          <div className="impacto-stat-label">Árboles Plantados</div>
        </div>

        <div className="impacto-stat-card">
          <div className="impacto-stat-icon">🌱</div>
          <div className="impacto-stat-value">{impactoData?.m2_reforestados || 0}</div>
          <div className="impacto-stat-label">m² Reforestados</div>
        </div>

        <div className="impacto-stat-card">
          <div className="impacto-stat-icon">♻️</div>
          <div className="impacto-stat-value">{impactoData?.co2_total || 0}</div>
          <div className="impacto-stat-label">kg de CO₂ capturados</div>
        </div>
      </div>

      <div className="impacto-tabs">
        <button 
          className={`impacto-tab ${activeTab === 'resumen' ? 'active' : ''}`}
          onClick={() => setActiveTab('resumen')}
        >
          Resumen
        </button>
        <button 
          className={`impacto-tab ${activeTab === 'arboles' ? 'active' : ''}`}
          onClick={() => setActiveTab('arboles')}
        >
          Comunidad
        </button>
        <button 
          className={`impacto-tab ${activeTab === 'donantes' ? 'active' : ''}`}
          onClick={() => setActiveTab('donantes')}
        >
          Donantes
        </button>
      </div>

      <div className="impacto-content">
        {activeTab === 'resumen' && (
          <div className="impacto-resumen">
            <div className="impacto-progress">
              <div className="impacto-progress-title"><span role="img" aria-label="meta">🎯</span> Nuestro objetivo: 1,000 árboles en 2025</div>
              <div className="impacto-progress-bar-container">
                <div 
                  className="impacto-progress-bar" 
                  style={{ width: `${Math.min((impactoData?.cantidad_total / 1000) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="impacto-progress-stats">
                <span>{impactoData?.cantidad_total || 0} plantados</span>
                <span>{1000 - (impactoData?.cantidad_total || 0)} por plantar</span>
              </div>
            </div>
            
            <div className="impacto-impact-cards">
              <div className="impacto-impact-card">
                <h3><span role="img" aria-label="equivalencia">⚖️</span> Equivale a:</h3>
                <div className="impacto-equivalence">
                  <div className="impacto-equivalence-icon">🚗</div>
                  <div className="impacto-equivalence-text">
                    <span className="impacto-equivalence-value">{Math.round((impactoData?.co2_total || 0) / 0.14)}</span>
                    <span className="impacto-equivalence-label">km de recorrido en auto compensados</span>
                  </div>
                </div>
                <div className="impacto-equivalence">
                  <div className="impacto-equivalence-icon">💡</div>
                  <div className="impacto-equivalence-text">
                    <span className="impacto-equivalence-value">{Math.round((impactoData?.co2_total || 0) / 0.004)}</span>
                    <span className="impacto-equivalence-label">horas de luz compensadas</span>
                  </div>
                </div>
              </div>
              
              <div className="impacto-impact-card">
                <h3><span role="img" aria-label="objetivos">🎯</span> Contribuye al ODS:</h3>
                <div className="impacto-ods-icons">
                  <div className="impacto-ods-icon ods-13">13</div>
                  <div className="impacto-ods-icon ods-15">15</div>
                </div>
                <p>Acción por el clima y Vida de ecosistemas terrestres</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'arboles' && (
          <div className="impacto-arboles">
            <h3><span role="img" aria-label="árbol">🌳</span> Árboles Plantados Recientemente</h3>
            {impactoData?.arboles && impactoData.arboles.length > 0 ? (
              <div className="impacto-arboles-list">
                {impactoData.arboles.map((arbol) => (
                  <div key={arbol.id} className="impacto-arbol-card">
                    <div className="impacto-arbol-image">
                      <img src={arbol.imagen_url} alt="Árbol plantado" />
                      <div className="impacto-arbol-tag">{arbol.especie}</div>
                    </div>
                    <div className="impacto-arbol-content">
                      <div className="impacto-arbol-location">
                        <strong>{arbol.nombre_ubicacion}</strong>
                        <span>{arbol.region}, {arbol.pais}</span>
                      </div>
                      <div className="impacto-arbol-planter">
                        <img src={arbol.plantador.foto_perfil} alt={arbol.plantador.nombre} />
                        <span>Plantado por {arbol.plantador.nombre}</span>
                      </div>
                      <div className="impacto-arbol-date">
                        <span>Fecha: {new Date(arbol.fecha_plantacion).toLocaleDateString()}</span>
                      </div>
                      <div className="impacto-arbol-co2">
                        <span>{arbol.co2_estimado} kg de CO₂ capturados</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="impacto-no-data">
                <p>Aún no hay árboles registrados.</p>
                <button className="impacto-cta-button">¡Planta el primero!</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'donantes' && (
          <div className="impacto-donantes">
            <h3><span role="img" aria-label="donante">💚</span> Nuestros Donantes</h3>
            {impactoData?.arboles && impactoData.arboles.some(arbol => arbol.donante) ? (
              <div className="impacto-donantes-list">
                {impactoData.arboles
                  .filter(arbol => arbol.donante)
                  .map(arbol => arbol.donante)
                  .filter((donante, index, self) => 
                    index === self.findIndex(d => d.id === donante.id)
                  )
                  .map(donante => (
                    <div key={donante.id} className="impacto-donante-card">
                      <div className="impacto-donante-header">
                        <h4>{donante.nombre}</h4>
                        <span className="impacto-donante-date">
                          {new Date(donante.fecha_donacion).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="impacto-donante-info">
                        <div className="impacto-donante-amount">
                          <strong>{donante.cantidad_total}</strong>
                          <span>árboles donados</span>
                        </div>
                        <p className="impacto-donante-description">{donante.descripcion}</p>
                      </div>
                      <div className="impacto-donante-badge">
                        {donante.estado === 'activa' ? 'Activa' : 'Completada'}
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="impacto-no-data">
                <p>No hay donantes registrados aún.</p>
                <button className="impacto-cta-button">Convertirse en donante</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="impacto-cta">
        <h3>¿Quieres contribuir al planeta con tu próximo viaje?</h3>
        <button className="impacto-cta-button" onClick={() => navigate('/')}>RESERVA TU HOSPEDAJE Y PLANTA TU PROPIO ÁRBOL</button>
        <p className="impacto-cta-note">SOLO PARA LOS PRIMEROS 50 REGISTROS</p>
      </div>
    </div>
  );
};

export default ImpactoAmbiental;
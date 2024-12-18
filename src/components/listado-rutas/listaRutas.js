import React, { useState, useEffect } from "react";
import { Clock, Navigation2, Mountain } from 'lucide-react';
import { Heart, Share2 } from 'lucide-react';
import FiltrosTitulo from '../common/titulo-filtro';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import OptimizedImage from '../common/optimzarImg';

const useDestinoContent = () => {
  const location = useLocation();
  const destino_id = location.state?.destino_id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchDestinoContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://tree-suesca-backend-production.up.railway.app/api/v1/rutas/${destino_id}/Senderismo/content`
        );
        setContent(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (destino_id) {
      fetchDestinoContent();
    }
  }, [destino_id]);

  return { content, loading, error };
};

const MainComponentListadoRutas = ({iconos, route}) => {
  const { content, loading, error } = useDestinoContent();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!content) return <div>No hay contenido disponible</div>;

  return <ListaRutas rutas={content} iconos={iconos} route={route}/>;
};

const ListaRutas = ({ rutas, iconos, route}) => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({});
  const [rutasFiltradas, setRutasFiltradas] = useState(rutas);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

  const handle = (nombreRuta) => {
    navigate(`/rutas/caracteristicas/${nombreRuta}/`);
  };

  useEffect(() => {
    const nuevosFiltros = {};
    rutas.forEach((ruta) => {
      Object.entries(ruta.items).forEach(([key, value]) => {
        if (!nuevosFiltros[key]) {
          nuevosFiltros[key] = new Set();
        }
        if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
          nuevosFiltros[key].add({value});
        }
      });
    });
    setFiltros(nuevosFiltros);
  }, [rutas]);

  const manejarClick = (key, value) => {
    setFiltroSeleccionado(value.value);
    const nuevasRutas = rutas.filter(ruta => ruta.items[key] === value.value);
    setRutasFiltradas(nuevasRutas);
  };

  return (
    <div className="rutas-container">
      <FiltrosTitulo 
        nombre={'Paisajes & Miradores'}
        filtros={filtros}
        filtroSeleccionado={filtroSeleccionado}
        manejarClick={manejarClick}
      />
      <div className="container-seccion-lista-rutas">
        {rutasFiltradas.map((item) => (
          <div key={item.id}  onClick={() => handle(item.nombre)} className="container-item-lista-rutas">
            <div className="route-social">
              <button className="interaction-button">
                <Heart className="icon2" size={14}/>
              </button>
              <button className="interaction-button">
                <Share2 className="icon2" size={14}/>
              </button>
            </div>
            
            <OptimizedImage
              imageUrl={item.img}
              alt={item.nombre}
              className="container-img-ruta"
            />
            
            <div className="rating-badge">
              {parseFloat(item.calificacion) === 0 ? (
                'Nuevo'
              ) : (
                `${parseFloat(item.calificacion).toFixed(1)} ★`
              )}
            </div>

            <div className="container-info-ruta">
              <h3 className="route-title">{item.nombre}</h3>
              
              <div className="route-stats">
                <div className="stat-item">
                  <Clock className="icon2" size={12}/>
                  <span>{item.tiempo} min</span>
                </div>
                <div className="stat-item">
                  <Navigation2 className="icon2"size={12} />
                  <span>{item.distancia} km</span>
                </div>
                <div className="stat-item">
                  <Mountain className="icon2" size={12}/>
                  <span>{item.terreno}</span>
                </div>
              </div>

              <div className="route-footer">
                <div className="user-count">
                  <div className="avatar-group">
                    <div className="avatar"></div>
                    <div className="avatar"></div>
                  </div>
                  <span>+124 personas este mes</span>
                </div>
                <button 
                  className="ver-ruta-btn"
                  onClick={() => handle(item.nombre)}
                >
                  Ver Ruta
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainComponentListadoRutas;
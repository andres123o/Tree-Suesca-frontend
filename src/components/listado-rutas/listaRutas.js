import React, { useState, useEffect } from "react";
import { Clock, Navigation2, Mountain } from 'lucide-react';
import { Heart, Share2 } from 'lucide-react';
import FiltrosTitulo from '../common/titulo-filtro';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import OptimizedImage from '../common/optimzarImg';
import { MdError } from "react-icons/md";
import { Helmet } from 'react-helmet-async';

const useDestinoContent = () => {
  const { destino_id } = useParams()
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

// Nuevo hook personalizado para obtener comentarios y avatares de usuarios
const useRutaComentarios = (rutaId) => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerComentarios = async () => {
      if (!rutaId) return;
      
      try {
        setLoading(true);
        const response = await axios.get(
          `https://tree-suesca-backend-production.up.railway.app/api/v1/ruta/comentarios/${rutaId}/`
        );
        
        setComentarios(response.data);
      } catch (err) {
        console.error(`Error al cargar comentarios para ruta ${rutaId}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerComentarios();
  }, [rutaId]);

  return { comentarios, loading, error };
};

const MainComponentListadoRutas = ({iconos, route}) => {
  const { content, loading, error } = useDestinoContent();
  
  if (loading) return (
      <div className="loading-container">
          <div className="loading-content">
              <div className="loading-spinner"></div>
              <h5 className="loading-text">Cargando Rutas...</h5>
          </div>
      </div>
  );

  if (error) return (
      <div className="error-container">
          <div className="error-content">
              <MdError className="error-icon" />
              <h5 className="error-text">¡Ups! Algo salió mal</h5>
              <p className="error-message">
                  {error}. Por favor, intenta de nuevo más tarde.
              </p>
          </div>
      </div>
  );

  if (!content) return (
      <div className="loading-container">
          <div className="loading-content">
              <div className="loading-spinner"></div>
              <h5 className="loading-text">Estamos trabajando en estas rutas</h5>
          </div>
      </div>
  );

  return <ListaRutas rutas={content} iconos={iconos} route={route}/>;
};

// Componente de avatar de usuario
const UserAvatar = ({ imageSrc, alt, index }) => {
  return (
    <div 
      className="avatar" 
      style={{ 
        backgroundImage: `url(${imageSrc || 'https://via.placeholder.com/40'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginLeft: index > 0 ? '-8px' : '0' // Superposición de avatares
      }}
      title={alt || 'Usuario'}
    ></div>
  );
};

// Componente para mostrar los avatares de usuarios
const UserAvatars = ({ rutaId }) => {
  const { comentarios, loading, error } = useRutaComentarios(rutaId);
  
  // Si está cargando o hay error, mostrar los avatares de placeholder
  if (loading || error || comentarios.length === 0) {
    return (
      <div className="avatar-group">
        <div className="avatar"></div>
        <div className="avatar"></div>
      </div>
    );
  }
  
  // Mostrar hasta 3 avatares de usuarios que han comentado
  return (
    <div className="avatar-group">
      {comentarios.slice(0, 3).map((comentario, index) => (
        <UserAvatar 
          key={comentario.id}
          imageSrc={comentario.foto_usuario}
          alt={comentario.nombre_usuario}
          index={index}
        />
      ))}
    </div>
  );
};

const ListaRutas = ({ rutas, iconos, route}) => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({});
  const [rutasFiltradas, setRutasFiltradas] = useState(rutas);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

  const handle = (nombreRuta) => {
    navigate(`/rutas/caracteristicas/${nombreRuta}`);
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

  // Función para determinar el texto a mostrar junto a los avatares
  const getUserCountText = (ruta) => {
    if (parseFloat(ruta.calificacion) === 0) {
      return "¡Recién agregada!";
    } else if (ruta.completaron_ruta > 0) {
      return `${ruta.completaron_ruta} personas completaron esta ruta`;
    } else {
      return "¡Visitada recientemente!";
    }
  };

  return (
    <>
      <Helmet>
        <title>Rutas y Miradores</title>
        <meta name="description" content="Descrubre las mejores rutas y miradores"/>
      </Helmet>
      <div className="rutas-container">
        <FiltrosTitulo 
          nombre={'Paisajes & Miradores'}
          filtros={filtros}
          filtroSeleccionado={filtroSeleccionado}
          manejarClick={manejarClick}
        />
        <div className="container-seccion-lista-rutas">
          {rutasFiltradas.map((item) => (
            <div key={item.id} onClick={() => handle(item.nombre)} className="container-item-lista-rutas">
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
                    {/* Reemplazamos la versión anterior estática por el componente dinámico */}
                    <UserAvatars rutaId={item.id} />
                    <span>{getUserCountText(item)}</span>
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
    </>
  );
};

export default MainComponentListadoRutas;
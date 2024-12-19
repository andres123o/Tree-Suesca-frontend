import React, { useState, useEffect } from "react";
import { Heart, Star, Users, MapPin } from 'lucide-react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import FiltrosTitulo from "../common/titulo-filtro";
import OptimizedImageLarge from '../common/optimizarImagenesVersion';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const ListadoActividades = ({ titulo }) => {
  const { destino_id } = useParams()
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({});
  const [actividades, setActividades] = useState([]);
  const [actividadesFiltradas, setActividadesFiltradas] = useState([]);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

  const filtrarActividadesValidas = (data) => {
    return data.filter(actividad => {
      return actividad.name !== "Pendiente" &&
        actividad.img !== "" &&
        actividad.logo !== ""
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://tree-suesca-backend-production.up.railway.app/api/v1/listados/demas/${destino_id}/actividades`
        );
        
        const actividadesFiltradas = filtrarActividadesValidas(response.data)
        setActividades(actividadesFiltradas);
        setActividadesFiltradas(actividadesFiltradas);

        const nuevosFiltros = {};
        actividadesFiltradas.forEach((act) => {
          Object.entries(act.items).forEach(([key, value]) => {
            if (!nuevosFiltros[key]) {
              nuevosFiltros[key] = new Set();
            }
            if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
              nuevosFiltros[key].add({value});
            }
          });
        });
        setFiltros(nuevosFiltros);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [destino_id]);

  const manejarClick = (key, value) => {
    setFiltroSeleccionado(value.value);
    const filtradas = actividades.filter(act => act.items[key] === value.value);
    setActividadesFiltradas(filtradas);
  };

  const handleCardClick = (name) => {
    navigate(`/actividad/${encodeURIComponent(name)}`);
  };

  return (
    <div className="actividades-container">
      <FiltrosTitulo
        nombre={titulo}
        filtros={filtros}
        filtroSeleccionado={filtroSeleccionado}
        manejarClick={manejarClick}
      />
      
      <div className="actividades-grid">
        {actividadesFiltradas.map((actividad) => (
          <div
            key={actividad.name}
            className="actividad-card"
            onClick={() => handleCardClick(actividad.name)}
          >
            <div className="image-container">
              <OptimizedImageLarge 
                className='activity-image'
                imageUrl={actividad.img}
                alt={actividad.name}
              />
              <button className="favorite-btn">
                <Heart size={18} />
              </button>
              {actividad.calificacion === 0 && (
                <span className="badge">Nuevo</span>
              )}
            </div>

            <div className="content">
              <div className="header-container">
                <div className="logo-container">
                    <img 
                    src={actividad.logo} 
                    alt={`Logo de ${actividad.name}`}
                    className="actividad-logo"
                    />
                </div>
                
                <div className="activity-info">
                    <h3 className="activity-title">{actividad.name}</h3>
                    <div className="rating">
                    <Star size={14} className="star-icon" />
                    <span>{actividad.calificacion === 0 ? "Nuevo" : actividad.calificacion}</span>
                    </div>
                </div>
              </div>

              <div className="participants-info">
                <div className="profile-circles">
                  <div className="profile-circle"></div>
                  <div className="profile-circle"></div>
                </div>
                <span>+124 personas este mes</span>
              </div>

              <div className="price-booking">
                <div className="price">
                  <span className="amount">{formatCurrency(actividad.precio)}</span>
                  <span className="per-person">/persona</span>
                </div>
                <button 
                    className="book-btn" 
                    onClick={() => handleCardClick(actividad.name)}
                >Reservar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListadoActividades;
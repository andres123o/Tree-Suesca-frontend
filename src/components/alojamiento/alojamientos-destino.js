import React, { useState, useEffect } from "react";
import { Heart, Star, Users, BedDouble, Home } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import FiltrosTitulo from "../common/titulo-filtro";
import OptimizedImageLarge from '../common/optimizarImagenesVersion'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const ListadoAlojamiento = ({ titulo }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const destino_id = location.state?.destino_id;

  const [filtros, setFiltros] = useState({});
  const [alojamientos, setAlojamientos] = useState([]);
  const [alojamientoFiltrados, setAlojamientosFiltrados] = useState([]);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

  const filtearAlojamientosValidos = (data) => {
    return data.filter(alojamiento => {
      return alojamiento.name !== "Pendiente" &&
        alojamiento.img !== "" &&
        alojamiento.logo !== ""
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://tree-suesca-backend-production.up.railway.app/api/v1/listados/demas/${destino_id}/alojamientos`
        );
        
        const alojamientoFiltrados = filtearAlojamientosValidos(response.data)
        setAlojamientos(alojamientoFiltrados);
        setAlojamientosFiltrados(alojamientoFiltrados);

        const nuevosFiltros = {};
        alojamientoFiltrados.forEach((aloj) => {
          Object.entries(aloj.items).forEach(([key, value]) => {
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
    const filtrados = alojamientos.filter(aloj => aloj.items[key] === value.value);
    setAlojamientosFiltrados(filtrados);
  };

  const handleCardClick = (name) => {
    navigate(`/alojamiento/${encodeURIComponent(name)}`);
  };

  return (
    <div className="alojamientos-container">
      <FiltrosTitulo
        nombre={titulo}
        filtros={filtros}
        filtroSeleccionado={filtroSeleccionado}
        manejarClick={manejarClick}
      />
      
        <div className="alojamientos-grid">
            {alojamientoFiltrados.map((alojamiento) => (
            <div
                key={alojamiento.name}
                className="alojamiento-card"
                onClick={() => handleCardClick(alojamiento.name)}
            >
                <div className="image-container">
                <OptimizedImageLarge className='accommodation-image'
                    imageUrl={alojamiento.img}
                    alt={alojamiento.img}
                />
                <button className="favorite-btn">
                    <Heart size={18} />
                </button>
                {alojamiento.calificacion === 0 && (
                    <span className="badge">Nuevo</span>
                )}
                </div>

                <div className="content">
                {/* Header with logo, name and rating */}
                <div className="card-header">
                    <div className="logo-name-container">
                    <img 
                        src={alojamiento.logo} 
                        alt={`Logo de ${alojamiento.name}`}
                        className="alojamiento-logo"
                    />
                    <h3 className="accommodation-title-lista">{alojamiento.name}</h3>
                    </div>
                    <div className="rating">
                    <Star size={14} className="star-icon" />
                    <span>{alojamiento.calificacion === 0 ? "Nuevo" : alojamiento.calificacion}</span>
                    </div>
                </div>

                {/* Accommodation details */}
                <div className="details">
                    {alojamiento.equipamento.habitaciones} habitación • {' '}
                    {alojamiento.equipamento.camas} cama • {' '}
                    {alojamiento.equipamento.baños} baño
                </div>

                {/* Price and booking */}
                <div className="price-booking">
                    <div className="price">
                    <span className="amount">{formatCurrency(alojamiento.precio)}</span>
                    <span className="per-night">/noche</span>
                    </div>
                    <button className="book-btn">Reservar</button>
                </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default ListadoAlojamiento;
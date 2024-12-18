import React, { useState, useEffect } from "react";
import ContainerMediano from "../common/container-mediano";
import FiltrosTitulo from "../common/titulo-filtro";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import OptimizedImageLarge from '../common/optimizarImagenesVersion';
import { Heart, Star, Users, MapPin, Calendar } from 'lucide-react';


const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  

const ListadoEventos = ({ titulo, icon, tipo, iconCalendar, fecha }) => {
   const location = useLocation();
   const navigate = useNavigate();
   const destino_id = location.state?.destino_id;
   const [filtros, setFiltros] = useState({});
   const [eventos, setEventos] = useState([]);
   const [eventosFiltrados, setEventosFiltrados] = useState([]);
   const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

   useEffect(() => {
       const fetchData = async () => {
           try {
               const response = await axios.get(
                   `https://tree-suesca-backend-production.up.railway.app/api/v1/listados/demas/${destino_id}/eventos`
               );
               setEventos(response.data);
               setEventosFiltrados(response.data);

               const nuevosFiltros = {};
               response.data.forEach((evt) => {
                   Object.entries(evt.items).forEach(([key, value]) => {
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
       const filtrados = eventos.filter(evt => evt.items[key] === value.value);
       setEventosFiltrados(filtrados);
   };

   const handleCardClick = (description) => {
    navigate(`/evento/${encodeURIComponent(description)}`);
  };

   return (
       <>
            <div className="actividades-container">
                <FiltrosTitulo
                    nombre={titulo}
                    filtros={filtros}
                    filtroSeleccionado={filtroSeleccionado}
                    manejarClick={manejarClick}
                />
                
                <div className="actividades-grid">
                    {eventosFiltrados.map((evento) => (
                    <div
                        key={evento.name}
                        className="actividad-card"
                        onClick={() => handleCardClick(evento.name)}
                    >
                        <div className="image-container">
                        <OptimizedImageLarge 
                            className='activity-image'
                            imageUrl={evento.img}
                            alt={evento.name}
                        />
                        <button className="favorite-btn">
                            <Heart size={18} />
                        </button>
                        {evento.calificacion === 0 && (
                            <span className="badge">Nuevo</span>
                        )}
                        </div>

                        <div className="content">
                        <div className="header-container">
                            <div className="logo-container">
                                <img 
                                src={evento.logo} 
                                alt={`Logo de ${evento.name}`}
                                className="actividad-logo"
                                />
                            </div>
                            
                            <div className="activity-info">
                                <h3 className="activity-title">{evento.name}</h3>
                                <div className="rating">
                                <Star size={14} className="star-icon" />
                                <span>{evento.calificacion === 0 ? "Nuevo" : evento.calificacion}</span>
                                </div>
                            </div>
                        </div>

                        <div className="participants-info">
                            <Calendar size={14} className="calendar-icon" />
                            <span>{evento.fecha}</span>
                        </div>

                        <div className="price-booking">
                            <div className="price">
                            <span className="amount">{formatCurrency(evento.precio)}</span>
                            <span className="per-person">/persona</span>
                            </div>
                            <button 
                                className="book-btn" 
                                onClick={() => handleCardClick(evento.name)}
                            >Reservar</button>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
       </>
   );
};

export default ListadoEventos;
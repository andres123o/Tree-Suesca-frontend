import React, { useState, useEffect } from "react";
import ContainerPequeño from "../common/container-pequeño";
import FiltrosTitulo from "../common/titulo-filtro";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { Heart, Star, Users, BedDouble, Home } from 'lucide-react';
import OptimizedImageLarge from '../common/optimizarImagenesVersion'
import { useNavigate} from "react-router-dom";

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
};

const ListadoBares = ( { icono1, icono2, titulo, tipoEstablecimiento} ) => {
    const { destino_id } = useParams()
    const navigate = useNavigate();
    const tipo = 'bares'

    const [filtros, setFiltros] = useState({});
    const [bares, setBares] = useState([]);
    const [baresFiltrados, setBaresFiltrados] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

    const filtrarBaresValidos = (data) => {
        return data.filter(bar => {
            // Verificar si el restaurante tiene toda la información necesaria
            return bar.name !== "Pendiente" &&
                   bar.img !== "" &&
                   bar.logo !== ""
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://tree-suesca-backend-production.up.railway.app/api/v1/listados/${destino_id}/${tipo}`
                );

                const alojamientoFiltrados = filtrarBaresValidos(response.data)
                setBares(alojamientoFiltrados);
                setBaresFiltrados(alojamientoFiltrados);
 
                const nuevosFiltros = {};
                alojamientoFiltrados.forEach((bar) => {
                    Object.entries(bar.items).forEach(([key, value]) => {
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
    }, [destino_id, tipo]);
 
    const manejarClick = (key, value) => {
        setFiltroSeleccionado(value.value);
        const nuevasRutas = bares.filter(bar => bar.items[key] === value.value);
        setBaresFiltrados(nuevasRutas);
    };

    const handleCardClick = (name) => {
        navigate(`/establecimiento/bares/${encodeURIComponent(name)}`);
    };

    return (
        <>
            <div className="alojamientos-container">
                <FiltrosTitulo
                    nombre={titulo}
                    filtros={filtros}
                    filtroSeleccionado={filtroSeleccionado}
                    manejarClick={manejarClick}
                />
                
                <div className="alojamientos-grid">
                    {baresFiltrados.map((bares) => (
                    <div
                        key={bares.name}
                        className="alojamiento-card"
                        onClick={() => handleCardClick(bares.name)}
                    >
                        <div className="image-container">
                        <OptimizedImageLarge className='accommodation-image'
                            imageUrl={bares.img}
                            alt={bares.img}
                        />
                        <button className="favorite-btn">
                            <Heart size={18} />
                        </button>
                        {bares.calificacion === 0 && (
                            <span className="badge">Nuevo</span>
                        )}
                        </div>

                        <div className="content">
                        {/* Header with logo, name and rating */}
                        <div className="card-header">
                            <div className="logo-name-container">
                            <img 
                                src={bares.logo} 
                                alt={`Logo de ${bares.name}`}
                                className="alojamiento-logo"
                            />
                            <h3 className="accommodation-title-lista">{bares.name}</h3>
                            </div>
                            <div className="rating">
                            <Star size={14} className="star-icon" />
                            <span>{bares.calificacion === 0 ? "Nuevo" : bares.calificacion}</span>
                            </div>
                        </div>

                        <div className="participants-info">
                            <div className="profile-circles">
                            <div className="profile-circle"></div>
                            <div className="profile-circle"></div>
                            </div>
                            <span>¡Nuevo ambiente!</span>
                        </div>

                        {/* Price and booking */}
                        <div className="price-booking">
                            <div className="price">
                            <span className="amount">{formatCurrency(bares.precio_promedio)}</span>
                            <span className="per-night">/Precio promedio</span>
                            </div>
                            <button className="book-btn">Reservar</button>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )

}

export default ListadoBares;
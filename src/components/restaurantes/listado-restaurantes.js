import React, { useState, useEffect } from "react";
import ContainerPequeño from "../common/container-pequeño";
import FiltrosTitulo from "../common/titulo-filtro";
import axios from "axios";
import { Heart, Star, Users, BedDouble, Home } from 'lucide-react';
import { useLocation, useParams } from "react-router-dom";
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

const ListadoRestaurantes = ( { titulo, icono1, icono2, tipoEstablecimiento}) => {
    const { destino_id } = useParams()
    const navigate = useNavigate();
    const tipo = 'restaurantes' 

    const [filtros, setFiltros] = useState({});
    const [restaurantes, setRestaurantes] = useState([]);
    const [restaurantesFiltrados, setRestaurantesFiltrados] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

    const filtrarRestaurantesValidos = (data) => {
        return data.filter(restaurante => {
            // Verificar si el restaurante tiene toda la información necesaria
            return restaurante.name !== "Pendiente" &&
                   restaurante.img !== "" &&
                   restaurante.logo !== ""
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://tree-suesca-backend-production.up.railway.app/api/v1/listados/${destino_id}/${tipo}`
                );

                const restaurantesFiltrados = filtrarRestaurantesValidos(response.data);

                setRestaurantes(restaurantesFiltrados);
                setRestaurantesFiltrados(restaurantesFiltrados);

                const nuevosFiltros = {};
                restaurantesFiltrados.forEach((res) => {
                    Object.entries(res.items).forEach(([key, value]) => {
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
        const nuevasRutas = restaurantes.filter(res => res.items[key] === value.value);
        setRestaurantesFiltrados(nuevasRutas);
    };

    const handleCardClick = (name) => {
        navigate(`/establecimiento/restaurante/${encodeURIComponent(name)}`);
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
                    {restaurantesFiltrados.map((restaurante) => (
                    <div
                        key={restaurante.name}
                        className="alojamiento-card"
                        onClick={() => handleCardClick(restaurante.name)}
                    >
                        <div className="image-container">
                        <OptimizedImageLarge className='accommodation-image'
                            imageUrl={restaurante.img}
                            alt={restaurante.img}
                        />
                        <button className="favorite-btn">
                            <Heart size={18} />
                        </button>
                        {restaurante.calificacion === 0 && (
                            <span className="badge">Nuevo</span>
                        )}
                        </div>

                        <div className="content">
                        {/* Header with logo, name and rating */}
                        <div className="card-header">
                            <div className="logo-name-container">
                            <img 
                                src={restaurante.logo} 
                                alt={`Logo de ${restaurante.name}`}
                                className="alojamiento-logo"
                            />
                            <h3 className="accommodation-title-lista">{restaurante.name}</h3>
                            </div>
                            <div className="rating">
                            <Star size={14} className="star-icon" />
                            <span>{restaurante.calificacion === 0 ? "Nuevo" : restaurante.calificacion}</span>
                            </div>
                        </div>

                        <div className="participants-info">
                            <div className="profile-circles">
                            <div className="profile-circle"></div>
                            <div className="profile-circle"></div>
                            </div>
                            <span>+124 personas este mes</span>
                        </div>

                        {/* Price and booking */}
                        <div className="price-booking">
                            <div className="price">
                            <span className="amount">{formatCurrency(restaurante.precio_promedio)}</span>
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

export default ListadoRestaurantes
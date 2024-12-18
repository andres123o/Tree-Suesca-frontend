import React, { useState, useEffect } from "react";
import axios from 'axios';
import SearchBox from '../home-destino/searchBox';
import { useNavigate } from "react-router-dom";
import { MdExplore } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import OptimizedImage from "../common/optimzarImg";
import { MdError } from "react-icons/md";

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1/destinos/filtros';

const Home = () => {
    const navigate = useNavigate();
    const [destinos, setDestinos] = useState([]);
    const [filtros, setFiltros] = useState({});
    const [rutasFiltradas, setRutasFiltradas] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);
    const [filtroAbierto, setFiltroAbierto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestinos = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                setDestinos(response.data);
                setRutasFiltradas(response.data);
                initializeFiltros(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinos();
    }, []);

    const initializeFiltros = (data) => {
        const nuevosFiltros = {};
        data.forEach((destino) => {
            Object.entries(destino.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                    nuevosFiltros[key] = new Set();
                }
                if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                    nuevosFiltros[key].add({value});
                }
            });
        });
        setFiltros(nuevosFiltros);
    };

    const manejarClick = (key, value) => {
        setFiltroSeleccionado(value.value);
        const nuevasRutas = destinos.filter(destino => destino.items[key] === value.value);
        setRutasFiltradas(nuevasRutas);
    };
    
    const handle = (destino_id, municipio) => {
        navigate(`/home/destino/${municipio}`, {
            state: { destino_id }
        });
    };

    // Función para determinar el tipo de badge basado en la calificación
    const getBadgeType = (calificacion) => {
        if (calificacion === 0) return 'new';
        if (calificacion >= 4.6) return 'popular';
        return null;
    };

    // Función para determinar el tipo de destino (simulado por ahora)
    const getDestinationType = (municipio) => {
        // Esto sería reemplazado por datos reales de la API
        return municipio === "Suesca" ? "Aventura" : "Familiar";
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-spinner"></div>
                <h5 className="loading-text">Cargando destinos...</h5>
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

    return (
        <>
            <div className="header">
                <div className="title-header">
                    <h5>Destino <span className="mas-home"><strong>+</strong></span></h5>
                </div>
                <div className="back-home">   
                    <img src="https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png" alt="Tree Suesca" />
                </div>
            </div>

            <div className='container-landing'>
                <div className='titulo-landing'>
                    <h2>Explora destinos sin complicaciones</h2>
                    <h5>Toda la información que necesitas, en un solo lugar.</h5>
                </div>
            </div>

            <div className='separador'></div>
            
            <SearchBox placeholder="A donde quieres ir..." />

            <div className="filtros-dropdown">
                {Object.entries(filtros).map(([key, values]) => (
                    <div className="filtro-item" key={key}>
                        <button 
                            className="filtro-button"
                            onClick={() => setFiltroAbierto(filtroAbierto === key ? null : key)}
                        >
                            {key} <IoMdArrowDropdown className='icono-arrow-down'/>
                        </button>
                        {filtroAbierto === key && (
                            <div className="filtro-opciones">
                                {Array.from(values).map((value, index) => (
                                    <div
                                        key={index}
                                        onClick={() => manejarClick(key, value)}
                                        className={filtroSeleccionado === value.value ? 'opcion-seleccionada' : ''}
                                    >
                                        {value.value}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="container-seccion-lista-home">
                {rutasFiltradas.map((item) => (
                    <div 
                        key={item.id} 
                        className="destination-card"
                        onClick={() => handle(item.id, item.municipio)}
                    >
                        <div className="image-section">
                            <OptimizedImage
                                imageUrl={item.img}
                                alt={item.municipio}
                                className={'destination-image'}
                            />
                            <div className="destination-badges">
                                {getBadgeType(item.calificacion) && (
                                    <span className={`badge ${getBadgeType(item.calificacion)}`}>
                                        {getBadgeType(item.calificacion) === 'new' ? 'Nuevo' : 'Popular'}
                                    </span>
                                )}
                            </div>
                            <div className="destination-rating">
                                <span>{item.calificacion}</span>
                                <img src="/utils/icons8-estrella-48.png" alt="estrella" />
                            </div>
                        </div>

                        <div className="destination-info">
                            <div className="destination-header">
                                <h3>{item.municipio}, {item.departamento}</h3>
                                <span className="destination-type">
                                    {getDestinationType(item.municipio)}
                                </span>
                            </div>
                            <div className="destination-description">
                                <MdExplore className="explore-icon" />
                                <p>{item.frase}</p>
                            </div>
                            <div className="explorar-boton">
                                <div className="destination-stats">
                                    <FaUserGroup className="visitors-icon" />
                                    <span>150 visitantes este mes</span>
                                </div>
                                <button className="book-btn" onClick={() => handle(item.id, item.municipio)}>Explorar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
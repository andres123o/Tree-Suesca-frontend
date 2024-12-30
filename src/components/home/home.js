import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MdExplore } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import OptimizedImage from "../common/optimzarImg";
import { MdError } from "react-icons/md";
import SearchBox from '../home-destino/searchBox'

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
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

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

    // 1. Track tiempo en página
    useEffect(() => {
        const startTime = Date.now();
        
        return () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000); // en segundos
            window.gtag('event', 'time_on_page', {
                'event_category': 'User_Engagement',
                'event_label': 'Home',
                'value': timeSpent
            });
        };
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
        const newActiveFilters = {
            ...activeFilters,
            [key]: value.value
        };
        setActiveFilters(newActiveFilters);
        aplicarFiltros(newActiveFilters);
    };    

    // Función separada para manejar la búsqueda
    const handleSearch = (value) => {
        setSearchTerm(value);
        
        if (!value.trim()) {
            setSearchResults(destinos);
            // Si hay filtros activos, mostrar solo los resultados filtrados
            if (Object.keys(activeFilters).length > 0) {
                setRutasFiltradas(filteredResults);
            } else {
                setRutasFiltradas(destinos);
            }
            return;
        }

        const searchLower = value.toLowerCase();
        const results = destinos.filter(destino => 
            destino.municipio.toLowerCase().includes(searchLower) ||
            destino.departamento.toLowerCase().includes(searchLower) ||
            destino.frase.toLowerCase().includes(searchLower)
        );
        
        setSearchResults(results);
        
        // Si hay filtros activos, aplicar la búsqueda sobre los resultados filtrados
        if (Object.keys(activeFilters).length > 0) {
            const combinedResults = results.filter(destino => 
                filteredResults.some(filtered => filtered.id === destino.id)
            );
            setRutasFiltradas(combinedResults);
        } else {
            setRutasFiltradas(results);
        }
    };
    
    const handle = (destino_id, municipio) => {
        window.gtag('event', 'destination_click', {
            'event_category': 'User_Engagement',
            'event_label': municipio,
            'destino_id': destino_id
        });

        navigate(`/home/destino/${destino_id}`, {
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

    // Función separada para manejar los filtros
    const aplicarFiltros = (filters) => {
        if (Object.keys(filters).length === 0) {
            setFilteredResults(destinos);
            // Si hay término de búsqueda, mostrar solo los resultados de la búsqueda
            if (searchTerm.trim()) {
                setRutasFiltradas(searchResults);
            } else {
                setRutasFiltradas(destinos);
            }
            return;
        }

        const results = destinos.filter(destino => {
            return Object.entries(filters).every(([key, value]) => 
                destino.items[key] === value
            );
        });
        
        setFilteredResults(results);
        
        // Si hay término de búsqueda, aplicar los filtros sobre los resultados de la búsqueda
        if (searchTerm.trim()) {
            const combinedResults = results.filter(destino => 
                searchResults.some(searched => searched.id === destino.id)
            );
            setRutasFiltradas(combinedResults);
        } else {
            setRutasFiltradas(results);
        }
    };

    const limpiarFiltros = () => {
        setActiveFilters({});
        setFilteredResults(destinos);
        setFiltroSeleccionado(null);
        setFiltroAbierto(null);
        
        // Mantener los resultados de la búsqueda si hay término de búsqueda
        if (searchTerm.trim()) {
            setRutasFiltradas(searchResults);
        } else {
            setRutasFiltradas(destinos);
        }
    };

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
            
            <SearchBox 
                placeholder="A donde quieres ir..." 
                onSearch={handleSearch}
            />

            <div className="filtros-container">
                <div className="filtros-dropdown">
                    {Object.entries(filtros).map(([key, values]) => (
                        <div className="filtro-item" key={key}>
                            <button 
                                className={`filtro-button ${activeFilters[key] ? 'active' : ''}`}
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
                                            className={activeFilters[key] === value.value ? 'opcion-seleccionada' : ''}
                                        >
                                            {value.value}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {(Object.keys(activeFilters).length > 0) && (
                        <button 
                            className="limpiar-filtros-btn"
                            onClick={limpiarFiltros}
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
                
                {rutasFiltradas.length === 0 && (
                    <div className="no-resultados">
                        <p>No se encontraron destinos con los criterios seleccionados</p>
                    </div>
                )}
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
                                {item.calificacion > 0 ? (
                                    <>
                                        <span>{item.calificacion}</span>
                                        <img src="/utils/icons8-estrella-48.png" alt="estrella" />
                                    </>
                                ) :
                                    <>
                                        <img src="/utils/icons8-estrella-48.png" alt="estrella" />
                                    </>
                                }
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
                                    <span>¡Sé de los primeros en explorar!</span>
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
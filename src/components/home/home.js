import React, { useState, useEffect } from "react";
import axios from 'axios';
import SearchBox from '../home-destino/searchBox';
import { useNavigate } from "react-router-dom";
import { MdExplore } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
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

            <div className="container-seccion-lista-rutas">
                {rutasFiltradas.map((item) => (
                    <div 
                        key={item.id} 
                        className="container-item-lista-rutas"
                        onClick={() => handle(item.id, item.municipio)}
                    >
                        <OptimizedImage className='container-img-ruta'
                            imageUrl={item.img}
                            alt={item.municipio}
                        />
                        <div className="container-info-ruta">
                            <div className="container-nombre-titulo">
                                <h5>{item.municipio}, {item.departamento}.</h5>
                                <div className="container-clasificacion-ruta">
                                    <p>
                                        {item.calificacion}
                                        <img src="/utils/icons8-estrella-48.png" alt="estrella" />
                                    </p>
                                </div>
                            </div>
                            <div className="container-descripcion-caracteristicas">
                                <MdExplore />
                                <p>{item.frase}.</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
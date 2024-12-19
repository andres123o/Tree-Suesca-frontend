import React, { useEffect, useState } from 'react';
import ScrollToTop  from '../common/scrollToTop';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { MdError } from "react-icons/md";

// Componente home destino
import Header from './header';
import Descripcion from './descripcion';
import SearchBox from './searchBox'
import ViewpointsSection from './CategoryCarrusel';
import PopularActivities from './Tendencias'
import AccommodationsSection from './ListaTop3';
import DiscoverSection from '../home-destino/todo'
import DestinationInfo from '../home-destino/tips'


const Homedestino = () => {
    const navigate = useNavigate()
    const { destino_id } = useParams()
    const location = useLocation();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestinoContent = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://tree-suesca-backend-production.up.railway.app/api/v1/destinos/${destino_id}/content`
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

    if (loading) return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-spinner"></div>
                <h5 className="loading-text">Cargando Suesca...</h5>
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
                <h5 className="loading-text">Estamos trabajando en este destino</h5>
            </div>
        </div>
    );

    const { 
        restaurantes, bares, tendencias, actividades, 
        eventos, alojamientos, municipio
    } = content;

    const infoDes = {
        imagenes: content.imagenes,
        id: destino_id,
        frase: content.frase,
        descripcion: content.descripcion,
        epocas: content.epocas,
        clima: content.clima,
        seguridad: content.seguridad,
        transporte: content.transporte
    };

    return (
        <>
            <ScrollToTop />
            <Header destino = {municipio}/>
            <SearchBox 
                placeholder='Que quieres hacer...'
            />
            <Descripcion 
                destino={infoDes}
                destino_id={destino_id}
            />
            <DiscoverSection destino_id={destino_id}/>
            <PopularActivities contenido = { tendencias } />
            <ViewpointsSection imagenes={content.imagenes} destino_id={destino_id} />
            <AccommodationsSection alojamientos={alojamientos} destino_id={destino_id} />
            <DestinationInfo destino={infoDes} />
        </>
    )
}

export default Homedestino;
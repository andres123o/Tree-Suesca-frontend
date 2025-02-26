import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import ScrollToTop  from '../common/scrollToTop';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { MdError } from "react-icons/md";
import { Helmet } from 'react-helmet-async';

// Componente home destino
import Header from './header';
import Descripcion from './descripcion';
import ViewpointsSection from './CategoryCarrusel';
import PopularActivities from './Tendencias'
import AccommodationsSection from './ListaTop3';
import DiscoverSection from '../home-destino/todo'
import DestinationInfo from '../home-destino/tips'


const Analytics = {
    // Track tiempo en página
    trackTimeSpent: (municipio, timeSpent) => {
        try {
            if (!window?.gtag) return;
            if (timeSpent < 0) return;
            
            window.gtag('event', 'tiempo_destino', {
                nombre_destino: municipio || 'desconocido',
                tiempo_segundos: timeSpent,
                tipo_engagement: 'tiempo_en_pagina'
            });

            if (process.env.NODE_ENV === 'development') {
                console.log('Analytics - Tiempo:', {
                    destino: municipio,
                    tiempo: timeSpent
                });
            }
        } catch (error) {
            console.error('Error Analytics - Tiempo:', error);
        }
    },
    // Track errores de carga (mantener esto es importante)
    trackError: (municipio, errorType) => {
        try {
            if (!window?.gtag) return;
            
            window.gtag('event', 'error_carga', {
                nombre_destino: municipio || 'desconocido',
                tipo_error: errorType,
                pagina: 'destino'
            });

            if (process.env.NODE_ENV === 'development') {
                console.log('Analytics - Error:', { 
                    destino: municipio,
                    error: errorType 
                });
            }
        } catch (error) {
            console.error('Error Analytics - Track Error:', error);
        }
    }
};

const Homedestino = () => {
    const navigate = useNavigate()
    const { destino_id } = useParams()
    const location = useLocation();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!content?.municipio) return; // Evitar tracking sin municipio
        
        const startTime = Date.now();
        return () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            Analytics.trackTimeSpent(content.municipio, timeSpent);
        };
    }, [content?.municipio]);

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

                Analytics.trackError(destino_id, 'error_fetch_contenido');
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
                <h5 className="loading-text">Cargando Destino...</h5>
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
            <Helmet>
                <title>{municipio}</title>
                <meta name="description" content={`Descubre las mejores rutas y experiencias en ${municipio}`}  />
            </Helmet>
            <ScrollToTop />
            <Header destino = {municipio}/>
            
            <Descripcion 
                destino={infoDes}
                destino_id={destino_id}
            />

            <div className='separador'></div>
            <DiscoverSection destino_id={destino_id}/>
            <div className='container-tendencias-miradores'>
                <PopularActivities contenido = { tendencias } />
                <ViewpointsSection 
                    imagenes={content.imagenes}
                    destino_id={destino_id}
                    municipio={municipio}
                />
            </div>
            <AccommodationsSection 
                alojamientos={alojamientos} 
                destino_id={destino_id} 
            />
            <DestinationInfo 
                destino={infoDes} 
            />
        </>
    )
}

export default Homedestino;
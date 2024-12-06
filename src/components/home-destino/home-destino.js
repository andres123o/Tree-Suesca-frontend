import React, { useEffect, useState } from 'react';
import ScrollToTop  from '../common/scrollToTop';
import { useLocation } from "react-router-dom";
import axios from 'axios'

// Componente home destino
import Header from './header';
import Descripcion from './descripcion';
import SearchBox from './searchBox'
import CategoryCarousel from './CategoryCarrusel';
import PopularActivities from './Tendencias'
import ListaTop3 from './ListaTop3';
import Carrusel from './carrusel';

//  Iconos pagina principal
import { IoFastFoodOutline } from "react-icons/io5";
import { FaWineBottle } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { MdHotel } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { PiMapPinAreaFill } from "react-icons/pi";

// Variables de ejemplo de respuesta a la API por destino
const destino = 'Suesca'

const Homedestino = () => {
    const location = useLocation();
    const destino_id = location.state?.destino_id;
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

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!content) return <div>No hay contenido disponible</div>;

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
            />
            <PopularActivities contenido = { tendencias } />
            <CategoryCarousel
                destino={destino_id}
            />
            <Carrusel 
                actividadesDestino = { actividades }
                titulo = 'Actividades'
                icon={<FaPerson className="Faperson"/>}
                tipo = 'Por persona:'
                route= 'actividades'
                routeIndividual= 'actividad'
                destino_id={destino_id}
            />
            <ListaTop3 
                rest = {restaurantes}
                titulo = 'Restaurantes'
                icono1 = {<IoFastFoodOutline className='Faperson'/>} 
                icono2 = { <PiMapPinAreaFill className='Faperson'/> }
                tipo = 'Platos desde'    
                route= 'restaurantes'
                tipoEstablecimiento= 'restaurante'
                destino_id={destino_id}
            />
            <Carrusel 
                actividadesDestino = { eventos }
                titulo = 'Eventos'
                icon={<FaPerson className="Faperson"/>}
                iconCalendar={<IoCalendarOutline className="FaCalendar"/>}
                fecha = '30 Oct'
                tipo = 'Desde:'
                route= 'eventos'
                routeIndividual= 'evento'
                destino_id={destino_id}
            />
            <ListaTop3 
                rest = {bares}
                titulo = 'Bares y Cafes'
                icono1 = {<FaWineBottle className='Faperson'/>} 
                icono2 = { <PiMapPinAreaFill className='Faperson'/> }
                tipo = 'Botellas desde'
                route= 'fiesta-amigos'
                tipoEstablecimiento= 'bares'
                destino_id={destino_id}
            />
            <Carrusel 
                actividadesDestino= { alojamientos }
                titulo= 'Alojamientos'
                icon={ <MdHotel className="Faperson" />}
                noche = 'noche'
                route= 'alojamientos'
                routeIndividual= 'alojamiento'
                destino_id={destino_id}
            />
        </>
    )
}

export default Homedestino;
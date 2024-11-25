import React, { useEffect, useState } from 'react';
import ScrollToTop  from '../common/scrollToTop';
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

const actividadesRuta = [
    {
        id: 1,
        actividad: 'Senderismo',
        img: 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1729024921/7185cd4dab74597c497c2a4d24f81fbb_rt3kne.jpg'
    },
    {
        id: 2,
        actividad: 'BiciTour',
        img: 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1729024921/2fa269f55809f5c403c1f9014ce7efe9_mssuak.jpg'
    },
    {
        id: 3,
        actividad: 'Moto',
        img: 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1729024921/moto_x6irw4.jpg'        
    },
    {
        id: 4,
        actividad: 'Automovil',
        img: 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1729024921/Auto0_d5fovj.jpg'        
    }
]


const Homedestino = ({restaurantes, bares, tendencias, actividades, eventos, alojamientos}) => {

    return (
        <>
            <ScrollToTop />
            <Header destino = {destino}/>
            <Descripcion />
            <SearchBox 
                placeholder='Que quieres hacer...'
            />
            <CategoryCarousel actividades = {actividadesRuta} />
            <PopularActivities contenido = { tendencias } />
            <ListaTop3 
                rest = {restaurantes}
                titulo = 'Restaurantes'
                icono1 = {<IoFastFoodOutline className='Faperson'/>} 
                icono2 = { <PiMapPinAreaFill className='Faperson'/> }
                tipo = 'Platos desde'    
                route= 'restaurantes'
                tipoEstablecimiento= 'restaurante'
            />
            <Carrusel 
                actividadesDestino = { actividades }
                titulo = 'Actividades'
                icon={<FaPerson className="Faperson"/>}
                tipo = 'Por persona:'
                route= 'actividades'
                routeIndividual= 'actividad'
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
            />
            <ListaTop3 
                rest = {bares}
                titulo = 'Bares y Cafes'
                icono1 = {<FaWineBottle className='Faperson'/>} 
                icono2 = { <PiMapPinAreaFill className='Faperson'/> }
                tipo = 'Botellas desde'
                route= 'fiesta-amigos'
                tipoEstablecimiento= 'bares'
            />
            <Carrusel 
                actividadesDestino= { alojamientos }
                titulo= 'Alojamientos'
                icon={ <MdHotel className="Faperson" />}
                noche = 'noche'
                route= 'alojamientos'
                routeIndividual= 'alojamiento'
            />
        </>
    )
}

export default Homedestino;
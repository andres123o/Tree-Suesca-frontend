import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop  from './components/common/scrollToTop';
import axios from 'axios'
import ReactGA from 'react-ga4';



// Componentes de la pagina de inicio
import Home from './components/home/home'

// Componentes del Home por destino
import Homedestino from './components/home-destino/home-destino'

//  Componentes de la Lista de Rutas
import MainComponentListadoRutas from './components/listado-rutas/listaRutas';
import MainComponentRuta from './components/listado-rutas/descripcion-ruta-individual'
import MainComponentCoordenadaMapBox from './components/listado-rutas/seccion-mapa'

// Componentes de la lista de Restaurantes y Bares
import ListadoRestaurantes from './components/restaurantes/listado-restaurantes';
import MainComponent from './components/common/descripcion-establecimiento';
import ListadoBares from './components/bares/bares-recreacion'

// Componentes de Actividades en el destino
import ListadoActividades from './components/actividades/actividades-destino'
import MainComponentActivity from './components/actividades/descripcion-actividades'

// Componente de Eventos en el destino
import ListadoEventos from './components/eventos/eventos-destino'
import MainComponentEvent from './components/eventos/descripcion-evento';

//  Componentes dellistado de alojamientis
import ListadoAlojamiewnto from './components/alojamiento/alojamientos-destino'
import MainComponentAlojamiento from './components/alojamiento/alojamiento-descripcion'

//  Iconos pagina principal
import { IoFastFoodOutline } from "react-icons/io5";
import { FaWineBottle } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { MdHotel } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { PiMapPinAreaFill } from "react-icons/pi";


// Estilos
import './components/home-destino/index.css'
import './style/rutas/listadoRutas.css'
import './style/rutas/descripcionRuta.css'
import './style/restaurante-bares/establecimientos.css'
import './style/actividades/actividades.css'
import './style/alojamiento/alojamiento.css'
import './style/destino-home/destino.css'
import './style/rutas/mapaUbicacion.css'


// Iconos de la Lista de rutas
import { RiPinDistanceFill,  } from "react-icons/ri";
import { GiMountaintop } from "react-icons/gi";
import { FaRegClock } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";
import { Check } from 'lucide-react';


// Los pasamos como Array
const iconCaraceristicas = {
    distancia: <RiPinDistanceFill className='icon2' />,
    tiempo: <FaRegClock className='icon2' />,
    terreno: <GiMountaintop className='icon2' />,
    Dificultad: <FaGripfire className='icon2' />
}


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


function App() {
    const location = useLocation();

    // Inicializa GA4 con tu ID de medición
    
    useEffect(() => {
        ReactGA.initialize('G-PM724GHGMF', {
            debug: true,
            testMode: false,
            send_page_view: true 
        });
    
        ReactGA.send({ 
          hitType: 'pageview', 
          page: window.location.pathname 
        });
      }, []);

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/home/destino/:destino_id" element={<Homedestino />} />
    
                {/* Rutas */}
                <Route path='/rutas/Senderismo/:destino_id' element={
                    <MainComponentListadoRutas
                        iconos={iconCaraceristicas}
                        route='caracteristicas'
                    />
                } />
                <Route path='/rutas/caracteristicas/:nombre' element={<MainComponentRuta />} />
                <Route path='/ruta/mapa/:nombre' element={<MainComponentCoordenadaMapBox />} />
                
                {/* Restaurantes y Bares */}
                <Route path='/restaurantes/:destino_id' element={
                    <ListadoRestaurantes 
                        icono1={<IoFastFoodOutline className='Faperson'/>}
                        icono2={<PiMapPinAreaFill className='Faperson'/>}
                        titulo='Restaurantes'
                        tipoEstablecimiento='restaurante'
                    />
                } />
                <Route path='/fiesta-amigos/:destino_id' element={
                    <ListadoBares
                        icono1={<FaWineBottle className='Faperson'/>}
                        icono2={<PiMapPinAreaFill className='Faperson'/>}
                        titulo='Fiesta y Amigos'
                        tipoEstablecimiento='bares'
                    />
                } />
                
                {/* Actividades */}
                <Route path='/actividades/:destino_id' element={
                    <ListadoActividades 
                        titulo='Actividades'
                        icon={<FaPerson className="Faperson" />}
                        tipo='Por persona: '
                    />
                } />
                
                {/* Eventos */}
                <Route path='/eventos/:destino_id' element={
                    <ListadoEventos 
                        titulo='Eventos'
                        icon={<FaPerson className="Faperson" />}
                        tipo='Por persona: '
                        iconCalendar={<IoCalendarOutline className="FaCalendar"/>}
                        fecha='30 Oct'
                    />
                } />
                
                {/* Alojamientos */}
                <Route path='/alojamientos/:destino_id' element={
                    <ListadoAlojamiewnto 
                        titulo='Alojamientos'
                        icon={<MdHotel className="Faperson" />}
                        noche='noche'
                    />
                } />
    
                {/* Rutas para vistas detalladas */}
                <Route path='/establecimiento/:tipo/:nombre' element={<MainComponent />} />
                <Route path='/actividad/:description' element={<MainComponentActivity />} />
                <Route path='/evento/:description' element={<MainComponentEvent />} />
                <Route path='/alojamiento/:description' element={<MainComponentAlojamiento />} />
            </Routes>
        </>
    );
}

export default App;
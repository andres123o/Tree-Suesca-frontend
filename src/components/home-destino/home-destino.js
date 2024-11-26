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
        frase:'Paisajes & Miradores',
        descripcion: 'Descrubre paisajes increibles',
        img: 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1729024921/7185cd4dab74597c497c2a4d24f81fbb_rt3kne.jpg'
    },
    {
        id: 2,
        actividad: '',
        frase:'Tu Día Perfecto',
        descripcion: 'Te ayudamos con tu itinerario',
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732655684/f7170e1aaacc0df168e2a76f972431ce_xawmry.jpg'
    },
]

const descripcionDestino = {
    imagenes: [
        {
            id: 1,
            img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732581775/DSCN0050_qriko8.jpg'
        },
        {
            id: 2,
            img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732581769/DSCN0075_maagyr.jpg'
        },
        {
            id: 3,
            img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732581759/DSCN0080_eg8zl9.jpg'
        },
        {
            id: 4,
            img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732581727/WhatsApp_Image_2024-09-03_at_2.32.02_PM_kppziv.jpg'
        },
        {
            id: 5,
            img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732581626/20241014_165511_j36q56.jpg'
        },
        {
            id: 6,
            img: 'https://res.cloudinary.com/destinoplus/image/upload/v1730385491/tendencias/zz07pty30dcina1iwgut.jpg'
        }
    ],
    id: 1,
    frase: 'Paraíso para escaladores',
    descripcion: 'Suesca, a 45 minutos de Bogotá, es la capital colombiana de la escalada en roca, con más de 400 rutas en sus majestuosos farallones. Este pueblo mágico, donde pasó Gonzalo Jiménez de Quesada buscando El Dorado, combina historia colonial con adrenalina pura. Sus calles conservan tesoros como la casa del conquistador español y la residencia Cantini, mientras sus rocas guardan antiguas pictografías muiscas. Es el destino perfecto para quienes buscan escalada al amanecer y exploración histórica al atardecer.',
    epocas: 'Suesca brinda experiencias únicas todo el año, destacando especialmente de diciembre a marzo con su clima seco y soleado, perfecto para escalada y senderismo, con temperaturas entre 8°C y 20°C. Un segundo periodo ideal es julio-agosto, excelente para actividades al aire libre y atardeceres espectaculares. Durante abril-mayo y octubre-noviembre, las lluvias pintan el paisaje de verde intenso, aunque los escaladores prefieren evitar estos meses. ¡Consejo local: visita entre semana para una experiencia más tranquila!',
    clima: 'Suesca te recibe con un clima perfecto para la aventura: despierta con el místico frío de montaña, disfruta días soleados ideales para escalar y maravíllate con atardeceres frescos. ¡Prepárate como un local! Imprescindibles: chaqueta rompevientos para las mañanas, ropa cómoda en capas que puedas quitar o poner, zapatos comodos, bloqueador solar (¡el sol de montaña no perdona!), gorra, snacks  y mucha agua. ¡Bonus tip: una cámara para presumir tus hazañas!',
    seguridad: '¡Aventúrate en Suesca con la seguridad de un experto local! Aunque es un destino tranquilo, cuida tus pertenencias en zonas concurridas. Si vas a realizar actividades, siempre hazlo con guías certificados. Camina en grupo por los senderos señalizados y avisa a alguien sobre tu ruta. Ten a mano los contactos de emergencia: Policía local y Centro de Salud. Lleva efectivo, pero no de más - hay cajeros en el pueblo. ¡Bonus tip: los locales son super amables, no dudes en pedir ayuda!',
    transporte: '¡Llegar a Suesca es parte de la aventura! Desde Bogotá, toma la Autopista Norte hasta la salida a Tocancipá, siguiendo señales a Suesca (¡solo 45 minutos en carro!). Si prefieres transporte público, los buses salen cada hora desde la Terminal del Norte: busca "Alianza" - ¡tip de local: siéntate del lado derecho para vistas espectaculares! Ya en el pueblo, todo queda caminando, pero si te da pereza, los taxis locales conocen todos los sectores.',
}

const Homedestino = ({restaurantes, bares, tendencias, actividades, eventos, alojamientos}) => {

    return (
        <>
            <ScrollToTop />
            <Header destino = {destino}/>
            <SearchBox 
                placeholder='Que quieres hacer...'
            />
            <Descripcion 
                destino={descripcionDestino}
            />
            <PopularActivities contenido = { tendencias } />
            <CategoryCarousel actividades = {actividadesRuta} />
            <Carrusel 
                actividadesDestino = { actividades }
                titulo = 'Actividades'
                icon={<FaPerson className="Faperson"/>}
                tipo = 'Por persona:'
                route= 'actividades'
                routeIndividual= 'actividad'
            />
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
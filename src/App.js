import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Componentes de la pagina de inicio
import Header from './components/home/header';
import SearchBox from './components/home/searchBox'
import CategoryCarousel from './components/home/CategoryCarrusel';
import PopularActivities from './components/home/Tendencias'
import ListaTop3 from './components/home/ListaTop3';
import Carrusel from './components/home/carrusel';

//  Componentes de la Lista de Rutas
import ListaRutas from './components/listado-rutas/listaRutas';

// Componentes de la lista de Restaurantes
import ListadoRestaurantes from './components/restaurantes/listado-restaurantes';

// Componentes de Actividades en el destino
import ListadoActividades from './components/actividades/actividades-destino'

// Componente de Eventos en el destino
import ListadoEventos from './components/eventos/eventos-destino'

// Componentes de la Lista de Fiesta y amigos
import ListadoBares from './components/bares/bares-recreacion'

//  Componentes dellistado de alojamientis
import ListadoAlojamiewnto from './components/alojamiento/alojamientos-destino'

//  Iconos pagina principal
import { IoFastFoodOutline } from "react-icons/io5";
import { FaWineBottle } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { MdHotel } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { PiMapPinAreaFill } from "react-icons/pi";


// Estilo pagina principal
import './style/index.css';

// Estilos lista de rutas
import './style/rutas/listadoRutas.css';

// Iconos de la Lista de rutas
import { RiPinDistanceFill,  } from "react-icons/ri";
import { GiMountaintop } from "react-icons/gi";
import { FaRegClock } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";


// Los pasamos como Array
const iconCaraceristicas = {
    distancia: <RiPinDistanceFill className='icon2' />,
    tiempo: <FaRegClock className='icon2' />,
    terreno: <GiMountaintop className='icon2' />,
    Dificultad: <FaGripfire className='icon2' />
}

// Variables de ejemplo de respuesta a la API
const destino = 'Suesca'
const actividades = [
    {
        id: 1,
        actividad: 'Senderismo',
        img: '/utils/vectores-actividades/7185cd4dab74597c497c2a4d24f81fbb.jpg'
    },
    {
        id: 2,
        actividad: 'Bici Tour',
        img: '/utils/vectores-actividades/2fa269f55809f5c403c1f9014ce7efe9.jpg'
    },
    {
        id: 3,
        actividad: 'Moteros',
        img: '/utils/vectores-actividades/moto.jpg'        
    },
    {
        id: 4,
        actividad: 'Automovil',
        img: '/utils/vectores-actividades/Auto0.jpg'        
    }
]
const ejemploContenidoPopular = [
    {
        id: 1,
        img: '/utils/contenido-popular/bogota.jpeg'
    },
    {
        id: 2,
        img: '/utils/contenido-popular/guajita.jpeg'
    },
    {
        id: 3,
        img: '/utils/contenido-popular/mexico.jpg'
    },
    {
        id: 4,
        img: '/utils/contenido-popular/nevados.jpeg'
    },
]
const ejemploRestaurantes = [
    {
        id: 1,
        name: 'Burguer Texas',
        items: {
            'Tipo': 'Parrilla'
        },
        description: 'Delicioso asado a la parrilla',
        calificacion: 4.2,
        logo: '/utils/logo-restaurantes/1.jpg',
        img: '/utils/logo-restaurantes/comida1.jpg',
        precioPromedio: 50000
    },
    {
        id: 2,
        name: 'Colombian Food',
        items: {
            'Tipo': 'Típica'
        },
        description: 'Auténtica cocina colombiana tradicional',
        calificacion: 4.8,
        logo: '/utils/logo-restaurantes/2.jpg',
        img: '/utils/logo-restaurantes/comida2.jpg',
        precioPromedio: 23000
    },
    {
        id: 3,
        name: 'Suehica',
        items: {
            'Tipo': 'Artesanal'
        },
        description: 'Delicados platos artesanales exclusivos',
        calificacion: 4.5,
        logo: '/utils/logo-restaurantes/3.jpg',
        img: '/utils/logo-restaurantes/comida3.jpg',
        precioPromedio: 35000
    },
    {
        id: 4,
        name: 'Burguer California',
        items: {
            'Tipo': 'Ranchero'
        },
        description: 'Auténtica comida de estilo ranchero',
        calificacion: 4.2,
        logo: '/utils/logo-restaurantes/4.jpg',
        img: '/utils/logo-restaurantes/comida4.jpg',
        precioPromedio: 45000
    },
    {
        id: 5,
        name: 'Donde ma',
        items: {
           'Tipo': 'Típico'
        },
        description: 'Platos típicos de la región',
        calificacion: 4.8,
        logo: '/utils/logo-restaurantes/5.jpg',
        img: '/utils/logo-restaurantes/comida5.jpg',
        precioPromedio: 15000
    },
    {
        id: 6,
        name: 'Mauros',
        items: {
            'Tipo': 'Parrilla'
        },
        description: 'Deliciosa parrilla a carbón ardiente',
        calificacion: 4.5,
        logo: '/utils/logo-restaurantes/6.jpg',
        img: '/utils/logo-restaurantes/comida6.jpg',
        precioPromedio: 20000
    }
];
const ejemploActividades = [
    {
        id: 1,
        oferente: 'Suesca Aventura',
        items: {
            'Tipo': 'Cabalgata'
        },
        name: 'Cabalgata',
        description: 'Cabalgata en las Rocas',
        logo: '/utils/ejemplo-actividades-destino/1.jpg',
        img: '/utils/ejemplo-actividades-destino/cabalgata.jpg',
        calificacion: 4.5,
    },
    {
        id: 2,
        oferente: 'Suesca Aventura',
        items: {
            'Tipo': 'Familiar'
        },
        name: 'Pasa Día',
        description: 'Pasa día campestre',
        logo: '/utils/ejemplo-actividades-destino/2.jpg',
        img: '/utils/ejemplo-actividades-destino/cabaña-pasa-dia.jpg',
        calificacion: 4.8,
    },
    {
        id: 3,
        oferente: 'Explora Outdoors',
        items: {
            'Tipo': 'Cuevas'
        },
        name: 'Cuevas',
        description: 'Espeleología en Suesca',
        logo: '/utils/ejemplo-actividades-destino/3.jpg',
        img: '/utils/ejemplo-actividades-destino/cueva.jpg',
        calificacion: 4.6,
    },
    {
        id: 4,
        oferente: 'Suesca Aventura',
        items: {
            'Tipo': 'Escalada'
        },
        name: 'Escalada',
        description: 'Escalada en Rocas',
        logo: '/utils/ejemplo-actividades-destino/4.jpg',
        img: '/utils/ejemplo-actividades-destino/escalada.jpg',
        calificacion: 4.9,
    },
    {
        id: 5,
        oferente: 'Explora Outdoors',
        items: {
            'Tipo': 'Kayak'
        },
        name: 'Kayak',
        description: 'Aventura en kayak en el cañón',
        logo: '/utils/ejemplo-actividades-destino/3.jpg',
        img: '/utils/ejemplo-actividades-destino/kayak.jpg',
        calificacion: 4.7,
    }
];
const ejemploEventos = [
    {
        id: 1,
        oferente: 'Comunidad Católica',
        name: 'Viacrucis',
        items: {
            'Tipo': 'Religioso'
        },
        description: 'Viacrucis de Semana Santa',
        logo: '/utils/ejemplo-eventos-destino/1.jpg',
        img: '/utils/ejemplo-eventos-destino/Crucez.jpeg',
        calificacion: 4.8,
        fecha: '12 Oct'
    },
    {
        id: 2,
        oferente: 'Alcaldía Local',
        items: {
            'Tipo': 'Concierto'
        },
        name: 'Concierto',
        description: 'Concierto parque principal',
        logo: '/utils/ejemplo-eventos-destino/2.jpg',
        img: '/utils/ejemplo-eventos-destino/concierto.jpg',
        calificacion: 4.9,
        fecha: '20 Oct'
    },
    {
        id: 3,
        oferente: 'Asociación Campesina',
        items: {
            'Tipo': 'Mercado'
        },
        name: 'Mercado Campesino',
        description: 'Feria campesina',
        logo: '/utils/ejemplo-eventos-destino/3.jpg',
        img: '/utils/ejemplo-eventos-destino/mercado-campesino.jpg',
        calificacion: 4.7,
        fecha: '12 Oct'
    },
    {
        id: 4,
        oferente: 'Casa de la Cultura',
        items: {
            'Tipo': 'Cultural'
        },
        name: 'Semana Cultural',
        description: 'Exposiciones, teatro y música',
        logo: '/utils/ejemplo-eventos-destino/2.jpg',
        img: '/utils/ejemplo-eventos-destino/semana-cultural.jpg',
        calificacion: 4.6,
        fecha: '20 Oct'
    },
    {
        id: 5,
        oferente: 'Alcaldia local',
        items: {
            'Tipo': 'Deportivo'
        },
        name: 'Bici Tour',
        description: 'Bici tour por la laguna',
        logo: '/utils/ejemplo-eventos-destino/2.jpg',
        img: '/utils/ejemplo-eventos-destino/bici.jpg',
        calificacion: 4.9,
        fecha: '12 Oct'
    }
];

const ejemploBares = [
    {
        id: 1,
        name: 'Bar Texas',
        items: {
            'Tipo': 'Shows'
        },
        description: 'Shows de música en vivo',
        calificacion: 4.2,
        logo: '/utils/logo-bares/1.jpg',
        img: '/utils/logo-bares/bar-texas.jpg',
        precioPromedio: 50000
    },
    {
        id: 2,
        name: 'La Movida Colombiana',
        items: {
            'Tipo': 'Tropical'
        },
        description: 'Música tropical y ambiente caribeño',
        calificacion: 4.8,
        logo: '/utils/logo-bares/2.jpg',
        img: '/utils/logo-bares/la-movida.jpg',
        precioPromedio: 23000
    },
    {
        id: 3,
        name: 'El Sótano',
        items: {
            'Tipo': 'Underground'
        },
        description: 'Música underground y ambiente alternativo',
        calificacion: 4.5,
        logo: '/utils/logo-bares/3.jpg',
        img: '/utils/logo-bares/el-sotano.jpg',
        precioPromedio: 35000
    },
    {
        id: 4,
        name: 'California Lounge',
        items: {
            'Tipo': 'Discoteca'
        },
        description: 'Discoteca con música variada',
        calificacion: 4.2,
        logo: '/utils/logo-bares/4.jpg',
        img: '/utils/logo-bares/california-lounge.jpg',
        precioPromedio: 45000
    },
    {
        id: 5,
        name: 'La Cueva del Jazz',
        items: {
            'Tipo': 'Shows'
        },
        description: 'Espectáculos de jazz en vivo',
        calificacion: 4.8,
        logo: '/utils/logo-bares/5.jpg',
        img: '/utils/logo-bares/cueva-jazz.jpg',
        precioPromedio: 15000
    },
    {
        id: 6,
        name: 'Mauros Pub',
        items: {
            'Tipo': 'Underground'
        },
        description: 'Ambiente underground con música alternativa',
        calificacion: 4.5,
        logo: '/utils/logo-bares/6.jpg',
        img: '/utils/logo-bares/mauros-pub.jpg',
        precioPromedio: 20000
    }
];

const ejemploHoteles = [
    {
        id: 1,
        oferente: 'Hotel Las Rocas',
        name: 'Suite Vista al Lago',
        items: {
            'Tipo': 'Suite',
        }, 
        description: 'Habitación con vista al lago',
        logo: '/utils/ejemplo-hoteles-destino/1.jpg',
        img: '/utils/ejemplo-hoteles-destino/suite-vista-lago.jpg',
        calificacion: 4.7,
    },
    {
        id: 2,
        oferente: 'Hotel Paraíso Natural',
        name: 'Cabaña en el Bosque',
        items: {
            'Tipo': 'Cabaña',
        },
        description: 'Cabaña en el lago',
        logo: '/utils/ejemplo-hoteles-destino/2.jpg',
        img: '/utils/ejemplo-hoteles-destino/cabana-bosque.jpg',
        calificacion: 4.9,
    },
    {
        id: 3,
        oferente: 'Hotel Suesca Aventura',
        name: 'Habitación Familiar',
        items: {
            'Tipo': 'Habitación',
        },
        description: 'Habitación familiar',
        logo: '/utils/ejemplo-hoteles-destino/3.jpg',
        img: '/utils/ejemplo-hoteles-destino/habitacion-familiar.jpg',
        calificacion: 4.6,
    },
    {
        id: 4,
        oferente: 'Hotel El Refugio',
        name: 'Loft Moderno',
        items: {
            'Tipo': 'Loft',
        },
        description: 'Alojamiento minimalista',
        logo: '/utils/ejemplo-hoteles-destino/4.jpg',
        img: '/utils/ejemplo-hoteles-destino/loft-moderno.jpg',
        calificacion: 4.8,
    },
    {
        id: 5,
        oferente: 'Hotel Rústico',
        name: 'Habitación Ecológica',
        items: {
            'Tipo': 'Glamping',
        },
        description: 'Glamping',
        logo: '/utils/ejemplo-hoteles-destino/5.jpg',
        img: '/utils/ejemplo-hoteles-destino/habitacion-ecologica.jpg',
        calificacion: 4.5,
    }
];

const rutas = [
    {
        id: 1,
        nombre: "Virgen de la Z",
        img: "/utils/Virgen-de-la-Z/Final_Virgen.jpg",
        descripcion: "Esta es la descripcion de la ruta 1",
        distancia: '20 Min',
        terreno: "Montañoso",
        calificacion: 4.5,
        Dificultad: "Alta",
        tiempo: '30 Km',
        items: {
            'Duración': 'corta',
            'Tipo': "Monumento",
        }
    },
    {
        id: 2,
        nombre: "Ruta 2",
        img: "/utils/Virgen-de-la-Z/1.jpg",
        descripcion: "Esta es la descripcion de la ruta 2",
        distancia: '15 Min',
        terreno: "Boscoso",
        calificacion: 4.5,
        Dificultad: "Media",
        tiempo: '15 Km', // Puedes ajustar el valor según el dato que quieras
        items: {
            'Duración': 'media',
            'Tipo': "Bosque",
        }
    },
    {
        id: 3,
        nombre: "Ruta 3",
        img: "/utils/Virgen-de-la-Z/2.jpg",
        descripcion: "Esta es la descripcion de la ruta 3",
        distancia: '8 Km',
        terreno: "Llano",
        calificacion: 4.5,
        Dificultad: "Baja",
        tiempo: '90 Min', // Puedes ajustar el valor según el dato que quieras
        items: {
            'Duración': 'media',
            'Tipo': "Caminata",
        }
    },
    {
        id: 4,
        nombre: "Ruta 4",
        img: "/utils/Virgen-de-la-Z/3.jpg",
        descripcion: "Esta es la descripcion de la ruta 4",
        distancia: '8 Km',
        terreno: "Pasto",
        calificacion: 4.5,
        Dificultad: "Baja",
        tiempo: '90 Min', // Puedes ajustar el valor según el dato que quieras
        items: {
            'Duración': 'larga',
            'Tipo': "Caminata",
        }
    }
];


function App() {
    return (
        <Routes>
            <Route 
                path = "/" 
                element = {
                    <>
                        <Header destino = {destino}/>
                        <SearchBox />
                        <CategoryCarousel actividades = {actividades} />
                        <PopularActivities contenido = {ejemploContenidoPopular} />
                        <ListaTop3 
                            rest = {ejemploRestaurantes}
                            titulo = 'Restaurantes'
                            icono1 = {<IoFastFoodOutline className='Faperson'/>} 
                            icono2 = { <PiMapPinAreaFill className='Faperson'/> }
                            tipo = 'Platos desde'    
                            route= 'restaurantes'
                        />
                        <Carrusel 
                            actividadesDestino = {ejemploActividades}
                            titulo = 'Actividades'
                            icon={<FaPerson className="Faperson"/>}
                            tipo = 'Por persona:'
                            route= 'actividades' 
                        />
                        <Carrusel 
                            actividadesDestino = {ejemploEventos}
                            titulo = 'Eventos'
                            icon={<FaPerson className="Faperson"/>}
                            iconCalendar={<IoCalendarOutline className="FaCalendar"/>}
                            fecha = '30 Oct'
                            tipo = 'Desde:'
                            route= 'eventos'
                        />
                        <ListaTop3 
                            rest = {ejemploBares}
                            titulo = 'Fiesta y Amigos'
                            icono1 = {<FaWineBottle className='Faperson'/>} 
                            icono2 = { <PiMapPinAreaFill className='Faperson'/> }
                            tipo = 'Botellas desde'
                            route= 'fiesta-amigos'
                        />
                        <Carrusel 
                            actividadesDestino= {ejemploHoteles}
                            titulo= 'Alojamientos'
                            icon={ <MdHotel className="Faperson" />}
                            noche = 'noche'
                            route= 'alojamientos'
                        />
                    </>
                } 
            />    
            <Route 
                path='/rutas/:nombre' 
                element = {
                    <ListaRutas 
                        rutas = { rutas }
                        iconos= {iconCaraceristicas}
                    />
                }
            />
            <Route
                path='/restaurantes'
                element = {
                    <ListadoRestaurantes 
                        restaurantes = { ejemploRestaurantes }
                        icono1 = {<IoFastFoodOutline className='Faperson'/>} 
                        icono2 = { <PiMapPinAreaFill className='Faperson'/> }
                        titulo = 'Restaurantes'
                    />
                }
            />
            <Route
                path='/fiesta-amigos'
                element = {
                    <ListadoBares
                        bares = {ejemploBares}
                        icono1 = {<FaWineBottle className='Faperson'/>} 
                        icono2 = { <PiMapPinAreaFill className='Faperson'/> }
                        titulo= 'Fiesta y Amigos'
                    />
                }
            />
            <Route 
                path='/actividades'
                element = {
                    <ListadoActividades 
                        actividades = {ejemploActividades}
                        titulo = 'Actividades'
                        icon = {<FaPerson className="Faperson" />}
                        tipo = 'Por persona: '
                    />
                }
            />
            <Route 
                path='/eventos'
                element = {
                    <ListadoEventos 
                        eventos = {ejemploEventos}
                        titulo = 'Eventos'
                        icon={<FaPerson className="Faperson" />}
                        tipo= 'Por persona: '
                        iconCalendar={<IoCalendarOutline className="FaCalendar"/>}
                        fecha = '30 Oct'
                    />
                }
            />
            <Route 
                path='/alojamientos'
                element = {
                    <ListadoAlojamiewnto 
                        alojamientos={ejemploHoteles}
                        titulo= 'Alojamientos'
                        icon={ <MdHotel className="Faperson" />}
                        noche = 'noche'
                    />
                }
            />
        </Routes>
    )
}

export default App;
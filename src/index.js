import React from 'react';
import ReactDOM from 'react-dom'; // Esto es necesario para renderizar en el DOM
import Header from './components/componentes home/header';
import SearchBox from './components/componentes home/searchBox'
import CategoryCarousel from './components/componentes home/CategoryCarrusel';
import PopularActivities from './components/componentes home/Tendencias'
import ListaTop3 from './components/componentes home/ListaTop3';
import Carrusel from './components/componentes home/carrusel';

//  Iconos
import { IoFastFoodOutline } from "react-icons/io5";
import { FaWineBottle } from "react-icons/fa";


// Estilos
import './style/index.css';

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
        description: 'Al estilo ranchero',
        calificacion: 4.2,
        logo: '/utils/logo-restaurantes/1.jpg',
        img: '/utils/logo-restaurantes/comida1.jpg',
        precioPromedio: 50000
    },
    {
        id: 2,
        name: 'Colombian Food',
        description: 'Al mejor estilo colombiano',
        calificacion: 4.8,
        logo: '/utils/logo-restaurantes/2.jpg',
        img: '/utils/logo-restaurantes/comida2.jpg',
        precioPromedio: 23000
    },
    {
        id: 3,
        name: 'Suehica',
        description: 'Comida artesanal',
        calificacion: 4.5,
        logo: '/utils/logo-restaurantes/3.jpg',
        img: '/utils/logo-restaurantes/comida3.jpg',
        precioPromedio: 35000
    },
    {
        id: 4,
        name: 'Burguer California',
        description: 'Al estilo ranchero',
        calificacion: 4.2,
        logo: '/utils/logo-restaurantes/4.jpg',
        img: '/utils/logo-restaurantes/comida4.jpg',
        precioPromedio: 45000
    },
    {
        id: 5,
        name: 'Donde ma',
        description: 'Al mejor estilo colombiano',
        calificacion: 4.8,
        logo: '/utils/logo-restaurantes/5.jpg',
        img: '/utils/logo-restaurantes/comida5.jpg',
        precioPromedio: 15000
    },
    {
        id: 6,
        name: 'Mauros',
        description: 'Comida artesanal',
        calificacion: 4.5,
        logo: '/utils/logo-restaurantes/6.jpg',
        img: '/utils/logo-restaurantes/comida6.jpg',
        precioPromedio: 20000
    }
]
const ejemploActividades = [
    {
        id: 1,
        oferente: 'Suesca Aventura',
        name: 'Cabalgata',
        description: 'Cabalgata en las Rocas de Suesca',
        logo: '/utils/ejemplo-actividades-destino/1.jpg',
        img: '/utils/ejemplo-actividades-destino/cabalgata.jpg',
        calificacion: 4.5,
    },
    {
        id: 2,
        oferente: 'Suesca Aventura',
        name: 'Pasa Día',
        description: 'Pasa día campestre',
        logo: '/utils/ejemplo-actividades-destino/2.jpg',
        img: '/utils/ejemplo-actividades-destino/cabaña-pasa-dia.jpg',
        calificacion: 4.8,
    },
    {
        id: 3,
        oferente: 'Explora Outdoors',
        name: 'Cuevas',
        description: 'Espeleología en Suesca',
        logo: '/utils/ejemplo-actividades-destino/3.jpg',
        img: '/utils/ejemplo-actividades-destino/cueva.jpg',
        calificacion: 4.6,
    },
    {
        id: 4,
        oferente: 'Suesca Aventura',
        name: 'Escalada',
        description: 'Escalada en las Rocas de Suesca',
        logo: '/utils/ejemplo-actividades-destino/4.jpg',
        img: '/utils/ejemplo-actividades-destino/escalada.jpg',
        calificacion: 4.9,
    },
    {
        id: 5,
        oferente: 'Explora Outdoors',
        name: 'Kayak',
        description: 'Aventura en kayak en el cañon',
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
        description: 'Viacrucis de Semana Santa',
        logo: '/utils/ejemplo-eventos-destino/1.jpg',
        img: '/utils/ejemplo-eventos-destino/Crucez.jpeg',
        calificacion: 4.8,
    },
    {
        id: 2,
        oferente: 'Alcaldía Local',
        name: 'Concierto',
        description: 'Concierto parque principal',
        logo: '/utils/ejemplo-eventos-destino/2.jpg',
        img: '/utils/ejemplo-eventos-destino/concierto.jpg',
        calificacion: 4.9,
    },
    {
        id: 3,
        oferente: 'Asociación Campesina',
        name: 'Mercado Campesino',
        description: 'Feria campesina',
        logo: '/utils/ejemplo-eventos-destino/3.jpg',
        img: '/utils/ejemplo-eventos-destino/mercado-campesino.jpg',
        calificacion: 4.7,
    },
    {
        id: 4,
        oferente: 'Casa de la Cultura',
        name: 'Semana Cultural',
        description: 'Exposiciones, teatro y música',
        logo: '/utils/ejemplo-eventos-destino/2.jpg',
        img: '/utils/ejemplo-eventos-destino/semana-cultural.jpg',
        calificacion: 4.6,
    },
    {
        id: 5,
        oferente: 'Alcaldia local',
        name: 'Bici Tour',
        description: 'Bici tour por la laguna',
        logo: '/utils/ejemplo-eventos-destino/2.jpg',
        img: '/utils/ejemplo-eventos-destino/bici.jpg',
        calificacion: 4.9,
    }
];
const ejemploBares = [
    {
        id: 1,
        name: 'Bar Texas',
        description: 'Musica en vivo',
        calificacion: 4.2,
        logo: '/utils/logo-bares/1.jpg',
        img: '/utils/logo-bares/bar-texas.jpg',
        precioPromedio: 50000
    },
    {
        id: 2,
        name: 'La Movida Colombiana',
        description: 'Rumba tropical',
        calificacion: 4.8,
        logo: '/utils/logo-bares/2.jpg',
        img: '/utils/logo-bares/la-movida.jpg',
        precioPromedio: 23000
    },
    {
        id: 3,
        name: 'El Sótano',
        description: 'Bar underground',
        calificacion: 4.5,
        logo: '/utils/logo-bares/3.jpg',
        img: '/utils/logo-bares/el-sotano.jpg',
        precioPromedio: 35000
    },
    {
        id: 4,
        name: 'California Lounge',
        description: 'Cocktails y ambiente fresco',
        calificacion: 4.2,
        logo: '/utils/logo-bares/4.jpg',
        img: '/utils/logo-bares/california-lounge.jpg',
        precioPromedio: 45000
    },
    {
        id: 5,
        name: 'La Cueva del Jazz',
        description: 'Jazz en vivo',
        calificacion: 4.8,
        logo: '/utils/logo-bares/5.jpg',
        img: '/utils/logo-bares/cueva-jazz.jpg',
        precioPromedio: 15000
    },
    {
        id: 6,
        name: 'Mauros Pub',
        description: 'Musica Alternativa',
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
        description: 'Habitación de lujo con vista al lago',
        logo: '/utils/ejemplo-hoteles-destino/1.jpg',
        img: '/utils/ejemplo-hoteles-destino/suite-vista-lago.jpg',
        calificacion: 4.7,
    },
    {
        id: 2,
        oferente: 'Hotel Paraíso Natural',
        name: 'Cabaña en el Bosque',
        description: 'Cabaña rústica rodeada de naturaleza',
        logo: '/utils/ejemplo-hoteles-destino/2.jpg',
        img: '/utils/ejemplo-hoteles-destino/cabana-bosque.jpg',
        calificacion: 4.9,
    },
    {
        id: 3,
        oferente: 'Hotel Suesca Aventura',
        name: 'Habitación Familiar',
        description: 'Habitación familiar con acceso a actividades',
        logo: '/utils/ejemplo-hoteles-destino/3.jpg',
        img: '/utils/ejemplo-hoteles-destino/habitacion-familiar.jpg',
        calificacion: 4.6,
    },
    {
        id: 4,
        oferente: 'Hotel El Refugio',
        name: 'Loft Moderno',
        description: 'Alojamiento moderno con estilo minimalista',
        logo: '/utils/ejemplo-hoteles-destino/4.jpg',
        img: '/utils/ejemplo-hoteles-destino/loft-moderno.jpg',
        calificacion: 4.8,
    },
    {
        id: 5,
        oferente: 'Hotel Rústico',
        name: 'Habitación Ecológica',
        description: 'Habitación ecológica con materiales sostenibles',
        logo: '/utils/ejemplo-hoteles-destino/5.jpg',
        img: '/utils/ejemplo-hoteles-destino/habitacion-ecologica.jpg',
        calificacion: 4.5,
    }
];





function App() {
    return (
        <>
            <Header destino = {destino}/>
            <SearchBox />
            <CategoryCarousel actividades = {actividades} />
            <PopularActivities contenido = {ejemploContenidoPopular} />
            <ListaTop3 
                rest = {ejemploRestaurantes}
                titulo = 'Restaureantes'
                icono = {<IoFastFoodOutline className='Faperson'/>}     
            />
            <Carrusel 
                actividadesDestino = {ejemploActividades}
                titulo = 'Actividades' 
            />
            <Carrusel 
                actividadesDestino = {ejemploEventos}
                titulo = 'Eventos'
            />
            <ListaTop3 
                rest = {ejemploBares}
                titulo = 'Fiesta y Amigos'
                icono = {<FaWineBottle  className='Faperson'/>}
            />
            <Carrusel 
                actividadesDestino= {ejemploHoteles}
                titulo= 'Alojamientos'
            />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
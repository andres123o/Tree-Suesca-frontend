import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop  from './components/common/scrollToTop';

// Componentes de la pagina de inicio
import Header from './components/home/header';
import SearchBox from './components/home/searchBox'
import CategoryCarousel from './components/home/CategoryCarrusel';
import PopularActivities from './components/home/Tendencias'
import ListaTop3 from './components/home/ListaTop3';
import Carrusel from './components/home/carrusel';

//  Componentes de la Lista de Rutas
import ListaRutas from './components/listado-rutas/listaRutas';
import DescripcionRuta from './components/listado-rutas/descripcion-ruta-individual'
import FuncionalidadesMapa from './components/listado-rutas/seccion-mapa'

// Componentes de la lista de Restaurantes y Bares
import ListadoRestaurantes from './components/restaurantes/listado-restaurantes';
import DescripcionEstablecimientos from './components/common/descripcion-establecimiento';
import ListadoBares from './components/bares/bares-recreacion'

// Componentes de Actividades en el destino
import ListadoActividades from './components/actividades/actividades-destino'
import DescripcionActividades from './components/actividades/descripcion-actividades'

// Componente de Eventos en el destino
import ListadoEventos from './components/eventos/eventos-destino'

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
import './style/rutas/descripcionRuta.css'
import './style/restaurante-bares/establecimientos.css'
import './style/actividades/actividades.css'


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
      id:1,  
      nombre: "Virgen de la Z",
      categoria: {
        senderismo: true,
        biciTour: true,
        moto: true,
        automovil: false
      },
      img: "/utils/Paisaje/img_personalizada.jpeg",
      imgs: [
        "/utils/Paisaje/Panoramica_Virgen3.jpeg",
        "/utils/Paisaje/Crucez.jpeg",
        "/utils/Paisaje/Daniela.jpeg",
        "/utils/Paisaje/Lucas.jpeg",
        "/utils/Paisaje/Mirador.jpeg",
        "/utils/Paisaje/Mirador_cruz.jpeg",
        "/utils/Paisaje/Mirador_Virgen.jpeg",
        "/utils/Paisaje/Panoramica-virgen2.jpeg",
        "/utils/Paisaje/Mirador_Virgen2.jpeg"
      ],
      descripcion: 'El Alto de la Virgen es un lugar sagrado en la cima de una montaña, ofreciendo vistas impresionantes de la sabana. Es perfecto para locales y turistas que buscan una experiencia espiritual, reflexionar, tomar fotos y relajarse en un entorno sereno.',
      etiquetas: ['Pet Friendly', 'Monumento', 'Bosque', 'Camino Irregular', 'Paisajes', 'Montaña'],
      distancia: 10,
      vecesRecomendada: 150,
      completaronRuta: 160,
      instrucciones: {
        recomendaciones: 'Usa un casco y asegúrate de que tu bicicleta esté en buen estado antes de comenzar. Lleva suficiente agua, bloqueador solar y snacks.',
        accesibilidad: 'La ruta es accesible para ciclistas que sigan el camino principal, pero los atajos presentan mayor dificultad.',
        conservacion: 'Es fundamental contribuir a la conservación de la ruta y el monumento. Recoge la basura y no alteres la fauna.',
        emergencias: {
          'Bomberos': 3015081517,
          'Policia': 3011234512,
          'Defensa civil': 3221254578,
          'Ambulancia': 3112689856
        }
      },
      terreno: "Montañoso",
      calificacion: 4.5,
      Dificultad: "Alta",
      tiempo: 30,
      items: {
        'Duración': 'corta',
        'Tipo': "Monumento",
      },
      estaciones: {
        1: { nombre: "Parque principal", dificultad: 'Baja' },
        2: { nombre: 'Empezando la Z', dificultad: 'Alta' },
        3: { nombre: 'Mirador', dificultad: 'Media' },
        4: { nombre: 'Virgen de la Z', dificultad: 'Media' }
      },
      atajos: {
        1: { nombre: "Saltando la Z", dificultad: 'Alta', senderismo: true, biciTour: true, moto: true, automovil: false },
        2: { nombre: "Explorando el bosque", dificultad: 'Media', senderismo: true, biciTour: false, moto: false, automovil: true },
        3: { nombre: "Directo al monumento", dificultad: 'Baja', senderismo: true, biciTour: false, moto: false, automovil: false }
      }
    },
    {
      id:2,
      nombre: "Cascada El Chorro",
      categoria: {
        senderismo: true,
        biciTour: false,
        moto: false,
        automovil: false
      },
      img: "/utils/Paisaje/Cascada_Chorro1.jpeg",
      imgs: [
        "/utils/Paisaje/Cascada_Chorro2.jpeg",
        "/utils/Paisaje/Cascada_Chorro3.jpeg",
        "/utils/Paisaje/Cascada_Chorro4.jpeg"
      ],
      descripcion: 'Un paraíso escondido en medio de la naturaleza. La cascada El Chorro es ideal para quienes buscan una caminata tranquila con un destino refrescante.',
      etiquetas: ['Cascada', 'Pet Friendly', 'Naturaleza', 'Bosque', 'Camino Rocoso'],
      distancia: 7,
      vecesRecomendada: 120,
      completaronRuta: 130,
      instrucciones: {
        recomendaciones: 'Lleva zapatos adecuados para terreno húmedo y resbaladizo. No olvides tu cámara para capturar la majestuosidad de la cascada.',
        accesibilidad: 'Solo para senderistas. Las bicicletas y motocicletas no pueden acceder debido al terreno irregular.',
        conservacion: 'Evita nadar en la cascada para preservar el ecosistema natural. Recoge toda la basura al salir.',
        emergencias: {
          'Bomberos': 3015081517,
          'Policia': 3011234512,
          'Defensa civil': 3221254578,
          'Ambulancia': 3112689856
        }
      },
      terreno: "Rocoso",
      calificacion: 4.7,
      dificultad: "Media",
      tiempo: 20,
      items: {
        'Duración': 'corta',
        'Tipo': "Cascada",
      },
      estaciones: {
        1: { nombre: "Entrada del parque", dificultad: 'Baja' },
        2: { nombre: 'Camino de piedras', dificultad: 'Media' },
        3: { nombre: 'Cascada El Chorro', dificultad: 'Media' }
      },
      atajos: {
        1: { nombre: "Camino de rocas", dificultad: 'Media', senderismo: true, biciTour: false, moto: false, automovil: false }
      }
    },
    {
      id:3,
      nombre: "Ruta de los Cañones",
      categoria: {
        senderismo: true,
        biciTour: true,
        moto: false,
        automovil: true
      },
      img: "/utils/Paisaje/Cañones1.jpeg",
      imgs: [
        "/utils/Paisaje/Cañones2.jpeg",
        "/utils/Paisaje/Cañones3.jpeg"
      ],
      descripcion: 'Una ruta panorámica que recorre impresionantes cañones y formaciones rocosas. Ideal para ciclistas y quienes disfrutan de conducir por paisajes únicos.',
      etiquetas: ['Paisajes', 'Cañones', 'Naturaleza', 'Camino Pavimentado'],
      distancia: 15,
      vecesRecomendada: 200,
      completaronRuta: 180,
      instrucciones: {
        recomendaciones: 'Mantén precaución al conducir por los bordes del cañón. Lleva suficiente agua para hidratarte en las zonas más expuestas al sol.',
        accesibilidad: 'Ruta accesible para senderistas y vehículos, con caminos pavimentados y señalización clara.',
        conservacion: 'Evita aventurarte fuera de las rutas establecidas para preservar la flora local.',
        emergencias: {
          'Bomberos': 3015081517,
          'Policia': 3011234512,
          'Defensa civil': 3221254578,
          'Ambulancia': 3112689856
        }
      },
      terreno: "Pavimentado",
      calificacion: 4.6,
      dificultad: "Media",
      tiempo: 40,
      items: {
        'Duración': 'larga',
        'Tipo': "Cañones",
      },
      estaciones: {
        1: { nombre: "Inicio de los Cañones", dificultad: 'Baja' },
        2: { nombre: 'Zona panorámica', dificultad: 'Media' },
        3: { nombre: 'Final de los Cañones', dificultad: 'Media' }
      },
      atajos: {
        1: { nombre: "Ruta directa", dificultad: 'Baja', senderismo: true, biciTour: true, moto: false, automovil: true }
      }
    },
    { 
      id:4,
      nombre: "Cueva del Indio",
      categoria: {
        senderismo: true,
        biciTour: false,
        moto: false,
        automovil: false
      },
      img: "/utils/Paisaje/Cueva_Indio1.jpeg",
      imgs: [
        "/utils/Paisaje/Cueva_Indio2.jpeg",
        "/utils/Paisaje/Cueva_Indio3.jpeg"
      ],
      descripcion: 'Explora las misteriosas formaciones de la Cueva del Indio. Una aventura para los amantes de la espeleología y la historia local.',
      etiquetas: ['Cueva', 'Historia', 'Exploración', 'Naturaleza'],
      distancia: 5,
      vecesRecomendada: 80,
      completaronRuta: 70,
      instrucciones: {
        recomendaciones: 'Lleva una linterna y calzado cómodo para caminar en superficies resbaladizas.',
        accesibilidad: 'La ruta es únicamente accesible a pie, y se recomienda experiencia en exploración de cuevas.',
        conservacion: 'Respeta las formaciones dentro de la cueva. No toques las estalactitas y estalagmitas para preservar su crecimiento natural.',
        emergencias: {
          'Bomberos': 3015081517,
          'Policia': 3011234512,
          'Defensa civil': 3221254578,
          'Ambulancia': 3112689856
        }
      },
      terreno: "Cueva",
      calificacion: 4.4,
      dificultad: "Alta",
      tiempo: 25,
      items: {
        'Duración': 'corta',
        'Tipo': "Cueva",
      },
      estaciones: {
        1: { nombre: "Entrada de la Cueva", dificultad: 'Alta' },
        2: { nombre: 'Cámara Principal', dificultad: 'Alta' }
      },
      atajos: {
        1: { nombre: "Ruta secundaria", dificultad: 'Alta', senderismo: true, biciTour: false, moto: false, automovil: false }
      }
    },
    {
      id:5,
      nombre: "Cerro de las Tres Cruces",
      categoria: {
        senderismo: true,
        biciTour: true,
        moto: false,
        automovil: false
      },
      img: "/utils/Paisaje/Tres_Cruces1.jpeg",
      imgs: [
        "/utils/Paisaje/Tres_Cruces2.jpeg",
        "/utils/Paisaje/Tres_Cruces3.jpeg"
      ],
      descripcion: 'El Cerro de las Tres Cruces ofrece una caminata desafiante con una vista espectacular de la ciudad al llegar a la cima. Es un lugar popular entre locales para hacer ejercicio y disfrutar de la naturaleza.',
      etiquetas: ['Montaña', 'Paisajes', 'Religión', 'Ejercicio'],
      distancia: 8,
      vecesRecomendada: 190,
      completaronRuta: 200,
      instrucciones: {
        recomendaciones: 'Lleva agua y protección solar, la subida puede ser intensa y expuesta al sol.',
        accesibilidad: 'Accesible para senderistas y ciclistas experimentados.',
        conservacion: 'Respeta las instalaciones religiosas y recoge tu basura.',
        emergencias: {
          'Bomberos': 3015081517,
          'Policia': 3011234512,
          'Defensa civil': 3221254578,
          'Ambulancia': 3112689856
        }
      },
      terreno: "Montaña",
      calificacion: 4.8,
      dificultad: "Alta",
      tiempo: 35,
      items: {
        'Duración': 'media',
        'Tipo': "Religión",
      },
      estaciones: {
        1: { nombre: "Inicio de la subida", dificultad: 'Media' },
        2: { nombre: 'Primera Cruz', dificultad: 'Alta' },
        3: { nombre: 'Cima', dificultad: 'Alta' }
      },
      atajos: {
        1: { nombre: "Subida directa", dificultad: 'Alta', senderismo: true, biciTour: false, moto: false, automovil: false }
      }
    }
];
const ruta = {
    id:1,
    nombre: "Virgen de la Z",
    categoria: {
        senderismo: true,
        biciTour: true,
        moto: true,
        automovil: false
    },
    img: "/utils/Paisaje/Panoramica-virgen2.jpeg",
    imgs: [
        "/utils/Paisaje/Panoramica_Virgen3.jpeg",
        "/utils/Paisaje/Crucez.jpeg",
        "/utils/Paisaje/Daniela.jpeg",
        "/utils/Paisaje/Lucas.jpeg",
        "/utils/Paisaje/Mirador.jpeg",
        "/utils/Paisaje/Mirador_cruz.jpeg",
        "/utils/Paisaje/Mirador_Virgen.jpeg",
        "/utils/Paisaje/Panoramica-virgen2.jpeg",
        "/utils/Paisaje/Mirador_Virgen2.jpeg"
    ],
    descripcion: 'El Alto de la Virgen es un lugar sagrado en la cima de una montaña, ofreciendo vistas impresionantes de la sabana. Es perfecto para locales y turistas que buscan una experiencia espiritual, reflexionar, tomar fotos y relajarse en un entorno sereno.',
    etiquetas: ['Pet Friendly', 'Monumento', 'Bosque', 'Camino Irregular', 'Paisajes', 'Montaña'],
    distancia: 10,
    vecesRecomendada: 150,
    completaronRuta: 160,
    instrucciones: {
        recomendaciones: 'Usa un casco y asegúrate de que tu bicicleta esté en buen estado antes de comenzar. Lleva suficiente agua, bloqueador solar y snacks.',
        accesibilidad: 'La ruta es accesible para ciclistas que sigan el camino principal, pero los atajos presentan mayor dificultad.',
        conservacion: 'Es fundamental contribuir a la conservación de la ruta y el monumento. Recoge la basura y no alteres la fauna.',
        emergencias: {
            'Bomberos': 3015081517,
            'Policia': 3011234512,
            'Defensa civil': 3221254578,
            'Ambulancia': 3112689856
        }
    },
    terreno: "Montañoso",
    calificacion:4.5,
    dificultad: "Alta",
    tiempo: 30,
    items: {
        'Duración': 'corta',
        'Tipo': "Monumento",
    },
    estaciones: {
        1: {
            nombre: "Parque principal",
            dificultad: 'Baja',
            position: { lat: 5.103242, lng: -73.798712 },
            img: '/utils/Virgen-de-la-Z/Parque-principal.jpg'
        },
        2: {
            nombre: 'Empezando la Z',
            dificultad: 'Alta',
            position: { lat: 5.113875, lng: -73.804139 },
            img: '/utils/Virgen-de-la-Z/Primer-Atajo.jpg'
        },
        3: {
            nombre: 'Mirador',
            dificultad: 'Media',
            position: { lat: 5.114737, lng: -73.809393 },
            img: '/utils/Virgen-de-la-Z/Chitiva-Abajo.jpg'
        },
        4: {
            nombre: 'Virgen de la Z',
            dificultad: 'Media',
            position: { lat: 5.116750, lng: -73.806383 },
            img: '/utils/Paisaje/Final_Virgen.jpg'
        }
    },
    atajos: {
        1: {
            nombre: "Saltando la Z",
            dificultad: 'Alta',
            disponible: {
                senderismo: true,
                biciTour: true,
                moto: true,
                automovil: false,
            },
            position: { lat: 5.113973, lng: -73.803196 },
            img: '/utils/Virgen-de-la-Z/Atajo_1.jpg',
            cordenadas: [
                { lat: 5.113956, lng: -73.803188 },
                { lat: 5.114023, lng: -73.803203 },
                { lat: 5.114040, lng: -73.803288 },
                { lat: 5.113997, lng: -73.803351 },
                { lat: 5.114024, lng: -73.803391 },
                { lat: 5.114017, lng: -73.803445 },
                { lat: 5.114035, lng: -73.803567 },
                { lat: 5.114011, lng: -73.803707 },
                { lat: 5.114008, lng: -73.803915 },
                { lat: 5.114151, lng: -73.804193 },
                { lat: 5.114109, lng: -73.804299 },
                { lat: 5.114192, lng: -73.804551 },
                { lat: 5.114188, lng: -73.804772 },
                { lat: 5.114244, lng: -73.804941 },
                { lat: 5.114262, lng: -73.805090 },
                { lat: 5.114405, lng: -73.805207 },
            ]
        },
        2: {
            nombre: "Explorando el nosque",
            dificultad: 'Media',
            disponible: {
                senderismo: true,
                biciTour: false,
                moto: false,
                automovil: true,
            },
            img: '/utils/Virgen-de-la-Z/Atajo_2_Por_Bosque.jpg',
            position: { lat: 5.113493, lng: -73.805893 },
            cordenadas: [
                { lat: 5.115032, lng: -73.805580 },
                { lat: 5.115071, lng: -73.805543 },
                { lat: 5.115105, lng: -73.805554 },
                { lat: 5.115130, lng: -73.805602 },
                { lat: 5.115170, lng: -73.805632 },
                { lat: 5.115217, lng: -73.805646 },
                { lat: 5.115218, lng: -73.805686 },
                { lat: 5.115472, lng: -73.805741 },
                { lat: 5.115579, lng: -73.805758 },
                { lat: 5.115766, lng: -73.805804 },
                { lat: 5.115881, lng: -73.805812 },
                { lat: 5.115945, lng: -73.805821 },
                { lat: 5.115978, lng: -73.805906 },
                { lat: 5.116012, lng: -73.805920 },
                { lat: 5.116037, lng: -73.805953 },
                { lat: 5.116123, lng: -73.806000 },
                { lat: 5.116160, lng: -73.806061 },
                { lat: 5.116215, lng: -73.806061 },
                { lat: 5.116244, lng: -73.806091 },
                { lat: 5.116318, lng: -73.806143 },
                { lat: 5.116354, lng: -73.806186 },
                { lat: 5.116378, lng: -73.806276 },
                { lat: 5.116459, lng: -73.806291 },
                { lat: 5.116509, lng: -73.806351 },
                { lat: 5.116577, lng: -73.806366 },
                { lat: 5.116700, lng: -73.806347 },
                { lat: 5.116740, lng: -73.806350 },
            ]
        },
        3: {
            nombre: "Directo al monumento",
            dificultad: 'Baja',
            disponible: {
                senderismo: true,
                biciTour: false,
                moto: false,
                automovil: false,
            },
            img: '/utils/Virgen-de-la-Z/Inicio-de-atajo-Superior.jpg',
            position: { lat: 5.115032, lng: -73.805580 },
            cordenadas: [
                { lat: 5.113500, lng: -73.805889 },
                { lat: 5.113567, lng: -73.805999 },
                { lat: 5.113634, lng: -73.806077 },
                { lat: 5.113722, lng: -73.806256 },
                { lat: 5.113714, lng: -73.806334 },
                { lat: 5.113773, lng: -73.806554 },
                { lat: 5.113794, lng: -73.806664 },
                { lat: 5.113963, lng: -73.807064 },
                { lat: 5.114045, lng: -73.807166 },
                { lat: 5.114367, lng: -73.807575 },
                { lat: 5.114530, lng: -73.807706 },
                { lat: 5.114629, lng: -73.807749 },
                { lat: 5.114704, lng: -73.807907 },
                { lat: 5.114731, lng: -73.808087 },
                { lat: 5.114763, lng: -73.808226 },
                { lat: 5.114773, lng: -73.808430 },
                { lat: 5.114768, lng: -73.808532 },
                { lat: 5.114787, lng: -73.808558 }      
            ]
        }
    },
    cordenadasPrincipales: [
        { lat: 5.103028, lng: -73.798856},
        { lat: 5.103041, lng: -73.798649},
        { lat: 5.103607, lng: -73.798773},
        { lat: 5.103816, lng: -73.798703},
        { lat: 5.104358, lng: -73.798719},
        { lat: 5.104703, lng: -73.798759},
        { lat: 5.105114, lng: -73.798826},
        { lat: 5.105595, lng: -73.798923},
        { lat: 5.106856, lng: -73.799403},
        { lat: 5.107398, lng: -73.799553},
        { lat: 5.107738, lng: -73.799674},
        { lat: 5.108021, lng: -73.799915},
        { lat: 5.108224, lng: -73.800006},
        { lat: 5.108507, lng: -73.799843},
        { lat: 5.108865, lng: -73.800001},
        { lat: 5.109405, lng: -73.800529},
        { lat: 5.109784, lng: -73.800757},
        { lat: 5.109947, lng: -73.800983},
        { lat: 5.110911, lng: -73.801390},
        { lat: 5.111026, lng: -73.801530},
        { lat: 5.110989, lng: -73.801804},
        { lat: 5.111045, lng: -73.801889},
        { lat: 5.111240, lng: -73.802005},
        { lat: 5.111365, lng: -73.802182},
        { lat: 5.111515, lng: -73.802257},
        { lat: 5.111822, lng: -73.802218},
        { lat: 5.112122, lng: -73.802325},
        { lat: 5.112485, lng: -73.802599},
        { lat: 5.113581, lng: -73.802883},
        { lat: 5.113973, lng: -73.803055},
        { lat: 5.113834, lng: -73.803669},
        { lat: 5.113866, lng: -73.804160},
        { lat: 5.113784, lng: -73.804364},
        { lat: 5.113575, lng: -73.804584},
        { lat: 5.113487, lng: -73.804694},
        { lat: 5.113447, lng: -73.804881},
        { lat: 5.113573, lng: -73.805273},
        { lat: 5.113500, lng: -73.805804},
        { lat: 5.113540, lng: -73.805868},
        { lat: 5.113637, lng: -73.805858},
        { lat: 5.114067, lng: -73.805421},
        { lat: 5.114419, lng: -73.805195},
        { lat: 5.114516, lng: -73.805168},
        { lat: 5.114593, lng: -73.805260},
        { lat: 5.114302, lng: -73.805654},
        { lat: 5.114208, lng: -73.805895},
        { lat: 5.114003, lng: -73.806338},
        { lat: 5.114045, lng: -73.806410},
        { lat: 5.114136, lng: -73.806362},
        { lat: 5.114224, lng: -73.806236},
        { lat: 5.114526, lng: -73.805919},
        { lat: 5.114924, lng: -73.805632},
        { lat: 5.115042, lng: -73.805614},
        { lat: 5.115045, lng: -73.805721},
        { lat: 5.114740, lng: -73.806158},
        { lat: 5.114681, lng: -73.806579},
        { lat: 5.114596, lng: -73.806979},
        { lat: 5.114577, lng: -73.807365},
        { lat: 5.114815, lng: -73.808049},
        { lat: 5.114833, lng: -73.808231},
        { lat: 5.114801, lng: -73.808706},
        { lat: 5.114836, lng: -73.808969},
        { lat: 5.114728, lng: -73.809247},
        { lat: 5.114744, lng: -73.809397},
        { lat: 5.115030, lng: -73.809116},
        { lat: 5.115145, lng: -73.808773},
        { lat: 5.115342, lng: -73.807973},
        { lat: 5.115533, lng: -73.807511},
        { lat: 5.115660, lng: -73.807268},
        { lat: 5.115917, lng: -73.806914},
        { lat: 5.116275, lng: -73.806667},
        { lat: 5.116579, lng: -73.806528},
        { lat: 5.116750, lng: -73.806383}
    ],
}
const restaurante = {
    id:1,
    name: 'Burger Texas',
    items: {
        'Tipo': 'Parrilla',
        'Descripcion': 'Delicioso asado a la parrilla'
    },
    concepto: 'Burger Texas es más que un restaurante; es una auténtica experiencia de sabor texano en el corazón de la ciudad. Fusionamos las técnicas tradicionales de ahumado y parrilla del sur de Estados Unidos con ingredientes locales de primera calidad.',
    calificacion: 4.2,
    precioPromedio: 50000,
    horario: {
        abren: '8:10 am',
        cierran: '7:30 pm' 
    },
    address: 'https://maps.app.goo.gl/g976EgJprQZgAfzFA',
    contacto: 3015081517,
    servicios: {
        delivery: 'Disponible',
        reservas: 'Disponible',
        parking: 'No disponible'
    },
    metodosDePago: 'Efectivo, Nequi y Daviplara, no reciben tarjetas',
    destacados: [
        {
            nombre: "Burguer texana",
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            costo: 14000,
            descripcion: "Carne doble, queso derretido, bacon, vegetales frescos y papas fritas doradas."
        },
        {
            nombre: "Texas BBQ Ribs",
            img: "https://images.unsplash.com/photo-1544025162-d76694265947",
            costo: 28000,
            descripcion: "Costillas de cerdo ahumadas. Servidas con elote a la parrilla y coleslaw tradicional.",
        },
        {
            nombre: "Brisket Sandwich",
            img: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f",
            costo: 18000,
            descripcion: "Jugoso brisket ahumado por 16 horas, cebollas caramelizadas y pepinillos caseros.",
        }
    ],
    recurrente: [
        {
            nombre: "Plato del dia",
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            costo: 14000,
            descripcion: "Carne doble, queso derretido, bacon, vegetales frescos y papas fritas doradas."
        },
        {
            nombre: "Desayuno",
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            costo: 14000,
            descripcion: "Carne doble, queso derretido, bacon, vegetales frescos y papas fritas doradas."
        },
    ],
    antojos: [
        {
            nombre: "Chicharrones",
            descripcion: 'Entrada chicharron carnudo',
            img: "/utils/logo-restaurantes/establecimiento/chicharron.jpeg",
            costo: 14000,
        },
        {
            nombre: "Empanadas",
            descripcion: 'Canasta x6',
            img: "/utils/logo-restaurantes/establecimiento/empanada.webp",
            costo: 14000,
        },
    ],
    bebidas: [
        {
            nombre: "Coca cola",
            descripcion: '250 ml',
            img: "/utils/logo-restaurantes/establecimiento/bebida1.webp",
            costo: 14000,
        },
        {
            nombre: "Jugo natural",
            descripcion: 'En agua o en leche',
            img: "/utils/logo-restaurantes/establecimiento/bebida2.webp",
            costo: 14000,
        },
        {
            nombre: "Coca cola",
            descripcion: '250 ml',
            img: "/utils/logo-restaurantes/establecimiento/bebida1.webp",
            costo: 14000,
        },
        {
            nombre: "Jugo natural",
            descripcion: 'En agua o en leche',
            img: "/utils/logo-restaurantes/establecimiento/bebida2.webp",
            costo: 14000,
        },
    ],
    img: '/utils/logo-restaurantes/comida1.jpg',
    imgs: [
        // Vista general del restaurante
        "/utils/logo-restaurantes/establecimiento/par1.jpeg",
        "/utils/logo-restaurantes/establecimiento/par2.jpeg",
        "/utils/logo-restaurantes/establecimiento/par3.jpeg",
        "/utils/logo-restaurantes/establecimiento/par4.jpeg",
        "/utils/logo-restaurantes/establecimiento/par5.webp",
        "/utils/logo-restaurantes/establecimiento/par6.jpeg",
        "/utils/logo-restaurantes/establecimiento/par7.jpeg",
        
    ],
    logo: '/utils/logo-restaurantes/1.jpg',
}
const bar = {
    id:1,
    name: 'Burger Texas',
    items: {
        'Tipo': 'Parrilla',
        'Descripcion': 'Delicioso asado a la parrilla'
    },
    concepto: 'Burger Texas es más que un restaurante; es una auténtica experiencia de sabor texano en el corazón de la ciudad. Fusionamos las técnicas tradicionales de ahumado y parrilla del sur de Estados Unidos con ingredientes locales de primera calidad.',
    calificacion: 4.2,
    precioPromedio: 50000,
    horario: {
        abren: '8:10 am',
        cierran: '7:30 pm' 
    },
    address: 'https://maps.app.goo.gl/g976EgJprQZgAfzFA',
    contacto: 3015081517,
    servicios: {
        cover: 5000,
        reservas: 'Disponible',
        parking: 'No disponible'
    },
    metodosDePago: 'Efectivo, Nequi y Daviplara, no reciben tarjetas',
    destacados: [
        {
            nombre: "Burguer texana",
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            costo: 14000,
            descripcion: "Carne doble, queso derretido, bacon, vegetales frescos y papas fritas doradas."
        },
        {
            nombre: "Texas BBQ Ribs",
            img: "https://images.unsplash.com/photo-1544025162-d76694265947",
            costo: 28000,
            descripcion: "Costillas de cerdo ahumadas. Servidas con elote a la parrilla y coleslaw tradicional.",
        },
        {
            nombre: "Brisket Sandwich",
            img: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f",
            costo: 18000,
            descripcion: "Jugoso brisket ahumado por 16 horas, cebollas caramelizadas y pepinillos caseros.",
        }
    ],
    recurrente: [
        {
            nombre: "Plato del dia",
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            costo: 14000,
            descripcion: "Carne doble, queso derretido, bacon, vegetales frescos y papas fritas doradas."
        },
        {
            nombre: "Desayuno",
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            costo: 14000,
            descripcion: "Carne doble, queso derretido, bacon, vegetales frescos y papas fritas doradas."
        },
    ],
    antojos: [
        {
            nombre: "Chicharrones",
            descripcion: 'Entrada chicharron carnudo',
            img: "/utils/logo-restaurantes/establecimiento/chicharron.jpeg",
            costo: 14000,
        },
        {
            nombre: "Empanadas",
            descripcion: 'Canasta x6',
            img: "/utils/logo-restaurantes/establecimiento/empanada.webp",
            costo: 14000,
        },
    ],
    bebidas: [
        {
            nombre: "Coca cola",
            descripcion: '250 ml',
            img: "/utils/logo-restaurantes/establecimiento/bebida1.webp",
            costo: 14000,
        },
        {
            nombre: "Jugo natural",
            descripcion: 'En agua o en leche',
            img: "/utils/logo-restaurantes/establecimiento/bebida2.webp",
            costo: 14000,
        },
        {
            nombre: "Coca cola",
            descripcion: '250 ml',
            img: "/utils/logo-restaurantes/establecimiento/bebida1.webp",
            costo: 14000,
        },
        {
            nombre: "Jugo natural",
            descripcion: 'En agua o en leche',
            img: "/utils/logo-restaurantes/establecimiento/bebida2.webp",
            costo: 14000,
        },
    ],
    img: '/utils/logo-restaurantes/comida1.jpg',
    imgs: [
        // Vista general del restaurante
        "/utils/logo-restaurantes/establecimiento/par1.jpeg",
        "/utils/logo-restaurantes/establecimiento/par2.jpeg",
        "/utils/logo-restaurantes/establecimiento/par3.jpeg",
        "/utils/logo-restaurantes/establecimiento/par4.jpeg",
        "/utils/logo-restaurantes/establecimiento/par5.webp",
        "/utils/logo-restaurantes/establecimiento/par6.jpeg",
        "/utils/logo-restaurantes/establecimiento/par7.jpeg",
        
    ],
    logo: '/utils/logo-restaurantes/1.jpg',
}
const actividad =  {
    id: 1,
    oferente: 'Suesca Aventura',
    items: {
        'Tipo': 'Cabalgata'
    },
    name: 'Cabalgata',
    duracion: 45,
    dificultad: 'facil',
    capacidad: 5,
    description: 'Cabalgata en las Rocas',
    itinerario: 'Disfruta de una emocionante cabalgata por los impresionantes paisajes de Suesca, recorriendo senderos que te llevan a través de montañas y rocas icónicas. A lo largo del trayecto, sentirás la conexión con la naturaleza mientras atraviesas bosques, praderas y miradores naturales que ofrecen vistas espectaculares.',
    horario: {
        abren: '8:10 am',
        cierran: '7:30 pm' 
    },
    address: 'https://maps.app.goo.gl/g976EgJprQZgAfzFA',
    contacto: 3015081517,
    logo: '/utils/ejemplo-actividades-destino/1.jpg',
    img: '/utils/ejemplo-actividades-destino/cabalgata.jpg',
    imgs: [
        '/utils/actividad/1.jpeg',
        '/utils/actividad/2.jpeg',
        '/utils/actividad/3.jpeg',
        '/utils/actividad/4.webp',
        '/utils/actividad/5.webp',
        '/utils/actividad/6.jpeg',
        '/utils/actividad/7.jpeg'
    ],
    calificacion: 4.5,
    requisitosRecomendaciones: {
        edad: 'Sin limite de edad',
        experiencia: 'No requiere experiencia previa',
        incluye: 'Guia, equipo y seguro turistico',
        recomendaciones: 'Llevar ropa comoda, bloqueador solar e hidratación',
    },
    precio: 35000,
    metodosDePago: 'Efectivo, Nequi y Daviplara, no reciben tarjetas',
   
}




function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>

                {/* Home */}
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
                                titulo = 'Restaurantes!'
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
                                routeIndividual= 'actividad'
                            />
                            <Carrusel 
                                actividadesDestino = {ejemploEventos}
                                titulo = 'Eventos'
                                icon={<FaPerson className="Faperson"/>}
                                iconCalendar={<IoCalendarOutline className="FaCalendar"/>}
                                fecha = '30 Oct'
                                tipo = 'Desde:'
                                route= 'eventos'
                                routeIndividual= 'evento'
                            />
                            <ListaTop3 
                                rest = {ejemploBares}
                                titulo = 'Bares!'
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
                                routeIndividual= 'alojamiento'
                            />
                        </>
                    } 
                /> 

                {/* Seccion de rutas */}
                <Route 
                    path='/rutas/:nombre' 
                    element = {
                        <ListaRutas 
                            rutas = { rutas }
                            iconos= {iconCaraceristicas}
                            route= 'caracteristicas'
                        />
                    }
                />
                <Route 
                    path='/rutas/:nombre/caracteristicas'
                    element = {
                        <DescripcionRuta 
                            rutas={ruta}
                        />
                    }
                />
                <Route 
                    path='/ruta/:nombre/'
                    element= {
                        <FuncionalidadesMapa 
                            ruta={ruta}
                        />
                    }
                />
                
                {/* Seccion restaurantes y bares */}
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
                    path='/establecimiento/:nombre'
                    element = {
                        <DescripcionEstablecimientos 
                            establecimiento={restaurante}
                        />
                    }
                />
                
                {/* Seccion Actividades */}
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
                    path='/actividad/:nombre'
                    element = {
                        <DescripcionActividades 
                            actividad = { actividad }
                        />
                    }
                />

                {/* Seccion eventos */}
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
                
                {/* Seccion Alojamientos */}
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
        </>
    )
}

export default App;
import SearchBox from '../home-destino/searchBox'
import FiltrosTitulo from '../common/titulo-filtro'
import React, { useState, useEffect } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import Header from '../home-destino/header'


// Ejemplo de respuesta de la api placeholder
const respuestaApiPlaceholder = 'A donde quieres ir...'
const respuestaAPIdestinos = [
    {
        id: 1,
        municipio: 'Suesca',
        departamento: 'Cundinamarca',
        frase: 'Paraíso para escaladores',
        items: {
            'Tipo': 'Montaña',
            'Clima': 'Frío',
            'Presupuesto': 'Económico',
        },
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732556426/suesca_whuu9y.jpg',
        calificacion: 4.2
    },
    {
        id: 2,
        municipio: 'Cartagena',
        departamento: 'Bolívar',
        frase: 'La perla del Caribe',
        items: {
            'Tipo': 'Playa',
            'Clima': 'Caliente',
            'Presupuesto': 'Caro',
        },
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732556534/cartagena_bzwsn3.jpg',
        calificacion: 4.2
    },
    {
        id: 3,
        municipio: 'Villa de Leyva',
        departamento: 'Boyacá',
        frase: 'Viaje al pasado colonial',
        items: {
            'Tipo': 'Histórico',
            'Clima': 'Frío',
            'Presupuesto': 'Moderado',
        },
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732556435/villa_leyva_r08e1t.jpg',
        calificacion: 4.2
    },
    {
        id: 4,
        municipio: 'Leticia',
        departamento: 'Amazonas',
        frase: 'Aventura en la selva',
        items: {
            'Tipo': 'Selva',
            'Clima': 'Caliente',
            'Presupuesto': 'Caro',
        },
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732556435/leticia_m3bgli.jpg',
        calificacion: 4.2
    },
    {
        id: 5,
        municipio: 'Barichara',
        departamento: 'Santander',
        frase: 'El pueblo más lindo',
        items: {
            'Tipo': 'Colonial',
            'Clima': 'Cálido',
            'Presupuesto': 'Moderado',
        },
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732556432/baricharaa_kup9re.jpg',
        calificacion: 4.2
    },
    {
        id: 6,
        municipio: 'Salento',
        departamento: 'Quindío',
        frase: 'Capital del café',
        items: {
            'Tipo': 'Montaña',
            'Clima': 'Frío',
            'Presupuesto': 'Económico',
        },
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732556431/salento_euu0xu.jpg',
        calificacion: 4.2
    },
    {
        id: 7,
        municipio: 'San Andrés',
        departamento: 'San Andrés y Providencia',
        frase: 'Mar de siete colores',
        items: {
            'Tipo': 'Playa',
            'Clima': 'Caliente',
            'Presupuesto': 'Caro',
        },
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732556429/san_andrres_qd6ima.webp',
        calificacion: 4.2
    },
    {
        id: 8,
        municipio: 'Cabo de la Vela',
        departamento: 'La Guajira',
        frase: 'Desierto y mar',
        items: {
            'Tipo': 'Desierto',
            'Clima': 'Caliente',
            'Presupuesto': 'Económico',
        },
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732556427/cabo_vela_yncfzb.jpg',
        calificacion: 4.2
    },
    {
        id: 9,
        municipio: 'Santa Rosa de Cabal',
        departamento: 'Risaralda',
        frase: 'Paraíso termal',
        items: {
            'Tipo': 'Montaña',
            'Clima': 'Frío',
            'Presupuesto': 'Moderado',
        },
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732556426/santa_rosa_tmea0b.jpg',
        calificacion: 4.2
    },
    {
        id: 10,
        municipio: 'Mompox',
        departamento: 'Bolívar',
        frase: 'Joyas en filigrana',
        items: {
            'Tipo': 'Histórico',
            'Clima': 'Caliente',
            'Presupuesto': 'Moderado',
        },
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732556426/mompox_bdt2a4.jpg',
        calificacion: 4.2
    }
];

const Home = () => {
    const [filtros, setFiltros] = useState({});
    const [rutasFiltradas, setRutasFiltradas] = useState(respuestaAPIdestinos);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

    // Inicializa los filtros según los datos de las rutas
    useEffect(() => {
        const nuevosFiltros = {};
        respuestaAPIdestinos.forEach((destino) => {
            Object.entries(destino.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                nuevosFiltros[key] = new Set()
                }
                if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                nuevosFiltros[key].add({value});
                }
            });
        });
        setFiltros(nuevosFiltros);
    }, [respuestaAPIdestinos]);

    const manejarClick = (key, value) => {
        setFiltroSeleccionado(value.value);
        const nuevasRutas = respuestaAPIdestinos.filter(destino => destino.items[key] === value.value);
        setRutasFiltradas(nuevasRutas);
    }
    
    const handle = (nombreRuta) => {
        console.log('Hello World');
    }

    return (
        <>
            {/* Header */}
            <div className="header">
                <div className="title-header">
                    <h5>Destino +</h5>
                </div>
                <div className="back-home">   
                    <img src="https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png" alt="Tree Suesca" />
                </div>
            </div>

            {/*  */}
            <div className='container-landing'>
                <div className='titulo-landing'>
                    <h2>
                        Explora destinos sin complicaciones
                    </h2>
                    <h5>
                        Toda la información que necesitas, en un solo lugar.
                    </h5>
                </div>
                <div className='img-landing'>
                    <img src='https://res.cloudinary.com/destinoplus/image/upload/v1732561540/22db8ca7bd905cf020ffe7b4109883bb_ajmpg8.jpg'/>
                </div>
            </div>

            {/* Buscadores */}
            <SearchBox 
                placeholder={respuestaApiPlaceholder}
            />

            {/* Filtros */}
            <FiltrosTitulo 
                nombre={'Filtra por intereses'}
                urlImg={'https://res.cloudinary.com/destinoplus/image/upload/v1732555188/tourist-couple-enjoying-vacation-time-illustration-concept-free-vector_ehkvpx.jpg'}
                filtros={filtros}
                filtroSeleccionado={filtroSeleccionado}
                manejarClick={manejarClick}
            />
            <div className="container-seccion-lista-rutas">
                {rutasFiltradas.map((item) => (
                <div 
                    key={item.id} 
                    className="container-item-lista-rutas"
                    onClick={() => {handle(item.municipio)}}
                >
                    <div
                        className="container-img-ruta"
                        style={{ backgroundImage: `url(${item.img})` }}
                    >
                    </div>
                    <div className="container-info-ruta">
                    <div className="container-nombre-titulo">
                        <h5>
                        {item.municipio}, {item.departamento}.
                        </h5>
                        <div className="container-clasificacion-ruta">
                        <p>
                            {item.calificacion}
                            <img key={`star-${item.id}`} src="/utils/icons8-estrella-48.png" alt="estrella" />
                        </p>
                        </div>
                    </div>
                    <div className="container-descripcion-caracteristicas">
                        <MdExplore />
                        <p key={`dificultad-${item.id}`}>
                            {item.frase}
                        </p>
                        <MdOutlineAttachMoney />
                        <p key={`dificultad-${item.id}`}>
                            {item.items.Presupuesto}
                        </p>
                    </div>
                    </div>
                </div>
                ))}
            </div>

        </>
    )
}

export default Home
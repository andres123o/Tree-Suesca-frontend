import SearchBox from '../home-destino/searchBox'
import FiltrosTitulo from '../common/titulo-filtro'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";


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
    const navigate = useNavigate();
    const [filtros, setFiltros] = useState({});
    const [rutasFiltradas, setRutasFiltradas] = useState(respuestaAPIdestinos);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);
    const [filtroAbierto, setFiltroAbierto] = useState(null);

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
    
    const handle = (nombreDestino) => {
        navigate(`/home/destino/${nombreDestino}`);
    }

    return (
        <>
            {/* Header */}
            <div className="header">
                <div className="title-header">
                    <h5>Destino <span className="mas">+</span></h5>
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
            </div>

            <div className='separador'></div>
            
            {/* Buscadores */}
            <SearchBox 
                placeholder={respuestaApiPlaceholder}
            />

            {/* Filtros */}
            <div className="filtros-dropdown">
                {Object.entries(filtros).map(([key, values]) => (
                    <div className="filtro-item" key={key}>
                        <button 
                        className="filtro-button"
                        onClick={() => setFiltroAbierto(filtroAbierto === key ? null : key)}
                        >
                        {key} <IoMdArrowDropdown className='icono-arrow-down'/>
                        </button>
                        {filtroAbierto === key && (
                        <div className="filtro-opciones">
                            {Array.from(values).map((value, index) => (
                            <div
                                key={index}
                                onClick={() => manejarClick(key, value)}
                                className={filtroSeleccionado === value.value ? 'opcion-seleccionada' : ''}
                            >
                                {value.value}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Contenido */}
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
                        {item.frase}.
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
                            {item.municipio}, {item.departamento}.
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
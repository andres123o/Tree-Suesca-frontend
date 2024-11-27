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
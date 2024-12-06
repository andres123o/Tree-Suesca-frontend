import React, { useState, useEffect } from "react";
import ContainerPequeño from "../common/container-pequeño";
import FiltrosTitulo from "../common/titulo-filtro";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ListadoRestaurantes = ( { titulo, icono1, icono2, tipoEstablecimiento}) => {
    const location = useLocation()
    const destino_id = location.state?.destino_id
    const tipo = 'restaurantes' 
    const [filtros, setFiltros] = useState({});
    const [restaurantes, setRestaurantes] = useState([]);
    const [restaurantesFiltrados, setRestaurantesFiltrados] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://tree-suesca-backend-production.up.railway.app/api/v1/listados/${destino_id}/${tipo}`
                );
                setRestaurantes(response.data);
                setRestaurantesFiltrados(response.data);

                const nuevosFiltros = {};
                response.data.forEach((res) => {
                    Object.entries(res.items).forEach(([key, value]) => {
                        if (!nuevosFiltros[key]) {
                            nuevosFiltros[key] = new Set();
                        }
                        if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                            nuevosFiltros[key].add({value});
                        }
                    });
                });
                setFiltros(nuevosFiltros);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [destino_id, tipo]);

    const manejarClick = (key, value) => {
        setFiltroSeleccionado(value.value);
        const nuevasRutas = restaurantes.filter(res => res.items[key] === value.value);
        setRestaurantesFiltrados(nuevasRutas);
    };

    
    return (
        <>
            <FiltrosTitulo 
                nombre={titulo}
                filtros={filtros}
                filtroSeleccionado={filtroSeleccionado}
                manejarClick={manejarClick}
            />
            <ContainerPequeño 
                displayedItems = {restaurantesFiltrados}
                icono1 = {icono1}
                icono2={icono2}
                tipoDescripcion= 'Platos desde: '
                tipoEstablecimiento= {tipoEstablecimiento}
            />
        </>
    )
}

export default ListadoRestaurantes
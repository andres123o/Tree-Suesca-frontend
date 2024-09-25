import React, { useState, useEffect } from "react";
import ContainerPequeño from "../common/container-pequeño";
import FiltrosTitulo from "../common/titulo-filtro";

const ListadoRestaurantes = ( {restaurantes, titulo, icono1, icono2} ) => {
    const [filtros, setFiltros] = useState({});
    const [restaurantesFiltrados, setRestaurantesFiltrados] = useState(restaurantes);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

     // Inicializa los filtros según los datos de las rutas
     useEffect(() => {
        const nuevosFiltros = {};
        restaurantes.forEach((res) => {
            Object.entries(res.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                  nuevosFiltros[key] = new Set()
                }
                if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                  nuevosFiltros[key].add({value});
                }
            });
        });
        setFiltros(nuevosFiltros);
    }, [restaurantes]);  


    const manejarClick = (key, value) => {
        setFiltroSeleccionado(value.value);
        const nuevasRutas = restaurantes.filter(res => res.items[key] === value.value);
        setRestaurantesFiltrados(nuevasRutas);
    }

    
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
            />
        </>
    )
}

export default ListadoRestaurantes
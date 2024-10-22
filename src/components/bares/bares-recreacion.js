import React, { useState, useEffect } from "react";
import ContainerPequeño from "../common/container-pequeño";
import FiltrosTitulo from "../common/titulo-filtro";

const ListadoBares = ( {bares, icono1, icono2, titulo, tipoEstablecimiento} ) => {
    const [filtros, setFiltros] = useState({});
    const [baresFiltrados, setBaresFiltrados] = useState(bares);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

         // Inicializa los filtros según los datos de las rutas
     useEffect(() => {
        const nuevosFiltros = {};
        bares.forEach((bar) => {
            Object.entries(bar.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                  nuevosFiltros[key] = new Set()
                }
                if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                  nuevosFiltros[key].add({value});
                }
            });
        });
        setFiltros(nuevosFiltros);
    }, [bares]);  


    const manejarClick = (key, value) => {
        setFiltroSeleccionado(value.value);
        const nuevasRutas = bares.filter(bar => bar.items[key] === value.value);
        setBaresFiltrados(nuevasRutas);
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
                displayedItems = {baresFiltrados}
                icono1 = {icono1}
                icono2= {icono2}
                tipoDescripcion= 'Botella desde: '
                tipoEstablecimiento= {tipoEstablecimiento}
            />
        </>
    )

}

export default ListadoBares;
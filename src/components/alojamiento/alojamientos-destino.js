import React, { useState, useEffect } from "react";
import ContainerMediano from "../common/container-mediano";
import FiltrosTitulo from "../common/titulo-filtro";

const ListadoAlojamiewnto = ( {alojamientos, titulo, icon, tipo, iconCalendar, fecha} ) => {
    const [filtros, setFiltros] = useState({});
    const [alojamientoFiltrados, setAlojamientoFiltrados] = useState(alojamientos);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

     // Inicializa los filtros según los datos de las rutas
     useEffect(() => {
        const nuevosFiltros = {};
        alojamientos.forEach((alojamiento) => {
            Object.entries(alojamiento.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                  nuevosFiltros[key] = new Set()
                }
                if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                  nuevosFiltros[key].add({value});
                }
            });
        });
        setFiltros(nuevosFiltros);
    }, [alojamientos]);  


    const manejarClick = (key, value) => {
        setFiltroSeleccionado(value.value);
        const nuevasRutas = alojamientos.filter(alojamiento => alojamiento.items[key] === value.value);
        setAlojamientoFiltrados(nuevasRutas);
    }

    
    return (
        <>
            <FiltrosTitulo 
                nombre={titulo}
                filtros={filtros}
                filtroSeleccionado={filtroSeleccionado}
                manejarClick={manejarClick}
            />
            <ContainerMediano 
                actividadesDestino={alojamientoFiltrados}
                icon={icon}
                tipo={tipo}
                direccion= 'column'
                xOverflow = 'none'
                ancho= '42vh'
                routeInndividual = 'alojamiento'
            />
        </>
    )
}

export default ListadoAlojamiewnto;
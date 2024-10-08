import React, { useState, useEffect } from "react";
import ContainerMediano from "../common/container-mediano";
import FiltrosTitulo from "../common/titulo-filtro";

const ListadoEventos = ( {eventos, titulo, icon, tipo, iconCalendar, fecha} ) => {
    const [filtros, setFiltros] = useState({});
    const [eventosFiltrados, setEventosFiltrados] = useState(eventos);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

     // Inicializa los filtros según los datos de las rutas
     useEffect(() => {
        const nuevosFiltros = {};
        eventos.forEach((evento) => {
            Object.entries(evento.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                  nuevosFiltros[key] = new Set()
                }
                if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                  nuevosFiltros[key].add({value});
                }
            });
        });
        setFiltros(nuevosFiltros);
    }, [eventos]);  


    const manejarClick = (key, value) => {
        setFiltroSeleccionado(value.value);
        const nuevasRutas = eventos.filter(evento => evento.items[key] === value.value);
        setEventosFiltrados(nuevasRutas);
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
                actividadesDestino={eventosFiltrados}
                icon={icon}
                tipo={tipo}
                direccion= 'column'
                xOverflow = 'none'
                iconCalendar={iconCalendar}
                fecha={fecha}
                oferente= 'item.oferente'
                ancho= '40vh'
                routeInndividual = 'evento'
            />
        </>
    )
}

export default ListadoEventos;
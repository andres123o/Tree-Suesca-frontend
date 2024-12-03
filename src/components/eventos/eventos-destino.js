import React, { useState, useEffect } from "react";
import ContainerMediano from "../common/container-mediano";
import FiltrosTitulo from "../common/titulo-filtro";

const ListadoEventos = ({eventos, titulo, icon, tipo, iconCalendar, fecha}) => {
    const [filtros, setFiltros] = useState({});
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

    useEffect(() => {
        // Flatten eventos data
        const todosLosEventos = eventos.flatMap(oferente =>
            oferente.evento.map(evt => ({
                ...evt,
                oferenteLogo: oferente.logo,
                oferenteId: oferente.id
            }))
        );
        setEventosFiltrados(todosLosEventos);

        // Create filters from flattened data
        const nuevosFiltros = {};
        todosLosEventos.forEach((evt) => {
            Object.entries(evt.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                    nuevosFiltros[key] = new Set();
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
        const filtrados = eventos.flatMap(oferente =>
            oferente.evento.filter(evt => evt.items[key] === value.value)
            .map(evt => ({
                ...evt,
                oferenteLogo: oferente.logo,
                oferenteId: oferente.id
            }))
        );
        setEventosFiltrados(filtrados);
    };

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
                direccion='column'
                xOverflow='none'
                iconCalendar={iconCalendar}
                fecha={fecha}
                oferente='item.oferente'
                ancho='42vh'
                routeInndividual='evento'
            />
        </>
    );
};

export default ListadoEventos;
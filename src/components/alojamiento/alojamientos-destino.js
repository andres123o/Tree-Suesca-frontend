import React, { useState, useEffect } from "react";
import ContainerMediano from "../common/container-mediano";
import FiltrosTitulo from "../common/titulo-filtro";

const ListadoAlojamiewnto = ( {alojamientos, titulo, icon, tipo, iconCalendar, fecha} ) => {
    const [filtros, setFiltros] = useState({});
    const [alojamientoFiltrados, setAlojamientosFiltrados] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

    useEffect(() => {
        // Flatten the data
        const todosLosAlojamientos = alojamientos.flatMap(oferente =>
            oferente.alojamiento.map(aloj => ({
                ...aloj,
                oferenteLogo: oferente.logo,
                oferenteId: oferente.id
            }))
        );
        setAlojamientosFiltrados(todosLosAlojamientos);

        // Create filters
        const nuevosFiltros = {};
        todosLosAlojamientos.forEach((aloj) => {
            Object.entries(aloj.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                    nuevosFiltros[key] = new Set();
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
        const filtrados = alojamientos.flatMap(oferente =>
            oferente.alojamiento.filter(aloj => aloj.items[key] === value.value)
            .map(aloj => ({
                ...aloj,
                oferenteLogo: oferente.logo,
                oferenteId: oferente.id
            }))
        );
        setAlojamientosFiltrados(filtrados);
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
                actividadesDestino={alojamientoFiltrados}
                icon={icon}
                tipo={tipo}
                direccion= 'column'
                xOverflow = 'none'
                ancho= '40vh'
                routeInndividual = 'alojamiento'
            />
        </>
    )
}

export default ListadoAlojamiewnto;
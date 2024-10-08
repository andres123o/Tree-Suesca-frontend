import React, { useState, useEffect } from "react";
import ContainerMediano from "../common/container-mediano";
import FiltrosTitulo from "../common/titulo-filtro";

const ListadoActividades = ( {actividades, titulo, icon, tipo} ) => {
    const [filtros, setFiltros] = useState({});
    const [actividadesFiltradas, setActividadesFiltradas] = useState(actividades);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

     // Inicializa los filtros según los datos de las rutas
     useEffect(() => {
        const nuevosFiltros = {};
        actividades.forEach((act) => {
            Object.entries(act.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                  nuevosFiltros[key] = new Set()
                }
                if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                  nuevosFiltros[key].add({value});
                }
            });
        });
        setFiltros(nuevosFiltros);
    }, [actividades]);  


    const manejarClick = (key, value) => {
        setFiltroSeleccionado(value.value);
        const nuevasRutas = actividades.filter(act => act.items[key] === value.value);
        setActividadesFiltradas(nuevasRutas);
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
                actividadesDestino={actividadesFiltradas}
                icon={icon}
                tipo={tipo}
                direccion= 'column'
                xOverflow = 'none'
                ancho= '40vh'
                routeInndividual = 'actividad'
            />
        </>
    )
}

export default ListadoActividades
import React, { useState, useEffect } from "react";
import ContainerMediano from "../common/container-mediano";
import FiltrosTitulo from "../common/titulo-filtro";


const ListadoActividades = ({ actividades, titulo, icon, tipo }) => {
    const [filtros, setFiltros] = useState({});
    const [actividadesFiltradas, setActividadesFiltradas] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

    // Aplanar actividades y preparar filtros
    useEffect(() => {
        const todasLasActividades = actividades.flatMap(oferente => 
            oferente.actividad.map(act => ({
                ...act,
                oferenteLogo: oferente.logo,
                oferenteNombre: oferente.oferente,
                oferenteId: oferente.id
            }))
        );
        setActividadesFiltradas(todasLasActividades);

        const nuevosFiltros = {};
        todasLasActividades.forEach((act) => {
            Object.entries(act.items).forEach(([key, value]) => {
                if (!nuevosFiltros[key]) {
                    nuevosFiltros[key] = new Set();
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
        const actividadesFiltradas = actividades.flatMap(oferente => 
            oferente.actividad.filter(act => act.items[key] === value.value)
            .map(act => ({
                ...act,
                oferenteLogo: oferente.logo,
                oferenteNombre: oferente.oferente,
                oferenteId: oferente.id
            }))
        );
        setActividadesFiltradas(actividadesFiltradas);
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
                actividadesDestino={actividadesFiltradas}
                icon={icon}
                tipo={tipo}
                direccion= 'column'
                xOverflow = 'none'
                ancho= '40vh'
                routeInndividual = 'actividad'
            />
        </>
    );
};

export default ListadoActividades
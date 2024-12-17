import React, { useState, useEffect } from "react";
import ContainerPequeño from "../common/container-pequeño";
import FiltrosTitulo from "../common/titulo-filtro";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ListadoBares = ( { icono1, icono2, titulo, tipoEstablecimiento} ) => {
    const location = useLocation()
    const destino_id = location.state?.destino_id
    const tipo = 'bares'

    const [filtros, setFiltros] = useState({});
    const [bares, setBares] = useState([]);
    const [baresFiltrados, setBaresFiltrados] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

    const filtrarBaresValidos = (data) => {
        return data.filter(bar => {
            // Verificar si el restaurante tiene toda la información necesaria
            return bar.name !== "Pendiente" &&
                   bar.img !== "" &&
                   bar.logo !== ""
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://tree-suesca-backend-production.up.railway.app/api/v1/listados/${destino_id}/${tipo}`
                );

                const alojamientoFiltrados = filtrarBaresValidos(response.data)
                setBares(alojamientoFiltrados);
                setBaresFiltrados(alojamientoFiltrados);
 
                const nuevosFiltros = {};
                alojamientoFiltrados.forEach((bar) => {
                    Object.entries(bar.items).forEach(([key, value]) => {
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
        const nuevasRutas = bares.filter(bar => bar.items[key] === value.value);
        setBaresFiltrados(nuevasRutas);
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
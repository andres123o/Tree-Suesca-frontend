import React, { useState, useEffect } from "react";
import ContainerMediano from "../common/container-mediano";
import FiltrosTitulo from "../common/titulo-filtro";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ListadoAlojamiento = ({ titulo, icon, tipo, iconCalendar, fecha }) => {
   const location = useLocation();
   const destino_id = location.state?.destino_id;
   const [filtros, setFiltros] = useState({});
   const [alojamientos, setAlojamientos] = useState([]);
   const [alojamientoFiltrados, setAlojamientosFiltrados] = useState([]);
   const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

   useEffect(() => {
       const fetchData = async () => {
           try {
               const response = await axios.get(
                   `https://tree-suesca-backend-production.up.railway.app/api/v1/listados/demas/${destino_id}/alojamientos`
               );
               setAlojamientos(response.data);
               setAlojamientosFiltrados(response.data);

               const nuevosFiltros = {};
               response.data.forEach((aloj) => {
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
           } catch (error) {
               console.error("Error fetching data:", error);
           }
       };
       fetchData();
   }, [destino_id]);

   const manejarClick = (key, value) => {
       setFiltroSeleccionado(value.value);
       const filtrados = alojamientos.filter(aloj => aloj.items[key] === value.value);
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
               direccion="column"
               xOverflow="none" 
               ancho="40vh"
               routeInndividual="alojamiento"
               noche='por noche'
           />
       </>
   );
};

export default ListadoAlojamiento;
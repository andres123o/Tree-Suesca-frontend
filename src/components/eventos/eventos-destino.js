import React, { useState, useEffect } from "react";
import ContainerMediano from "../common/container-mediano";
import FiltrosTitulo from "../common/titulo-filtro";
import axios from "axios";
import { useLocation } from "react-router-dom";


const ListadoEventos = ({ titulo, icon, tipo, iconCalendar, fecha }) => {
   const location = useLocation();
   const destino_id = location.state?.destino_id;
   const [filtros, setFiltros] = useState({});
   const [eventos, setEventos] = useState([]);
   const [eventosFiltrados, setEventosFiltrados] = useState([]);
   const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

   useEffect(() => {
       const fetchData = async () => {
           try {
               const response = await axios.get(
                   `https://tree-suesca-backend-production.up.railway.app/api/v1/listados/demas/${destino_id}/eventos`
               );
               setEventos(response.data);
               setEventosFiltrados(response.data);

               const nuevosFiltros = {};
               response.data.forEach((evt) => {
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
           } catch (error) {
               console.error("Error fetching data:", error);
           }
       };
       fetchData();
   }, [destino_id]);

   const manejarClick = (key, value) => {
       setFiltroSeleccionado(value.value);
       const filtrados = eventos.filter(evt => evt.items[key] === value.value);
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
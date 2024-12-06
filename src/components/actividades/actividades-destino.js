import React, { useState, useEffect } from "react";
import ContainerMediano from "../common/container-mediano";
import FiltrosTitulo from "../common/titulo-filtro";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ListadoActividades = ({ titulo, icon, tipo }) => {
   const location = useLocation();
   const destino_id = location.state.destino_id;
   const [filtros, setFiltros] = useState({});
   const [actividades, setActividades] = useState([]);
   const [actividadesFiltradas, setActividadesFiltradas] = useState([]);
   const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

   useEffect(() => {
       const fetchData = async () => {
           try {
               const response = await axios.get(
                   `https://tree-suesca-backend-production.up.railway.app/api/v1/listados/demas/${destino_id}/actividades`
               );
               setActividades(response.data);
               setActividadesFiltradas(response.data);

               const nuevosFiltros = {};
               response.data.forEach((act) => {
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
           } catch (error) {
               console.error("Error fetching data:", error);
           }
       };
       fetchData();
   }, [destino_id]);

   const manejarClick = (key, value) => {
       setFiltroSeleccionado(value.value);
       const filtradas = actividades.filter(act => act.items[key] === value.value);
       setActividadesFiltradas(filtradas);
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
               direccion="column"
               xOverflow="none"
               ancho="40vh"
               routeInndividual="actividad"
           />
       </>
   );
};

export default ListadoActividades;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FiltrosTitulo from '../common/titulo-filtro'
import { useNavigate } from "react-router-dom"

const ListaRutas = ({ rutas, iconos, route}) => {
  const navigate = useNavigate();
  const { nombre } = useParams();
  const [filtros, setFiltros] = useState({});
  const [rutasFiltradas, setRutasFiltradas] = useState(rutas);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

  const actividadesTitulo = {
      'Senderismo': 'Explorando a pie',
      'Bici Tour': 'Bici tour',
      'Moteros': 'Rutas moteras',
      'Automovil': 'Explorando en auto'
  };

  const handle = () => {
    // Redirige a listaRutas.html con el nombre de la actividad como query param
    navigate(`/rutas/${nombre}/${route}`);
  }

  // Inicializa los filtros según los datos de las rutas
  useEffect(() => {
      const nuevosFiltros = {};
      rutas.forEach((ruta) => {
          Object.entries(ruta.items).forEach(([key, value]) => {
              if (!nuevosFiltros[key]) {
                nuevosFiltros[key] = new Set()
              }
              if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                nuevosFiltros[key].add({value});
              }
          });
      });
      setFiltros(nuevosFiltros);
  }, [rutas]);

  const manejarClick = (key, value) => {
    setFiltroSeleccionado(value.value);
    const nuevasRutas = rutas.filter(ruta => ruta.items[key] === value.value);
    setRutasFiltradas(nuevasRutas);
  }

  return (
    <>
      <FiltrosTitulo 
        nombre={actividadesTitulo[nombre]}
        filtros={filtros}
        filtroSeleccionado={filtroSeleccionado}
        manejarClick={manejarClick}
      />
      <div className="container-seccion-lista-rutas">
        {rutasFiltradas.map((item) => (
          <div 
            key={item.id} 
            className="container-item-lista-rutas"
            onClick={handle}
          >
            <div
                className="container-img-ruta"
                style={{ backgroundImage: `url(${item.img})` }}
            >
            </div>
            <div className="container-info-ruta">
              <div className="container-nombre-titulo">
                <h5>
                  {item.nombre}
                </h5>
                <div className="container-clasificacion-ruta">
                  <p>
                    {item.calificacion}
                    <img key={`star-${item.id}`} src="/utils/icons8-estrella-48.png" alt="estrella" />
                  </p>
                </div>
              </div>
              <div className="container-descripcion-caracteristicas">
                {React.cloneElement(iconos.Dificultad, { key: `dificultad-icon-${item.id}` })}
                <p key={`dificultad-${item.id}`}>
                  Dificultad: {item.Dificultad}
                </p>
                {React.cloneElement(iconos.distancia, { key: `distancia-icon-${item.id}` })}
                <p key={`distancia-${item.id}`}>
                  {item.distancia}
                </p>
                {React.cloneElement(iconos.tiempo, { key: `tiempo-icon-${item.id}` })}
                <p key={`tiempo-${item.id}`}>
                  {item.tiempo}
                </p>
                {React.cloneElement(iconos.terreno, { key: `terreno-icon-${item.id}` })}
                <p key={`terreno-${item.id}`}>
                  {item.terreno}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListaRutas;
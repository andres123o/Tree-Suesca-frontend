import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FiltrosTitulo from '../common/titulo-filtro'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

// Obtener datos
const useDestinoContent = (destinoId = 1) => {
  const { nombre } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchDestinoContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://tree-suesca-backend-production.up.railway.app/api/v1/rutas/${nombre}/content`
        );
        setContent(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinoContent();
  }, [destinoId]);

  return { content, loading, error };
};

const MainComponentListadoRutas = ({iconos, route}) => {
  const { content, loading, error } = useDestinoContent();
  
  console.log(content)
  if (loading) return <><div>Cargando...</div></>;
  if (error) return <><div>Error: {error}</div></>;
  if (!content) return <><div>No hay contenido disponible</div></>;

  return <ListaRutas rutas={content} iconos={iconos} route={route}/>;
}

const ListaRutas = ({ rutas, iconos, route}) => {
  const navigate = useNavigate();
  const { nombre } = useParams();
  const [filtros, setFiltros] = useState({});
  const [rutasFiltradas, setRutasFiltradas] = useState(rutas);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

  const actividadesTitulo = {
      'Senderismo': 'Explorando a pie',
      'BiciTour': 'Bici tour',
      'Moto': 'Rutas moteras',
      'Automovil': 'Explorando en auto'
  };

  const handle = (nombreRuta) => {
    navigate(`/rutas/caracteristicas/${nombreRuta}/`);
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
            onClick={() => {handle(item.nombre)}}
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
                  {item.distancia} Km
                </p>
                {React.cloneElement(iconos.tiempo, { key: `tiempo-icon-${item.id}` })}
                <p key={`tiempo-${item.id}`}>
                  {item.tiempo} Min
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

export default MainComponentListadoRutas;
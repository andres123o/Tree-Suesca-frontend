import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ListaRutas = ({ rutas, iconos }) => {
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
            <div className="container-titulo-categoria-filtro">
                <div className="container-nombre-categoria">
                    <h5>{actividadesTitulo[nombre]}</h5>
                    <img src="/utils/tree suesca.png"></img>
                </div>
                <div className="container-filtros-general">
                  {
                    Object.entries(filtros).map(([key, values]) => (
                      <div className="cotainer-valores-duracion" key={key}>
                        <h5>
                          {key}: 
                        </h5>
                        <div className="container-valores-filto-duracion">
                          {
                            Array.from(values).map((value, index) => (
                              <p 
                                key={index} 
                                onClick={() => manejarClick(key, value)}
                                className = {filtroSeleccionado === value.value ? 'filtro-seleccionado' : ''}
                              >
                                {value.value}
                              </p>
                            ))
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
            </div>
            <div className="container-seccion-lista-rutas">
                {rutasFiltradas.map((item) => (
                    <div key={item.id} className="container-item-lista-rutas">
                        <div
                            className="container-img-ruta"
                            style={{ backgroundImage: `url(${item.img})` }}
                        ></div>
                        <div className="container-info-ruta">
                          <div className="container-nombre-titulo">
                            <h5>
                              {item.nombre}
                            </h5>
                          </div>
                          <div className="container-descripcion-caracteristicas">
                            {iconos.distancia}
                            <p>
                              {item.distancia}
                            </p>
                            {iconos.tiempo}
                            <p>
                              {item.tiempo}
                            </p>
                            {iconos.terreno}
                            <p>
                              {item.terreno}
                            </p>
                            {iconos.Dificultad} 
                            <p>
                              {item.Dificultad}
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

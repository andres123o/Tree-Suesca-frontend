import React, { useState, useEffect } from 'react';
import StarRating from '../common/calificacion';
import { IoIosArrowForward } from "react-icons/io";
import OptimizedImage from '../common/optimzarImg'
import OptimizedImageLarge from '../common/optimizarImagenesVersion'

const InfoDescripcion = ({ ruta, onImageSelect, startMap }) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const maxTextLength = 100;

  useEffect(() => {
    function crearMapaIlustrativo(containerId) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "auto");
      svg.setAttribute("viewBox", "0 30 500 210");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  
      // Usando los datos de la API para las estaciones
      const estaciones = ruta.estaciones.map(estacion => {
        // Asignar posiciones basadas en el índice para distribuir uniformemente
        const index = ruta.estaciones.indexOf(estacion);
        const totalEstaciones = ruta.estaciones.length;
        return {
          x: 20 + (460 * index / (totalEstaciones - 1)),
          y: 200 - (index * 20), // Ajustar Y para crear efecto de elevación
          nombre: estacion.nombre,
          dificultad: estacion.dificultad
        };
      });
  
      // Usando los datos de la API para los atajos
      const atajos = ruta.atajos.map((atajo, index) => {
        const totalAtajos = ruta.atajos.length;
        // Crear puntos de inicio y fin distribuidos a lo largo del camino
        return {
          start: { 
            x: 90 + (100 * index), 
            y: 205 - (index * 30)
          },
          end: { 
            x: 210 + (100 * index), 
            y: 135 - (index * 20)
          },
          nombre: atajo.nombre,
          dificultad: atajo.dificultad
        };
      });

      // El resto del código del mapa se mantiene igual...
      function generarRutaAscendente() {
          let d = "M20,180 "; 
          for (let i = 20; i <= 480; i += 1) {
          const y = 180 - Math.pow((i - 8) / 310, 1) * 70;
          const ondulacion = Math.sin((i - 20) / 30) * 50;
          d += `L${i},${y + ondulacion} `;
          }
          return d.trim();
      }
  
      const rutaPrincipal = document.createElementNS("http://www.w3.org/2000/svg", "path");
      rutaPrincipal.setAttribute("d", generarRutaAscendente());
      rutaPrincipal.setAttribute("stroke", "black");
      rutaPrincipal.setAttribute("stroke-width", "3");
      rutaPrincipal.setAttribute("fill", "none");
      svg.appendChild(rutaPrincipal);

      // Crear atajos y marcadores
      atajos.forEach(atajo => {
          const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
          linea.setAttribute("x1", atajo.start.x);
          linea.setAttribute("y1", atajo.start.y);
          linea.setAttribute("x2", atajo.end.x);
          linea.setAttribute("y2", atajo.end.y);
          linea.setAttribute("stroke", "#FFA500");
          linea.setAttribute("stroke-width", "3");
          linea.setAttribute("stroke-dasharray", "5,5");
          svg.appendChild(linea);
  
          const marcador = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          marcador.setAttribute("cx", atajo.start.x);
          marcador.setAttribute("cy", atajo.start.y);
          marcador.setAttribute("r", "10");
          marcador.setAttribute("fill", "#FFA500");
          marcador.setAttribute("stroke", "black");
          marcador.setAttribute("stroke-width", "0");
          marcador.addEventListener('click', () => mostrarTooltip(atajo.nombre, atajo.dificultad, atajo.start.x, atajo.start.y))
          svg.appendChild(marcador);
      });
  
      // Crear estaciones con banderas
      estaciones.forEach(estacion => {
          const grupoEstacion = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
          const triangulo = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
          triangulo.setAttribute("points", `${estacion.x - 17},${estacion.y - 12} ${estacion.x + 17},${estacion.y - 12} ${estacion.x},${estacion.y - 40}`);
          triangulo.setAttribute("fill", "#EB2330");
          grupoEstacion.appendChild(triangulo);
  
          grupoEstacion.addEventListener('click', () => mostrarTooltip(estacion.nombre, estacion.dificultad, estacion.x, estacion.y - 20));
          svg.appendChild(grupoEstacion);
      });
  
      const contenedor = document.getElementById(containerId);
      contenedor.innerHTML = '';
      contenedor.appendChild(svg);
  
      function mostrarTooltip(nombre, dificultad, x, y) {
        const tooltipExistente = document.getElementById('mapa-tooltip');
        if (tooltipExistente) {
            tooltipExistente.remove();
        }
    
        const tooltip = document.createElement('div');
        tooltip.id = 'mapa-tooltip';
        tooltip.innerHTML = `<strong>${nombre}</strong><br>Dificultad: ${dificultad}`;
    
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'rgba(255, 255, 255, 0.9)';
        tooltip.style.padding = '3%';
        tooltip.style.borderRadius = '1em';
        tooltip.style.zIndex = '1000';
        tooltip.style.fontSize = '0.8em';
        tooltip.style.maxWidth = '80%';
        tooltip.style.boxShadow = '0 5px 5px rgba(0, 0, 0, 0.2)';
        tooltip.style.transition = 'opacity 0.3s';
    
        document.body.appendChild(tooltip);
    
        const svgRect = svg.getBoundingClientRect();
        const escalaX = svgRect.width / svg.viewBox.baseVal.width;
        const escalaY = svgRect.height / svg.viewBox.baseVal.height;
    
        const desplazamientoX = window.pageXOffset || document.documentElement.scrollLeft;
        const desplazamientoY = window.pageYOffset || document.documentElement.scrollTop;
    
        let posX = (x * escalaX) + svgRect.left + desplazamientoX;
        let posY = (y * escalaY) + svgRect.top + desplazamientoY;
    
        posX = posX - (tooltip.offsetWidth / 2);
        posY = posY - tooltip.offsetHeight - 10;
    
        if (posY < 0) {
            posY = y + 20;
        }
        if (posX < 0) {
            posX = 0;
        } else if (posX + tooltip.offsetWidth > window.innerWidth) {
            posX = window.innerWidth - tooltip.offsetWidth;
        }
    
        tooltip.style.left = `${posX}px`;
        tooltip.style.top = `${posY}px`;
    
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
    
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 100);
        }, 1000);
      }
  
      function ajustarTamanoSVG() {
          const anchoContenedor = contenedor.clientWidth;
          const altoCalculado = (anchoContenedor * 150) / 400;
          svg.style.height = `${altoCalculado}px`;
      }
      
      ajustarTamanoSVG();
      window.addEventListener('resize', ajustarTamanoSVG);
  
      return () => {
        window.removeEventListener('resize', ajustarTamanoSVG);
      };
    }

    const limpiar = crearMapaIlustrativo('container-mapa-interactivo-example');

    return () => {
      if (limpiar) limpiar();
      const contenedor = document.getElementById('container-mapa-interactivo-example');
      if (contenedor) contenedor.innerHTML = '';
    };
  }, [ruta]);

  const handleImageClick = (imgSrc, index) => {
    setSelectedImgIndex(index);
    onImageSelect(imgSrc);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const visibleText = isExpanded ? ruta.descripcion : `${ruta.descripcion.slice(0, maxTextLength)}...`;

  return (
    <>
      <div className='container-info-descrip'>
        <div className='container-carrusel-imgs'>
          <div className='carrusel-imgs'>
            {ruta.imagenes.map((img, index) => (
              <OptimizedImageLarge
                key={img.id}
                imageUrl={img.url}
                alt={`Imagen ${index + 1} del establecimiento`}
                onClick={() => handleImageClick(img.url, index)}
                className={index === selectedImgIndex ? 'selected' : ''}
              />
            ))}
          </div>
        </div>

        <div className='container-recuadro-info-title'>
          <h4>{ruta.nombre}</h4>
          <div className='container-dificultad-distancia-timpo'>
            <div className='section'>
              <h5>Distancia</h5>
              <p>{ruta.distancia} Km</p>
            </div>
            <div className='section'>
              <h5>Tiempo</h5>
              <p>{ruta.tiempo} Min</p>
            </div>
            <div className='section'>
              <h5>Dificultad</h5>
              <p>{ruta.dificultad}</p>
            </div>
          </div>
        </div>

        <div className='separador'></div>

        <div className='container-mapa-atajos-estaciones'>
          <div id='container-mapa-interactivo-example'></div>
        </div>

        <div className='container-leyenda-mapa-interactivo-arriba'>
          <div className='container-leyenda'>
            <h5>Estaciones</h5>
            <div className='circulo' style={{ backgroundColor: '#EB2330' }}></div>
          </div>
          <div className='container-leyenda'>
            <h5>Atajos</h5>
            <div className='circulo' style={{ backgroundColor: '#FFA500' }}></div>
          </div>  
        </div>

        <div className='separador'></div>

        <div className='container-descripcion'>
          <p className='descripcion' id="descripcion-texto">
            {visibleText}
            <button onClick={toggleExpand} className='show-more-btn'>
              {isExpanded ? 'less' : 'more'}
            </button>
          </p>
        </div>

        <div className='separador'></div>

        <div className='container-boton'>
          <button 
            className="unlock-button" 
            id="desbloquear"
            onClick={startMap}
          >
            Iniciar Ruta
          </button>
        </div>

        <div className='separador'></div>

        <div className='container-calificativo'>
          <div className='container-estrellas'>
            <p>{ruta.calificacion}</p>
            <StarRating rating={ruta.calificacion} />
          </div>
          <div className='container-comentarios'>
            <div>
              <h5>Veces recomendada: </h5>
              <span>{ruta.veces_recomendada}</span>
            </div>
            <div>
              <h5>Completaron la ruta: </h5>
              <span>{ruta.completaron_ruta}</span>
            </div>
          </div> 
        </div>

        <div className='separador'></div>

        <div className='accordion'>
          {ruta.instrucciones.map((instruccion, index) => (
            <div key={instruccion.id} className='accordion-item1'>
              {Object.entries(instruccion).map(([key, value]) => {
                if (key !== 'id') {
                  return (
                    <div key={key}>
                      <button 
                        className={`accordion-header ${expandedSection === `${index}-${key}` ? 'active' : ''}`}
                        onClick={() => toggleSection(`${index}-${key}`)}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        <IoIosArrowForward className={`icon ${expandedSection === `${index}-${key}` ? 'rotated' : ''}`} />
                      </button>
                      <div 
                        className='accordion-content'
                        style={{ display: expandedSection === `${index}-${key}` ? 'block' : 'none' }}
                      >
                        <p>{value}</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfoDescripcion;
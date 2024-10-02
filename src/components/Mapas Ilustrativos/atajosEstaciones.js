function crearMapaIlustrativo(containerId) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "auto");
  svg.setAttribute("viewBox", "0 30 500 210");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  
  // Datos de ejemplo para las estaciones
  const estaciones = [
    { x: 20, y: 200, nombre: 'Parque principal', dificultad: 'Baja' },
    { x: 110, y: 180, nombre: 'Empezando la Z', dificultad: 'Media' },
    { x: 330, y: 90, nombre: 'Mirador la Sabana', dificultad: 'Baja' },
    { x: 478, y: 120, nombre: 'Virgen de la Z', dificultad: 'Media' }
  ];

  // Datos para los atajos
  const atajos = [
    { start: { x: 90, y: 205 }, end: { x: 210, y: 135 }, nombre: "Saltando la Z", dificultad: "Baja" },
    { start: { x: 195, y: 110 }, end: { x: 315, y: 90 }, nombre: "Explorando el bosque", dificultad: "Media" },
    { start: { x: 290, y: 145 }, end: { x: 400, y: 100 }, nombre: "Directo al monumento", dificultad: "Alta" }
  ];

  // Función para generar una curva ascendente
  function generarRutaAscendente() {
    let d = "M20,180 "; 
    for (let i = 20; i <= 480; i += 1) {
      const y = 180 - Math.pow((i - 8) / 310, 1) * 70;
      const ondulacion = Math.sin((i - 20) / 30) * 50;
      d += `L${i},${y + ondulacion} `;
    }
    return d.trim();
  }

  // Crear la ruta principal ascendente
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

    // Crear el triángulo en lugar de la bandera
    const triangulo = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    triangulo.setAttribute("points", `${estacion.x - 17},${estacion.y - 12} ${estacion.x + 17},${estacion.y - 12} ${estacion.x},${estacion.y - 40}`);
    triangulo.setAttribute("fill", "#EB2330"); // Color rojo del triángulo
    grupoEstacion.appendChild(triangulo);

    grupoEstacion.addEventListener('click', () => mostrarTooltip(estacion.nombre, estacion.dificultad, estacion.x, estacion.y - 20));
    svg.appendChild(grupoEstacion);
  });

  // Añadir el SVG al contenedor
  const contenedor = document.getElementById(containerId);
  contenedor.appendChild(svg);

// Función para mostrar el tooltip ajustado
function mostrarTooltip(nombre, dificultad, x, y) {
  // Remover cualquier tooltip existente
  const tooltipExistente = document.getElementById('mapa-tooltip');
  if (tooltipExistente) {
    tooltipExistente.remove();
  }

  const tooltip = document.createElement('div');
  tooltip.id = 'mapa-tooltip';
  tooltip.innerHTML = `<strong>${nombre}</strong><br>Dificultad: ${dificultad}`;

  // Estilos del tooltip para móviles
  tooltip.style.position = 'absolute';
  tooltip.style.background = 'rgba(255, 255, 255, 0.9)';
  tooltip.style.padding = '3%';
  tooltip.style.borderRadius = '1em';
  tooltip.style.zIndex = '1000';
  tooltip.style.fontSize = '0.8em';
  tooltip.style.maxWidth = '80%';
  tooltip.style.boxShadow = '0 5px 5px rgba(0, 0, 0, 0.2)';
  tooltip.style.transition = 'opacity 0.3s';

  // Agregar tooltip al body para evitar problemas de posicionamiento
  document.body.appendChild(tooltip);

  // Calcular la posición del tooltip
  const svgRect = svg.getBoundingClientRect();
  const escalaX = svgRect.width / svg.viewBox.baseVal.width;
  const escalaY = svgRect.height / svg.viewBox.baseVal.height;

  // Obtenemos el desplazamiento actual del viewport
  const desplazamientoX = window.pageXOffset || document.documentElement.scrollLeft;
  const desplazamientoY = window.pageYOffset || document.documentElement.scrollTop;

  // Calculamos la posición del tooltip con el desplazamiento y escala
  let posX = (x * escalaX) + svgRect.left + desplazamientoX;
  let posY = (y * escalaY) + svgRect.top + desplazamientoY;

  // Centrar el tooltip horizontalmente
  posX = posX - (tooltip.offsetWidth / 2);

  // Colocar el tooltip encima del punto
  posY = posY - tooltip.offsetHeight - 10; // Ajustar 10px por encima del marcador

  // Ajustar si el tooltip se sale por arriba o fuera de la pantalla
  if (posY < 0) {
    posY = y + 20; // Colocar debajo del punto
  }
  if (posX < 0) {
    posX = 0;
  } else if (posX + tooltip.offsetWidth > window.innerWidth) {
    posX = window.innerWidth - tooltip.offsetWidth;
  }

  // Aplicar la posición calculada
  tooltip.style.left = `${posX}px`;
  tooltip.style.top = `${posY}px`;

  // Hacer visible el tooltip con una pequeña animación
  setTimeout(() => {
    tooltip.style.opacity = '1';
  }, 10);

  // Remover el tooltip después de 2 segundos
  setTimeout(() => {
    tooltip.style.opacity = '0';
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    }, 100);
  }, 1000);
}



  // Ajustamos el tamaño del SVG
  function ajustarTamanoSVG() {
    const anchoContenedor = contenedor.clientWidth;
    const altoCalculado = (anchoContenedor *150) / 400;
    svg.style.height = `${altoCalculado}px`;
  }
  ajustarTamanoSVG();
  window.addEventListener('resize', ajustarTamanoSVG);


}

// Uso: llama a esta función pasando el ID del contenedor donde quieres el mapa
crearMapaIlustrativo('container-mapa-interactivo-example');


//  Funcionalidad de acoordeon que contiene información descriptiva
document.addEventListener('DOMContentLoaded', () => {
  // Obtener todos los botones de los encabezados del acordeón
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  // Expandir el primer ítem automáticamente
  const firstButton = accordionHeaders[0];
  const firstContent = firstButton.nextElementSibling;

  firstButton.classList.add('active'); // Añadir clase active al primer botón
  firstContent.style.display = 'block'; // Mostrar el contenido del primer ítem

  // Funcionalidad de acordeón
  accordionHeaders.forEach(button => {
    button.addEventListener('click', () => {
      const accordionContent = button.nextElementSibling;

      button.classList.toggle('active');

      if (button.classList.contains('active')) {
        accordionContent.style.display = 'block';
      } else {
        accordionContent.style.display = 'none';
      }

      // Cerrar los demás ítems abiertos
      accordionHeaders.forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.classList.remove('active');
          otherButton.nextElementSibling.style.display = 'none';
        }
      });
    });
  });
});

// Url de los iconos de las opciones de ruta y sus respectivos nombres
const opcionesDeRutas = [
    {
        src: "/src/static/utils/Option - Route/icons8-trekking-50.png",
        alt: "Explorando a pie",
        texto: "Explorando a pie",
    },
    {
        src: "/src/static/utils/Option - Route/icons8-el-ciclismo-de-montaña-32.png",
        alt: "Bici - Tour",
        texto: "Bici - Tour",
    },
    {
        src: "/src/static/utils/Option - Route/icons8-casco-de-la-moto-32.png",
        alt: "Ruta Motera",
        texto: "Ruta Motera",
    },
    {
        src: "/src/static/utils/Option - Route/icons8-cofre-de-techo-de-automóvil-48.png",
        alt: "Explora en Auto",
        texto: "Explora en Auto",
    }
]

// Simulación de la respuesta de la base de datos a la consulta con API de una ruta, en este caso la Virgen

const datosRuta = {
    "ruta": [
        {
            "ruta": "Explorando a pie",
            "tiempo": 120,
            "dificultad": 'Baja'
        },
        {
            "ruta": "Bici - Tour",
            "tiempo": 90,
            "dificultad": 'Media'
        },
        {
            "ruta": "Ruta Motera",
            "tiempo": 20,
            "dificultad": 'Baja'
        },
        {
            "ruta": "Explora en Auto",
            "tiempo": 35,
            "dificultad": 'Alta'
        }
    ],
    "estaciones": [
        {
            "name": "Parque principal",
            "tiendas": [
                {
                    "name": "El frutal",
                    "direccion": "Calle 1 # 2-3",
                },
                {
                    "name": "El panadero",
                    "direccion": "Calle 1 # 2-4",
                },
                {
                    "name": "El restaurante",
                    "direccion": "Calle 1 # 2-5",
                },
                {
                    "name": "El supermercado",
                    "direccion": "Calle 1 # 2-6"
                },
                {
                    "name": "El heladeria",
                    "direccion": "Calle 1 # 2-7",
                },
                {
                    "name": "La drogueria",
                    "direccion": "Calle 1 # 2-8",
                }
            ]
        },
        {
            "name": "La Z",
            "tiendas": [
                {
                    "name": "Sin tiendas cerca",
                    "direccion": 0,
                }
            ]
        },
        {
            "name": "Mirador Chitiva Alto",
            "tiendas": [
                {

                }
            ]
        },
        {
            "name": "Virgen de la Sabana",
            "tiendas": [
                {
                    "name": "Tienda parmenio",
                    "direccion": "Por mostrar con latitud y longitud",
                }
            ]
        }
    ],
}

const botonLike = document.querySelector('.container-like')
const corazonLike = document.querySelector('.img-like')
const containerInfo = document.querySelector('.container-info')
const containerImg = document.querySelector('.container-img')
const containerImgHeight = containerImg.offsetHeight

// Generador de chispitas
const generateSparkles = (numSparkles) => {
    const buttonRect = botonLike.getBoundingClientRect(); // Obtener las dimensiones y posición del botón

    const radius = buttonRect.width / 2 + 8; // Radio del círculo (ajustable según necesites)
    const angleIncrement = (2 * Math.PI) / numSparkles; // Incremento de ángulo para distribuir uniformemente las chispitas

    for (let i = 0; i < numSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Calcular posición uniformemente distribuida alrededor del botón
        const angle = i * angleIncrement;
        const sparkleX = buttonRect.left + buttonRect.width / 2 + radius * Math.cos(angle);
        const sparkleY = buttonRect.top + buttonRect.height / 2 + radius * Math.sin(angle);

        sparkle.style.left = `${sparkleX - buttonRect.left}px`; // Ajustar la posición relativa al botón
        sparkle.style.top = `${sparkleY - buttonRect.top}px`; // Ajustar la posición relativa al botón

        botonLike.appendChild(sparkle);

        // Eliminar la chispita después de que la animación haya terminado
        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    }
}

let isLike = false // Inicialmente no marca, sin like

botonLike.addEventListener('click', () => {
    if (isLike) {
        // Si esta marcado, desmarcarlo
        corazonLike.src = '/src/static/utils/icons8-corazones-32.png';
        isLike = false
    } else {
        // Si no esta marcado, marcarlo
        corazonLike.src = '/src/static/utils/icons8-me-gusta-relleno-48.png';
        isLike = true
        // Generate sparkles on click
        generateSparkles(20);
    }
})

// Lógica para "more" y "less" en el texto de la descripción
const descripcion = document.getElementById('descripcion-texto');
const fullText = descripcion.textContent;
const maxTextLength = 100; // Máxima longitud del texto visible antes de "more"

if (fullText.length > maxTextLength) {
    const visibleText = fullText.slice(0, maxTextLength) + '... ';
    const moreText = document.createElement('span');
    moreText.classList.add('show-more');
    moreText.textContent = 'more';

    descripcion.textContent = visibleText;
    descripcion.appendChild(moreText);

    moreText.addEventListener('click', function () {
        if (descripcion.classList.contains('show-more-expanded')) {
            descripcion.textContent = visibleText;
            moreText.textContent = 'more';
            descripcion.appendChild(moreText);
            descripcion.classList.remove('show-more-expanded');
        } else {
            descripcion.textContent = fullText + ' ';
            moreText.textContent = 'less';
            descripcion.appendChild(moreText);
            descripcion.classList.add('show-more-expanded');
        }
    });
}

// Funcionalidad del carrusel
document.addEventListener("DOMContentLoaded", () => {
    const carruselImages = document.querySelectorAll(".carrusel-img");

    carruselImages.forEach(img => {

        img.addEventListener("click", () => {
            // Quitar la clase 'selected' de todas las imágenes
            carruselImages.forEach(img => img.classList.remove("selected"));
            
            // Añadir la clase 'selected' a la imagen clicada
            img.classList.add("selected");

            // Cambiar la imagen de fondo de .container-img
            containerImg.style.backgroundImage = `url(${img.src})`;
        });
    });
});

//  Funcionalidad de la ventana emergente por seccion de timepo, estaciones, dificultad y tiendas
const botonTiempo = document.getElementById('tiempo')
const botonEstaciones = document.getElementById('estaciones')
const botonDificultad = document.getElementById('dificultad')
const botonTiendas = document.getElementById('tiendas')
const tituloVentana = document.getElementById('title-contenedor-ventana-emergente')
const contenedorPadre = document.getElementById('containter-article-info')

const ventanaEmergente = document.getElementById("miVentanaEmergente");
let btnCerrar = document.getElementById("cerrarVentana")

// Funcionalidad del boton de Tiempo
botonTiempo.addEventListener("click", () => {
    //  Dar visibilidad a la ventana
    ventanaEmergente.style.display = "block";
    ventanaEmergente.style.transform = "scale(1)";
    tituloVentana.textContent = "Tiempos Estimados";

    // Crear y agregar cada opción
    opcionesDeRutas.forEach(opcion => {
        // Encontrar el tiempo correspondiente en el objeto tiempos
        const tiempoEncontrado = datosRuta.ruta.find(t => t.ruta === opcion.texto);

        // Crear div .container-descripcion-opcion
        const divOpcion = document.createElement('div');
        divOpcion.classList.add('container-descripcion-opcion');

        // Crear imagen
        const img = document.createElement('img');
        img.src = opcion.src;
        img.alt = opcion.alt;

        // Crear párrafo con span
        const p = document.createElement('p');
        p.style.color = '#5a4a4b';
        p.textContent = `${opcion.texto}`;

        const span = document.createElement('span');
        span.style.color = '#332A2B';
        span.style.fontWeight = 800;

        if (tiempoEncontrado) {
            span.textContent = `: ${tiempoEncontrado.tiempo} Min`;
        }


        // Agregar el span al párrafo
        p.appendChild(span);

        // Agregar la imagen y el párrafo al div
        divOpcion.appendChild(img);
        divOpcion.appendChild(p);

        // Agregar el contenedor al contenedor padre
        contenedorPadre.appendChild(divOpcion);
    });
});

// Funcionalidad del boton de Estaciones
botonEstaciones.addEventListener("click", () => {
    //  Dar visibilidad a la ventana
    ventanaEmergente.style.display = "block";
    ventanaEmergente.style.transform = "scale(1)";
    tituloVentana.textContent = "Estaciones";

    //  Creamos el contenedor de la lista
    const contenedorLista = document.createElement('ol')
    contenedorLista.style.color = '#332A2B'
    contenedorLista.className = 'container-lista'

    // Iteramos sobre la respuesta de la base de daatos y creamos cada eleento de la lista
    datosRuta.estaciones.forEach(estacion => {
        const elementoLista = document.createElement('li')
        elementoLista.style.color = '#332A2B'
        elementoLista.textContent = estacion.name

        // Agregamos el elemento al contenedor de la lista
        contenedorLista.appendChild(elementoLista)
    })


    contenedorPadre.appendChild(contenedorLista)
})

// Funcionalidad del boton Dificultad
botonDificultad.addEventListener('click', () => {
    // Dar visibilidad a la ventana
    ventanaEmergente.style.display = "block";
    ventanaEmergente.style.transform = "scale(1)";
    tituloVentana.textContent = "Dificultad";

    opcionesDeRutas.forEach(opcion => {
        // Encontrar el tiempo correspondiente en el objeto tiempos
        const tiempoEncontrado = datosRuta.ruta.find(t => t.ruta === opcion.texto);

        // Crear div .container-descripcion-opcion
        const divOpcion = document.createElement('div');
        divOpcion.classList.add('container-descripcion-opcion');

        // Crear imagen
        const img = document.createElement('img');
        img.src = opcion.src;
        img.alt = opcion.alt;

        // Crear párrafo con span
        const p = document.createElement('p');
        p.style.color = '#5a4a4b'
        p.textContent = `${opcion.texto}`;

        const span = document.createElement('span');
        span.style.color = '#332A2B';
        span.style.fontWeight = 800;
        if (tiempoEncontrado) {
            span.textContent = `: ${tiempoEncontrado.dificultad}`;
        }


        // Agregar el span al párrafo
        p.appendChild(span);

        // Agregar la imagen y el párrafo al div
        divOpcion.appendChild(img);
        divOpcion.appendChild(p);

        // Agregar el contenedor al contenedor padre
        contenedorPadre.appendChild(divOpcion);
    });
})

// Funcionalidad del boton de tiendas
botonTiendas.addEventListener('click', () => {
    // Dar visibilidad a la ventana
    ventanaEmergente.style.display = "block";
    ventanaEmergente.style.transform = "scale(1)";
    tituloVentana.textContent = "Tiendas cercanas";

    // Crear una lista numerada (ol) para las estaciones
    const listaEstaciones = document.createElement('ol');

    // Contador para las estaciones, por no pude con los elementos del HTML
    let contador = 1

    // Iteramos sobre cada estación
    datosRuta.estaciones.forEach(estacion => {
        // Crear un elemento de lista (li)
        const elementoLista = document.createElement('li');
        elementoLista.className = 'estacio-info';
        elementoLista.style.display = 'flex'; // Para que los elementos estén uno al lado del otro
        elementoLista.style.alignItems = 'center'; // Alinear verticalmente al centro

        // Crear un párrafo (p) para el nombre de la estación
        const numero = document.createElement('p');
        numero.style.color = '#5a4a4b';
        numero.style.marginRight = '2px'; // Espacio entre el nombre y el número
        numero.textContent = `${contador}.`;

        // Crear un párrafo (p) para el nombre de la estación
        const nombreEstacion = document.createElement('p');
        nombreEstacion.style.color = '#5a4a4b';
        nombreEstacion.style.marginRight = '10px'; // Espacio entre el nombre y el número
        nombreEstacion.textContent = estacion.name;

        // Crear un span para el número de tiendas cercanas
        const numeroTiendas = document.createElement('span');
        numeroTiendas.style.color = '#332A2A';
        numeroTiendas.style.fontWeight = '800'; // Font-weight para destacar el número
        numeroTiendas.textContent = `${estacion.tiendas.length} tienda(s)`;

        // Añadir el nombre de la estación y el número de tiendas al elemento de lista (li)
        elementoLista.appendChild(numero);
        elementoLista.appendChild(nombreEstacion);
        elementoLista.appendChild(numeroTiendas);

        // Añadir el elemento de lista (li) a la lista numerada (ol)
        listaEstaciones.appendChild(elementoLista);

        //  incrementamos el contador
        contador++
    });

    // Añadir la lista numerada (ol) al contenedor padre
    contenedorPadre.appendChild(listaEstaciones);
});


// Funcionalidad para cerrar la ventana emergente al hacer clic fuera de ella y el boton de cierre x

btnCerrar.addEventListener("click", function() {
    ventanaEmergente.style.display = "none"
    ventanaEmergente.style.transform = "scale(0)"
    contenedorPadre.innerHTML = ''
})

document.addEventListener('click', function(event) {
    const isClickInside = ventanaEmergente.contains(event.target);
    const isButtonClick = botonTiempo.contains(event.target) || botonEstaciones.contains(event.target) || botonDificultad.contains(event.target) || botonTiendas.contains(event.target);
    
    if (!isClickInside && !isButtonClick) {
        ventanaEmergente.style.display = 'none';
        ventanaEmergente.style.transform = 'scale(0)';
        contenedorPadre.innerHTML = ''
    }
});


// Funcionalidad para cambiar de pagina e ir a la opcion seleccionada
const explorandoPie = document.getElementById('explorandoPie')
const biciTour = document.getElementById('biciTour')
const rutaMotera = document.getElementById('rutaMotera')
const explorandoAuto = document.getElementById('explorandoAuto')

explorandoPie.addEventListener('click', () => {
    window.location.href = '/src/templates/opciones De ruta/explorandoPie.html'
})

biciTour.addEventListener('click', () => {
    window.location.href = '/src/templates/opciones De ruta/biciTour.html'
})

rutaMotera.addEventListener('click', () => {
    window.location.href = '/src/templates/opciones De ruta/rutaMotera.html'
})

explorandoAuto.addEventListener('click', () => {
    window.location.href = '/src/templates/opciones De ruta/explorandoAuto.html'
})
// Variables con los elementos del DOM que vamos a manipular
const mapContainer = document.getElementById('map');
const desbloquear = document.getElementById('desbloquear');
const loadingIndicator = document.getElementById('loading-indicator');
const funcionalidades = document.querySelector('.container-ruta-funciones');
const descripcion = document.querySelector('.container-info-descrip');
const mapImage = document.querySelector('.map-image');
const blurOverlay = document.querySelector('.blur-overlay');
const textOverlay = document.querySelector('.overlay-text');

// Nuevos elementos para mostrar la elevación actual y distancia restante
const elevacionActualElement = document.getElementById('elevacionActual');
const kmRestantesElement = document.getElementById('km-restantes');

//  Controlar la instancia del chaart
let chartInstance = null;

//  Inicializando y agregando el mapa
async function initMap() {
    try {
        // Cargar el API de Google Maps
        // Desestructuramos para traer la propiedad map mas facil y en una sola linea en vez de esxtraerlo de una variable extra
        const { Map, InfoWindow, } = await google.maps.importLibrary('maps');

        //  Desestructuramos para traer el Elevation Service para crear el grafico con la elevaacion durante la ruta
        const { ElevationService } = await google.maps.importLibrary('elevation');

        // Desestructuramos la propiedad de marker 
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');

        // Desestructuramos las direcciónes para crear la ruta
        const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary('routes');

        // Creamos una función para crear Polylines, ya que lo vamos a repetir constantemente
        function newPolyline(path, color, ) {
            new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: color, // Cambia este color al que desees
                strokeOpacity: 1.0,
                strokeWeight: 5,
                map: map,
            }); 
        }
        // Creamos el mapa y lo ponemos por defecto en el centro de Suesca
        const map = new Map(mapContainer, {
            center: { lat: 5.1033413, lng: -73.7990059 },
            zoom: 14,
            mapId: '72c6daf722593ece',
            mapTypeId: 'satellite',
            disableDefaultUI: true,
            styles: [
                {
                    featureType: 'all',
                    elementType: 'labels',
                    stylers: [
                        { visibility: 'off' }
                    ]
                }
            ]
        });

        //  Creaamos el directionsService, los DirectionsRender
        const directionsService = new DirectionsService();
        const directionsRenderer = new DirectionsRenderer({
            suppressMarkers: true,
            map: map,
            polylineOptions: {
                strokeColor: '#4190df', // Cambia este color al que desees
                strokeOpacity: 1.0,
                strokeWeight: 5
            }
        });


        //  Creamos la ruta principal
        //  Definimos el origen y el destino de la ruta
        const origin = { lat: 5.103242, lng: -73.798712 };
        const destination = { lat: 5.114737, lng: -73.809393 };
        const destinationFinal = { lat: 5.116750, lng: -73.806383 };

        // Sacamos la posicion inicial, donde esta el usuario actualmente
        // Obtenemos la ubicacion actual del usuario
        if (navigator.geolocation) {
            let userMarker = null;
            let hasReachedStartPoint = false;
            let directionsRenderer = null

            // Variables para el seguimineto de la distancia
            let totalDistancia = 0;
            let lastPosition = null;
            let distanceElement = document.getElementById('km-recorridos');


            // Definimos una función para calcular la distancia entre dos puntos
            function calculateDistance(lat1, lon1, lat2, lon2) {
                const R = 6371; // Radio de la Tierra en kilómetros
                const dLat = (lat2 - lat1) * Math.PI / 180;
                const dLon = (lon2 - lon1) * Math.PI / 180;
                const a = 
                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                const distance = R * c; // Distancia en kilómetros
                return distance;
            }   

            //  Funcio para actualizar la distancia de la UI
            function updateDistanceUI() {
                if (distanceElement) {
                    distanceElement.textContent = `${totalDistancia.toFixed(2)} km`;
                } else {
                    console.error('No se encontró el elemento de distancia en la UI.');
                }
            }
        
            // Funcion para actualizar la ruta 
            function updateRoute(pos) {
                if (!hasReachedStartPoint) {
                    const request = {
                        origin: pos,
                        destination: origin,
                        travelMode: 'WALKING'
                    };

                    const directionsService = new DirectionsService();

                    if (!directionsRenderer) {
                        directionsRenderer = new DirectionsRenderer({
                            suppressMarkers: true,
                            map: map,
                            polylineOptions: {
                                strokeColor: '#4190df',
                                strokeOpacity: 1.0,
                                strokeWeight: 5
                            },
                            preserveViewport: true
                        })
                    }

                    directionsService.route(request, (result, status) => {
                        if (status == 'OK') {
                            directionsRenderer.setDirections(result);
                        } else {
                            console.error('Error al obtener la ruta', status);
                        };
                    });
                }
            }

            // Variables para el cronómetro
            let startTime2;
            let timerInterval;
            let isMoving = false;
            let timerElement = document.getElementById('tiempo-recorrido');

            // Funcion para iniciar el cronometro
            function startTime() {
                startTime2 = new Date().getTime();
                timerInterval = setInterval(updateTimer, 1000);
            }

            // Funcion para actualizar el cronometro
            function updateTimer() {
                const currentTime = new Date().getTime();
                const elapsedTime = new Date(currentTime - startTime2);
                const hours = elapsedTime.getUTCHours();
                const minutes = elapsedTime.getUTCMinutes();
                const seconds = elapsedTime.getUTCSeconds();
                timerElement.textContent = 
                    (hours > 9 ? hours : "0" + hours) + ":" +
                    (minutes > 9 ? minutes : "0" + minutes);
            }

            // Funcion para detener el cronometro
            function stopTime() {
                clearInterval(timerInterval);
            }

            // Funcion para obtener la elevacion actual
            async function getCurrentElevation(pos) {
                const elevationService = new ElevationService();
                try {
                    const response = await elevationService.getElevationForLocations({
                        locations: [pos],
                    });
                    if (response.results) {
                        return Math.floor(response.results[0].elevation);
                    }
                    return 'mal'
                } catch (error) {
                    "Error obteniendo la elevación actual:", error
                }
            }

            //  Funcion para calcular la distancia restante al final de la ruta
            function calculateRemainingDistance(pos) {
                return calculateDistance(
                    pos.lat, pos.lng,
                    destinationFinal.lat, destinationFinal.lng
                );
            }

            // Funcion para actualizar la elevacion y la distacia en la UI
            async function updateElevationAndDistance(pos) {
                const elevation = await getCurrentElevation(pos);
                if (elevation !== null) {
                    elevacionActualElement.textContent = `${elevation}`;
                } 

                const remainingDistance = calculateRemainingDistance(pos);
                kmRestantesElement.textContent = `${remainingDistance.toFixed(2)} km`;
            }

            const watchID = navigator.geolocation.watchPosition((position) => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                //  Actualizar elevacion y distancia restantes cada vez que se actualiza la posicion
                updateElevationAndDistance(pos)

                //  Iniciamos el cronometro 
                if (!isMoving) {
                    const distanceFromStart = calculateDistance(
                        origin.lat, origin.lng,
                        pos.lat, pos.lng
                    );
                    if (distanceFromStart > 0.005) {
                        isMoving = true;
                        startTime();
                    }
                }

                // Verificar si el usuario ha llegado al destino
                const distanceToEnd = calculateDistance(
                    pos.lat, pos.lng,
                    destinationFinal.lat, destinationFinal.lng
                );
                if (distanceToEnd <= 0.05) {
                    stopTime();
                }

                if (lastPosition) {
                    const newDistance = calculateDistance(
                        lastPosition.lat, lastPosition.lng,
                        pos.lat, pos.lng
                    );
                    totalDistancia += newDistance;
                    updateDistanceUI();
                }

                lastPosition = pos;

                const distanceToStart = calculateDistance(pos.lat, pos.lng, origin.lat, origin.lng);

                const toleranceRange = 0.05;

                // Verificar si el usuario ha llegado al punto de inicio de la ruta turística
                if (distanceToStart <= toleranceRange) {
                    if (!hasReachedStartPoint) {
                        console.log("Has llegado al punto de inicio de la ruta turística!");
                        hasReachedStartPoint = true;
                        // Detener el seguimiento de la ubicación
                        // Limpiar la ruta al punto de inicio
                        if (directionsRenderer) {
                            directionsRenderer.setMap(null);
                        }
                        // Aquí puedes agregar cualquier acción adicional que quieras realizar cuando el usuario llega al punto de inicio
                    }
                }

                // Creamos el icono del marcador
                const parser = new DOMParser();
                // URL de datos SVG para el marcador personalizado
                const pinSvgString = `
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="26" fill="#00008B" stroke="white" stroke-width="5"/>
                </svg>`;
                
                const pinSVG = parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;

                // Actualizar o crear el marcador
                if (userMarker) {
                    userMarker.position = pos;
                } else {
                    userMarker = new AdvancedMarkerElement({
                        position: pos,
                        map: map,
                        content: pinSVG
                    });
                    const pinScaled = new PinElement({
                        scale: 1
                    })
                }

                // Actualizar la ruta
                updateRoute(pos);

            }, (error) => {
                console.error('Error al obtener la ubicación', error);
            }, {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 2000
            });

            // funcion para actualizar la distancua recorrida periodicamente
            function startDistanceTracking() {
                setInterval(() => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            let currentPos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            if (lastPosition) {
                                const newDistance = calculateDistance(
                                    lastPosition.lat, lastPosition.lng,
                                    currentPos.lat, currentPos.lng
                                );
                                totalDistancia += newDistance;
                                updateDistanceUI();
                            }
                            lastPosition = currentPos;

                            // Actualizar elevación y distancia restante
                            updateElevationAndDistance(currentPos);

                        }, (error) => {
                            console.error('Error al obtener la ubicación', error);
                        });
                    }
                }, 20000)
            }

            // Rastreamos la ubicación actual 
            startDistanceTracking();
            
        } else {
            console.error("Geolocalización no soportada");
        }
    

        //  Definimos un waypaint ya que la ruta original de google no abarca toda la ruta, asi que el waypoint es para completar la ruta, hasta cierto puneto de los caminos oficiales de google, despues para completar la ruta usarem,os poyline para completar el restyo de la ruta por caminos no oficiales en google.
        const waypoints = [
        { location: { lat: 5.113576, lng: -73.805901 }, stopover: true }
        ];

        //  Definimos el request con el origen, destino, waypoints y modo de vaiaje para enviarlo al directionsService para crear le mapa con las indicaciones
        const request = {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            travelMode: 'WALKING'
        };

        // Creamos un array con todos los puntos de las rutas, ruta completa
        const rutaCompleta = []

        // Función para obtener la elevación y graficarla
        // Función para obtener la elevación
        async function getElevation() {
            const elevationService = new ElevationService();
            try {
                const response = await elevationService.getElevationAlongPath({
                    path: rutaCompleta,
                    samples: 256 // Puedes ajustar este número según tus necesidades
                });

                // Procesamos la data para crear el grafico
                if (!response || !response.results || !Array.isArray(response.results)) {
                    throw new Error("Formato de respuesta inesperado del servicio de elevación");
                }
                const elevationData = response.results.map((point, index) => ({
                    elevation: point.elevation,
                    resolution: point.resolution
                }));

                // Procesamos la data para crear el gráfico
                let distance = 0;
                const x = []; // Para almacenar las distancias
                const y = []; // Para almacenar las elevaciones
                
                // Procesamos la data para llenar las variables x e y
                elevationData.forEach((point, index) => {
                    if (index > 0) {
                        distance += point.resolution;
                    }
                    x.push(distance / 1000); // Convertimos la distancia a kilómetros y la agregamos al array x
                    y.push(Math.floor(point.elevation)); // Agregamos la elevación al array y
                });

                // Valores para decorar el grafico
                // Número de puntos
                const numPoints = 256;

                // Generar los valores de x desde 0 hasta 255 para indexar la forma
                const xIndexes = Array.from({ length: numPoints }, (_, i) => i);

                // Crear una función para suavizar los valores con forma de curva
                const decorativeData = xIndexes.map(i => {
                    const x = (i / (numPoints - 1)) * 1.5 - 0.4; // Normalizar de -1 a 1
                    const y = 2100 + (1000 * Math.exp(-10* x * x)); // Aplicar una función gaussiana para crear la curva
                    return y;
                });

                //  Creamos los 5 puntos que se van a ver en el grafico
                const numParts = 5;
                const partSize = Math.floor(y.length / numParts); 
                const middleIndexes = [];

                //  Dividir el array en quintiles
                for (let i = 0; i < numParts; i++) {
                    const start = i * partSize;
                    const end = (i === numParts - 1) ? y.length : (i+1) * partSize;
                    const part = y.slice(start, end);
                    const middleIndex = Math.floor(part.length / 2) + start;
                    middleIndexes.push(middleIndex);
                }
                //  Creamos el chart
                const ctx = document.getElementById('elevationChart').getContext('2d');
                // Si ya existe un gráfico, actualízalo
                if (chartInstance) {
                    chartInstance.data.labels = x;
                    chartInstance.data.datasets[0].data = y;
                    chartInstance.update();
                } else {
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                          labels: x, // Índices numéricos para las fechas
                          datasets: [
                            {
                              label: 'MSNM',
                              data: y,
                              fill: true,
                              backgroundColor: (context) => {
                                const chart = context.chart;
                                const {ctx, chartArea} = chart;
                                if (!chartArea) {
                                  return null;
                                }
                                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                                gradient.addColorStop(0, 'rgba(0, 156, 255, 0.6)');
                                gradient.addColorStop(0.2, 'rgba(180, 0, 180, 0.6)');
                                gradient.addColorStop(0.4, 'rgba(255, 0, 100, 0.6)');
                                gradient.addColorStop(0.6, 'rgba(255, 122, 0, 0.6)');
                                return gradient;
                              },
                              borderWidth: 2,
                              borderColor: 'rgba(255, 255, 255, 1)',
                              pointRadius: function(context) {
                                return middleIndexes.includes(context.dataIndex) ? 5 : 0;
                              },
                              pointBackgroundColor: 'rgba(10, 30, 50, 1)', // Color del punto
                              tension: 0.4
                            },
                            {
                              label: 'Decorative Background',
                              data: decorativeData,
                              borderWidth: 0,
                              pointRadius: 0,
                              fill: true,
                              tension: 0.4,
                              backgroundColor: (context) => {
                                  const chart = context.chart;
                                  const {ctx, chartArea} = chart;
                                  if (!chartArea) {
                                    return null;
                                  }
                                  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                                  gradient.addColorStop(1, 'rgba(30,100,211,0.7)');
                                  gradient.addColorStop(0, 'rgba(6,209,249,0.7)');
                                  return gradient;
                                },
                                borderWidth: 0,
                                pointRadius: 0,
                                tension: 0.4
                            }
                          ]
                        },
                        options: {
                          responsive: false,
                          maintainAspectRatio: false,
                          scales: {
                              x: {
                                  type: 'linear',
                                  position: 'bottom',
                                  title: {
                                      display: true,
                                      text: 'Distancia (km)'
                                  },
                                  grid: {
                                      display: false
                                  }
                              },
                              y: {
                                  grid: {
                                      display: false
                                  },
                                  title: {
                                      display: true,
                                      text: 'Altura (m)'
                                  },
                                  ticks: {
                                      display: false
                                  },
                                  border: {
                                      display: false
                                  }
                              }
                          },
                          plugins: {
                              tooltip: {
                                  enabled: true,
                                  callbacks: {
                                      title: (tooltipItems) => {
                                          return 'Elevación'; // Título del tooltip
                                      },
                                      label: (tooltipItem) => {
                                          const datasetLabel = tooltipItem.dataset.label || '';
                                          const value = tooltipItem.raw;
                                          return `${datasetLabel}: ${value}`;
                                      },
                                  }
                              },
                              legend: {
                                  display: false
                              }
                          }
                        }
                      });
                }
                
            } catch (error) {
                console.error("Error obteniendo la elevación:", error);
            }
        };

        // Le pasamos la solicitud al Directions service
        directionsService.route(request, async (result, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);

                //  En este punto vamos a dibujar o renderizar el resto de la ruta manualmente ya que google no toma la ruta que queremos como camino oficial, por este motivos dibujamos la ruta manualente
                //  Extraemos el punto final de la ruta del camino oficial
                const route1 = result.routes[0].overview_path;
                const resultadoLatLng = route1.map(point => ({
                    lat: point.lat(),
                    lng: point.lng()
                }));

                // Concatenamos las cordenadas a la ruta completa
                rutaCompleta.push(...resultadoLatLng)

                // Extraemos la ultima posición de la ruta default de google
                const lastPoint2 = resultadoLatLng[resultadoLatLng.length - 1];

                const polyLinePath = [
                    lastPoint2,
                    { lat: 5.115030, lng: -73.809116 },
                    { lat: 5.115145, lng: -73.808773 },
                    { lat: 5.115342, lng: -73.807973 },
                    { lat: 5.115533, lng: -73.807511 },
                    { lat: 5.115660, lng: -73.807268 },
                    { lat: 5.115917, lng: -73.806914 },
                    { lat: 5.116275, lng: -73.806667 },
                    { lat: 5.116579, lng: -73.806528 },
                    { lat: 5.116750, lng: -73.806383 }
                ];

                //  Pasamos la cordenas de las polylines a la ruta completa
                rutaCompleta.push(...polyLinePath);
                //  Ponemos las polylines en el render para que completen la ruta en su totalidad
                newPolyline(polyLinePath, '#4190df')

                //  Esperamos a que se carguen los resultados para poder extraer correctamente la altitud
                await getElevation();

                // Una vez que todo esté cargado, mostrar el mapa y las funcionalidades
                mapContainer.style.display = 'block';
                funcionalidades.style.display = 'block';
                
                // Ocultar el indicador de carga
                loadingIndicator.style.display = 'none';


            } else {
                console.error('Directions request failed due to:', status);
            }
        });

        //  Definimos la posicion de los marcadorees y el contenido de la ventana emergente de las estaciones
        const estaciones = [
            {
                position: { lat: 5.103242, lng: -73.798712 },
                title: 'Estación 1: Parque principal',
                content: `
                    <div class="info-window-content">
                        <img src="/src/static/utils/Virgen de la Z/Parque principal.jpg" alt="Punto de inicio" style="width:100%;max-width:200px;">
                        <h3>Parque principal</h3>
                        <p>Es un espacio acogedor rodeado de naturaleza, con áreas verdes, una fuente central y una iglesia colonial</p>
                        
                    </div>
                `
            },
            {
                position: { lat: 5.113875, lng: -73.804139 },
                title: 'Estación 2: Inicio de la Z',
                content: `
                    <div class="info-window-content">
                        <img src="/src/static/utils/Virgen de la Z/Primer Atajo.jpg" alt="Punto intermedio" style="width:100%;max-width:200px;">
                        <h3>La Z</h3>
                        <p>La "Z" es un camino utilizado para el viacrucis durante la Semana Santa. A lo largo del recorrido, se pueden encontrar las estaciones del viacrucis con sus respectivas cruces. Este sendero, en forma de Z, conduce a la cima de la montaña, donde se encuentra el monumento de la Virgen. Durante la ceremonia, los creyentes suben llevando grandes cruces sobre sus hombros en honor a la tradición</p>
                    </div>
                `
            },
            {
                position: { lat: 5.114737, lng: -73.809393 },
                title: 'Estación 3: Mirador Chitiva Alto',
                content: `
                    <div class="info-window-content">
                        <img src="/src/static/utils/Virgen de la Z/Chitiva Abajo.jpg" alt="Punto intermedio" style="width:100%;max-width:200px;">
                        <h3>Mirador de la Sabana</h3>
                        <p>Desde este mirador, puedes contemplar la sabana. Estás a pocos pasos del final de la ruta, así que aprovecha para hidratarte, descansar, tomar una foto, y luego seguir. Estás muy cerca de alcanzar la cima.</p>
                    </div>
                `
            },
            {
                position: { lat: 5.116750, lng: -73.806383 },
                title: 'Estación 4: Final de la ruta',
                content: `
                    <div class="info-window-content">
                        <img src="/src/static/utils/Virgen de la Z/Final_Virgen.jpg" alt="Desvío opcional" style="width:100%;max-width:200px;">
                        <h3>Virgen de la Z</h3>
                        <p>Aquí, en la cima del cerro, se alza el monumento de la Virgen María, una imponente estatua blanca que corona la ruta. Durante la peregrinación de Semana Santa, este lugar se convierte en el destino final del viacrucis, donde los fieles llegan después de un largo camino. Desde este punto, se puede disfrutar de una vista panorámica de Suesca y sus alrededores, un momento de reflexión y serenidad al final del recorrido.</p>
                    </div>
                `
            }
        ];

        //  Definimos la posicion de los marcadorees y el contenido de la ventana emergente de los atajos
        const atajos = [
            {
                position: { lat: 5.113973, lng: -73.803196 },
                title: 'Atajo 1: Empezando la Z',
                content: `
                    <div class="info-window-content">
                        <img src="/src/static/utils/Virgen de la Z/Atajo_1.jpg" alt="Punto de inicio" style="width:100%;max-width:200px;">
                        <h3>Atajo 1: Empezado la Z</h3>
                        <p>Gira a la derecha para tomar un atajo que atraviesa una sección del bosque. La de vuelta promete ser aún más divertida, ¡te va a encantar!!</p>
                    </div>
                `
            }
        ];

        // Creamos la instancia para las venatas emergentes
        const infoWindow = new InfoWindow();

        // Creamos los marcadores con la ventana emergente para las estaciones
        estaciones.forEach(({ position, title, content }, i) => {
        
            const pin = new PinElement({
                glyph: `${i + 1}`,
                glyphColor: "white",
                scale: 1
            });

            const marker = new AdvancedMarkerElement({
                position,
                map,
                title: `${i + 1}. ${title}`,
                content: pin.element,
                gmpClickable: true
            });
            marker.addListener("click", ({ domEvent, latLng }) => {
                const { target } = domEvent;
        
                infoWindow.close();
                infoWindow.setContent(content);
                infoWindow.open(marker.map, marker);
            });
        });

        // Creamos la instancia para las venatas emergentes de los atajos
        const infoWindow2 = new InfoWindow();   
        
        // Creamos los marcadores con la ventana emergente para los atajos
        atajos.forEach(({ position, title, content }, i) => {
            const pin = new PinElement({
                glyphColor: "white",
                scale: 0.8,
                background: "#FFA500"
            });

            const marker = new AdvancedMarkerElement({
                position,
                map,
                title: `${i + 1}. ${title}`,
                content: pin.element,
                gmpClickable: true
            });
            marker.addListener("click", ({ domEvent, latLng }) => {
                const { target } = domEvent;
        
                infoWindow2.close();
                infoWindow2.setContent(content);
                infoWindow2.open(marker.map, marker);
            });
        });
        

        //  En esta sección vamos a crear los atajos

        const atajoUnoPath = [
            { lat: 5.113956, lng: -73.803188 },
            { lat: 5.114023, lng: -73.803203 },
            { lat: 5.114040, lng: -73.803288 },
            { lat: 5.113997, lng: -73.803351 },
            { lat: 5.114024, lng: -73.803391 },
            { lat: 5.114017, lng: -73.803445 },
            { lat: 5.114035, lng: -73.803567 },
            { lat: 5.114011, lng: -73.803707 },
            { lat: 5.114008, lng: -73.803915 },
            { lat: 5.114151, lng: -73.804193 },
            { lat: 5.114109, lng: -73.804299 },
            { lat: 5.114192, lng: -73.804551 },
            { lat: 5.114188, lng: -73.804772 },
            { lat: 5.114244, lng: -73.804941 },
            { lat: 5.114262, lng: -73.805090 },
            { lat: 5.114405, lng: -73.805207 },
        ];

        // Creamos y agregamos el atajo - Polyline
        newPolyline(atajoUnoPath, '#FFA500')
        
    } catch (error ){
        console.error('Error al cargar el mapa:', error);
        // Manejar el error, tal vez mostrar un mensaje al usuario
        loadingIndicator.style.display = 'none';

        //  Si hay error volvemos a la pagina de desripcion
        location.hash = 'descripcion'
    }
}

//  Cargamos el mapa cuando se le da click al boton desbloquear
desbloquear.addEventListener('click', () => {
    document.querySelectorAll('.container-info-descrip > *:not(.accordion)').forEach(el => el.style.display = 'none');
    mapImage.style.display = 'none';
    blurOverlay.style.display = 'none';
    desbloquear.style.display = 'none';
    loadingIndicator.style.display = 'flex';
    initMap();
})



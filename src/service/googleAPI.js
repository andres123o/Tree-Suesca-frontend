import Chart from 'chart.js/auto';

export const loadGoogleMapsApi = async () => {
    const apiKey = 'AIzaSyBqxGRMJApROFPPcDGJuzXuM_bJwVVuzD4';
    if (!apiKey) {
        console.error('No se encontró la API KEY de Google Maps.');
        return Promise.reject('No API key')
    };

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
        script.async = true;
        script.defer = true;
        
        window.initMap = () => {
            resolve(window.google);
        };
        
        script.onerror = reject;
        
        document.head.appendChild(script);
    });
};


export const initializeMap = async (
    mapContainer, 
    kmrecorridosContainer, 
    tiempoRecorridoContainer, 
    containerChart, 
    containerElevacionActual, 
    containerKmRestantes,
    data
) => {
    try {
        // Extraer los datos necesarios del objeto data
        const rutaPrincipal = data.coordenadas_principales[0]?.cordenadas || [];
        const atajos = data.atajos || [];
        const estaciones = data.estaciones || [];

        // Formatear las estaciones para incluir position
        const formattedEstaciones = estaciones.map(station => ({
            ...station,
            position: { lat: station.lat, lng: station.lng }
        }));
        console.log(formattedEstaciones[0])

        // Formatear los atajos para el formato correcto
        const formattedAtajos = atajos.map(atajo => ({
            ...atajo,
            position: { lat: atajo.lat, lng: atajo.lng }
        }));
        console.log(formattedAtajos)

        // Validar y formatear las coordenadas principales
        const validatedRutaPrincipal = rutaPrincipal.map(coord => ({
            lat: parseFloat(coord.lat),
            lng: parseFloat(coord.lng)
        }));


        // Cargar el API de Google Maps
        const google = await loadGoogleMapsApi();

        // Desestructuramos para traer la propiedad map mas facil y en una sola linea en vez de esxtraerlo de una variable extra
        const { Map, InfoWindow, } = await google.maps.importLibrary('maps');

        //  Desestructuramos para traer el Elevation Service para crear el grafico con la elevaacion durante la ruta
        const { ElevationService } = await google.maps.importLibrary('elevation');

        // Desestructuramos la propiedad de marker 
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');

        // Desestructuramos las direcciónes para crear la ruta
        const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary('routes');

        const checkAllElementsLoaded = () => {
            return (
                map &&
                userMarker &&
                directionsRenderer &&
                chartInstance
            );
        };

        // Inicializar variables
        let map, userMarker, directionsRenderer, chartInstance;

        // Creamos el mapa
        map = new Map(mapContainer, {
            center: { lat: formattedEstaciones[0].lat, lng: formattedEstaciones[0].lng },
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

        // Crear la ruta principal
        if (validatedRutaPrincipal.length > 0) {
            newPolyline(validatedRutaPrincipal, '#4190df');
        }

        // Crear los atajos
        formattedAtajos.forEach(atajo => {
            // Verifica si existe el array de coordenadas y tiene elementos
            if (atajo.coordenadas && 
                atajo.coordenadas[0] && 
                atajo.coordenadas[0].cordenadas) {
                
                // Accede directamente al array de coordenadas
                const atajoCoordenadas = atajo.coordenadas[0].cordenadas;
                
                // Como las coordenadas ya vienen con lat y lng, no necesitas transformarlas
                newPolyline(atajoCoordenadas, '#FFA500');
            }
        });

        // Función para crear marcadores y ventanas emergentes
        function markerWindow(items, color, escala) {
            const infoWindow = new InfoWindow();
            items.forEach((item, i) => {
                if (!item.lat || !item.lng) {
                    console.error('Invalid marker position:', item);
                    return;
                }

                const pin = new PinElement({
                    glyph: `${i + 1}`,
                    glyphColor: "white",
                    scale: escala,
                    background: color
                });

                const marker = new AdvancedMarkerElement({
                    position: { lat: item.lat, lng: item.lng },
                    map: map,
                    title: `${i + 1}. ${item.nombre}`,
                    content: pin.element,
                    gmpClickable: true
                });

                marker.addListener('click', ({domEvent}) => {
                    const { target } = domEvent;
                    infoWindow.close();
                    infoWindow.setContent(
                        `<div class="info-window-content">
                            <img src="${item.img}" alt="${item.nombre}" style="width:100%;max-width:200px;">
                            <h3>${item.nombre}</h3>
                            <p>${item.description || ''}</p>
                        </div>`
                    );
                    infoWindow.open(marker.map, marker);
                });
            });
        }

        // Crear marcadores para atajos y estaciones
        markerWindow(formattedAtajos, '#FFA500', 1.0);
        markerWindow(formattedEstaciones, '#EB2330', 1.2);


        // Sacamos la posicion incial del usuario
        if (navigator.geolocation) {
            userMarker = null;
            let hasReachedStartPoint = false;
            directionsRenderer = null

            // Variables para el seguimiento de distancia
            let totalDistancia = 0;
            let lastPosition = null;
            let distanceElement = kmrecorridosContainer;

            // Definimos una funcion para calcular la distancia entre dos puntos
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

            // Funcion para actualizar la distancia en el container
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
                        destination: formattedEstaciones[0].position,
                        travelMode: 'WALKING'
                    };

                    const directionsService = new DirectionsService();

                    if(!directionsRenderer) {
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
                        if (status === 'OK') {
                            directionsRenderer.setDirections(result);
                        } else {
                            console.error('Error al obtener la ruta:', status);
                        }
                    })
                } 
            }

            // Variables para el cronómetro
            let startTime2;
            let timerInterval;
            let isMoving = false;
            let timerElement = tiempoRecorridoContainer;

            // Funcion para iniciar el cronometro
            function startTime() {
                startTime2 = new Date().getTime();
                timerInterval = setInterval(updateTimer, 1000);
                isMoving = true;
            }

            // Funcion para actuaizar el cronometro
            function updateTimer() {
                const currentTime = new Date().getTime();
                const elapsedTime = new Date(currentTime - startTime2);
                const hours = elapsedTime.getUTCHours();
                const minutes = elapsedTime.getUTCMinutes();
                timerElement.textContent = 
                    (hours > 9 ? hours : "0" + hours) + ":" +
                    (minutes > 9 ? minutes : "0" + minutes);
            }

            // Funcion para detener el cronometro
            function stopTime() {
                clearInterval(timerInterval);
            }

            //  Funcion para obtener la elevacion actual
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
                    console.error("Error obteniendo la elevación actual:", error)
                }
            }

            //  Funcion para calcular la distancia restante al final de la ruta
            function calculateRemainingDistance(pos) {
                const ultimaEstacion = formattedEstaciones[formattedEstaciones.length - 1];

                return calculateDistance(
                    pos.lat, pos.lng,
                    ultimaEstacion.position.lat, ultimaEstacion.position.lng                
                );
            }

            const elevacionActualElement = containerElevacionActual
            const kmRestantesElement = containerKmRestantes

            // Funcion para actualizar la elevacion y la distacia en la UI
            async function updateElevationAndDistance(pos) {
                const elevation = await getCurrentElevation(pos);
                if (elevation !== null) {
                    elevacionActualElement.textContent = `${elevation}`;
                } 

                const remainingDistance = calculateRemainingDistance(pos);
                kmRestantesElement.textContent = `${remainingDistance.toFixed(2)} km`;
            }

            // solicitar position
            const watchID = navigator.geolocation.watchPosition((position) => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                
                //  Actualizar elevacion y distancia restantes cada vez que se actualiza la posicion
                updateElevationAndDistance(pos)

                // Iniciamos el cronometro
                if (!isMoving) {
                    const distanceFromStart = calculateDistance(
                        formattedEstaciones[0].position.lat, formattedEstaciones[0].position.lng,
                        pos.lat, pos.lng
                    );
                    if (distanceFromStart > 0.005) {
                        startTime();
                    }
                };

                const ultimaEstacion = formattedEstaciones[formattedEstaciones.length - 1]

                // Verificar si el usuario ha llegado al destino
                const distanceToEnd = calculateDistance(
                    pos.lat, pos.lng,
                    ultimaEstacion.position.lat, ultimaEstacion.position.lng   
                );

                // Detenemos el cronometro si ya llego
                if (distanceToEnd <= 0.05) {
                    stopTime();
                };

                // Actualizamos la ruta
                if (lastPosition) {
                    const newDistance = calculateDistance(
                        lastPosition.lat, lastPosition.lng,
                        pos.lat, pos.lng
                    );
                    totalDistancia += newDistance;
                    updateDistanceUI();
                };

                lastPosition = pos;

                const distanceToStart = calculateDistance(
                    pos.lat, pos.lng, 
                    formattedEstaciones[0].position.lat, formattedEstaciones[0].position.lng
                )

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
                    }
                };

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
                console.error('Error al obtener la ubicación:', error);
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
            console.error('Geolocalización no soportada')
        }

        // Funcion para obtener la elevacion de toda la ruta y graficarla
        async function getElevation (){
            const elevationService = new ElevationService();
            try {

                if (!Array.isArray(validatedRutaPrincipal) || validatedRutaPrincipal.length === 0) {
                    throw new Error('rutaPrincipal is not a valid array');
                }
                
                const path = validatedRutaPrincipal.map(point => new google.maps.LatLng(point.lat, point.lng));
                const samples = validatedRutaPrincipal.length;

                //  Obtenemos la elevacion pro cada punto
                const response = await elevationService.getElevationAlongPath({
                    path: path,
                    samples: samples
                });
                //  Procesamos la data para crear el grafico
                if (!response  || !response.results || !Array.isArray(response.results)) {
                    throw new Error('Formato de respuesta inesperado del servicio de elevación')
                }

                const elevationData = response.results.map((point, index) => ({
                    elevation: point.elevation,
                    resolution: point.resolution
                }));

                let distance = 0;
                const x = [];
                const y = [];

                elevationData.forEach((point, index) => {
                    if (index > 0) {
                        distance += point.resolution;
                    }
                    x.push(distance / 1000); // Convertimos la distancia en Km y lo agregamos
                    y.push(Math.floor(point.elevation)); // Agregamos la elevacion
                });

                const numpPoints = validatedRutaPrincipal.length;

                // Generar los valores de x desde 0 hasta numero de numPoints
                const xIndex = Array.from({ length: numpPoints }, (_, i) => i);

                // Funcion para suavizar los valores con forma de curva
                const decorativeData = xIndex.map(i => {
                    const x = (i / (numpPoints - 1)) * 1.5 - 0.4; //Normalizar de -1 a 1
                    const y = 2100 + (1000 * Math.exp(-10 * x * x)); // funcion gausiana para la crutva
                    return y;
                });
                
                //  Creamos los 5 puntos para que se vean en el grafico
                const numParts = 5;
                const partSize = Math.floor(y.length / numParts); 
                const middleIndexes = [];

                // Dividir el array en quintiles
                for (let i = 0; i < numParts; i++) {
                    const start = i * partSize;
                    const end = (i === numParts - 1) ? y.length : (i+1) * partSize;
                    const part = y.slice(start, end);
                    const middleIndex = Math.floor(part.length / 2) + start;
                    middleIndexes.push(middleIndex);
                }

                // Creamos el chart
                const ctx = containerChart.getContext('2d');

                // Si ya existe un grafico lo actualizamos
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

        await getElevation()

        // Después de que todas las inicializaciones estén completas, verificar si todo está cargado
        const checkLoadingComplete = setInterval(() => {
            if (checkAllElementsLoaded()) {
                clearInterval(checkLoadingComplete);
                // Todos los elementos están cargados, puedes ocultar el indicador de carga aquí si es necesario
            }
        }, 100);

    } catch (error) {
        console.error('Error al inicializar el mapa:', error);
        throw error;
    }
    

};




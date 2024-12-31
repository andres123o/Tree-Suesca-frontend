import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { IoIosArrowForward } from "react-icons/io";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import Chart from 'chart.js/auto';

// Configura el token de Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVzdGluby1wbHVzIiwiYSI6ImNtM3QzY3VkcTA0MnMybHBqaG42cnlwMGQifQ.yCsdkgJaxSy22A9sjgyikQ';
const CACHE_NAME = 'mapbox-tiles-cache';
const LOCATION_STORAGE_KEY = 'tracked-locations';


const getTileUrls = (bounds, zoom) => {
    const tiles = [];
    
    // Convertir bounds a tile coordinates
    const min = latLngToTile(bounds.getSouthWest().lat, bounds.getSouthWest().lng, zoom);
    const max = latLngToTile(bounds.getNorthEast().lat, bounds.getNorthEast().lng, zoom);
    
    // Generar URLs para cada tile en el rango
    for (let x = min.x; x <= max.x; x++) {
        for (let y = min.y; y <= max.y; y++) {
            // Usar el formato correcto para imágenes satelitales
            const url = `https://api.mapbox.com/v4/mapbox.satellite/${zoom}/${x}/${y}@2x.png?access_token=${mapboxgl.accessToken}`;
            tiles.push(url);
        }
    }
    
    return tiles;
};

const latLngToTile = (lat, lon, zoom) => {
    const n = Math.pow(2, zoom);
    const x = Math.floor((lon + 180) / 360 * n);
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n);
    return { x, y };
};

const cacheTiles = async (bounds, minZoom, maxZoom) => {
    const urls = [];
    for (let z = minZoom; z <= maxZoom; z++) {
        const tiles = getTileUrls(bounds, z);
        urls.push(...tiles);
    }

    try {
        const cache = await caches.open(CACHE_NAME);
        
        // Agregar opciones de CORS a las solicitudes
        const fetchOptions = {
            mode: 'cors',
            credentials: 'same-origin'
        };

        const results = await Promise.allSettled(
            urls.map(async url => {
                try {
                    const response = await fetch(url, fetchOptions);
                    if (response.ok) {
                        await cache.put(url, response.clone());
                        return true;
                    }
                    return false;
                } catch (err) {
                    console.warn(`Failed to cache: ${url}`, err);
                    return false;
                }
            })
        );

        const successCount = results.filter(r => r.status === 'fulfilled' && r.value).length;
        console.log(`Successfully cached ${successCount} of ${urls.length} tiles`);
    } catch (error) {
        console.error('Error caching tiles:', error);
    }
};

async function getElevation(coordinates, containerChart) {
    try {
        // Obtener elevaciones usando la API de Mapbox
        // Necesitamos hacer las peticiones en lotes de 30 puntos máximo
        const batchSize = 30;
        const elevationData = [];
        
        for (let i = 0; i < coordinates.length; i += batchSize) {
            const batch = coordinates.slice(i, i + batchSize);
            const coordinatesString = batch
                .map(coord => `${coord[0]},${coord[1]}`)
                .join(',');

            const response = await fetch(
                `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${coordinatesString}.json?layers=contour&access_token=${mapboxgl.accessToken}`
            );

            if (!response.ok) {
                throw new Error('Error obteniendo elevación de Mapbox');
            }

            const data = await response.json();
            const elevations = data.features.map(feature => feature.properties.ele);
            elevationData.push(...elevations);
        }

        // Procesar datos para el gráfico
        let distance = 0;
        const x = [];
        const y = [];

        coordinates.forEach((coord, index) => {
            if (index > 0) {
                // Calcular distancia entre puntos
                const prevCoord = coordinates[index - 1];
                distance += calculateDistance(
                    prevCoord[1], prevCoord[0],
                    coord[1], coord[0]
                );
            }
            x.push(distance); // Distancia en km
            y.push(Math.floor(elevationData[index]));
        });

        

        // Generar datos decorativos
        const numPoints = coordinates.length;
        const xIndex = Array.from({ length: numPoints }, (_, i) => i);
        const decorativeData = xIndex.map(i => {
            const x = (i / (numPoints - 1)) * 1.5 - 0.4;
            return 2100 + (1000 * Math.exp(-10 * x * x));
        });

        // Crear puntos para el gráfico
        const numParts = 10;
        const partSize = Math.floor(y.length / numParts);
        const middleIndexes = [];

        for (let i = 0; i < numParts; i++) {
            const start = i * partSize;
            const end = (i === numParts - 1) ? y.length : (i + 1) * partSize;
            const part = y.slice(start, end);
            const middleIndex = Math.floor(part.length / 2) + start;
            middleIndexes.push(middleIndex);
        }

        // Crear el gráfico
        const ctx = containerChart.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: x,
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
                        pointBackgroundColor: 'rgba(10, 30, 50, 1)',
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
                        }
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
                            title: () => 'Elevación',
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

    } catch (error) {
        console.error("Error obteniendo la elevación:", error);
    }
}
// Función auxiliar para calcular distancia entre coordenadas
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Funciones de utilidad para el seguimiento de ubicación
const initLocationTracking = (map, firstStation, setCurrentLocation) => {
    let userMarker = null;
    let guidanceRoute = null;
    let lastKnownLocation = null;
    let watchId = null;
    let locationHistory = [];
    let hasReachedFirstStation = false; // Nueva bandera para controlar si llegó a la primera estación
    const ARRIVAL_THRESHOLD = 0.03; // 30 metros en kilómetros

    // Cargar ubicaciones guardadas
    const loadStoredLocations = () => {
        const stored = localStorage.getItem(LOCATION_STORAGE_KEY);
        if (stored) {
            locationHistory = JSON.parse(stored);
        }
    };

    // Guardar ubicaciones en localStorage
    const saveLocations = () => {
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(locationHistory));
    };

    // Función para verificar si el usuario ha llegado a la primera estación
    const checkArrivalToFirstStation = (userLocation) => {
        if (hasReachedFirstStation) return true;

        const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            firstStation[1], // lat
            firstStation[0]  // lng
        );

        if (distance <= ARRIVAL_THRESHOLD) {
            hasReachedFirstStation = true;
            // Eliminar la ruta de guía cuando llega
            if (map.getSource('guidance-route')) {
                map.removeLayer('guidance-route');
                map.removeSource('guidance-route');
            }
            console.log("Usuario ha llegado a la primera estación");
            return true;
        }

        return false;
    };

    // Función mejorada para crear el marcador del usuario
    const createUserMarker = (lngLat, accuracy) => {
        const parser = new DOMParser();
        const pinSvgString = `
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="26" fill="#00008B" stroke="white" stroke-width="5"/>
                ${accuracy ? `<circle cx="28" cy="28" r="${accuracy}" fill="#00008B" opacity="0.2"/>` : ''}
            </svg>`;
        const pinSVG = parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;

        const el = document.createElement('div');
        el.className = 'user-location-marker';
        el.innerHTML = pinSVG.outerHTML;

        if (userMarker) {
            userMarker.remove();
        }

        userMarker = new mapboxgl.Marker(el)
            .setLngLat(lngLat)
            .addTo(map);

        return userMarker;
    };

    // Función mejorada para actualizar la ruta de guía con soporte offline
    const updateGuidanceRoute = async (userLocation) => {
        // Si ya llegó a la primera estación, no actualizamos la ruta
        if (hasReachedFirstStation) return;

        try {
            // Intentar obtener la ruta desde la API
            const response = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation.lng},${userLocation.lat};${firstStation[0]},${firstStation[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
            ).catch(() => null);

            let routeGeometry;

            if (response && response.ok) {
                const data = await response.json();
                routeGeometry = data.routes[0].geometry;
                // Cachear la respuesta para uso offline
                localStorage.setItem('last-guidance-route', JSON.stringify(routeGeometry));
            } else {
                // Usar ruta cacheada si está disponible
                const cachedRoute = localStorage.getItem('last-guidance-route');
                routeGeometry = cachedRoute ? JSON.parse(cachedRoute) : null;
            }

            if (!routeGeometry) return;

            // Actualizar la ruta en el mapa
            if (map.getSource('guidance-route')) {
                map.removeLayer('guidance-route');
                map.removeSource('guidance-route');
            }

            map.addSource('guidance-route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: routeGeometry
                }
            });

            map.addLayer({
                id: 'guidance-route',
                type: 'line',
                source: 'guidance-route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#0066ff',
                    'line-width': 4,
                    'line-dasharray': [2, 1]
                }
            });

            guidanceRoute = routeGeometry;
        } catch (error) {
            console.error('Error al actualizar la ruta de guía:', error);
        }
    };

    // Iniciar seguimiento con mejor precisión y manejo offline
    if ('geolocation' in navigator) {
        loadStoredLocations();

        watchId = navigator.geolocation.watchPosition(
            (position) => {
                const userLocation = {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp,
                    altitude: position.coords.altitude,
                    speed: position.coords.speed
                };

                // Verificar si ha llegado a la primera estación
                checkArrivalToFirstStation(userLocation);

                // Guardar ubicación en el historial
                locationHistory.push(userLocation);
                saveLocations();
                lastKnownLocation = userLocation;

                // Crear o actualizar marcador con círculo de precisión
                createUserMarker(
                    [userLocation.lng, userLocation.lat],
                    position.coords.accuracy
                );

                // Solo actualizar la ruta si aún no ha llegado a la primera estación
                if (!hasReachedFirstStation) {
                    updateGuidanceRoute(userLocation);
                }

                // Actualizar estado
                setCurrentLocation(userLocation);
            },
            (error) => {
                console.error('Error getting location:', error);
                // Usar última ubicación conocida si está disponible
                if (lastKnownLocation) {
                    setCurrentLocation(lastKnownLocation);
                }
            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 5000
            }
        );
    }

    return {
        removeGuidanceRoute: () => {
            if (map.getSource('guidance-route')) {
                map.removeLayer('guidance-route');
                map.removeSource('guidance-route');
            }
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        },
        getLocationHistory: () => locationHistory,
        getLastLocation: () => lastKnownLocation
    };
};

const useMetricsTracking = (map, ruta, currentLocation, refs) => {
    const [startTime, setStartTime] = useState(null);
    const [metrics, setMetrics] = useState({
        kmRecorridos: 0,
        velocidadPromedio: 0,
        tiempoRecorrido: '00:00',
        porcentajeCompletado: 0
    });
    const [lastPosition, setLastPosition] = useState(null);
    const distanceAccumulatorRef = useRef(0);

    // Calcular distancia total de la ruta
    const calcularDistanciaTotal = useCallback((coordinates) => {
        let total = 0;
        for (let i = 1; i < coordinates.length; i++) {
            total += calculateDistance(
                coordinates[i-1].lat, coordinates[i-1].lng,
                coordinates[i].lat, coordinates[i].lng
            );
        }
        return total;
    }, []);

    // Actualizar métricas cuando cambia la ubicación
    useEffect(() => {
        if (!currentLocation || !map || !ruta) return;

        try {
            // Iniciar tiempo si es necesario
            if (!startTime) {
                setStartTime(Date.now());
                localStorage.setItem('route_start_time', Date.now().toString());
            }

            // Obtener coordenadas de la ruta
            const coordinates = ruta.coordenadas_principales[0].cordenadas;
            const distanciaTotal = calcularDistanciaTotal(coordinates);

            // Calcular distancia recorrida con umbral mínimo
            if (lastPosition) {
                const newDistance = calculateDistance(
                    lastPosition.lat, lastPosition.lng,
                    currentLocation.lat, currentLocation.lng
                );
                
                // Solo acumular distancia si es mayor a 2 metros (0.002 km)
                if (newDistance > 0.002) {
                    distanceAccumulatorRef.current += newDistance;
                }
            }
            setLastPosition(currentLocation);

            // Calcular tiempo transcurrido en horas
            const storedStartTime = localStorage.getItem('route_start_time');
            const startTimeToUse = storedStartTime ? parseInt(storedStartTime) : startTime;
            const tiempoTranscurridoMs = Date.now() - startTimeToUse;
            const tiempoTranscurridoHoras = tiempoTranscurridoMs / (1000 * 60 * 60);

            // Calcular velocidad promedio (km/h)
            const velocidadPromedio = tiempoTranscurridoHoras > 0 
                ? (distanceAccumulatorRef.current / tiempoTranscurridoHoras)
                : 0;

            // Calcular porcentaje completado
            const porcentaje = Math.min(
                Math.round((distanceAccumulatorRef.current / distanciaTotal) * 100),
                100
            );

            // Formatear tiempo para display
            const minutos = Math.floor(tiempoTranscurridoMs / 60000);
            const segundos = Math.floor((tiempoTranscurridoMs % 60000) / 1000);
            const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

            // Actualizar métricas
            const newMetrics = {
                kmRecorridos: distanceAccumulatorRef.current.toFixed(2),
                velocidadPromedio: velocidadPromedio.toFixed(1),
                tiempoRecorrido: tiempoFormateado,
                porcentajeCompletado: porcentaje
            };

            setMetrics(newMetrics);

            // Actualizar UI
            if (refs.kmRecorridosRef.current) {
                refs.kmRecorridosRef.current.textContent = `${newMetrics.kmRecorridos}`;
            }
            if (refs.velocidadRef.current) {
                refs.velocidadRef.current.textContent = `${newMetrics.velocidadPromedio}`;
            }
            if (refs.tiempoRecorridoRef.current) {
                refs.tiempoRecorridoRef.current.textContent = newMetrics.tiempoRecorrido;
            }
            if (refs.porcentajeCompletadoRef.current) {
                refs.porcentajeCompletadoRef.current.textContent = `${newMetrics.porcentajeCompletado}%`;
            }

        } catch (error) {
            console.error('Error actualizando métricas:', error);
        }

    }, [currentLocation, map, ruta, startTime, lastPosition, calcularDistanciaTotal]);

    return metrics;
};

const useDestinoContent = () => {
    const { nombre } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [content, setContent] = useState(null);
  
    useEffect(() => {
        const fetchDestinoContent = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://tree-suesca-backend-production.up.railway.app/api/v1/ruta/mapa/${nombre}/content`
                );
                setContent(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
  
        fetchDestinoContent();
    }, []);
  
    return { content, loading, error };
};

const FuncionalidadesMapa = ({ ruta }) => {
    const { nombre } = useParams();
    const mapContainerRef = useRef(null);
    const kmRecorridosRef = useRef(null);
    const tiempoRecorridoContainer = useRef(null);
    const containerChart = useRef(null);
    const [map, setMap] = useState(null);
    const velocidadRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationTracker, setLocationTracker] = useState(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const porcentajeCompletadoRef = useRef(null);
    const metrics = useMetricsTracking(map, ruta, currentLocation, {
        kmRecorridosRef: kmRecorridosRef,
        velocidadRef: velocidadRef,
        tiempoRecorridoRef: tiempoRecorridoContainer,
        porcentajeCompletadoRef: porcentajeCompletadoRef
    });

    // 1. Track tiempo en la página de destino
    useEffect(() => {
        let startTime = Date.now();
        let activeTime = 0;
        let isVisible = true;
    
        const trackVisibility = () => {
            if (document.hidden) {
                if (isVisible) {
                    activeTime += Date.now() - startTime;
                    isVisible = false;
                }
            } else {
                startTime = Date.now();
                isVisible = true;
            }
        };
    
        document.addEventListener('visibilitychange', trackVisibility);
    
        return () => {
            if (isVisible) {
                activeTime += Date.now() - startTime;
            }
    
            const tiempoTranscurridoSegundos = Math.round(activeTime / 1000);
            
            window.gtag('event', 'tiempo_en_mapa', {
                tipo_negocio: 'miradores',
                nombre_ruta: nombre || 'desconocido',
                tiempo_segundos: tiempoTranscurridoSegundos,
                tipo_interaccion: 'vista'
            });
    
            document.removeEventListener('visibilitychange', trackVisibility);
        };
    }, [nombre]);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const toggleSection = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (ruta && process.env.NODE_ENV === 'production') {
            const bounds = new mapboxgl.LngLatBounds();
            ruta.coordenadas_principales[0].cordenadas.forEach(coord => {
                bounds.extend([coord.lng, coord.lat]);
            });
            cacheTiles(bounds, 12, 15);
        }
    }, [ruta]);
    

    useEffect(() => {
        if (!mapContainerRef.current || !ruta) return;

        let isMounted = true;

        const initMap = async () => {
            try {
                // Inicializar mapa
                const newMap = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: 'mapbox://styles/mapbox/satellite-streets-v12',
                    center: [ruta.estaciones[0].lng, ruta.estaciones[0].lat],
                    zoom: 13,
                    preserveDrawingBuffer: true
                });

                // Esperar a que el mapa cargue
                await new Promise(resolve => {
                    newMap.once('load', () => {
                        newMap.addSource('mapbox-dem', {
                            'type': 'raster-dem',
                            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                            'tileSize': 512,
                            'maxzoom': 14
                        });
                        newMap.setTerrain({ 'source': 'mapbox-dem' });
                        resolve();
                    });
                });

                if (!isMounted) return;

                // Iniciar seguimiento de ubicación
                const firstStation = [ruta.estaciones[0].lng, ruta.estaciones[0].lat];
                const tracker = initLocationTracking(newMap, firstStation, setCurrentLocation);
                setLocationTracker(tracker);

                // Agregar controles de navegación
                newMap.addControl(new mapboxgl.NavigationControl());

                // Agregar la ruta principal
                const coordinates = ruta.coordenadas_principales[0].cordenadas.map(coord => [
                    coord.lng,
                    coord.lat
                ]);

                await getElevation(coordinates, containerChart.current);

                newMap.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coordinates
                        }
                    }
                });

                newMap.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#0066FF',
                        'line-width': 4
                    }
                });

                // Añadir estaciones
                ruta.estaciones.forEach((estacion) => {
                    const el = document.createElement('div');
                    el.className = 'station-marker';
                    
                    // SVG para el marcador de ubicación
                    el.innerHTML = `
                        <svg width="40" height="40" viewBox="0 0 24 24" class="marker-svg">
                            <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8z" 
                                  fill="#00cd70"/>
                            <text 
                                x="50%" 
                                y="45%" 
                                text-anchor="middle" 
                                dominant-baseline="middle" 
                                fill="white" 
                                font-size="10" 
                                font-weight="bold"
                                font-family="Arial"
                            >${estacion.numero_estacion}</text>
                        </svg>
                    `;
                
                    const popup = new mapboxgl.Popup({ offset: 25 })
                        .setHTML(
                            `<div style="max-width: 200px;">
                                <h3 style="margin: 0 0 10px 0;">${estacion.nombre}</h3>
                                <p style="margin: 5px 0;"><strong>Dificultad:</strong> ${estacion.dificultad}</p>
                                <p style="margin: 5px 0;">${estacion.description}</p>
                                <img src="${estacion.img}" 
                                     alt="${estacion.nombre}" 
                                     style="width: 100%; height: auto; margin-top: 10px; border-radius: 4px;" />
                            </div>`
                        );
                
                    new mapboxgl.Marker(el)
                        .setLngLat([estacion.lng, estacion.lat])
                        .setPopup(popup)
                        .addTo(newMap);
                });


                // Ajustar el mapa para mostrar toda la ruta
                const bounds = coordinates.reduce((bounds, coord) => {
                    return bounds.extend(coord);
                }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

                newMap.fitBounds(bounds, {
                    padding: { top: 50, bottom: 50, left: 50, right: 50 }
                });

                if (isMounted) {
                    setMap(newMap);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error al cargar el mapa:', error);
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        initMap();

        return () => {
            isMounted = false;
            if (map) {
                if (locationTracker) {
                    locationTracker.removeGuidanceRoute();
                }
                map.remove();
            }
        };

    }, [ruta]);

    return (
        <>
            <div className='container-img-map'>
                <div 
                    id='map2' 
                    ref={mapContainerRef}
                    style={{ width: '100%', height: '100%' }}
                />
                {isLoading && (
                    <div className="loading-overlay">
                        <ClipLoader color={"#123abc"} size={50} />
                    </div>
                )}
            </div>

            {!isOnline && (
                <div className="offline-indicator">
                    Modo sin conexión - Usando datos guardados
                </div>
            )}

            <div className='container-info-mapa'>    
                <div className='container-recuadro-info-title-mapa'>
                    <h4>{nombre}</h4>
                </div>

                <div className='container-cuadro-funcionalidades'>
                    <div className='container-interno'>
                        <h5 className='container-title-funcionalidades'>
                            Km recorridos
                        </h5>
                        <p 
                            className="container-funcionalidad" 
                            id="km-recorridos"
                            ref={kmRecorridosRef}
                        >0.0</p>
                    </div>

                    <div className='container-interno'>
                        <h5 className='container-title-funcionalidades'>
                            Tiempo recorrido
                        </h5>
                        <span 
                            className='container-funcionalidad'
                            id="tiempo-recorrido"
                            ref={tiempoRecorridoContainer}
                        >00:00</span>
                    </div>
                </div>

                <div className='container-cuadro-funcionalidades'>
                    <div className='container-interno'>
                        <h5 className='container-title-funcionalidades'>
                            Progreso
                        </h5>
                        <p 
                            className="container-funcionalidad" 
                            id="porcentajeCompletado"
                            ref={porcentajeCompletadoRef}
                        >0%</p>
                    </div>

                    <div className='container-interno'>
                        <h5 className='container-title-funcionalidades'>
                            Velocidad (km/h)
                        </h5>
                        <span 
                            className='container-funcionalidad'
                            id="velocidad"
                            ref={velocidadRef}
                        >0.0</span>
                    </div>
                </div>

                <div className='container-canvas-chart'>
                    <canvas 
                        id="elevationChart" 
                        width="300" 
                        height="150"
                        ref={containerChart}
                    ></canvas>
                </div>

                <div className='separador'></div>

                <div className='accordion'>
                    <div className='accordion-item1'>
                        <button 
                            className={`accordion-header ${isExpanded ? 'active' : ''}`}
                            onClick={toggleSection}
                        >
                            Emergencias
                            <IoIosArrowForward className={`icon ${isExpanded ? 'rotated' : ''}`} />
                        </button>
                        <div 
                            className='accordion-content'
                            style={{ display: isExpanded ? 'block' : 'none' }}
                        >
                            {ruta.emergencias.map(emergencia => (
                                <div key={emergencia.id} className="emergency-contact">
                                    <p><strong>{emergencia.tipo}:</strong> {emergencia.numero}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const MainComponentCoordenadaMapBox = () => {
    const { content, loading, error } = useDestinoContent();
    
    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader color={"#123abc"} size={50} />
        </div>
    );
    
    if (error) return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            Error: {error}
        </div>
    );
    
    if (!content) return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            No hay contenido disponible
        </div>
    );
  
    return <FuncionalidadesMapa ruta={content} />;
};

export default MainComponentCoordenadaMapBox;
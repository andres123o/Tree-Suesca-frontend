import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { initializeMap } from '../../service/googleAPI';
import { ClipLoader } from 'react-spinners';

const FuncionalidadesMapa = ( {ruta} ) => {
    const { nombre } = useParams();
    const mapContainerRef = useRef(null);
    const kmRecorridosRef = useRef(null);
    const tiempoRecorridoContainer = useRef(null);
    const containerChart = useRef(null);
    const containerElevacionActual = useRef(null);
    const containerKmRestantes = useRef(null);
    const [map, setMap] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const initMap = async () => {
            if (!mapContainerRef.current || !isMounted) return;

            try {
                setIsLoading(true)
                const newMap = await initializeMap(
                    mapContainerRef.current, 
                    kmRecorridosRef.current,
                    tiempoRecorridoContainer.current,
                    containerChart.current,
                    containerElevacionActual.current,
                    containerKmRestantes.current,
                    ruta.cordenadasPrincipales, 
                    ruta.atajos, 
                    ruta.estaciones
                    
                );
                setMap(newMap);


            } catch (error) {
                console.error('Error al cargar el mapa:', error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        initMap();

        return () => {
            isMounted = false;
        };
    }, [ruta]);
    
    return (
        <>
            {/* Ver las imagenes del carrusel */}
            <div className='container-img-map'>
                <div 
                    id='map2' 
                    ref={mapContainerRef} 
                ></div>; 
            </div>

            {/* Indicador de carga */}
            {
                isLoading && (
                    <div id="loading-overlay">
                        <ClipLoader
                            color={"#123abc"}
                            loading={isLoading}
                            size={50}
                        />
                    </div>
                )
            }

            {/* Container info principal */}
            <div className='container-info-mapa'>    
                {/* Titulo */}
                <div className='container-recuadro-info-title-mapa'>
                    <h4>
                        {nombre}
                    </h4>
                </div>

                {/* Container cuadro funcionalidades */}
                <div className='container-cuadro-funcionalidades'>
                    {/* Cuadro interno */}
                    <div className='container-interno'>
                        <h5 className='container-title-funcionalidades'>
                            Km recorriedos
                        </h5>
                        <p 
                            className="container-funcionalidad" 
                            id="km-recorridos"
                            ref={kmRecorridosRef}
                        >
                        </p>
                    </div>

                    {/* Segundo cuadro informativo */}
                    <div className='container-interno'>
                        <h5 className='container-title-funcionalidades'>
                            Tiempo recorrido
                        </h5>
                        <span 
                            className='container-funcionalidad'
                            id = "tiempo-recorrido"
                            ref={tiempoRecorridoContainer}
                        >
                        </span>
                    </div>
                </div>

                {/* Container segundocuadro funcionalidades */}
                <div className='container-cuadro-funcionalidades'>
                    {/* Cuadro interno */}
                    <div className='container-interno'>
                        <h5 className='container-title-funcionalidades'>
                            Elevación (msnm)
                        </h5>
                        <p 
                            className="container-funcionalidad" 
                            id="elevacionActual"
                            ref={containerElevacionActual}
                        >
                        </p>
                    </div>

                    {/* Segundo cuadro informativo */}
                    <div className='container-interno'>
                        <h5 className='container-title-funcionalidades'>
                            Km restantes
                        </h5>
                        <span 
                            className='container-funcionalidad'
                            id = "km-restantes"
                            ref={containerKmRestantes}
                        >
                        </span>
                    </div>
                </div>

                {/* Container grafico de la elevacion */}
                <div className='container-canvas-chart'>
                    <canvas 
                        id="elevationChart" 
                        width="300" 
                        height="150"
                        ref={containerChart}
                    >
                    </canvas>
                </div>
            </div>
        </>
    )
}

export default FuncionalidadesMapa;
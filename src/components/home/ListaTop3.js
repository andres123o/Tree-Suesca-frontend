import React from "react"
import { useNavigate } from "react-router-dom"

import ContainerPequeño from "../common/container-pequeño";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useState, useEffect } from 'react'


const ListaTop3 = ( {rest, titulo, tipo, icono1, icono2, route} ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const navigate = useNavigate();

    const handle = () => {
        // Redirige a listaRutas.html con el nombre de la actividad como query param
        navigate(`/${route}`);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                // Si llegamos al final de la lista, volvemos al principio
                return (prevIndex + itemsPerPage) % rest.length;
            });
        }, 3000); // Cambia cada 2 segundos

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);     
    }, [rest]);

    //  Obtener los elementos que se deben mostrar en cada iteración
    const displayedItems = rest.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <>
            <div className="container-descripcion-destino-restaurantes">
                <div className="container-title-mas-popular-restaurantes">
                    <h5>
                        {titulo}
                    </h5>
                    <MdKeyboardDoubleArrowRight 
                        className="icon-ver-mas" 
                        id= {titulo}
                        onClick={() => handle()}
                    />
                </div>
                <ContainerPequeño 
                    displayedItems={displayedItems}
                    icono1={icono1}
                    icono2={icono2}
                    tipoDescripcion={tipo}
                />
            </div>
        </>
    )
}

export default ListaTop3 
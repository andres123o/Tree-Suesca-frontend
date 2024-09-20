import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import React, { useState, useEffect } from 'react'
import { IoLocationOutline } from "react-icons/io5";


const ListaTop3 = ( {rest, titulo, icono} ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                // Si llegamos al final de la lista, volvemos al principio
                return (prevIndex + itemsPerPage) % rest.length;
            });
        }, 5000); // Cambia cada 2 segundos

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
                    <MdKeyboardDoubleArrowRight className="icon-ver-mas"/>
                </div>
                <div className="container-categoria-restaurantes">
                    {
                        displayedItems.map((item, index) => (
                            <div key={item.id} className="restaurantes">
                                <div 
                                    className="contaniner-img-principal-restaurante"
                                    style={{ 
                                        backgroundImage: `url(${item.img})`  
                                    }}    
                                >
                                </div>
                                <div className="container-descripcion-restaurante">
                                    <div className="container-logo-restaurante">
                                        <div className="logo-restaurante">
                                            <img src={item.logo} alt="Logo del restaurante"/>
                                        </div>
                                    </div>
                                    <div className="container-info-breve-restaurante">
                                        <div className="container-descripcion-calificacion">
                                            <h5>
                                                {item.description}
                                            </h5>
                                        </div>
                                        <p>
                                            {icono} {item.precioPromedio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                                        </p>
                                        <p>
                                            <IoLocationOutline className="IoLocationOutline" /> Suesca, Cundinamarca
                                        </p>
                                    </div>
                                </div>       
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ListaTop3 
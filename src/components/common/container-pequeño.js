import React from "react"
import { useNavigate } from "react-router-dom"
import OptimizedImage from "../common/optimzarImg";


const ContainerPequeño = ( {displayedItems, icono1, icono2, tipoDescripcion, tipoEstablecimiento} ) => {
    const navigate = useNavigate();

    const handleClick = (establecimiento) => {
        // Redirige a listaRutas.html con el nombre de la actividad como query param
        navigate(`/establecimiento/${encodeURIComponent(tipoEstablecimiento)}/${encodeURIComponent(establecimiento)}`);
    }

    return (
        <>
                <div className="container-categoria-restaurantes">
                    {
                        displayedItems.map((item, index) => (
                            <div 
                                key={item.id} 
                                className="restaurantes"
                                onClick={() => handleClick(item.name)}
                            >
                                <OptimizedImage className='contaniner-img-principal-restaurante'
                                    imageUrl={item.img}
                                />    
                                <div className="container-descripcion-restaurante">
                                     <div className="container-calificacion-restaurante">
                                        <p>
                                            {item.calificacion}
                                        </p>
                                         <img src="/utils/icons8-estrella-48.png" alt= {item.name} />
                                    </div>
                                    <div className="container-logo-restaurante">
                                        <div className="logo-restaurante">
                                            <img src={item.logo} alt="Logo del restaurante"/>
                                        </div>
                                    </div>
                                    <div className="container-info-breve-restaurante">
                                        <div className="container-descripcion-calificacion">
                                            <h5>
                                                {item.name} 
                                            </h5>
                                            <p>
                                                {item.items.tipo}
                                            </p>
                                        </div>
                                        <p>
                                            {icono1} {tipoDescripcion}: {item.precio_promedio.toLocaleString('es-CO', {
                                                style: 'currency',
                                                currency: 'COP',
                                                maximumFractionDigits: 0 // Opcional, ajusta el número de decimales
                                            })}
                                        </p>
                                        <p>
                                            {icono2} Suesca, Cundinamarca
                                        </p>
                                    </div>
                                </div>       
                            </div>
                        ))
                    }
                </div>
        </>
    )
}

export default ContainerPequeño
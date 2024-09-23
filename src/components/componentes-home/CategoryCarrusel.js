import React from "react"
import { useNavigate } from "react-router-dom"

const CategoryCarousel = ( { actividades } ) => {
    const navigate = useNavigate();

    const handleClick = (actividad) => {
        // Redirige a listaRutas.html con el nombre de la actividad como query param
        navigate(`/categoria/${encodeURIComponent(actividad.actividad)}`);
    }

    return (
        <>
            <div className="carrusel">
                <div className="container-carrusel-categorias">
                    {
                        actividades.map((actividad) => (
                            <div 
                                key = {actividad.id} 
                                onClick = {() =>  handleClick(actividad)}
                                className="container-icono-title-categoria"
                            >
                                <div className="container-img"  style={ { backgroundImage: `url(${actividad.img})` } }>

                                </div>
                                <div className="container-p">
                                    <p>
                                        {actividad.actividad}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CategoryCarousel
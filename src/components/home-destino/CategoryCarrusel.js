import React from "react"
import { useNavigate } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io";


const CategoryCarousel = ( { actividades } ) => {
    const navigate = useNavigate();

    const handleClick = (actividad) => {
        // Redirige a listaRutas.html con el nombre de la actividad como query param
        navigate(`/rutas/${encodeURIComponent(actividad.actividad)}`);
    }

    return (
        <>
            <div className="container-title-mas-popular">
                    <h5>Planes imperdibles!</h5>
            </div>
            <div className="carrusel">
                <div className="container-carrusel-categorias">
                    {
                        actividades.map((actividad) => (
                            <div 
                                key = {actividad.id} 
                                onClick = {() =>  handleClick(actividad)}
                                className="container-icono-title-categoria"
                            >
                                <div className="container-des-p">
                                    <div className="container-img"  style={ { backgroundImage: `url(${actividad.img})` } }>
                                    </div>
                                    <div className="container-p">
                                        <h5>
                                            {actividad.frase}
                                        </h5>
                                        <h5 className='p-des'>
                                            {actividad.descripcion}
                                        </h5>
                                    </div>
                                </div>
                                <IoIosArrowForward />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CategoryCarousel
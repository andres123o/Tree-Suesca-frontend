import React from "react";
import OptimizedImage from "../common/optimzarImg";

const PopularActivities = ( { contenido } ) => {
    return (
        <>
            <div className="container-mas-populares">
                <div className="overview-header">
                    <h2 className="overview-title">Experiencias en Tendencia</h2>
                </div>

                <div className="container-carrusel-actividades-populares">
                    <div className="container-carrusel-categorias-actividades">
                        {
                            contenido.map((item)  => {
                                return (
                                    <OptimizedImage 
                                        className='contenido'     
                                        key={item.img}
                                        imageUrl={item.img}
                                    />
                                ) 
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopularActivities
import React from "react";
import OptimizedImage from "../common/optimzarImg";

const PopularActivities = ( { contenido } ) => {
    return (
        <>
            <div className="container-mas-populares">
                <div className="container-title-mas-popular">
                    <h5>Tendencias</h5>
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
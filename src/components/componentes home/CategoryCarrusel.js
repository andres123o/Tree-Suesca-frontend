
const CategoryCarousel = ( { actividades } ) => {
    return (
        <>
            <div className="carrusel">
                <div className="container-carrusel-categorias">
                    {
                        actividades.map((actividad) => (
                            <div key = {actividad.id} className="container-icono-title-categoria">
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
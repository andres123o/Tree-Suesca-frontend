
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
                                <div 
                                    key={item.id} 
                                    className="contenido" 
                                    style={{ 
                                        backgroundImage: `url(${item.img})`,
                                    }}
                                >

                                </div>
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
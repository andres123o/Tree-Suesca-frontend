import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Carrusel = ( {actividadesDestino, titulo} ) => {
    return  (
        <>
            <div className="container-actividades">
                <div className="container-title-actividades">
                    <h5>{titulo}</h5>
                    <MdKeyboardDoubleArrowRight className="icon-ver-mas"/>
                </div>
                <div className="container-carrusel-actividades">
                    <div className="container-carrusel-categorias-actividades-2">
                        {
                            actividadesDestino.map((item) => {
                                return (
                                    <div key={item.id} className="container-categoria-actividades">
                                        <div 
                                            className="contianer-img-actividad"
                                            style= {{
                                                backgroundImage: `url(${item.img})`
                                            }}
                                        >

                                        </div> 
                                        <div  className="container-info-actividad">
                                            <div className="container-descripcion-breve-activida">
                                                <h5>
                                                    {item.description}
                                                </h5>
                                            </div>
                                            <div className="continer-info-oferente-actividad">
                                                <div className="container-logo-oferente-actividad">
                                                    <img src={item.logo} />
                                                </div>
                                                <div className="container-nombre-oferente-actividades">
                                                    <p>
                                                        {item.name}
                                                    </p>
                                                    <p>
                                                        {item.oferente}
                                                    </p>
                                                </div>
                                                <div className="container-calificacion-activida">
                                                    <p>
                                                        {item.calificacion}
                                                    </p>
                                                    <img src="/utils/icons8-estrella-48.png" alt= {item.name} />
                                                </div>
                                            </div>
                                        </div>
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

export default Carrusel

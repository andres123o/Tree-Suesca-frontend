import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";




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
                                                <div className="container-calificacion-activida">
                                                    <p>
                                                        {item.calificacion}
                                                    </p>
                                                    <img src="/utils/icons8-estrella-48.png" alt= {item.name} />
                                                </div>
                                            </div>
                                            <div className="continer-info-oferente-actividad">
                                                <div className="container-logo-oferente-actividad">
                                                    <img src={item.logo} />
                                                </div>
                                                <div className="container-nombre-oferente-actividades">
                                                    <h5>
                                                        {item.description}
                                                    </h5>
                                                    <h6>
                                                        <FaPerson className="Faperson"/>  $30.000 
                                                    </h6>
                                                    <p>
                                                        <IoLocationOutline className="IoLocationOutline" />  Suesca, Cundinamarca
                                                    </p>
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

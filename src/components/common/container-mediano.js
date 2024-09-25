import { IoLocationOutline } from "react-icons/io5";

const ContainerMediano = ({actividadesDestino, icon, iconCalendar, fecha, tipo, direccion, xOverflow, noche}) => {
    return (
        <>
            <div className="container-carrusel-actividades">
                <div 
                    className="container-carrusel-categorias-actividades-2"
                    style={{
                        flexDirection: direccion,
                        overflowX: xOverflow,
                    }}
                >
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
                                                <p>
                                                    {icon} {tipo}  $30.000 {iconCalendar} {fecha} {noche}
                                                </p>
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
        </>
    )
}

export default ContainerMediano
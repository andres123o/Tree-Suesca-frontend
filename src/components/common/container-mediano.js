import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import OptimizedImage from "../common/optimzarImg";


const ContainerMediano = ({actividadesDestino, icon, iconCalendar, fecha, tipo, precio, direccion, xOverflow, noche, ancho, routeInndividual}) => {
    const navigate = useNavigate();

    const handleClick = (actividad) => {
        navigate(`/${routeInndividual}/${encodeURIComponent(actividad)}`);
    }

    return (
        <div className="container-carrusel-actividades">
            <div 
                className="container-carrusel-categorias-actividades-2"
                style={{
                    flexDirection: direccion,
                    overflowX: xOverflow,
                }}
            >
                {actividadesDestino.map((item) => (
                    <div 
                        key={`${item.oferenteId}-${item.name}`}
                        className="container-categoria-actividades"
                        style={{
                            minWidth: ancho
                        }}
                        onClick={() => handleClick(item.description)}
                    >
                        <OptimizedImage className='contianer-img-actividad'
                            imageUrl={item.img}
                            alt={item.municipio}
                        />
                        <div className="container-info-actividad">
                            <div className="container-descripcion-breve-activida">
                                <div className="container-calificacion-activida">
                                    <p>{item.calificacion}</p>
                                    <img src="/utils/icons8-estrella-48.png" alt={item.name} />
                                </div>
                            </div>
                            <div className="continer-info-oferente-actividad">
                                <div className="container-logo-oferente-actividad">
                                    <img src={item.oferenteLogo} alt={item.oferenteNombre} />
                                </div>
                                <div className="container-nombre-oferente-actividades">
                                    <h5>{item.name}</h5>
                                    <p>
                                        {icon} {tipo} {item.precio.toLocaleString('es-CO', {
                                            style: 'currency',
                                            currency: 'COP',
                                            maximumFractionDigits: 0
                                        })} {item.fecha && iconCalendar} {item.fecha} {noche}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContainerMediano
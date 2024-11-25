import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import ContainerMediano from '../common/container-mediano'

const Carrusel = ( {actividadesDestino, titulo, icon, iconCalendar, fecha, tipo, route, noche, routeIndividual} ) => {
    const navigate = useNavigate();

    const handle = () => {
        // Redirige a listaRutas.html con el nombre de la actividad como query param
        navigate(`/${route}`);
    }

    return  (
        <>
            <div className="container-actividades">
                <div className="container-title-actividades">
                    <h5>{titulo}</h5>
                    <MdKeyboardDoubleArrowRight 
                        className="icon-ver-mas" 
                        id= {titulo}
                        onClick={() => handle()}                        
                    />
                </div>
                <ContainerMediano 
                    actividadesDestino={actividadesDestino}
                    icon={icon}
                    iconCalendar={iconCalendar}
                    fecha={fecha}
                    tipo={tipo}
                    xOverflow = 'auto'
                    noche={noche}
                    ancho= '35vh'
                    routeInndividual={routeIndividual}
                />
            </div>
        </>
    )
}

export default Carrusel

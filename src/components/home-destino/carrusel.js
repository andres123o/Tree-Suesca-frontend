import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import ContainerMediano from '../common/container-mediano'

const Carrusel = ( {actividadesDestino, titulo, icon, iconCalendar, fecha, tipo, route, noche, routeIndividual, destino_id} ) => {
    const navigate = useNavigate();

    const todasLasActividades = actividadesDestino.flatMap(oferente => {
        // Detect which array we're dealing with (actividad, evento, or alojamiento)
        const contentKey = oferente.actividad ? 'actividad' : 
                         oferente.evento ? 'evento' : 'alojamiento';
        
        return oferente[contentKey].map(act => ({
            ...act,
            oferenteLogo: oferente.logo,
            oferenteId: oferente.id
        }));
    });

    const handle = () => {
        // Redirige a listaRutas.html con el nombre de la actividad como query param
        navigate(`/${route}`, {
            state: {
                destino_id: destino_id
            }
        });
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
                    actividadesDestino={todasLasActividades}
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

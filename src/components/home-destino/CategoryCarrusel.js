import React from "react"
import { useNavigate } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io";

const actividadesRuta = [
    {
        id: 1,
        actividad: 'Senderismo',
        frase:'Paisajes & Miradores',
        descripcion: 'Descrubre paisajes increibles',
        img: 'https://res.cloudinary.com/dmyq0gr14/image/upload/v1729024921/7185cd4dab74597c497c2a4d24f81fbb_rt3kne.jpg'
    },
    {
        id: 2,
        actividad: '',
        frase:'Tu Día Perfecto',
        descripcion: 'Te ayudamos con tu itinerario',
        img: 'https://res.cloudinary.com/destinoplus/image/upload/v1732655684/f7170e1aaacc0df168e2a76f972431ce_xawmry.jpg'
    },
]

const CategoryCarousel = ({destino}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        
        navigate(`/rutas/Senderismo`, {
            state : {
                actividad:'Senderismo',
                destino_id: destino
            }
        });
    }

    return (
        <>
            <div className="container-title-mas-popular">
                    <h5>Planes imperdibles!</h5>
            </div>
            <div className="carrusel">
                <div className="container-carrusel-categorias">
                    {
                        actividadesRuta.map((actividad) => (
                            <div 
                                key = {actividad.id} 
                                onClick = {() =>  handleClick(actividad)}
                                className="container-icono-title-categoria"
                            >
                                <div className="container-des-p">
                                    <div className="container-img"  style={ { backgroundImage: `url(${actividad.img})` } }>
                                    </div>
                                    <div className="container-p">
                                        <h5>
                                            {actividad.frase}
                                        </h5>
                                        <p className='p-des'>
                                            {actividad.descripcion}
                                        </p>
                                    </div>
                                </div>
                                <IoIosArrowForward />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CategoryCarousel
const ContainerPequeño = ( {displayedItems, icono1, icono2, tipoDescripcion} ) => {
    return (
        <>
                <div className="container-categoria-restaurantes">
                    {
                        displayedItems.map((item, index) => (
                            <div key={item.id} className="restaurantes">
                                <div 
                                    className="contaniner-img-principal-restaurante"
                                    style={{ 
                                        backgroundImage: `url(${item.img})`  
                                    }}    
                                >
                                </div>
                                <div className="container-descripcion-restaurante">
                                     <div className="container-calificacion-restaurante">
                                        <p>
                                            {item.calificacion}
                                        </p>
                                         <img src="/utils/icons8-estrella-48.png" alt= {item.name} />
                                    </div>
                                    <div className="container-logo-restaurante">
                                        <div className="logo-restaurante">
                                            <img src={item.logo} alt="Logo del restaurante"/>
                                        </div>
                                    </div>
                                    <div className="container-info-breve-restaurante">
                                        <div className="container-descripcion-calificacion">
                                            <h5>
                                                {item.name} 
                                            </h5>
                                            <p>
                                                {item.items.tipo}
                                            </p>
                                        </div>
                                        <p>
                                            {icono1} {tipoDescripcion}: {item.precioPromedio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                                        </p>
                                        <p>
                                            {icono2} Suesca, Cundinamarca
                                        </p>
                                    </div>
                                </div>       
                            </div>
                        ))
                    }
                </div>
        </>
    )
}

export default ContainerPequeño
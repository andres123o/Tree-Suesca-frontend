

const FiltrosTitulo = ({nombre, filtros, manejarClick, filtroSeleccionado}) => {
    return (
        <>
            <div className="container-titulo-categoria-filtro">
                <div className="container-nombre-categoria">
                    <h5>
                        {nombre}
                    </h5>
                    <img src="/utils/tree suesca.png" />
                </div>
                <div className="container-filtros-general">
                    {
                        Object.entries(filtros).map(([key, values]) => (
                            <div 
                                className="cotainer-valores-duracion"
                                key = {key}   
                            >
                                <h5>
                                    {key}
                                </h5>
                                <div className="container-valores-filto-duracion">
                                    {
                                        Array.from(values).map((value, index) => (
                                            <p
                                                key={index}
                                                onClick = { () => manejarClick(key, value)}
                                                className= {filtroSeleccionado === value.value ? 'filtro-seleccionado' : ''}
                                            >
                                                {value.value}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default FiltrosTitulo 
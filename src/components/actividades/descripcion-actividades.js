const DescripcionActividades = () => {
    const [backgroundImage, setBackgroundImg] = useState(rutas.img);


    useEffect(() => {
      setBackgroundImg(rutas.img)
    }, [rutas.img])
  
    const handleImageSelect = (imgSrc) => {
      setBackgroundImg(imgSrc);
    };

    return (
        <>
            {/* Ver las imagenes del carrusel */}
            <div 
                className='container-img-principal' 
                style={{
                backgroundImage:`url(${backgroundImage})`
                }}
            >
            </div>
                
            {/* Container principal de la informacion */}
            <div className="container-info">
                <div className='container-carrusel-imgs'>
                    <div className='carrusel-imgs'>
                        {rutas.imgs.map((imgSrc, index) => (
                        <img 
                            key={index}
                            src={imgSrc}
                            alt="Imagen de la ruta"
                            onClick={() => handleImageClick(imgSrc, index)}
                            className={index === selectedImgIndex ? 'selected' : ''}
                        />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DescripcionActividades;
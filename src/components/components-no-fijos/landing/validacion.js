import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';

function ValidacionPromo() {
  // State for carousel
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const [feedbackExpanded, setFeedbackExpanded] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  
// Destinos mock data
const destinos = [
    { id: 1, image: "https://res.cloudinary.com/destinoplus/image/upload/v1733876077/alojamientos/Hotel%20Villa%20Ines/Jacuzzi/a7tby9m9gnszpsrvg7ki.jpg", title: "Cabaña con Jacuzzi en Suesca" },
    { id: 2, image: "https://res.cloudinary.com/destinoplus/image/upload/v1743802819/xq682hrs0mwp1kx0ssdv.jpg", title: "Cabaña con Jacuzzi en Suesca" },
    { id: 3, image: "https://res.cloudinary.com/destinoplus/image/upload/v1743802712/w45toguqk6tl2aygsksp.jpg", title: "Escalada en Roca para Dos" },
    { id: 4, image: "https://res.cloudinary.com/destinoplus/image/upload/v1743802714/fmwcqdtka3qgtzupm0ij.jpg", title: "Experiencia Gastronómica en Ahumados Toño" },
    { id: 5, image: "https://res.cloudinary.com/destinoplus/image/upload/v1743802715/x8kresfaqjjtghpughdt.jpg", title: "Caminata Ecológica y Siembra de Árbol" },
    { id: 6, image: "https://res.cloudinary.com/destinoplus/image/upload/v1743802990/jvjlxwgxa3zdqop5bdxc.jpg", title: "Plan de Aventura y Relax" },
    { id: 7, image: "https://res.cloudinary.com/destinoplus/image/upload/v1743802989/d1qzhll9ai89xiv4d5kc.jpg", title: "Escapada Romántica en Suesca" },
    { id: 8, image: "https://res.cloudinary.com/destinoplus/image/upload/v1743802988/ibsebqfhl78uim0ysdzq.jpg", title: "Aventura y Naturaleza en Suesca" },
    { id: 9, image: "https://res.cloudinary.com/destinoplus/image/upload/v1743802988/c5690gckjag1ya1i0lru.jpg", title: "Descubre Suesca Auténtico" },
    { id: 10, image: "https://res.cloudinary.com/destinoplus/image/upload/v1743806799/frsskxzlfjycywsvl8ur.jpg", title: "Experiencia Premium en Suesca" },
    { id: 11, image: "https://res.cloudinary.com/destinoplus/image/upload/v1743806801/pnbfdq4p4obizlfosygy.jpg", title: "Suesca: Aventura y Relax" },
  ];  

  // Categorías
  const categorias = [
    "Aventura", "Relax", "Gastronomía", "Naturaleza", "Romántico", "Ecológico"
  ];

  // Handle carousel navigation
  const handleNext = () => {
    if (activeSlide < destinos.length - 1) {
      setActiveSlide(activeSlide + 1);
      scrollToItem(activeSlide + 1);
    }
  };

  const handlePrev = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
      scrollToItem(activeSlide - 1);
    }
  };

  const scrollToItem = (index) => {
    if (carouselRef.current) {
      const items = carouselRef.current.querySelectorAll('.carousel-item');
      if (items[index]) {
        const scrollPosition = items[index].offsetLeft - (carouselRef.current.offsetWidth / 2) + (items[index].offsetWidth / 2);
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Submit feedback
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setFeedbackText('');
  };

  return (
    <div className="app-container">
        <div className="header">
            <div className="title-header">
                <h5>Desti <span className="mas-home"><strong>plus</strong></span></h5>
            </div>
            <div className="back-home">   
                <img src="https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png" alt="destiplus home" />
            </div>
        </div>
        {/* Header Section */}
        <div className="titulo-landing">
            <h2>Suesca Exclusiva: Aventura y Relax a Otro Nivel</h2>
            <p className="subtitulo">
                ¿Te imaginas ser uno de los <strong>primeros</strong> en descubrir la experiencia Destiplus? 
            </p>
        </div>

      {/* Main Image */}
      <div className="img-landing">
        <video width="260" height="500" controls autoplay>
            <source src="https://res.cloudinary.com/destinoplus/video/upload/v1743802724/rllu4q8rammdv15zupun.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
        </video>
      </div>

      {/* Destinations Header */}
      <div className="destinations-header">
        <div className="destinations-title-container">
          <h2 className="destinations-title">Descubre Suesca</h2>
          <div className="destinations-subtitle">
            Experiencias personalizadas <ArrowDown className="arrow-down" />
          </div>
        </div>
        <div className="destinations-line-decoration">
          <div className="destinations-line"></div>
          <div className="destinations-arrow-down">
            <ChevronDown />
          </div>
        </div>
      </div>

      {/* Carousel de Destinos */}
      <div className="container-carrusel-actividades-populares-3">
        <button className="carousel-arrow left" onClick={handlePrev}>
          <ArrowLeft size={20} />
        </button>
        
        <div className="container-carrusel-categorias-actividades-3" ref={carouselRef}>
          {destinos.map((destino, index) => (
            <div 
              key={destino.id} 
              className={`carousel-item ${index === activeSlide ? 'active-img' : ''}`}
            >
              <div 
                className={`contenidoDestino ${index === activeSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${destino.image})` }}
              >
              </div>
            </div>
          ))}
        </div>
        
        <button className="carousel-arrow right" onClick={handleNext}>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Descripción del Paquete */}
      <div className="descripcionDestino1">
        <div className="container-landing-2">
          <h3>Descripción Detallada del Plan</h3>
        </div>
        <div className="container-carr-des">
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
            <li style={{ margin: '10px 0', padding: '10px', borderLeft: '4px solid #00cd70' }}>
              <strong>Alojamiento:</strong> Cabaña privada con jacuzzi por $300,000 por noche.
            </li>
            <li style={{ margin: '10px 0', padding: '10px', borderLeft: '4px solid #00cd70' }}>
              <strong>Actividad de Aventura:</strong> Sesión de escalada en roca por $120,000. (Pareja)
            </li>
            <li style={{ margin: '10px 0', padding: '10px', borderLeft: '4px solid #00cd70' }}>
              <strong>Experiencia Gastronómica:</strong> Reserva en Ahumados Toño con solo $50,000 de anticipo, que se abonan al total de tu consumo, y disfruta de un 15% de descuento en todos los platos.
            </li>
            <li style={{ margin: '10px 0', padding: '10px', borderLeft: '4px solid #00cd70' }}>
              <strong>Actividad Ecológica:</strong> Caminata privada, siembra de un árbol y foto enmarcada de la experiencia por $45,000.
            </li>
          </ul>
        </div>
      </div>

      {/* Sección de Personalización */}
      <div className="descripcionDestino1">
        <div className="container-landing-2">
          <h3>Personaliza Tu Experiencia</h3>
        </div>
        <div className="container-carr-des">
            <p>
                Este plan no es estatico. Si quieres cambiar algo, tienes un presupuesto diferente o sueñas con una experiencia más romántica, aventurera o tranquila, estamos para ayudarte. <br /><br />
                En Destiplus somos tu asistente local: te ayudamos a armar tu escapada ideal con lo que realmente quieres. Tú nos dices, y nosotros nos encargamos de todo: desde buscar hasta reservar. Sin estrés, sin vueltas.
            </p>  
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <div className="categoria-burbuja">Alojamiento personalizado</div>
                <div className="categoria-burbuja">La actividad que quieras</div>
                <div className="categoria-burbuja">Experiencias gastronómicas</div>
                <div className="categoria-burbuja">Vida nocturna</div>
                <div className="categoria-burbuja">Rutas autodirigidas</div>
                <div className="categoria-burbuja">Paisajes y miradores ocultos</div>
                <div className="categoria-burbuja">Tips y acompañamiento local</div>
            </div>
        </div>
      </div>

      {/* Testimonios */}
    <div className="descripcionDestino1">
        <div className="container-landing-2">
            <h3>Lo que dicen nuestros clientes</h3>
        </div>
        <div className="container-carr-des testimonios-lista">
            
            <div className="testimonio-card">
            <img src="https://res.cloudinary.com/destinoplus/image/upload/v1743806801/pnbfdq4p4obizlfosygy.jpg" alt="Experiencia" className="imagen-testimonio" />
            <p className="texto-testimonio">
                "Nos ayudaron con todo lo que necesitábamos: desde encontrar el alojamiento perfecto hasta recomendarnos dónde comer según lo que nos gusta. También nos armaron un plan con actividades que solos jamás hubiéramos encontrado. Solo les dijimos lo que queríamos y ellos se encargaron de todo. De verdad, no se pierdan la actividad de sembrar el árbol… fue una experiencia hermosa. 💚"
            </p>
            <div className="usuario-testimonio">
                <img src="https://res.cloudinary.com/destinoplus/image/upload/v1742233606/krbymjqb5mw7ph1wz2h7.jpg" alt="Karla y Katherine" className="foto-perfil-testimonio" />
                <p className="nombre-testimonio">Karla y Katherine</p>
            </div>
            </div>

            <div className="testimonio-card">
            <img src="https://res.cloudinary.com/destinoplus/image/upload/v1743739202/fd78k7elno6w9zl6vecn.jpg" alt="Experiencia" className="imagen-testimonio" />
            <p className="texto-testimonio">
                "La personalización del plan hizo que nuestra experiencia fuera única. La caminata ecológica y la siembra de árboles fueron momentos muy especiales que recordaremos siempre. Las rutas que tienen en la plataforma son increíbles. Además, te ayudan con todo, son súper amables y por WhatsApp puedes preguntar lo que sea, siempre están pendientes de ti"
            </p>
            <div className="usuario-testimonio">
                <img src="https://res.cloudinary.com/destinoplus/image/upload/v1743738646/qrx4i7zmcvfu3d4cugyl.jpg" alt="Carlos y Maria" className="foto-perfil-testimonio" />
                <p className="nombre-testimonio">Carlos y María</p>
            </div>
            </div>

        </div>
    </div>


      {/* CTA Principal */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <a 
            href="https://wa.link/04vkzh" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ width: '70%', textDecoration: 'none' }}
        >
            <button 
            className="feedback-submit-btn" 
            style={{ width: '100%', fontSize: '18px', padding: '15px' }}
            >
            Reserva Tu Aventura Ahora
            </button>
        </a>
    </div>

      {/* CTA Secundario */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', marginBottom: '30px' }}>
        <a 
            href="https://wa.link/g0wp10" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: 'none' }}
        >
            <button style={{ 
            backgroundColor: 'transparent', 
            border: '2px solid #00cd70',
            color: '#00cd70', 
            borderRadius: '8px',
            padding: '12px 20px',
            fontWeight: '600',
            cursor: 'pointer'
            }}>
            Contáctanos para Personalizar Tu Experiencia
            </button>
        </a>
    </div>


      {/* Formulario de Contacto */}
    <div className="feedback-container">
        <div 
            className="feedback-header"
            onClick={() => setFeedbackExpanded(!feedbackExpanded)}
        >
            <MessageSquare className="feedback-icon" />
            <h3>Contáctanos</h3>
        </div>
        
        <div className="feedback-content" style={{ 
            maxHeight: feedbackExpanded ? '500px' : '0',
            opacity: feedbackExpanded ? 1 : 0,
            overflow: 'hidden',
            transition: 'all 0.5s ease'
        }}>
            {!feedbackSubmitted ? (
            <form 
                className="feedback-form" 
                onSubmit={(e) => {
                e.preventDefault();
                const nombre = e.target[0].value;
                const correo = e.target[1].value;
                const telefono = e.target[2].value;
                const mensaje = feedbackText;

                const texto = `Hola, soy ${nombre}. Mi correo es ${correo}, mi número es ${telefono} y me gustaría decirte: ${mensaje}`;
                const url = `https://wa.me/573227879811?text=${encodeURIComponent(texto)}`;

                window.open(url, '_blank');
                setFeedbackSubmitted(true);
                }}
            >
                <input 
                type="text" 
                placeholder="Nombre"
                className="feedback-input" 
                style={{ height: '40px', marginBottom: '10px' }}
                required 
                />
                <input 
                type="email" 
                placeholder="Correo electrónico"
                className="feedback-input" 
                style={{ height: '40px', marginBottom: '10px' }}
                required 
                />
                <input 
                type="tel" 
                placeholder="Número de teléfono"
                className="feedback-input" 
                style={{ height: '40px', marginBottom: '10px' }}
                required 
                />
                <textarea 
                className="feedback-input"
                placeholder="¿En qué podemos ayudarte?"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                required
                ></textarea>
                <button type="submit" className="feedback-submit-btn">
                Enviar
                </button>
            </form>
            ) : (
            <div className="feedback-success">
                ¡Gracias por tu mensaje! Te redirigimos a WhatsApp.
            </div>
            )}
        </div>
    </div>


      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0',
        marginTop: '20px'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <a href="https://wa.link/wuxtpc" style={{ margin: '0 10px', color: '#333', textDecoration: 'none' }}>Política de privacidad</a>
          <a href="https://wa.link/wuxtpc" style={{ margin: '0 10px', color: '#333', textDecoration: 'none' }}>Términos y condiciones</a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '15px' }}>
          <div className="categoria-burbuja">Pago Seguro</div>
          <div className="categoria-burbuja">Satisfacción Garantizada</div>
          <div className="categoria-burbuja">Cancelación Flexible</div>
        </div>
        <p style={{ margin: '0', color: '#666' }}>© 2025 Destiplus. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

// Componente ArrowDown para usar en subtítulo
const ArrowDown = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
);

export default ValidacionPromo;
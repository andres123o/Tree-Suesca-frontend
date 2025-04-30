import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { HandPlatter, Star, MapPin, Loader2, Sparkles } from 'lucide-react';
import '../../../../style/componentes-no-fijos/events/batalla.css';
import VotingModal from '../batalla-Haburguesas/VotingModal'; 
import axios from 'axios';
import NotificationModal from './NotificacionModal';

// --- Función para calcular distancia (Fórmula de Haversine) ---
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en metros
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const API_BASE_URL = "https://tree-suesca-backend-production.up.railway.app/api/v1";

const participants = [
  {
    id: 1,
    name: "La Tropical Smash",
    restaurant: "Terraza",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461759/WhatsApp_Image_2025-04-15_at_9.44.04_AM_oto9bz.jpg",
    visitors: 46,
    price: 16000,
    description: "Pan artesanal, carne de res madurada, queso mozzarella, lechuga romana, mayonesa cítrica y un toque dulce de piña caramelizada.",
    specialIngredient: "Piña caramelizada",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 2,
    name: "Madurita Rebelde",
    restaurant: "Cacique Burguer",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461757/WhatsApp_Image_2025-04-11_at_4.24.15_PM_snn161.jpg",
    visitors: 38,
    price: 16000,
    description: "Una fusión única con carne de cerdo desmechada, queso cheddar, alioli de ajo rostizado y plátano maduro frito en forma de chips.",
    specialIngredient: "Plátano maduro frito",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 3,
    name: "La Explosiva Bacon Jam",
    restaurant: "Arca Rock",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461757/WhatsApp_Image_2025-04-11_at_4.31.51_PM_p8xlds.jpg",
    visitors: 52,
    price: 16000,
    description: "Carne de res en doble medallón, queso americano, cebolla caramelizada y una generosa capa de mermelada de tocineta.",
    specialIngredient: "Mermelada de tocineta",
    votes: 0,
    location: {
      "lat": 5.101144,
      "lng": -73.799512
    }
  },
  {
    id: 4,
    name: "Blue Beast",
    restaurant: "Lo Nuestro",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461756/Coffee_Drinks_Food_banx4d.jpg",
    visitors: 61,
    price: 16000,
    description: "Para paladares osados: carne de cordero, rúgula fresca, cebolla morada crujiente y un potente queso azul que lo cambia todo.",
    specialIngredient: "Queso azul",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 5,
    name: "La Mexa Boom",
    restaurant: "Texas Burguer",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461756/LOGO_-_TEXAS_page-0001_ozhvzn.jpg",
    visitors: 46,
    price: 16000,
    description: "Carne con especias, doble queso, totopos triturados, crema agria y un cremoso y picante guacamole con jalapeño.",
    specialIngredient: "Guacamole con jalapeño",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 6,
    name: "La Beet Queen",
    restaurant: "Crucero",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461755/WhatsApp_Image_2025-04-13_at_5.43.41_PM_uzdwoh.jpg",
    visitors: 38,
    price: 16000,
    description: "Hamburguesa veggie con portobellos grillados, queso de cabra, reducción balsámica y servida en un pan de remolacha que roba miradas.",
    specialIngredient: "Pan de remolacha",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 7,
    name: "Crunch Pork Burger",
    restaurant: "Villa Hamburguesa",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461754/WhatsApp_Image_2025-04-14_at_8.48.49_AM_knawj3.jpg",
    visitors: 52,
    price: 16000,
    description: "Carne mixta (res y cerdo), cebollín, mayonesa de limón y un crocante e irresistible toque de chicharrón crocante.",
    specialIngredient: "Chicharrón crocante",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 8,
    name: "La Samurai Rosa",
    restaurant: "Don Toño",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461754/WhatsApp_Image_2025-04-14_at_8.56.23_AM_lbqbal.jpg",
    visitors: 61,
    price: 16000,
    description: "Inspiración oriental: carne de wagyu, pepino encurtido, mayo sriracha y unos suaves aros de cebolla morada en tempura.",
    specialIngredient: "Aros de cebolla morada en tempura",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 9,
    name: "Verde Letal",
    restaurant: "Palo Santo",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461753/WhatsApp_Image_2025-04-14_at_9.16.35_AM_um1uur.jpg",
    visitors: 46,
    price: 16000,
    description: "Pechuga de pollo grillada, tomate confitado, queso provolone y un intenso pesto de albahaca que le da el alma al bocado.",
    specialIngredient: "Pesto de albahaca",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 10,
    name: "La Vintagemelt",
    restaurant: "Amore Pizza",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461753/LOGO_AMORE_PIZZA_page-0001_ezbtvu.jpg",
    visitors: 38,
    price: 16000,
    description: "Carne sellada en mantequilla, queso suizo, cebolla blanca salteada y unos aromáticos champiñones al vino tinto.",
    specialIngredient: "Champiñones al vino tinto",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 11,
    name: "Golden Yolk",
    restaurant: "La Parrilla de Juancho",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_12.42.09_PM_ughpvt.jpg",
    visitors: 52,
    price: 16000,
    description: "Clásica con sorpresa: carne de res jugosa, cheddar fundido, tocineta ahumada y un brillante huevo pochado encima.",
    specialIngredient: "Huevo pochado",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 12,
    name: "Maracupicante",
    restaurant: "Dorilocos La Roca",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_2.00.32_PM_clg2pu.jpg",
    visitors: 61,
    price: 16000,
    description: "Doble carne, queso pepper jack, vegetales asados y una atrevida salsa de maracuyá picante que te hace sudar.",
    specialIngredient: "Salsa de maracuyá picante",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 13,
    name: "Café & Fuego Burger",
    restaurant: "Cumbamba",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_2.05.28_PM_lwikzf.jpg",
    visitors: 46,
    price: 16000,
    description: "Inspiración dark: pulled pork jugoso, cebolla crispy y una intensa BBQ de café que potencia el sabor de principio a fin.",
    specialIngredient: "Pulled pork en BBQ de café",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  },
  {
    id: 14,
    name: "La Tropical Inferno",
    restaurant: "Monopizza Gourmet",
    image: "https://i.pinimg.com/736x/23/9d/86/239d86c049d72ae9f8e23704fc10c118.jpg",
    logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/LOGO_-_MONOPIZZA2_page-0001_m6ytz5.jpg",
    visitors: 38,
    price: 16000,
    description: "Carne a la parrilla, queso costeño, lechuga fresca, cebolla crocante y el vibrante y exótico chutney de mango con habanero.",
    specialIngredient: "Chutney de mango con habanero",
    votes: 0,
    location: {
      "lat": 5.100817,
      "lng": -73.799823
    }
  }
];

const BurgerProfile = ({ burger }) => {
  const { burgerId } = useParams(); 
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBurgerForVote, setSelectedBurgerForVote] = useState(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [burgerData, setBurgerData] = useState(null)

  // ***** NUEVO ESTADO PARA CONTEO DE VOTOS Y CARGA *****
  const [voteCount, setVoteCount] = useState(null); // null indica que aún no se ha cargado
  const [isLoadingCount, setIsLoadingCount] = useState(true);
  const [hasVotedLocally, setHasVotedLocally] = useState(false); // Para deshabilitar botón (UX)
  const [submitError, setSubmitError] = useState(''); // Para errores al enviar voto
  const [submitSuccess, setSubmitSuccess] = useState(''); // Mensaje éxito al enviar voto
  // ****************************************************

  // ***** Nuevos estados para el modal de notificación *****
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  // ***************************************************************

  // --- Efecto para encontrar y establecer burgerData ---
  useEffect(() => {
    // 'participants' ahora viene del scope exterior (es constante)
    const currentBurger = participants.find(p => p.id.toString() === burgerId);
    setBurgerData(currentBurger); // Establece el objeto encontrado o undefined

    // Resetear estados dependientes cuando cambia la hamburguesa
    setIsLoadingCount(true); // Iniciar carga de votos para la nueva burger
    setVoteCount(null);
    setLocationError('');
    setSubmitError('');
    setSubmitSuccess('');

    // Verificar voto local para la nueva hamburguesa
    if (currentBurger) {
        const votedKey = `voted_burger_${currentBurger.id}`;
        setHasVotedLocally(localStorage.getItem(votedKey) === 'true');
    } else {
        setHasVotedLocally(false); // Si no hay hamburguesa, no se ha votado
    }

  }, [burgerId]);


  useEffect(() => {
    const currentBurger = participants.find(p => p.id.toString() === burgerId);
    setBurgerData(currentBurger);
    // Verificar si ya se votó localmente por esta hamburguesa
    if (currentBurger) {
        const votedKey = `voted_burger_${currentBurger.id}`;
        setHasVotedLocally(localStorage.getItem(votedKey) === 'true');
    }
  }, [burgerId, participants]);

  // --- Efecto para OBTENER CONTEO DE VOTOS con AXIOS ---
  useEffect(() => {
    if (burgerId && burgerData) {
        setIsLoadingCount(true);
        setVoteCount(null);

        const source = axios.CancelToken.source(); // Para cancelar si el componente se desmonta

        axios.get(`${API_BASE_URL}/votes/burger/${burgerId}/count`, {
            cancelToken: source.token // Pasar el token de cancelación
        })
        .then(response => {
            // axios devuelve los datos directamente en response.data
            setVoteCount(response.data.vote_count);
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error("Error fetching vote count:", error);
                // Verificar si es un error 404 (Not Found) u otro
                if (error.response && error.response.status === 404) {
                    setVoteCount(0); // Asumir 0 si la API devuelve 404
                } else {
                    setVoteCount(0); // O manejar como null/error si prefieres
                }
            }
        })
        .finally(() => {
            setIsLoadingCount(false);
        });

        // Función de limpieza para cancelar la solicitud si el componente se desmonta
        return () => {
            source.cancel('Component unmounted, cancelling vote count request.');
        };
    } else {
        setIsLoadingCount(false);
        setVoteCount(null);
    }
  }, [burgerId, burgerData]);
  // ---------------------------------------------------
  
  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  const handleShare = () => {
    // (Misma lógica de compartir que en la respuesta anterior)
    if (navigator.share) {
      navigator.share({
        title: burgerData.name,
        text: `¡Mira esta increíble hamburguesa: ${burgerData.name} de ${burgerData.restaurant}!`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error al compartir:', error));
    } else {
      alert('La función de compartir no está disponible en este navegador.');
    }
  };

  const handleDirections = () => {
    if (burgerData?.location?.lat && burgerData?.location?.lng) {
        const { lat, lng } = burgerData.location;
        // Abrir Google Maps con las coordenadas del restaurante
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        alert("Ubicación del establecimiento no disponible.");
    }
  };

  const handleVote = () => {
    setLocationError(''); // Limpiar errores previos
    setSubmitError('');
    setSubmitSuccess('');
    setLocationError('');
    if (!burgerData || !burgerData.location || typeof burgerData.location.lat !== 'number' || typeof burgerData.location.lng !== 'number') {
      alert("La ubicación de este establecimiento no está configurada correctamente.");
      return;
    }

    if (!navigator.geolocation) {
      alert('La geolocalización no es soportada por tu navegador.');
      return;
    }

    setIsCheckingLocation(true); // Indicar que estamos buscando ubicación

    navigator.geolocation.getCurrentPosition(
      // --- Callback Éxito ---
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const establishmentLat = burgerData.location.lat;
        const establishmentLng = burgerData.location.lng;

        console.log(`Ubicación usuario: ${userLat}, ${userLng}`);
        console.log(`Ubicación establecimiento: ${establishmentLat}, ${establishmentLng}`);

        const distance = getDistanceFromLatLonInMeters(
          userLat, userLng,
          establishmentLat, establishmentLng
        );

        console.log(`Distancia calculada: ${distance.toFixed(2)} metros`);

        const MAX_DISTANCE_METERS = 30; // Límite de distancia

        if (distance <= MAX_DISTANCE_METERS) {
          // ¡Dentro del rango! Abrir el modal
          console.log("Usuario dentro del rango.");
          setSelectedBurgerForVote(burgerData);
          setIsModalOpen(true);
        } else {
          // Fuera de rango
          console.log("Usuario fuera del rango.");
          setLocationError(`Estás a ${distance.toFixed(0)} metros. Debes estar a menos de ${MAX_DISTANCE_METERS} metros para votar.`);
          alert(`Estás demasiado lejos (${distance.toFixed(0)}m). Acércate al establecimiento (menos de ${MAX_DISTANCE_METERS}m) para poder votar.`);
        }
        setIsCheckingLocation(false); // Termina la comprobación
      },
      // --- Callback Error ---
      (error) => {
        setIsCheckingLocation(false); // Termina la comprobación
        let message = "No se pudo obtener tu ubicación. ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message += "Permiso denegado. Por favor, habilita el acceso a la ubicación.";
            break;
          case error.POSITION_UNAVAILABLE:
            message += "Información de ubicación no disponible.";
            break;
          case error.TIMEOUT:
            message += "Se agotó el tiempo de espera para obtener la ubicación.";
            break;
          default:
            message += "Ocurrió un error desconocido.";
            break;
        }
        console.error("Error de Geolocalización:", error);
        setLocationError(message);
        alert(message); // Mostrar error al usuario
      },
      // --- Opciones ---
      {
        enableHighAccuracy: true, // Intenta obtener la ubicación más precisa posible
        timeout: 10000,          // Tiempo máximo de espera (10 segundos)
        maximumAge: 0            // No usar una ubicación en caché, obtener una nueva
      }
    );
  };

  // --- FUNCIÓN ACTUALIZADA PARA ENVIAR VOTO A LA API ---
  const handleActualSubmitVote = async (voteData) => {
    setSubmitError(''); // Limpiar errores estáticos previos
    setSubmitSuccess('');
    setShowNotificationModal(false);

    console.log('Enviando voto a la API:', voteData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/votes/batalla`,
        voteData, // El objeto de datos va directamente como segundo argumento
        {
            headers: {
                'Content-Type': 'application/json',
                // Otros headers si son necesarios
            }
        }
      );

      if (response.status === 201) { // Específicamente 201 Creado
        console.log('Voto creado:', response.data);
        setIsModalOpen(false);
        setSubmitSuccess("¡Gracias por tu voto!");
        setVoteCount(prevCount => (prevCount !== null ? prevCount + 1 : 1));
        const votedKey = `voted_burger_${voteData.burger_id}`;
        localStorage.setItem(votedKey, 'true');
        setHasVotedLocally(true);
      } else {
         // Esto no debería ocurrir normalmente con axios si el status es 2xx,
         // pero lo dejamos por si acaso o si la API devuelve 200 en lugar de 201.
         console.warn("Respuesta inesperada con status 2xx:", response);
         // Tratar como éxito de todas formas?
         setIsModalOpen(false);
         // ... manejar como éxito ...
      }

    } catch (error) {
      console.error('Error al enviar el voto (axios):', error);
      setIsModalOpen(false); // Cierra el modal en cualquier error

      let userMessage = "Ocurrió un error al enviar tu voto. Inténtalo de nuevo."; // Mensaje por defecto

      if (error.response) {
          const detail = error.response.data?.detail;

          if (error.response.status === 409) { // Duplicado
            console.warn('Voto duplicado detectado (409)');
            setNotificationMessage("No puedes votar 2 veces por este participante");
            setShowNotificationModal(true);
            return;
          // ***** CORRECCIÓN: Manejar error 422 con un string *****
          } else if (error.response.status === 422) { // Error de validación
            userMessage = "Hubo un problema con los datos enviados. Por favor, revisa el formulario.";
            console.error("Detalles Validación (422):", detail);
          } else { // Otros errores del servidor
            userMessage = typeof detail === 'string' ? detail : `Error del servidor (${error.response.status}).`;
          }
      } else if (error.request) { // Error de red
          userMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
      } else { // Otros errores
          userMessage = `Ocurrió un error inesperado: ${error.message}`;
      }
      setSubmitError(userMessage); // Asigna el MENSAJE STRING al estado
    }
  };
  // -----------------------------------------------------

  // --- Renderizado ---
  if (!burgerData) {
    return (
      <div className="loading-container" style={{ /* Estilos básicos de carga */ }}>
        <Loader2 className="animate-spin" size={48} />
        <p>Cargando detalles de la hamburguesa...</p>
      </div>
    );
  }

  return (
    <div className="burger-profile-container">
      {/* --- Header (Sin Cambios) --- */}
      <div className="burger-profile-header">
        <button className="burger-profile-back" onClick={handleGoBack} aria-label="Volver">
          <i className="fas fa-arrow-left"></i>
        </button>
        {/* Quitamos el H1 "Detalles" para dar más espacio y evitar redundancia */}
        <button className="burger-profile-share" onClick={handleShare} aria-label="Compartir">
          <i className="fas fa-share-alt"></i>
        </button>
      </div>
  
      {/* --- Hero Image (Sin Cambios) --- */}
      <div className="burger-profile-hero">
        <img src={burgerData.image} alt={burgerData.name} className="burger-profile-image" />
      </div>
  
      {/* --- Área de Contenido REESTRUCTURADA --- */}
      <div className="burger-profile-content">
  
        {/* 1. Información Principal Integrada */}
        <div className="burger-profile-main-info">
          <h2 className="burger-profile-name">{burgerData.name}</h2>
  
          {/* Info Restaurante (más integrada) */}
          <div className="burger-profile-restaurant-info-inline">
            <img src={burgerData.logo} alt={burgerData.restaurant} className="burger-profile-restaurant-logo-inline" />
            <span className="burger-profile-restaurant-name-inline">{burgerData.restaurant}</span>
          </div>

          {/* ++ VOTOS MOVIDO AQUÍ ARRIBA ++ */}
          <div className="burger-profile-vote-count-inline">
            <Star size={16} className="star-icon-inline" />
            <span>
                {isLoadingCount ? '...' : (voteCount ?? 0)} Votos
            </span>
          </div>
  
          {/* Ingrediente Especial (como tag) */}
          {burgerData.specialIngredient && (
            <div className="burger-profile-special-tag">
              <Sparkles size={16} className='sparkle-icon' /> {/* O usa Star */}
              <span>{burgerData.specialIngredient}</span>
            </div>
          )}
  
           {/* Precio y Votos (Juntos para impacto) */}
          <div className="burger-profile-price-votes-area">
               {/* Precio */}
               <p className="burger-profile-card-price prominent"> {/* Clase extra */}
                  <strong>
                      { // Asumiendo que burgerData.price existe y es el precio base (16000)
                      !isNaN(parseFloat(burgerData.price))
                          ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(parseFloat(burgerData.price))
                          : 'Precio no disponible' // Fallback
                      }
                  </strong>
               </p>
          </div>
        </div>
  
        {/* 2. Descripción (Sin la caja contenedora) */}
        <div className="burger-profile-description-section">
          <h3 className="section-title"><i className="fas fa-book-open"></i> Descripción</h3>
          <p className="description-text">
              {/* Resaltado del ingrediente especial (sin cambios) */}
              {burgerData.specialIngredient
               ? burgerData.description.split(burgerData.specialIngredient).map((part, index, array) => (
                  index === array.length - 1 ? part :
                  <React.Fragment key={index}>
                      {part}<span className="burger-profile-highlight">{burgerData.specialIngredient}</span>
                  </React.Fragment>
                  ))
               : burgerData.description
              }
          </p>
        </div>
  
        {/* 3. Mensajes de Error/Éxito (Sin cambios funcionales) */}
        <div className="burger-profile-messages">
          {locationError && <p className="form-message error">{locationError}</p>}
          {submitError && <p className="form-message error">{submitError}</p>}
          {submitSuccess && <p className="form-message success">{submitSuccess}</p>}
        </div>
  
        {/* Espaciador para que el contenido no quede pegado al footer fijo */}
        <div style={{ height: '100px' }}></div>
  
      </div> {/* Fin burger-profile-content */}
  
  
      {/* --- Barra de Acciones Fija (Sin Cambios funcionales, verificar CSS) --- */}
      <div className="burger-profile-actions">
          <button className="burger-profile-btn directions" onClick={handleDirections} disabled={!burgerData?.location?.lat}>
            <MapPin size={18} />
            <span>Cómo llegar</span>
          </button>
          <button
            className="burger-profile-btn vote"
            onClick={handleVote}
            disabled={isCheckingLocation || hasVotedLocally || !burgerData?.location?.lat} // Deshabilitar si no hay ubicación
          >
            {isCheckingLocation ? (
                <><Loader2 className="animate-spin" size={18} /><span>Verificando...</span></>
            ) : hasVotedLocally ? (
                <>✓<span> Votado</span></>
            ) : (
                <><Star size={18} /><span> Votar</span></>
            )}
          </button>
      </div>
  
      {/* --- Modales (Sin Cambios) --- */}
      {selectedBurgerForVote && (
        <VotingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          burger={selectedBurgerForVote}
          onSubmit={handleActualSubmitVote}
        />
      )}
      <NotificationModal
        isOpen={showNotificationModal}
        message={notificationMessage}
        duration={8000}
        onClose={() => setShowNotificationModal(false)}
        type="error"
      />
  
    </div> // Fin burger-profile-container
  );
};

export default BurgerProfile;

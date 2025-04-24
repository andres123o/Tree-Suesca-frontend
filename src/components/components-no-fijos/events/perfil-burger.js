import React, { useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { HandPlatter, Star, MapPin } from 'lucide-react';
import '../../../style/componentes-no-fijos/events/batalla.css';

const BurgerProfile = ({ burger }) => {
  const { burgerId } = useParams(); 
  const navigate = useNavigate(); 
  
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "La Tropical Smash",
      restaurant: "Terraza",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461759/WhatsApp_Image_2025-04-15_at_9.44.04_AM_oto9bz.jpg",
      visitors: 46,
      price: "4.99",
      description: "Pan artesanal, carne de res madurada, queso mozzarella, lechuga romana, mayonesa cítrica y un toque dulce de piña caramelizada.",
      specialIngredient: "Piña caramelizada",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 2,
      name: "Madurita Rebelde",
      restaurant: "Cacique Burguer",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461757/WhatsApp_Image_2025-04-11_at_4.24.15_PM_snn161.jpg",
      visitors: 38,
      price: "5.99",
      description: "Una fusión única con carne de cerdo desmechada, queso cheddar, alioli de ajo rostizado y plátano maduro frito en forma de chips.",
      specialIngredient: "Plátano maduro frito",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 3,
      name: "La Explosiva Bacon Jam",
      restaurant: "Arca Rock",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461757/WhatsApp_Image_2025-04-11_at_4.31.51_PM_p8xlds.jpg",
      visitors: 52,
      price: "6.49",
      description: "Carne de res en doble medallón, queso americano, cebolla caramelizada y una generosa capa de mermelada de tocineta.",
      specialIngredient: "Mermelada de tocineta",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 4,
      name: "Blue Beast",
      restaurant: "Lo Nuestro",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461756/Coffee_Drinks_Food_banx4d.jpg",
      visitors: 61,
      price: "7.29",
      description: "Para paladares osados: carne de cordero, rúgula fresca, cebolla morada crujiente y un potente queso azul que lo cambia todo.",
      specialIngredient: "Queso azul",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 5,
      name: "La Mexa Boom",
      restaurant: "Texas Burguer",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461756/LOGO_-_TEXAS_page-0001_ozhvzn.jpg",
      visitors: 46,
      price: "4.99",
      description: "Carne con especias, doble queso, totopos triturados, crema agria y un cremoso y picante guacamole con jalapeño.",
      specialIngredient: "Guacamole con jalapeño",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 6,
      name: "La Beet Queen",
      restaurant: "Crucero",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461755/WhatsApp_Image_2025-04-13_at_5.43.41_PM_uzdwoh.jpg",
      visitors: 38,
      price: "5.99",
      description: "Hamburguesa veggie con portobellos grillados, queso de cabra, reducción balsámica y servida en un pan de remolacha que roba miradas.",
      specialIngredient: "Pan de remolacha",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 7,
      name: "Crunch Pork Burger",
      restaurant: "Villa Hamburguesa",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461754/WhatsApp_Image_2025-04-14_at_8.48.49_AM_knawj3.jpg",
      visitors: 52,
      price: "6.49",
      description: "Carne mixta (res y cerdo), cebollín, mayonesa de limón y un crocante e irresistible toque de chicharrón crocante.",
      specialIngredient: "Chicharrón crocante",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 8,
      name: "La Samurai Rosa",
      restaurant: "Don Toño",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461754/WhatsApp_Image_2025-04-14_at_8.56.23_AM_lbqbal.jpg",
      visitors: 61,
      price: "7.29",
      description: "Inspiración oriental: carne de wagyu, pepino encurtido, mayo sriracha y unos suaves aros de cebolla morada en tempura.",
      specialIngredient: "Aros de cebolla morada en tempura",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 9,
      name: "Verde Letal",
      restaurant: "Palo Santo",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461753/WhatsApp_Image_2025-04-14_at_9.16.35_AM_um1uur.jpg",
      visitors: 46,
      price: "4.99",
      description: "Pechuga de pollo grillada, tomate confitado, queso provolone y un intenso pesto de albahaca que le da el alma al bocado.",
      specialIngredient: "Pesto de albahaca",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 10,
      name: "La Vintagemelt",
      restaurant: "Amore Pizza",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461753/LOGO_AMORE_PIZZA_page-0001_ezbtvu.jpg",
      visitors: 38,
      price: "5.99",
      description: "Carne sellada en mantequilla, queso suizo, cebolla blanca salteada y unos aromáticos champiñones al vino tinto.",
      specialIngredient: "Champiñones al vino tinto",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 11,
      name: "Golden Yolk",
      restaurant: "La Parrilla de Juancho",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_12.42.09_PM_ughpvt.jpg",
      visitors: 52,
      price: "6.49",
      description: "Clásica con sorpresa: carne de res jugosa, cheddar fundido, tocineta ahumada y un brillante huevo pochado encima.",
      specialIngredient: "Huevo pochado",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 12,
      name: "Maracupicante",
      restaurant: "Dorilocos La Roca",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_2.00.32_PM_clg2pu.jpg",
      visitors: 61,
      price: "7.29",
      description: "Doble carne, queso pepper jack, vegetales asados y una atrevida salsa de maracuyá picante que te hace sudar.",
      specialIngredient: "Salsa de maracuyá picante",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 13,
      name: "Café & Fuego Burger",
      restaurant: "Cumbamba",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/WhatsApp_Image_2025-04-14_at_2.05.28_PM_lwikzf.jpg",
      visitors: 46,
      price: "4.99",
      description: "Inspiración dark: pulled pork jugoso, cebolla crispy y una intensa BBQ de café que potencia el sabor de principio a fin.",
      specialIngredient: "Pulled pork en BBQ de café",
      votes: 0,
      location: "Ingrediente secreto"
    },
    {
      id: 14,
      name: "La Tropical Inferno",
      restaurant: "Monopizza Gourmet",
      image: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745465611/WhatsApp_Image_2025-04-23_at_10.30.39_PM_mmypuh.jpg",
      logo: "https://res.cloudinary.com/dmyq0gr14/image/upload/v1745461752/LOGO_-_MONOPIZZA2_page-0001_m6ytz5.jpg",
      visitors: 38,
      price: "7.29",
      description: "Carne a la parrilla, queso costeño, lechuga fresca, cebolla crocante y el vibrante y exótico chutney de mango con habanero.",
      specialIngredient: "Chutney de mango con habanero",
      votes: 0,
      location: "Ingrediente secreto"
    }
  ]);

  const burgerData = participants.find(p => p.id.toString() === burgerId);

  if (!burgerData) {
    return (
      <div className="burger-profile-container">
        <div className="burger-profile-header">
           {/* Botón volver funcional */}
          <button className="burger-profile-back" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Hamburguesa no encontrada</h1>
        </div>
        <p style={{ textAlign: 'center', padding: '20px' }}>
          Lo sentimos, no pudimos encontrar la hamburguesa con ID: {burgerId}.
        </p>
      </div>
    );
  }

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
  };

  const handleVote = () => {
  };

  return (
    <div className="burger-profile-container">
      {/* Header */}
      <div className="burger-profile-header">
         {/* Botón volver funcional */}
        <button className="burger-profile-back" onClick={handleGoBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Detalles</h1>
         {/* Botón compartir funcional */}
        <button className="burger-profile-share" onClick={handleShare}>
          <i className="fas fa-share-alt"></i>
        </button>
      </div>

      {/* Main Image - Usa datos de burgerData */}
      <div className="burger-profile-hero">
        <img src={burgerData.image} alt={burgerData.name} className="burger-profile-image" />
      </div>

      {/* Content - Usa datos de burgerData */}
      <div className="burger-profile-content">
        {/* Title and Location */}
        <div className="burger-profile-title-section">
          <h2>{burgerData.name}</h2>
          <div className="burger-profile-location">
            <HandPlatter size={16} />
            <span>{burgerData.specialIngredient || 'Ubicación pendiente'}</span>
          </div>
        </div>

        {/* Restaurant Info - Accede a burgerData.restaurant directamente si es string */}
        {/* O si restaurant es un objeto como en tu ejemplo original: burgerData.restaurant.logo */}
        <div className="burger-profile-restaurant">
           <img src={burgerData.logo} alt={burgerData.restaurant} className="burger-profile-restaurant-logo" />
           <span className="burger-profile-restaurant-name">{burgerData.restaurant}</span>
         </div>


        {/* Description */}
        <div className="burger-profile-description">
          <h3>Descripción</h3>
          <p>
             {/* Resaltar ingrediente especial (si existe) */}
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

        {/* Votes */}
        <div className="burger-profile-votes">
           <Star className="star-icon" />
           <span>{burgerData.votes > 0 ? `${burgerData.votes} personas han votado` : 'Sé el primero en votar'}</span>
         </div>


        {/* Action Buttons */}
        <div className="burger-profile-actions">
           <button className="burger-profile-btn directions" onClick={handleDirections}>
             <MapPin />
             Cómo llegar
           </button>
           <button className="burger-profile-btn vote" onClick={handleVote}>
             <Star />
             Votar
           </button>
         </div>
      </div>
    </div>
  );
};

export default BurgerProfile;

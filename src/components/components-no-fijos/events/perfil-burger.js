import React from 'react';
import { MapPin, Star } from 'lucide-react';
import '../../../style/componentes-no-fijos/events/batalla.css';

const BurgerProfile = ({ burger }) => {
  // Mock data - replace with actual data from props
  const burgerData = {
    name: "Double Beef Cheese Burger",
    location: "Ingrediente secreto",
    restaurant: {
      name: "Burger House",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1732811972/utils/qc4wozfzxhgdm6fztb6a.webp"
    },
    image: "https://i.pinimg.com/736x/93/dc/b4/93dcb497dd917ef9374199ff5eea768b.jpg",
    description: "Burger with patty filled with macaroni & cheese and real beef, Stroganoff sauce, topped with onions, served on a soft black sesame burger bun with patty filling.",
    specialIngredient: "macaroni & cheese",
    votes: 234
  };

  return (
    <div className="burger-profile-container">
      {/* Header */}
      <div className="burger-profile-header">
        <button className="burger-profile-back">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Details</h1>
        <button className="burger-profile-share">
          <i className="fas fa-share-alt"></i>
        </button>
      </div>

      {/* Main Image */}
      <div className="burger-profile-hero">
        <img src={burgerData.image} alt={burgerData.name} className="burger-profile-image" />
      </div>

      {/* Content */}
      <div className="burger-profile-content">
        {/* Title and Location */}
        <div className="burger-profile-title-section">
          <h2>{burgerData.name}</h2>
          <div className="burger-profile-location">
            <MapPin size={16} />
            <span>{burgerData.location}</span>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="burger-profile-restaurant">
          <img src={burgerData.restaurant.logo} alt={burgerData.restaurant.name} className="burger-profile-restaurant-logo" />
          <span className="burger-profile-restaurant-name">{burgerData.restaurant.name}</span>
        </div>

        {/* Description */}
        <div className="burger-profile-description">
          <h3>Description</h3>
          <p>
            {burgerData.description.split(burgerData.specialIngredient).map((part, index, array) => (
              index === array.length - 1 ? part : 
              <React.Fragment key={index}>
                {part}<span className="burger-profile-highlight">{burgerData.specialIngredient}</span>
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Votes */}
        <div className="burger-profile-votes">
          <Star className="star-icon" />
          <span>{burgerData.votes} personas han votado</span>
        </div>

        {/* Action Buttons */}
        <div className="burger-profile-actions">
          <button className="burger-profile-btn directions">
            <MapPin />
            Cómo llegar
          </button>
          <button className="burger-profile-btn vote">
            <Star />
            Votar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BurgerProfile;

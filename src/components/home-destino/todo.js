import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarClock,
  UtensilsCrossed,
  Coffee,
  Activity
} from 'lucide-react';

const DiscoverSection = ({destino_id}) => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 2,
      title: "Actividades",
      count: "+8 opciones",
      icon: <Activity size={24} />,
      iconClass: "icon-food",
      bgClass: "bg-icon-food",
      route: '/actividades'
    },
    {
      id: 3,
      title: "Restaurantes",
      count: "+5 lugares",
      icon: <UtensilsCrossed size={24} />,
      iconClass: "icon-food",
      bgClass: "bg-icon-food",
      route: '/restaurantes'
    },
    {
      id: 4,
      title: "Bares y Cafés",
      count: "+5 lugares",
      icon: <Coffee size={24} />,
      iconClass: "icon-coffee",
      bgClass: "bg-icon-coffee",
      route: '/fiesta-amigos'
    },
    {
      id: 1,
      title: "Eventos",
      count: "+4 por suceder",
      icon: <CalendarClock size={24} />,
      iconClass: "icon-sleep",
      bgClass: "bg-icon-sleep",
      route: '/eventos'
    }
  ];

  const handleCategoryClick = (route) => {
    navigate(`${route}/${destino_id}`)
  };

  return (
    <div className="discover-section">
      <div className="discover-grid">
        {categories.map((category) => (
          <button 
            key={category.id} 
            className="category-card"
            onClick={() => handleCategoryClick(category.route)}
          >
            <div className="category-icon-container">
              <div className={`icon-wrapper ${category.bgClass}`}>
                <div className={category.iconClass}>
                  {category.icon}
                </div>
              </div>
              <div className="category-text">
                <span className="category-title">{category.title}</span>
                <span className="category-count">{category.count}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiscoverSection;
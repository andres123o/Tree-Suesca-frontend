import React from 'react';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';
import {
  CalendarClock,
  UtensilsCrossed,
  Coffee,
  Activity,
  ChevronRight
} from 'lucide-react';

const DiscoverSection = ({destino_id}) => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 2,
      title: "Actividades",
      count: "+19 opciones",
      icon: <Activity size={24} />,
      iconClass: "icon-food",
      bgClass: "bg-icon-food",
      route: '/actividades',
      trackingName: 'Activities'
    },
    {
      id: 3,
      title: "Restaurantes",
      count: "+11 lugares",
      icon: <UtensilsCrossed size={24} />,
      iconClass: "icon-food",
      bgClass: "bg-icon-food",
      route: '/restaurantes',
      trackingName: 'Restaurants'
    },
    {
      id: 4,
      title: "Bares y Cafés",
      count: "+6 lugares",
      icon: <Coffee size={24} />,
      iconClass: "icon-coffee",
      bgClass: "bg-icon-coffee",
      route: '/fiesta-amigos',
      trackingName: 'Bars_Cafes'
    },
    {
      id: 1,
      title: "Eventos",
      count: "+1 por suceder",
      icon: <CalendarClock size={24} />,
      iconClass: "icon-sleep",
      bgClass: "bg-icon-sleep",
      route: '/eventos',
      trackingName: 'Events'
    }
  ];

  const handleCategoryClick = (route, trackingName) => {
    // Trackear el clic antes de navegar
    ReactGA.event({
      category: 'Navigation',
      action: 'Category_Click',
      label: trackingName
    });

    navigate(`${route}/${destino_id}`)
  };

  return (
    <div className="discover-section">
      <div className="overview-header">
        <h2 className="overview-title">Todo lo que este lugar tiene para ti</h2>
      </div>
      <div className="discover-grid">
        {categories.map((category) => (
          <button 
            key={category.id} 
            className="category-card"
            onClick={() => handleCategoryClick(category.route, category.trackingName)}
          >
            <div className="category-icon-container">
              <div className={`icon-wrapper ${category.bgClass}`}>
                <div className={category.iconClass}>
                  {category.icon}
                </div>
              </div>
              <div className="category-text">
                <span className="category-title">{category.title}</span>
                <div className="category-count">
                  {category.count}
                </div>
              </div>
            </div>
            <div className="category-action">
              <span>Ver todos</span>
              <ChevronRight size={16} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiscoverSection;
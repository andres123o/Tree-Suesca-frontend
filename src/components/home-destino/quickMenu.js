import { useState, useRef } from 'react';
import { IoFastFoodOutline, IoCalendarOutline } from "react-icons/io5";
import { FaWineBottle, FaPerson } from "react-icons/fa6";
import { MdHotel } from "react-icons/md";
import { TbLockCheck } from "react-icons/tb";
import { FaBus } from "react-icons/fa6";
import { MdLandscape } from "react-icons/md"

const QuickNavMenu = () => {
  const [activeSection, setActiveSection] = useState(null);
  const scrollRef = useRef(null);

  const menuItems = [
    {
      icon: <IoCalendarOutline size={20} />,
      label: 'Eventos',
      section: 'eventos'
    },
    {
      icon: <FaWineBottle size={20} />,
      label: 'Bares',
      section: 'bares'
    },
    {
      icon: <TbLockCheck size={20} />,
      label: 'Tips',
      section: 'tips'
    },
    {
      icon: <FaBus size={20} />,
      label: 'Transporte',
      section: 'transporte'
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="quick-nav-container">
      <div className="quick-nav-scroll" ref={scrollRef}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`quick-nav-item ${activeSection === item.section ? 'active' : ''}`}
            onClick={() => scrollToSection(item.section)}
          >
            <div className="quick-nav-icon">
              {item.icon}
            </div>
            <span className="quick-nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickNavMenu;
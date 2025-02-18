import React, { useEffect, useState } from "react";
import OptimizedImage from "../common/optimzarImg";

const PopularActivities = ({ contenido }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isDesktop) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 2) % contenido.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isDesktop, contenido.length]);

    const MobileCarousel = () => (
        <div className="container-carrusel-actividades-populares">
            <div className="container-carrusel-categorias-actividades">
                {contenido.map((item, index) => (
                    <OptimizedImage
                        key={`${item.img}-${index}`}
                        className="contenido"
                        imageUrl={item.img}
                    />
                ))}
            </div>
        </div>
    );

    const DesktopCarousel = () => (
        <div className="container-carrusel-actividades-populares">
            <div className="container-carrusel-categorias-actividades">
                {[0, 1].map(offset => {
                    const index = (currentIndex + offset) % contenido.length;
                    return (
                        <OptimizedImage
                            key={`${contenido[index].img}-${index}`}
                            className="contenido"
                            imageUrl={contenido[index].img}
                        />
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="container-mas-populares">
            <div className="overview-header">
                <h2 className="overview-title">Experiencias en Tendencia</h2>
            </div>
            {isDesktop ? <DesktopCarousel /> : <MobileCarousel />}
        </div>
    );
};

export default PopularActivities;
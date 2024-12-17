import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();
    
    // Usar useRef para mantener un registro de las posiciones de scroll por ruta
    const scrollPositions = useRef(new Map());

    useEffect(() => {
        // Guardar la posición actual antes de cambiar de ruta
        const saveScrollPosition = () => {
            scrollPositions.current.set(pathname, {
                x: window.scrollX,
                y: window.scrollY
            });
        };

        // Restaurar o manejar la posición del scroll
        const handleScroll = () => {
            // Si es navegación hacia atrás (POP) y tenemos una posición guardada
            if (navigationType === 'POP') {
                const savedPosition = scrollPositions.current.get(pathname);
                if (savedPosition) {
                    // Pequeño timeout para asegurar que el contenido se ha renderizado
                    setTimeout(() => {
                        window.scrollTo(savedPosition.x, savedPosition.y);
                    }, 100);
                }
            } else {
                // Para navegación normal (PUSH/REPLACE), ir al inicio
                window.scrollTo(0, 0);
            }
        };

        // Guardar posición actual cuando el usuario se va de la página
        window.addEventListener('beforeunload', saveScrollPosition);
        
        // Manejar el scroll cuando cambia la ruta
        handleScroll();

        return () => {
            // Limpiar event listener
            window.removeEventListener('beforeunload', saveScrollPosition);
            // Guardar posición al desmontar
            saveScrollPosition();
        };
    }, [pathname, navigationType]);

    return null;
};

export default ScrollToTop;

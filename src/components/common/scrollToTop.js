import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);  // Esto lleva el scroll al inicio de la página
    }, [pathname]);

    return null;
};

export default ScrollToTop;

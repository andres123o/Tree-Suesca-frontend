import React, { useState, useEffect, useRef } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

const SearchBox = ({ placeholder, onSearch, onAISearch }) => {
    const [inputValue, setInputValue] = useState('');
    const [currentPlaceholder, setCurrentPlaceholder] = useState('');
    const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // UseRef para evitar problemas de cierre (closure)
    const suggestionIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const isDeletingRef = useRef(false);

    const suggestions = [
        // Destacan información exclusiva y detallada
        "¿Qué paisajes tienen menos gente en Suesca este fin de semana?",
        "¿Hay alojamientos con jacuzzi por menos de 300.000 en Suesca?",
        "¿Qué restaurantes en Sesquilé tienen los mejores precios?",
        "¿Dónde puedo acampar por menos de 50.000?",
        
        // Combinan actividades + precios concretos
        "¿Dónde puedo hacer escalada en Suesca por menos de 80.000 pesos?",
        "¿Cuál es el mejor mirador en Sesquilé?",
        
        // Enfocadas en reservas directas
        "¿Puedo reservar directo por WhatsApp un hospedaje en Suesca?",
        "¿Qué actividades puedo reservar ahora para este sábado en Sesquilé?",
        
        // Para indecisiones específicas
        "No sé qué hacer en Suesca, tengo 200.000 pesos y quiero algo al aire libre",
        "¿Hay algún evento especial este fin de semana en Suesca?",
        
        // Destacan la experiencia local
        "¿Dónde comen los locales en Suesca que no sea turístico?",
        "¿Cuáles son esos paisajes escondidos que solo conocen los de Sesquilé?"
    ];

    // Actualizar refs cuando cambian los estados
    useEffect(() => {
        suggestionIndexRef.current = currentSuggestionIndex;
        charIndexRef.current = currentCharIndex;
        isDeletingRef.current = isDeleting;
    }, [currentSuggestionIndex, currentCharIndex, isDeleting]);

    // Efecto para la animación de escritura del placeholder
    useEffect(() => {
    // Función para el typing animation
    const animatePlaceholder = () => {
        const currentSuggestion = suggestions[suggestionIndexRef.current];
        
        if (!isDeletingRef.current) {
            // Escribiendo
            const nextCharIndex = charIndexRef.current + 1;
            setCurrentPlaceholder(currentSuggestion.substring(0, nextCharIndex));
            setCurrentCharIndex(nextCharIndex);
            
            // Si terminamos de escribir
            if (nextCharIndex >= currentSuggestion.length) {
                // Pausa antes de empezar a borrar
                setTimeout(() => {
                    setIsDeleting(true);
                }, 1000);
            }
        } else {
            // Borrando
            const nextCharIndex = charIndexRef.current - 5;
            setCurrentPlaceholder(currentSuggestion.substring(0, nextCharIndex));
            setCurrentCharIndex(nextCharIndex);
            
            // Si terminamos de borrar
            if (nextCharIndex <= 0) {
                setIsDeleting(false);
                // Pasar a la siguiente sugerencia
                const nextSuggestionIndex = (suggestionIndexRef.current + 1) % suggestions.length;
                setCurrentSuggestionIndex(nextSuggestionIndex);
            }
        }
        };

        // Establecer el intervalo
        const typingInterval = setInterval(animatePlaceholder, isDeletingRef.current ? 25 : 70);
        
        // Limpiar el intervalo cuando el componente se desmonta
        return () => clearInterval(typingInterval);
    }, []); // Solo se ejecuta una vez al montar

    // Manejar cambios en el input para búsqueda normal
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value);
    };
    
    // Manejar la búsqueda con IA al hacer clic en el botón
    const handleAISearch = () => {
        if (inputValue.trim()) {
            // Trackear el evento de envío de pregunta
            if (window && window.gtag) {
                window.gtag('event', 'question_submit', {
                    event_category: 'Search',
                    event_label: inputValue.trim(),
                    app_name: 'Home busqueda',
                    screen_name: 'SearchBox',
                    timestamp: new Date().toISOString(),
                    interaction_type: 'click',
                    question_content: inputValue.trim()
                });
            }
            
            onAISearch(inputValue);
            // Limpiar el input después de enviar
            setInputValue('');
        }
    };
    
    // Manejar la búsqueda con IA al presionar Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault(); // Prevenir nueva línea en el textarea
            // Trackear el evento de envío de pregunta (misma estructura que handleAISearch)
            if (window && window.gtag) {
                window.gtag('event', 'question_submit', {
                    event_category: 'Search',
                    event_label: inputValue.trim(),
                    app_name: 'Home busqueda',
                    screen_name: 'SearchBox',
                    timestamp: new Date().toISOString(),
                    interaction_type: 'key_press', // Cambiamos esto para diferenciar del clic
                    question_content: inputValue.trim()
                });
            }
            onAISearch(inputValue);
           // Limpiar el input después de enviar
           setInputValue('');
        }
    };

    return (
        <div className="search-box">
            <textarea
                className="search-input"
                value={inputValue}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder={currentPlaceholder}
            />
            <div className="container-btn-arrow">
                <button 
                    className="search-btn" 
                    onClick={handleAISearch}
                >
                    <FaArrowCircleRight className="icon" size={25}/>
                </button>
            </div>
            
        </div>
    );
};

export default SearchBox;
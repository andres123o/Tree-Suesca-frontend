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
    
    // Sugerencias persuasivas mejoradas
    const suggestions = [
        "¿Qué puedo hacer en Suesca este fin de semana?",
        "Quiero un plan romántico en la montaña con jacuzzi, ¿qué opciones tienes?",
        "¿Cómo reservo un hotel sin esperar confirmación por correo?",
        "¿Cuáles son las mejores rutas de senderismo con fotos reales y detalles en Sesquile?",
        "¿Donde puedo ir a tomar un buen coctel en Suesca?",
        "¿Tienes mapas GPS offline para no perderme en la ruta?",
        "Quiero viajar, pero no sé a dónde. ¿Me recomiendas un destino?",
        "Busco un lugar cerca de Bogotá para desconectarme, ¿qué opciones hay?",
        "Quiero un viaje barato, pero con buena experiencia. ¿Qué me sugieres?",
        "¿Cuáles son los planes imperdibles en Sesquile?",
        "Tengo un fin de semana libre, ¿qué puedo hacer sin ir muy lejos?"
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
        const typingInterval = setInterval(animatePlaceholder, isDeletingRef.current ? 15 : 70);
        
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
            onAISearch(inputValue);
            // Limpiar el input después de enviar
            setInputValue('');
        }
    };
    
    // Manejar la búsqueda con IA al presionar Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault(); // Prevenir nueva línea en el textarea
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
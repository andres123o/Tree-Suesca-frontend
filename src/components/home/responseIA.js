import React, { useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";

const AIResponse = ({ response, isLoading, onClose }) => {
    const responseRef = useRef(null);
    
    // Efecto para hacer scroll a la parte inferior del contenedor cuando hay una nueva respuesta
    useEffect(() => {
        if (responseRef.current && !isLoading) {
            responseRef.current.scrollTop = 0;
        }
    }, [response, isLoading]);
    
    if (!response && !isLoading) return null;

    return (
        <div className="ai-response-container">
            <div className="ai-response-header">
                <div className="ai-title">
                    <FaRobot className="robot-icon" />
                    <h4>Asistente Destiplus</h4>
                </div>
                <button className="close-btn" onClick={onClose}>
                    <IoCloseOutline className="close-icon" />
                </button>
            </div>
            <div className="ai-response-content" ref={responseRef}>
                {isLoading ? (
                    <div className="ai-loading">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <p>Buscando las mejores experiencias para ti...</p>
                    </div>
                ) : (
                    <div className="ai-message">
                        {response.split('\n').map((paragraph, index) => (
                            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIResponse;
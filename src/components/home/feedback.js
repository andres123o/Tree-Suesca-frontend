import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { MdOutlineFeedback } from 'react-icons/md';

const FeedbackSection = () => {
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const whatsappNumber = '+573015081517';

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el feedback a tu backend
        const message = `Feedback desde la plataforma Travel Tech: ${feedback}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        setIsSubmitted(true);

        // Simular envío exitoso
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFeedback('');
        }, 3000);
    };

    return (
        <div className="feedback-container">
            <div className="feedback-header" >
                <MdOutlineFeedback className="feedback-icon" />
                <h3>¡Tu opinión nos importa!</h3>
            </div>
            
            <div className='feedback-content'>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="feedback-form">
                        <textarea 
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Cuéntanos qué destinos te gustaría descubrir, o comparte tus sugerencias para mejorar tu experiencia..."
                            required
                            className="feedback-input"
                        />
                        <button type="submit" className="feedback-submit-btn">
                            <FiSend /> Enviar
                        </button>
                    </form>
                ) : (
                    <div className="feedback-success">
                        <span>¡Gracias por tu feedback! Lo tendremos en cuenta para seguir mejorando.</span>
                    </div>
                )}
                
                <div className="feedback-suggestions">
                    <p>¿Qué te gustaría contarnos?</p>
                    <div className="feedback-suggestion-pills">
                        <button 
                            onClick={() => setFeedback("Me gustaría descubrir destinos en...")}
                            className="suggestion-pill"
                        >
                            Nuevos destinos
                        </button>
                        <button 
                            onClick={() => setFeedback("Me encantaría que mejoraran...")}
                            className="suggestion-pill"
                        >
                            Sugerencias
                        </button>
                        <button 
                            onClick={() => setFeedback("Mi experiencia con la plataforma ha sido...")}
                            className="suggestion-pill"
                        >
                            Mi experiencia
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackSection;
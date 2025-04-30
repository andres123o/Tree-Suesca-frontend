import React, { useState, useEffect } from 'react';


const VotingModal = ({ isOpen, onClose, burger, onSubmit }) => {
  // Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [rating, setRating] = useState(''); 
  const [recommendations, setRecommendations] = useState('');
  const [origin, setOrigin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // Resetea el formulario cuando el modal se cierra o cambia la hamburguesa
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setFullName('');
      setRating('');
      setRecommendations('');
      setOrigin('');
      setIsSubmitting(false); // Resetea el estado de envío
    }
  }, [isOpen]);


  // Si no está abierto, no renderizar nada
  if (!isOpen || !burger) {
    return null;
  }

  // Manejador del envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Deshabilita botón al enviar

    const voteData = {
      email: email,
      full_name: fullName,
      rating: parseInt(rating, 10), // Convertir a número entero
      recommendations: recommendations,
      origin: origin,
      burger_name: burger.name,
      restaurant_name: burger.restaurant,
      burger_id: burger.id
      // Aquí NO incluimos GPS/Hora/IP, eso se manejará después
    };

    // Llama a la función onSubmit pasada desde BurgerProfile
    // Idealmente, onSubmit debería devolver una promesa para manejar el fin del envío
    Promise.resolve(onSubmit(voteData))
        .catch((error) => {
            console.error("Error al procesar el voto:", error);
            // Aquí podrías mostrar un mensaje de error al usuario
        })
        .finally(() => {
            // No cerramos automáticamente aquí, dejamos que BurgerProfile lo haga
            // Pero podríamos querer reactivar el botón si onSubmit falla y queremos reintentar
             setIsSubmitting(false); // Reactiva el botón si onSubmit no cierra el modal
        });
  };

  // Maneja el clic en el overlay para cerrar el modal
  const handleOverlayClick = () => {
    if (!isSubmitting) { // No cerrar si se está enviando
        onClose();
    }
  };

  // Evita que el clic dentro del contenido cierre el modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="voting-modal-overlay" onClick={handleOverlayClick}>
      <div className="voting-modal-content" onClick={handleContentClick}>
        {/* Botón de Cierre */}
        <button className="modal-close-btn" onClick={onClose} disabled={isSubmitting}>&times;</button>

        {/* Título del Modal */}
        <h3 className="modal-title">
          Vota por: <span className="modal-burger-name">{burger.name}</span>
          <span className="modal-restaurant-name">de {burger.restaurant}</span>
        </h3>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Campo Email */}
          <div className="modal-form-group">
            <label htmlFor="email" className="modal-label">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Campo Nombre y Apellidos */}
          <div className="modal-form-group">
            <label htmlFor="fullName" className="modal-label">Nombre y Apellidos:</label>
            <input
              type="text"
              id="fullName"
              className="modal-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Campo Calificación */}
          <div className="modal-form-group">
            <label htmlFor="rating" className="modal-label">Calificación (1-10):</label>
            <input
              type="number"
              id="rating"
              className="modal-input"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="10"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Campo Recomendaciones */}
          <div className="modal-form-group">
            <label htmlFor="recommendations" className="modal-label">Recomendaciones (Opcional):</label>
            <textarea
              id="recommendations"
              className="modal-textarea"
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          {/* Campo ¿De dónde nos visitas? */}
          <div className="modal-form-group">
            <label htmlFor="origin" className="modal-label">¿De dónde nos visitas?</label>
            <input
              type="text"
              id="origin"
              className="modal-input"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Botón de Envío */}
          <button
             type="submit"
             className="modal-submit-btn" // Usaremos una clase específica
             disabled={isSubmitting} // Deshabilitar mientras se envía
           >
            {isSubmitting ? 'Enviando...' : 'Enviar Voto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VotingModal;
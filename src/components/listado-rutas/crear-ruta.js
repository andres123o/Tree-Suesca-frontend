import React, { useEffect, useState, useRef } from 'react';
import LocationTracker from '../../service/obtener-ruta';

const CreateRoute = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [rutaId, setRutaId] = useState('');
  const locationTrackerRef = useRef(null);

  useEffect(() => {
    if (!locationTrackerRef.current) {
      locationTrackerRef.current = new LocationTracker();
      locationTrackerRef.current.setLocationUpdateCallback(setLocationHistory);
    }

    const tracker = locationTrackerRef.current;

    if (isTracking) {
      tracker.startTracking();
    } else if (tracker) {
      tracker.stopTracking();
    }

    return () => {
      if (tracker) {
        tracker.stopTracking();
      }
    };
  }, [isTracking]);

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const saveCoordinates = async () => {
    if (!rutaId) {
      alert('Por favor ingrese un ID de ruta');
      return;
    }
    console.log(locationHistory)
    try {
      const response = await fetch('http://localhost:8000/api/v1/guardar-coordenadas/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          ruta_id: parseInt(rutaId),
          cordenadas: locationHistory
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar las coordenadas');
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        alert('Coordenadas guardadas exitosamente');
        setLocationHistory([]);
        setIsTracking(false);
        setRutaId('');
      } else {
        throw new Error(data.message || 'Error al guardar las coordenadas');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error al guardar las coordenadas');
    }
  };
 

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="number"
          value={rutaId}
          onChange={(e) => setRutaId(e.target.value)}
          placeholder="Ingrese ID de la ruta"
          className="p-2 border rounded mr-2"
        />
      </div>

      <button
        onClick={handleToggleTracking}
        className={`p-2 rounded ${
          isTracking ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}
      >
        {isTracking ? 'Detener Tracking' : 'Iniciar Tracking'}
      </button>

      {!isTracking && locationHistory.length > 0 && (
        <button
          onClick={saveCoordinates}
          className="ml-2 p-2 rounded bg-green-500 text-white"
        >
          Guardar Ruta
        </button>
      )}

      {locationHistory.length > 0 && (
        <div className="mt-4">
          <p>Puntos registrados: {locationHistory.length}</p>
        </div>
      )}
    </div>
  );
};

export default CreateRoute;
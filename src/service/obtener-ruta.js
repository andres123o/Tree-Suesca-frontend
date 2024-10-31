// LocationTracker.js
import { loadGoogleMapsApi } from './googleAPI';

class LocationTracker {
  constructor() {
    this.locationHistory = [];
    this.watchID = null;
    this.interval = null;
    this.onLocationUpdate = null;
  }

  setLocationUpdateCallback(callback) {
    this.onLocationUpdate = callback;
  }

  async startTracking() {
    const google = await loadGoogleMapsApi();
    const { Map } = await google.maps.importLibrary('maps');

    if (navigator.geolocation) {
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.locationHistory.push(pos);
          console.log('New position:', pos);
          
          // Llamar al callback si existe
          if (this.onLocationUpdate) {
            this.onLocationUpdate([...this.locationHistory]);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      this.interval = setInterval(() => this.updateLocation(), 120000);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  stopTracking() {
    if (this.watchID !== null) {
      navigator.geolocation.clearWatch(this.watchID);
      this.watchID = null;
    }
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
    
    // Notificar una última vez al detener
    if (this.onLocationUpdate) {
      this.onLocationUpdate([...this.locationHistory]);
    }
  }

  updateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.locationHistory.push(pos);
          console.log('Updated location:', pos);
          
          // Llamar al callback si existe
          if (this.onLocationUpdate) {
            this.onLocationUpdate([...this.locationHistory]);
          }
        },
        (error) => {
          console.error('Error getting updated location:', error);
        }
      );
    }
  }

  getLocationHistory() {
    return [...this.locationHistory];
  }

  clearHistory() {
    this.locationHistory = [];
    if (this.onLocationUpdate) {
      this.onLocationUpdate([]);
    }
  }
}

export default LocationTracker;
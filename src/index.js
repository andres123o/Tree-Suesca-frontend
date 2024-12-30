import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary'; // Importa el componente ErrorBoundary
import ReactGA from 'react-ga4';

// Inicializa GA4 con tu ID de medición
ReactGA.initialize('G-PM724GHGMF', {
  debug: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
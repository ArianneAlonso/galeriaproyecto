import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GaleriaServer from './galeriaserver.jsx';
import GaleriaPublic from './galeriapublic.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GaleriaServer />
    <GaleriaPublic />
  </StrictMode>
);

import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "bootstrap-icons/font/bootstrap-icons.css";
// Importaciones CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    
    </StrictMode>,
  
)

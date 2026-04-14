import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom' // Vaihdettu tästä

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* HashRouterin kanssa et tarvitse basenamea! */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
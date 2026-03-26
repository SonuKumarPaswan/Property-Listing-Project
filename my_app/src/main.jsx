import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PropertiesProvider } from './context/PropertiesContext.jsx'

createRoot(document.getElementById('root')).render(
  <PropertiesProvider>
    <App />
  </PropertiesProvider>,
)

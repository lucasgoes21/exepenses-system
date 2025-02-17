import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import Home from './pages/home/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <Home />
  </BrowserRouter>
)

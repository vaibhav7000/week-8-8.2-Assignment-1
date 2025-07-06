import { createRoot } from 'react-dom/client'
import './index.css'
import AppMain from './AppMain'
import { BrowserRouter } from "react-router"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppMain/>
  </BrowserRouter>
)

// neverever bring the child props value to parent (always props passing should be from parent to child)
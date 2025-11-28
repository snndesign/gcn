// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const script = document.currentScript as HTMLScriptElement
const initialPage = script?.dataset?.page || 'home'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App initialPage={initialPage} />
  </React.StrictMode>
)
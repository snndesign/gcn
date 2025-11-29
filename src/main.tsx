// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// ЧИТАЕМ data-page ИЗ HTML!!!
const rootElement = document.getElementById('root')
const initialPage = rootElement?.dataset.page || 'home'

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <App initialPage={initialPage} />
  </React.StrictMode>
)
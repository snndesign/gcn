// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Определяем, какой HTML-файл нас загрузил
const currentPage = document.documentElement.dataset.page ||
  (location.pathname.includes('private') ? 'private-clients' :
   location.pathname.includes('business') ? 'business-clients' :
   location.pathname.includes('contract') ? 'contract' :
   location.pathname.includes('payment') ? 'payment' :
   location.pathname.includes('wifi') ? 'wifi' :
   location.pathname.includes('quality') ? 'quality' :
   location.pathname.includes('iptv') ? 'iptv' : 'home')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App initialPage={currentPage} />
  </React.StrictMode>
)
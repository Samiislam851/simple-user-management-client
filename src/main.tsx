import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ContextProvider from './providers/ContextProvider.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

    <ContextProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <App />
    </ContextProvider>
  </React.StrictMode>,
)

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BooksProvider } from "./contexts/BooksContext.jsx"
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <BooksProvider>
                <App />
            </BooksProvider>
        </AuthProvider>
    </BrowserRouter>
)
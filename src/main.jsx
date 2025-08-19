import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Routes'
import AuthProvider from './Provider/AuthProvider'
import {  Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <div className='font-urbanist'>
      <RouterProvider router={router}></RouterProvider>

       </div>
     <Toaster></Toaster>

    </AuthProvider>
  </StrictMode>,
)

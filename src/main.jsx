import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import RouteIntegration from './routes/RouteIntegration';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* RouteIntegration es un componente propio, se creo con la finalidad no tocar main, en la integracion con route */}
    <RouteIntegration />
    {/* <App /> */}
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>,
)

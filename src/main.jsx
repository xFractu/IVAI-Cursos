import './index.css';
import Principal from './Principal/Principal.jsx';
import Login from './Login/Login.jsx';
import AdminPrincipal from './RegistroCursos/AdminPrincipal.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {  createBrowserRouter, RouterProvider} from "react-router-dom";
import ConsultaRegistros from './Componentes/ConsultaRegistros.jsx';
import CatalogoCursos from './Componentes/CatalogoCursos.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Principal/>
  },
  {
    path: "/Login",
    element: <Login/>
  },
  {
    path: "/RegistroCurso",
    element: <AdminPrincipal/>
  },
  {
    path: "/ConsultaRegistros",
    element: <ConsultaRegistros/>
  },
  {
    path: "/CatalogoCursos",
    element: <CatalogoCursos/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)

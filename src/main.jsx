import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layouts/Main.jsx';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/SIgnup';
import AuthProvider from './providers/AuthProvider';
import Home from './layouts/Home';
import DashBoard from './pages/Dashboard/Dashboard/DashBoard';
import CreateTeam from './pages/Dashboard/CreateTeam/CreateTeam';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <Signup></Signup>
      }
    ]
  },
  {
    path: 'home',
    element: <Home></Home>,
    children: [
      {
        path: 'dashboard',
        element: <DashBoard></DashBoard>
      },
      {
        path: 'createTeam',
        element: <CreateTeam></CreateTeam>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layouts/Main.jsx';
import Login from './pages/Login/Login';
import AuthProvider from './providers/AuthProvider';
import Home from './layouts/Home';
import CreateTeam from './pages/Dashboard/CreateTeam/CreateTeam';
import MyTeams from './pages/Dashboard/MyTeams/MyTeams';
import UpdateTeam from './pages/Dashboard/UpdateTeam/UpdateTeam';
import TeamInvitations from './pages/Dashboard/TeamInvitations/TeamInvitations';
import CreateTask from './pages/Dashboard/CreateTask/CreateTask';
import MyTasks from './pages/Dashboard/MyTasks/MyTasks';
import MyCreatedTask from './pages/Dashboard/MyCreatedTask/MyCreatedTask';
import PrivateRoutes from './routes/PrivateRoutes';
import {  HelmetProvider } from 'react-helmet-async';
import Profile from './pages/Dashboard/Profile/Profile';
import Signup from './pages/Signup/Signup';
import Aos from 'aos';
import 'aos/dist/aos.css';
import DashBoard from './pages/Dashboard/Dashboard/Dashboard';


Aos.init({
  duration: 1200,
})


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
    element: <PrivateRoutes> <Home></Home></PrivateRoutes>,
    children: [
      {
        path: 'dashboard',
        element: <DashBoard></DashBoard>
      },
      {
        path: 'createTeam',
        element: <CreateTeam></CreateTeam>
      },
      {
        path: 'myTeams',
        element: <MyTeams></MyTeams>
      },
      {
        path: 'updateTeam/:tname',
        element: <UpdateTeam></UpdateTeam>
      },
      {
        path: 'teamInvitations',
        element: <TeamInvitations></TeamInvitations>
      },
      {
        path: 'createTask',
        element: <CreateTask></CreateTask>
      },
      {
        path: 'myTasks',
        element: <MyTasks></MyTasks>
      },
      {
        path: 'myCreatedTask',
        element: <MyCreatedTask></MyCreatedTask>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
)

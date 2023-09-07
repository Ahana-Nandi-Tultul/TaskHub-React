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
import MyTeams from './pages/Dashboard/MyTeams/MyTeams';
import UpdateTeam from './pages/Dashboard/UpdateTeam/UpdateTeam';
import TeamInvitations from './pages/Dashboard/TeamInvitations/TeamInvitations';
import CreateTask from './pages/Dashboard/CreateTask/CreateTask';
import MyTasks from './pages/Dashboard/MyTasks/MyTasks';


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

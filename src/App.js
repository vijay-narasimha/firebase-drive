import React from 'react';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login'
import Profile from './components/Profile';
import Forgotpassword from './components/authentication/Forgotpassword';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/authentication/privateRoute';
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Dashboard from './components/drive/Dashboard';

const router=createBrowserRouter([
  {
path:'/user',
element:<PrivateRoute><Profile/></PrivateRoute>
  },
  {
path:'/',
element:<PrivateRoute><Dashboard/></PrivateRoute>
  },
  {
    path:'/signup',
    element: <Signup/>
  },{
    path:'/login',
    element:<Login/>
  },{
    path:'forgot-password',
    element:<Forgotpassword/>
  },{
    path:'/folder/:folderId',
    element:<PrivateRoute><Dashboard/></PrivateRoute>
  }
])

export default function App() {
  return (
    <AuthProvider>
       <RouterProvider router={router}></RouterProvider>
       
    </AuthProvider>
    
      
  
  )
}



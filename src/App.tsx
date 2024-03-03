

import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Homepage from './pages/Homepage/Homepage.tsx'
import CreateUser from './pages/CreateUser/CreateUser.tsx'
import ShowUsers from './pages/ShowUsers/ShowUsers.tsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx'
import ShowUserDetails from './pages/ShowUserDetails/ShowUserDetails.tsx'
import Login from './pages/Login/Login.tsx'
import RegisterPage from './pages/Register/Register.tsx'
import PrivateRoute from './utils/PrivateRoute/PrivateRoute.tsx'
import RestrictedPublicRoute from './utils/RestrictedPublicRoute/RestrictedPublicRoute.tsx'
function App() {


 




  


  const router = createBrowserRouter([
    {
      path: '/',
      element: <PrivateRoute><Layout /></PrivateRoute>  ,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/',
          element: <Homepage />
        },
        {
          path: '/create-user',
          element: <CreateUser />
        },
        {
          path: '/show-users',
          element: <ShowUsers />
        },
        {
          path: '/user-details/:id',
          element: <ShowUserDetails />
        },



      ]
    },
    {
      path :'/login',
      element: <RestrictedPublicRoute>  <Login/> </RestrictedPublicRoute> 
    },
    {
      path :'/register',
      element:  <RestrictedPublicRoute>  <RegisterPage/> </RestrictedPublicRoute> 
    }

  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App

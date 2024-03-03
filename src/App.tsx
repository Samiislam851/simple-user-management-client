

import './App.css'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Homepage from './pages/Homepage/Homepage.tsx'
import CreateUser from './pages/CreateUser/CreateUser.tsx'
import ShowUsers from './pages/ShowUsers/ShowUsers.tsx'
import axios from 'axios'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx'
import ShowUserDetails from './pages/ShowUserDetails/ShowUserDetails.tsx'
function App() {


  axios.defaults.baseURL = `http://localhost:3000/`




  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage/>,
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
    }


  ])
  return (
 <RouterProvider router={router}/>
  )
}

export default App

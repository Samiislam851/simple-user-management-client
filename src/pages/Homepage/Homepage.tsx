import useAuth from '../../hooks/useAuth'
import './Hompage.css'


const Homepage = ( ) => {

const {user} = useAuth()!

  return (
    <div className='max-w-[54rem]  mx-5    bg-white  pt-5 p-10 rounded-lg border border-white border-opacity-10'>


      <h3 className='md:text-4xl text-2xl font-bold text-center py-5 gradient-text'> Welcome to User-Atlas {user?.displayName}!<br /> the ultimate user management system!</h3>

      <p className='text-gray-500 text-center text-lg'>
        Easily register, log in, create, view, edit, and delete users with our simple REST API built on Express.js. Get started now!
      </p>

    </div>
  )
}

export default Homepage
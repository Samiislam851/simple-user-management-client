import React from 'react'
import './Hompage.css'
type Props = {}

const Homepage = (props: Props) => {
  return (
    <div className='max-w-[50rem] mx-5    bg-white  pt-5 p-10 rounded-lg border border-white border-opacity-10'>


      <h3 className='md:text-4xl text-2xl font-bold text-center py-5 gradient-text'> Welcome to the User Management System!</h3>

      <p className='text-gray-300 text-center'>
        Easily register, log in, create, view, edit, and delete users with our simple REST API built on Express.js. Get started now!
      </p>

    </div>
  )
}

export default Homepage
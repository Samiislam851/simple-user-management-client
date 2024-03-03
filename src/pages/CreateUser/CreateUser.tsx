
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { LuCircleDashed } from 'react-icons/lu';
import { User } from '../../types/types';
import useAuth from '../../hooks/useAuth';

const CreateUser = () => {
  const { register, handleSubmit } = useForm<User>();
  const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);
  const navigate = useNavigate();

  const { logOut } = useAuth()!

  const onSubmit = (data: Partial<User>) => {
    const isEmptyField = Object.values(data).some(value => !value);
    if (isEmptyField) {

      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "No field can be left empty",
        showConfirmButton: false,
        timer: 2000
      });
    } else {

      setIsCreatingUser(true);
      axios.post(`create-user`, data)
        .then(response => {
          console.log('User created successfully:', response.data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created",
            showConfirmButton: false,
            timer: 1500
          });

          setIsCreatingUser(false);
          navigate('/');
        })
        .catch(error => {
          if (error?.response?.status === 400 || error?.response?.status === 401) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${error.response.data.message} please log in again`,
              showConfirmButton: false,
              timer: 1500
            });
            logOut()
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${error.response.data.message}`,
              showConfirmButton: false,
              timer: 1500
            });
          }
          setIsCreatingUser(false);
        });

    }

  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4  py-2 text-white appear-animation text-start">Create User</h1>

      <div className="appear-animation2 p-4 bg-white rounded-lg shadow-md md:px-7 py-5 relative shadow-2xl text-gray-500 md:w-80">
        <p className='pb-3 text-gray-400'>Enter these details about user</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full  flex flex-col items-center">
          <div className='w-full px-5'>
            <input id="email" placeholder="Email" className="px-2 p-1 rounded-lg border w-full " type="email" {...register('email')} />
          </div>
          <div className='w-full px-5'>
            <input id="firstName" placeholder="First Name" className="px-2 p-1 rounded-lg border w-full " type="text" {...register('firstName')} />
          </div >
          <div className='w-full px-5'>
            <input id="lastName" placeholder="Last Name" className="px-2 p-1 rounded-lg border w-full " type="text" {...register('lastName')} />
          </div>
          <div className='w-full px-5'>
            <input id="phoneNumber" placeholder="Phone Number" className="px-2 p-1 rounded-lg border w-full " type="tel" {...register('phoneNumber')} />
          </div>
          <div className='flex justify-center'>
            <button type="submit" className="bg-gradient-to-r to-[#E84545] from-[#903749ee] text-white px-4 py-2 rounded-md mt-4 hover:scale-105 hover:animate-pulse transition-all ease-in-out shadow hover:shadow-lg duration-300">
              {!isCreatingUser ? 'Create User' : <LuCircleDashed className='text-3xl text-gray-100 animate-spin' />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser
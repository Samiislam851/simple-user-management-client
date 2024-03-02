import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { LuCircleDashed } from 'react-icons/lu';
import { FaArrowLeft } from 'react-icons/fa';
interface User {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: number,
    isBlocked: boolean,
    __v: number
}

const ShowUserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { register, handleSubmit, setValue } = useForm<User>();
    const navigate = useNavigate()
    useEffect(() => {
        // Fetch user details from the API
        axios.get<User>(`get-user?userId=${id}`)
            .then(response => {
                console.log('Response data:', response.data);
                setUser(response.data);
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setIsLoading(false)
            });
    }, [id]);



    const onSubmit = (data: Partial<User>) => {

        axios.put(`edit-user?userId=${id}`, data)
            .then(response => {
                console.log('User details updated:', response.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "user updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUser(prevUser => ({ ...prevUser!, ...data }));
            })
            .catch(error => {
                console.error('Error updating user details:', error);
            });
    };




    return (
        <div className="flex flex-col items-center justify-center h-screen text-gray-600">
            <div className="p-4 bg-white rounded-lg shadow-md md:px-7 py-5 relative">
                <button onClick={()=> navigate(-1)} className='absolute top-8 text-gray-500'><FaArrowLeft /></button>
                <h1 className="text-3xl font-semibold mb-4 text-center py-2 ">User Details</h1>
                {isLoading ? (
                    <div>
                        <table className="md:min-w-full  divide-gray-200">
                            <tbody className="bg-white  divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 font-bold animate-pulse">First Name:</td>
                                    <td >
                                        <div className='p-2 rounded-lg border w-40  md:w-52'>
                                            <LuCircleDashed className='text-3xl text-gray-400 animate-spin ' />
                                        </div>

                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold animate-pulse">Last Name:</td>
                                    <td >
                                        <div className='p-2 rounded-lg border w-40  md:w-52'>
                                            <LuCircleDashed className='text-3xl text-gray-400 animate-spin ' />
                                        </div>

                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold animate-pulse">Phone Number:</td>
                                    <td >
                                        <div className='p-2 rounded-lg border w-40  md:w-52'>
                                            <LuCircleDashed className='text-3xl text-gray-400 animate-spin ' />
                                        </div>

                                    </td>
                                </tr>


                            </tbody>
                        </table>
                        <div className='flex justify-center w-full animate-pulse'>
                            <button disabled={true} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 ">Update</button>
                        </div>
                    </div>

                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table className="md:min-w-full  divide-gray-200">
                            <tbody className="bg-white  divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 font-bold">First Name:</td>
                                    <td>
                                        <input className="p-2 rounded-lg border w-40 md:w-auto" type="text" {...register('firstName')} defaultValue={user?.firstName} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold">Last Name:</td>
                                    <td>
                                        <input className="p-2 rounded-lg border w-40 md:w-auto" type="text"
                                         {...register('lastName')} defaultValue={user?.lastName} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold">Phone Number:</td>
                                    <td>
                                        <input className="p-2 rounded-lg border w-40 md:w-auto" type="text" {...register('phoneNumber')} defaultValue={user?.phoneNumber} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='flex justify-center'>
                            <button type="submit" className="bg-gradient-to-r to-blue-400 via-purple-400 from-purple-500 text-white px-4 py-2 rounded-lg mt-4 ">Update</button>
                        </div>

                    </form>
                )}
            </div>
        </div>
    );
}
export default ShowUserDetails
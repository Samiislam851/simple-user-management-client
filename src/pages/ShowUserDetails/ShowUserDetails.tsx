import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { LuCircleDashed } from 'react-icons/lu';
import { FaArrowLeft } from 'react-icons/fa';
import { User } from '../../types/types';
import LoadingUI from './LoadingUI';
import useAuth from '../../hooks/useAuth';


const ShowUserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const {logOut} = useAuth()!
    const { register, handleSubmit } = useForm<User>();
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
                console.error('Error fetching user details:', error);
                setIsLoading(false)
            });
    }, [id]);



    const onSubmit = (data: Partial<User>) => {
        setIsUpdating(true)
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
                setIsUpdating(false)
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


                console.error('Error updating user details:', error);
                setIsUpdating(false)
            });
    };




    return (
        <div className="flex flex-col items-center justify-center h-screen text-gray-600 ">
            <h1 className="text-3xl font-semibold mb-4 text-center py-2 text-white appear-animation1 ">User Details</h1>
            <div className="p-4 bg-white rounded-lg shadow-md md:px-7 py-5 relative shadow-2xl">
                <button title='go back' onClick={() => navigate(-1)} className='appear-animation2 absolute left-[60px] top-[-50px] text-xl text-gray-200'><FaArrowLeft /></button>

                {isLoading ? (
                    <LoadingUI />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table className="md:min-w-full ">
                            <tbody className="bg-white ">
                                <tr>
                                    <td className="px-6 py-4 font-bold">Email:</td>
                                    <td>
                                        <input disabled={true} className="p-2 rounded-lg border w-40 md:w-auto overflow-x-auto " defaultValue={user?.email} />
                                    </td>
                                </tr>
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
                            <button type="submit" className="bg-gradient-to-r to-[#E84545]  from-[#903749ee] text-white px-4 py-2 rounded-md mt-4 hover:scale-110 transition-all ease-in-out shadow-lg hover:shadow">
                                {!isUpdating ? 'Update' :

                                    <LuCircleDashed className='text-3xl text-gray-100 animate-spin ' />


                                }

                            </button>
                        </div>

                    </form>
                )}
            </div>
        </div>
    );
}
export default ShowUserDetails
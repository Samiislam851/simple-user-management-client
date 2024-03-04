import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/types';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { LuCircleDashed } from 'react-icons/lu';

type Props = {

    user: User,
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UserTableData = ({ user, setUsers }: Props) => {


    const { logOut } = useAuth()!

    const navigate = useNavigate();

    const [blockingLoading, setBlockingLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)


    const blockUser = (userId: string) => {
        setBlockingLoading(true)
        axios.put('block-user', { userId: userId })
            .then(() => {

                setUsers((prevUsers) => {

                    const newUsers = prevUsers.map(user => {
                        if (user._id === userId) {
                            return { ...user, isBlocked: true }
                        }
                        return user
                    })
                    return newUsers
                })
                setBlockingLoading(false)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "user blocked",
                    showConfirmButton: false,
                    timer: 1500
                });

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
                setBlockingLoading(false)
                console.error('Error blocking user:', error);
            });

    }
    const unBlockUser = (userId: string) => {
        setBlockingLoading(true)
        axios.put('unblock-user', { userId: userId })
            .then(() => {



                setUsers((prevUsers) => {
                    const newUsers = prevUsers.map(user => {
                        if (user._id === userId) {
                            return { ...user, isBlocked: false }
                        }
                        return user
                    })
                    return newUsers
                })

                setBlockingLoading(false)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "user unblocked",
                    showConfirmButton: false,
                    timer: 1500
                });

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

                setBlockingLoading(true)

            });

    }
    const deleteUser = (userId: string) => {
        setDeleteLoading(true)
        axios.delete(`delete-user?userId=${userId}`)
            .then(() => {



                setUsers((prevUsers) => {
                    const newUsers = prevUsers.filter(user => user._id !== userId)
                    return newUsers
                })

                setDeleteLoading(false)

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "user deleted",
                    showConfirmButton: false,
                    timer: 1500
                });

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
                setDeleteLoading(false)
            });

    }



    const handleViewDetails = (userId: string) => {
        navigate(`/user-details/${userId}`)
    }


    const commonButtonClass = 'text-sm border px-2 py-0  rounded hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out'





    return (
        <tr key={user._id} className="text-gray-600">
            <td className="px-6 py-4 ">
                <div className="h-6 rounded  overflow-x-auto font-medium">{user.firstName} {user.lastName}</div>
            </td>
            <td className="px-6 py-4  h-4 flex md:gap-5  rounded justify-center mx-auto">


                <div className="basis-[1/3]">


                    <button onClick={() => handleViewDetails(user._id)} className={`${commonButtonClass}  text-white  bg-[#51578a] md:px-5 shadow  flex justify-center items-center`} >Details</button>
                </div>


                <div className="basis-[1/3]">
                    {user.isBlocked ?
                        <>
                            <button disabled={blockingLoading} onClick={() => unBlockUser(user._id)} className={`${commonButtonClass}  border-green-300 text-white  bg-green-500 md:w-20 flex justify-center items-center`} >
                                {blockingLoading ?
                                    <LuCircleDashed className='animate-spin my-1' />
                                    :
                                    <span>Unblock</span>

                                }

                            </button>
                        </>
                        :
                        <>
                            <button disabled={blockingLoading} onClick={() => blockUser(user._id)} className={`${commonButtonClass}  text-white bg-[#53354A] flex justify-center items-center  md:hover:bg-red-500 w-16 md:w-20`} >
                                {blockingLoading ?
                                    <LuCircleDashed className='animate-spin my-1' /> :
                                    <span>Block</span>
                                }

                            </button>
                        </>}
                </div>
                <div className="basis-[1/3]"
                >
                    <button
                        disabled={deleteLoading}
                        onClick={() => deleteUser(user._id)}
                        className={`${commonButtonClass}  md:px-5 text-white  bg-[#E84545] flex justify-center items-center`} >
                        {
                            deleteLoading ?
                                <LuCircleDashed className='animate-spin my-1' />
                                :
                                <span>Delete</span>
                        }
                    </button>

                </div>




            </td>

        </tr>
    )
}

export default UserTableData
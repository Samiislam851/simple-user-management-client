import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/types';
import Swal from 'sweetalert2';

type Props = {

    user: User,
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UserTableData = ({ user, setUsers }: Props) => {




    const navigate = useNavigate();




    const blockUser = (userId: string) => {

        axios.put('block-user', { userId: userId })
            .then(response => {



                setUsers((prevUsers) => {
                    const newUsers = prevUsers.map(user => {
                        if (user._id === userId) {
                            return { ...user, isBlocked: true }
                        }
                        return user
                    })
                    return newUsers
                })


                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "user blocked",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log('User blocked successfully:', response.data);
            })
            .catch(error => {

                console.error('Error blocking user:', error);
            });

    }
    const unBlockUser = (userId: string) => {

        axios.put('unblock-user', { userId: userId })
            .then(response => {



                setUsers((prevUsers) => {
                    const newUsers = prevUsers.map(user => {
                        if (user._id === userId) {
                            return { ...user, isBlocked: false }
                        }
                        return user
                    })
                    return newUsers
                })


                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "user unblocked",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log('User unblocked successfully:', response.data);
            })
            .catch(error => {

                console.error('Error blocking user:', error);
            });

    }
    const deleteUser = (userId: string) => {

        axios.delete(`delete-user?userId=${userId}`)
            .then(response => {



                setUsers((prevUsers) => {
                    const newUsers = prevUsers.filter(user => user._id !== userId)
                    return newUsers
                })


                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "user deleted",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch(error => {

                console.error('Error deleting user:', error);
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


                    <button onClick={() => handleViewDetails(user._id)} className={`${commonButtonClass}  text-white  bg-[#51578a] md:px-5 shadow`} >Details</button>
                </div>


                <div className="basis-[1/3]">
                    {user.isBlocked ?
                        <>
                            <button onClick={() => unBlockUser(user._id)} className={`${commonButtonClass}  border-green-300 text-white  bg-green-500 md:w-20`} >Unblock</button>
                        </>
                        :
                        <>
                            <button onClick={() => blockUser(user._id)} className={`${commonButtonClass}  text-white bg-[#53354A]  hover:bg-red-500 w-16 md:w-20`} >Block</button>
                        </>}
                </div>
                <div className="basis-[1/3]"
                ><button
                    onClick={() => deleteUser(user._id)}
                    className={`${commonButtonClass}  md:px-5 text-white  bg-[#E84545]`}
                >Delete</button></div>




            </td>

        </tr>
    )
}

export default UserTableData
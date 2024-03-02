import axios from "axios"
import { useEffect, useState } from "react"
import './ShowUsers.css'
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
type Props = {}

interface User {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: number,
    isBlocked: boolean
}


const ShowUsers = (props: Props) => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        axios.get('get-users')
            .then(res => {
                if (res.status === 200) {
                    setUsers(res.data.users);

                } else {
                    console.log("Request was not successful. Status code:", res.status);
                }
                setLoading(false)
            })
            .catch(error => {
                console.error("An error occurred:", error);
                setLoading(false)
            });

    }, [])


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

        axios.put('delete-user', { userId: userId })
            .then(response => {



                setUsers((prevUsers) => {
                  const newUsers = prevUsers.filter(user => user._id !== userId)
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

    

    const handleViewDetails = (userId: string) => {
        navigate(`/user-details/${userId}`)
    }


    const commonButtonClass = 'text-sm border px-2 py-0  rounded hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out'


    return (
        <div className=" shadow-2xl">

            <div className="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border border-gray-200">
                <table className="md:min-w-[30rem] table-striped  ">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-800 capitalize ">
                                Full Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-800 capitalize text-center">
                                Options
                            </th>

                        </tr>
                    </thead>
                    <tbody className="bg-white table-auto ">
                        {!loading ?

                            <>
                                {users.map(user => (
                                    <tr key={user._id} className="text-gray-600">
                                        <td className="px-6 py-4 ">
                                            <div className="h-4 rounded">{user.firstName} {user.lastName}</div>
                                        </td>
                                        <td className="px-6 py-4  h-4 flex gap-5  rounded justify-center mx-auto">


                                            <div className="basis-[1/3]">


                                                <button onClick={() => handleViewDetails(user._id)} className={`${commonButtonClass} border-blue-400 text-white  bg-blue-500 shadow`} >Details</button>
                                            </div>


                                            <div className="basis-[1/3]">
                                                {user.isBlocked ?
                                                    <>
                                                        <button onClick={() => unBlockUser(user._id)} className={`${commonButtonClass}  border-green-300 text-white  bg-green-500 w-20`} >Unblock</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button onClick={() => blockUser(user._id)} className={`${commonButtonClass}  border-red-300 text-red-400  hover:bg-red-500 w-20`} >Block</button>
                                                    </>}
                                            </div>
                                            <div className="basis-[1/3]"
                                            ><button 
                                            onClick={()=>deleteUser(user._id)}
                                            className={`${commonButtonClass}  border-red-300 text-red-400  hover:bg-red-500`} >Delete</button></div>




                                        </td>

                                    </tr>
                                ))}

                            </>

                            :
                            <>
                                {[1, 2, 3,].map(id => (
                                    <tr key={id} className="animate-pulse">
                                        <td className="px-6 py-4 ">
                                            <div className="h-4 bg-gray-200 rounded "></div>
                                        </td>
                                        <td className="px-6 py-4  flex gap-5 justify-center">
                                            <div className="h-4 bg-gray-200 rounded w-12"></div>
                                            <div className="h-4 bg-gray-200 rounded w-12"></div>
                                            <div className="h-4 bg-gray-200 rounded w-12"></div>

                                        </td>

                                    </tr>
                                ))}

                            </>
                        }

                    </tbody>
                </table>
            </div>
        </div >

    )
}

export default ShowUsers
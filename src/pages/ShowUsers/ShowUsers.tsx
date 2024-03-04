import axios from "axios"
import { useEffect, useState } from "react"
import './ShowUsers.css'

import UserTableData from "../../components/UserTableData/UserTableData"
import { User } from "../../types/types"
import Swal from "sweetalert2"
import useAuth from "../../hooks/useAuth"





const ShowUsers = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { logOut } = useAuth()!

    useEffect(() => {
        setLoading(true)
        axios.get('get-users')
            .then(res => {
                if (res.status === 200) {
                    setUsers(res.data.users);

                } else {
                }
                setLoading(false)
            })
            .catch(error => {
              

                setLoading(false)
                if (error?.response?.status === 400 || error?.response?.status === 401) {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: `${error.response.data.message} please log in again`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    logOut()
                }else{
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: `${error.response.data.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
              


            });

    }, [])




    return (
        <div>
            <h3 className="text-2xl text-start ps-1 pb-2 appear-animation2">All Users</h3>
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
                                        <UserTableData key={user._id} setUsers={setUsers} user={user} />
                                    ))}

                                </>

                                :
                                <>
                                    {[1, 2, 3,4].map(id => (
                                        <tr key={id} className="animate-pulse">
                                            <td className="px-6 py-4 ">
                                                <div className={`h-4 ${id % 2 === 0 ? 'bg-white' : 'bg-gray-300'} rounded w-16`}></div>
                                            </td>
                                            <td className="px-6 py-4  flex gap-5 justify-center">
                                                <div className={`h-4 ${id % 2 === 0 ? 'bg-white' : 'bg-gray-300'} rounded w-16`}></div>
                                                <div className={`h-4 ${id % 2 === 0 ? 'bg-white' : 'bg-gray-300'} rounded w-16`}></div>
                                                <div className={`h-4 ${id % 2 === 0 ? 'bg-white' : 'bg-gray-300'} rounded w-16`}></div>

                                            </td>

                                        </tr>
                                    ))}

                                </>
                            }

                        </tbody>
                    </table>
                </div>
            </div >
        </div>
    )
}

export default ShowUsers
import axios from "axios"
import { useEffect, useState } from "react"
import './ShowUsers.css'

import { useNavigate } from "react-router-dom"
import UserTableData from "../../components/UserTableData/UserTableData"
import { User } from "../../types/types"
type Props = {}




const ShowUsers = (props: Props) => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


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
                                        <UserTableData setUsers={setUsers} user={user} />
                                    ))}

                                </>

                                :
                                <>
                                    {[1, 2, 3,].map(id => (
                                        <tr key={id} className="animate-pulse">
                                            <td className="px-6 py-4 ">
                                                <div className={`h-4 bg-${id % 2 ===0?'white':'gray-200'} rounded w-12`}></div>
                                            </td>
                                            <td className="px-6 py-4  flex gap-5 justify-center">
                                                <div className={`h-4 bg-${id % 2 ===0?'white':'gray-200'} rounded w-12`}></div>
                                                <div className={`h-4 bg-${id % 2 ===0?'white':'gray-200'} rounded w-12`}></div>
                                                <div className={`h-4 bg-${id % 2 ===0?'white':'gray-200'} rounded w-12`}></div>
                                                

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
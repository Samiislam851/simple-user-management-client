import React from 'react'

import { IoMdClose } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { IoHome, IoPeopleOutline, IoPersonAddOutline } from 'react-icons/io5'

type Props = {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({ setSidebarOpen }: Props) => {


    // // console.log(user);
    // const logOutFunc = async () => {
    //     // if (logOut) {

    //     //     await logOut()
    //     // }
    // }



    return (
        <div className="flex flex-col max-w-sm h-screen border-e border-opacity-50  border-gray-500 bg-transparent">
            {/* Top */}
            <div className="flex justify-between px-2 py-2 gap-2 items-center">

                <h3 className='text-gray-100  text-xl font-bold px-9 text-center'>User Atlas</h3>

                <div onClick={() => setSidebarOpen(false)} className='cursor-pointer  md:hidden text-xl pe-2'><IoMdClose /></div>
            </div>

            {/* Middle */}
            <div className="flex-1 overflow-y-auto flex flex-col ">

                <div className="basis-1/2  border-t pt-2 border-gray-500 px-3 border-opacity-50 ">
                    <h4 className='text-sm text-gray-00 -500 font-medium' >Options</h4>

                    <NavLink onClick={() => setSidebarOpen(false)} to='/' className={({ isActive }) =>
                        isActive ? "text-yellow-200" : "text-white"}>

                        <div className='  flex justify-start gap-2  text-base items-center   font-base  pt-2 mt-1'>
                            <div className='border rounded-md p-1 '>
                                <IoHome />
                            </div>
                            <span>Home</span>
                        </div>
                    </NavLink>
                    <NavLink onClick={() => setSidebarOpen(false)} to='/create-user' className={({ isActive }) =>
                        isActive ? "text-yellow-200  " : "text-white"}>

                        <div className=' flex justify-start gap-2  text-base items-center  font-base  pt-2 mt-1'>
                            <div className='border rounded-md p-1 '>
                                <IoPersonAddOutline />
                            </div>
                            <span>Create User</span>
                        </div>
                    </NavLink>
                    <NavLink onClick={() => setSidebarOpen(false)} to='/show-users' className={({ isActive }) =>
                        isActive ? "text-yellow-200  " : "text-white"}>
                        <div className=' flex justify-start gap-2  text-base items-center  font-base  pt-2 mt-1'>
                            <div className='border rounded-md p-1 '>
                                <IoPeopleOutline  />
                            </div>
                            <span>Show Users</span>
                        </div>
                    </NavLink>
                



                </div>



            </div>

            {/* Bottom */}
            {/* <div className="px-2 py-3">
                <div className="flex w-full gap-3 justify-between items-center text-gray-00 shadow-xl bg-white bg-opacity-10 px-2 py-2 rounded-lg border-t border-gray-500 border-opacity-50">

                    <div className='basis-[20%]'>


                        <div
                            style={{ backgroundImage: `url(${user?.photoURL})` }}
                            className="w-14 h-14 bg-cover bg-center rounded-full "
                        >
                    
                        </div>
                    </div>
                    <div className='basis-[60%]'>
                        <h3 className='text-xl font-medium'>{user?.displayName!}</h3>
                        <h4 className='text-sm text-gray-00 -500'>{user?.email}</h4>
                    </div>
                    <button className="text-white basis-[20%]" title='Log Out' onClick={logOutFunc}>
                        <IoIosLogOut className="w-8 h-8 text-red-600" />
                    </button>
                </div>
            </div> */}
        </div>

    )
}

export default SideBar
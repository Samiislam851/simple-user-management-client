import  { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import { RxHamburgerMenu } from 'react-icons/rx'

type Props = {}


const Layout = (props: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)


console.log(sidebarOpen);

    return (
        <div className='relative overflow-hidden text-white'>
            {sidebarOpen && <div className='bg-black bg-opacity-20 absolute backdrop-blur-sm z-50  w-screen h-screen'></div>}
        
            <div onClick={() => setSidebarOpen(true)} className={`md:hidden cursor-pointer text-white font-bold absolute text-xl top-6 right-4 backdrop-blur z-[100] 
        transition-all ease-in-out duration-500  ${sidebarOpen ? 'translate-y-[-500px]' : 'translate-y-0'}
            `}><RxHamburgerMenu /></div>
            <div className='background  flex w-full  relative '>

                <div className={`absolute md:relative  bg-gray-400  bg-opacity-15 backdrop-blur-md z-50 text-gray-200 
                transition-all ease-in-out duration-700 md:basis-[20vw]
                ${sidebarOpen ? 'translate-x-0 md:translate-x-0' : 'translate-x-[-400px] md:translate-x-0 '}
                `}>
                    <Sidebar setSidebarOpen={setSidebarOpen} />
                </div>

                <div className="flex-grow">
                    <div className='h-screen overflow-y-auto overflow-x-hidden flex justify-center items-center backdrop-blur-[3px] px-2 '>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
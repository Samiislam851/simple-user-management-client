
import { LuCircleDashed } from 'react-icons/lu'



const LoadingUI = () => {
  return (
    <div>
    <table className="md:min-w-full  divide-gray-200">
        <tbody className="bg-white  divide-gray-200">
            <tr>
                <td className="px-6 py-4 font-bold animate-pulse">Email:</td>
                <td >
                    <div className='p-2 rounded-lg border w-40  md:w-52'>
                        <LuCircleDashed className='text-3xl text-gray-400 animate-spin ' />
                    </div>

                </td>
            </tr>
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
        <button disabled={true} className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-4 ">
           Update

            </button>
    </div>
</div>
  )
}

export default LoadingUI
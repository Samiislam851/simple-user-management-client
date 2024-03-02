import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="background flex items-center justify-center h-screen">
            <div className="flex flex-col space-y-4 text-center bg-white px-10 md:px-16 py-6 rounded-lg shadow-2xl mx-5">
                <div className="gradient-text w-fit mx-auto text-3xl font-medium">404</div>
                <div className="text-5xl font-medium gradient-text h-fit">Page not found</div>
                <div className="h-fit text-gray-500">Sorry, the page you're looking for isn't available.</div>
                <div className="flex items-center justify-center">
                    <button onClick={()=>navigate(-1)} className="bg-gradient-to-r from-[#E84545] to-[#53354A] px-4 py-1 text-white font-medium rounded-md hover:scale-105 cursor-pointer duration-300">
                      Go back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;

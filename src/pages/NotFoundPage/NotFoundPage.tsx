import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col space-y-4 text-center">
                <div className="text-fuchsia-600 text-3xl font-medium">404</div>
                <div className="text-5xl font-medium gradient-text">Page not found</div>
                <div className="h-fit">Sorry, the page you're looking for isn't available.</div>
                <div className="flex items-center justify-center">
                    <button onClick={()=>navigate(-1)} className="bg-gradient-to-r from-[#E84545] to-[#53354A] px-4 py-1 text-white font-medium rounded-md hover:scale-105 cursor-pointer">
                      Go back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;

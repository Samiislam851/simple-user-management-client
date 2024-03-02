import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col space-y-4 text-center">
                <div className="text-fuchsia-600 text-3xl font-medium">404</div>
                <div className="text-5xl font-medium gradient-text">Page not found</div>
                <div className="h-fit">Sorry, the page you're looking for isn't available.</div>
                <div className="flex items-center justify-center">
                    <div className="bg-fuchsia-600 px-4 py-1 text-white font-medium rounded-lg hover:scale-105 cursor-pointer">
                        Visit Homepage
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;

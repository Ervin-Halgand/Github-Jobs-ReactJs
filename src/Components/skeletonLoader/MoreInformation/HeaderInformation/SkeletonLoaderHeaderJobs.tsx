import React from 'react';
import '../../Card/style.css'

const SkeletonLoaderHeaderJobs = () => {
    return (
        <div className="w-full flex text-md relative flex-wrap md:flex-nowrap">
            <div className="bg-white absolute -top-16 h-16 w-16 img-container sm:h-32 sm:w-32 md:h-60 md:w-60 sm:static rounded-2xl overflow-hidden">
                <div className="object-contain w-full h-full loading"></div>
            </div>
            <div className="lg:ml-10 ml-2 relative flex flex-col">
                <div className="flex items-center">
                    <div className="text-gray-600 loading w-20 h-4"></div>
                    <div className="rounded-full h-2 w-2 bg-gray-300 ml-2" />
                    <div className="ml-2 text-gray-600 loading w-14 h-4"></div>
                </div>
                <h2 className="w-52"><strong className="loading w-full h-8 text-black inline-block md:my-5 my-3 md:text-xl"></strong></h2>
                <div className="loading w-14 h-4"></div>
                <div className="loading w-24 h-4 mt-auto"></div>
            </div>
        </div>
    );
};

export default SkeletonLoaderHeaderJobs;
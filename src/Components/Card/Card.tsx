import React from 'react';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo();

interface card {
    type: string,
    url: string,
    created_at: Date | number,
    company: string,
    location: string
    title: string
    company_logo: string
}

function Card({ title, type, created_at, company, company_logo, location }: card) {
    return (
        <div className="w-full relative bg-gray-100 rounded-lg h-48">
            <div className="absolute -top-5 left-4 -translate-x-0 rounded-md overflow-hidden h-12 w-12 border-black border-3">
                <img className="object-cover w-full h-full" src={company_logo} alt={`logo-${company}`} />
            </div>
            <div className="p-3">
                <div className="mt-5 flex items-center">
                    <div className="text-gray-600">{timeAgo.format(created_at)}</div>
                    <div className="rounded-full h-2 w-2 bg-gray-300 ml-2" />
                    <div className="ml-2 text-gray-600">{type}</div>
                </div>
                <strong className="inline-block my-1 text-lg">{title}</strong>
                <div className="text-gray-600">{company}</div>
                <div className="absolute bottom-2 text-indigo-600">{location.split(',').length > 1 ? `${location.split(',')[0]},Location...` : location}</div>
            </div>
        </div>
    );
}

export default Card;
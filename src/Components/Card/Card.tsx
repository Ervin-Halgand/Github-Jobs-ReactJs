import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import NoLogo from '../../assets/no-logo.png';
import './style.css'

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo();

interface card {
    type: string,
    created_at: Date | number,
    company: string,
    location: string
    title: string
    company_logo: string
}

function Card({ title, type, created_at, company, company_logo, location }: card) {
    return (
        <div className="w-full bg-gray-200 relative rounded-lg h-48 cursor-pointer shadow-sm card">
            <div className="bg-white absolute -top-5 left-4 rounded-md overflow-hidden h-12 w-12 img-container">
                <img className="object-contain w-full h-full" src={company_logo ? company_logo : NoLogo} alt={`logo-${company}`} />
            </div>
            <div className="p-3">
                <div className="mt-5 flex items-center">
                    <div className="text-gray-600">{timeAgo.format(created_at)}</div>
                    <div className="rounded-full h-2 w-2 bg-gray-300 ml-2" />
                    <div className="ml-2 text-gray-600">{type}</div>
                </div>
                <strong className="inline-block my-1 text-md">{title}</strong>
                <div className="text-gray-600">{company}</div>
                <div className="absolute bottom-2 text-indigo-600">{location.split(',').length > 1 ? `${location.split(',')[0]},Location...` : location}</div>
            </div>
        </div>
    );
}

export default Card;
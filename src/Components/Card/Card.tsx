import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import NoLogo from '../../assets/no-logo.png';
import './style.css'
import { Link } from "react-router-dom";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo();

interface card {
    type: string,
    created_at: Date | number,
    company: string,
    location: string
    title: string
    company_logo: string,
    id: number
}

function Card({ title, type, created_at, company, company_logo, location, id }: card) {
    return (
        <Link to={`jobs/${id}`}>
            <div className="w-full h-full bg-gray-200 relative rounded-lg cursor-pointer shadow-sm card">
                <div className="bg-white  rounded-md overflow-hidden absolute -top-5 left-4 h-12 w-12 img-container">
                    <img className="object-contain w-full h-full" src={company_logo ? company_logo : NoLogo} alt={`logo-${company}`} />
                </div>
                <div className="p-3 description h-full">
                    <div className="mt-5 flex items-center">
                        <div className="text-gray-600">{timeAgo.format(created_at)}</div>
                        <div className="rounded-full h-2 w-2 bg-gray-300 ml-2" />
                        <div className="ml-2 text-gray-600">{type}</div>
                    </div>
                    <h3><strong className="text-black inline-block my-1 text-md">{title}</strong></h3>
                    <div className="text-gray-600">{company}</div>
                    <div className="mt-auto text-indigo-600">{location.split(',').length > 1 ? `${location.split(',')[0]},Location...` : location}</div>
                </div>
            </div>
        </Link>
    );
}

export default Card;
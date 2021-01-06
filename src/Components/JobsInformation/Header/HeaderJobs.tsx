import React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import NoLogo from '../../../assets/no-logo.png'
import Button from '../../Buttons/Button';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo();

interface HeaderJobsProps {
    type: string,
    created_at: Date | number,
    company: string,
    location: string
    title: string
    company_logo: string,
    how_to_apply: string
}

const HeaderJobs = ({ title, type, created_at, company, company_logo, location, how_to_apply }: HeaderJobsProps) => {
    const how_to_apply_url = how_to_apply.split('"')[1].replace('"', '')
    return (
        <div className="w-full flex text-md relative flex-wrap md:flex-nowrap">
            <div className="bg-white absolute -top-16 h-16 w-16 img-container sm:h-32 sm:w-32 md:h-60 md:w-60 sm:static rounded-2xl overflow-hidden">
                <img className="object-contain w-full h-full" src={company_logo ? company_logo : NoLogo} alt={`logo-${company}`} />
            </div>
            <div className="lg:ml-10 ml-2 relative">
                <div className="flex items-center ">
                    <div className="text-gray-600">{timeAgo.format(created_at)}</div>
                    <div className="rounded-full h-2 w-2 bg-gray-300 ml-2" />
                    <div className="ml-2 text-gray-600">{type}</div>
                </div>
                <h2><strong className="text-black inline-block md:my-5 my-3 md:text-xl">{title}</strong></h2>
                <div className="text-gray-600">{company}</div>
                <div className="lg:absolute sm:bottom-2 text-indigo-600">{location}</div>
            </div>
            <div className="ml-auto self-center w-full md:w-auto">
                <Button text="Apply now" addClass="p-5 w-full mt-2 md:mt-0 md:w-auto flex justify-center" clicked={() => window.open(how_to_apply_url, "_blank")} />
            </div>
        </div>
    );
};

export default HeaderJobs;
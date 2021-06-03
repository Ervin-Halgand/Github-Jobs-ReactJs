import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useParams, useHistory } from "react-router-dom";
import GithubJobsApi, { ApiResult } from '../API/Api';
import HeaderJobs from '../Components/JobsInformation/Header/HeaderJobs'
import SkeletonLoaderHeaderJobs from '../Components/skeletonLoader/MoreInformation/HeaderInformation/SkeletonLoaderHeaderJobs'
import './style.css'

const JobsInformation = ({ apiGithub }: { apiGithub: GithubJobsApi; }) => {
    const { id }: { id: string } = useParams();
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [job, setjob] = useState<ApiResult>();
    let history = useHistory();

    useEffect(() => {
        apiGithub.getSingleJob(id).then(job => {
            let styleDescription = job.description.split('>');
            styleDescription.forEach((parsedHtmlElement, index) => {
                if (parsedHtmlElement.indexOf(':') > -1 && parsedHtmlElement.length < 30)
                    styleDescription[index - 1] += " class='font-bold my-4' style='color: #4E93A2; text-transform: upperCase;'";
                if (parsedHtmlElement.substring(1, 4) === '<ul' && index >= 2)
                    styleDescription[index - 2] += " class='font-bold my-4' style='color: #4E93A2; text-transform: upperCase;'"

            })
            job.description = styleDescription.join('>').toString();
            setjob(job);

        }).catch((error) => {
            console.error(error);
            history.push("/");
        }).finally(() => setIsLoading(false))
        // eslint-disable-next-line
    }, [apiGithub, id]);
    if (isLoading)
        return (
            <section className="m-1 mt-14 p-4 rounded-xl bg-gray-200 sm:m-8 sm:mt-3">
                <SkeletonLoaderHeaderJobs />
                <div className="my-3 px-2 border-gray-300 border-t-2 h-96 w-full loading">
                </div>
            </section>
        )
    if (job) {
        const { how_to_apply, location, type, created_at, company, company_logo, description, title } = job;
        return (
            <section className="m-1 mt-14 p-4 rounded-xl bg-gray-200 sm:m-8 sm:mt-3">
                <HeaderJobs how_to_apply={how_to_apply} location={location} title={title} type={type} created_at={new Date(created_at)} company={company} company_logo={company_logo} />
                <div className="job--description my-3 px-2 border-gray-300 border-t-2 pt-4">
                    {parse(description)}
                </div>
            </section>
        );
    }
}

export default JobsInformation;
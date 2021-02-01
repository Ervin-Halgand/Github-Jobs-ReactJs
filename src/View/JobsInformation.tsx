import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useParams } from "react-router-dom";
import GithubJobsApi, { ApiResult } from '../API/Api';
import HeaderJobs from '../Components/JobsInformation/Header/HeaderJobs'
import SkeletonLoaderHeaderJobs from '../Components/skeletonLoader/MoreInformation/HeaderInformation/SkeletonLoaderHeaderJobs'
import './style.css'

const JobsInformation = ({ apiGithub }: { apiGithub: GithubJobsApi; }) => {
    const { id }: { id: string } = useParams();
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [job, setjob] = useState<ApiResult>();

    useEffect(() => {
        apiGithub.getSingleJob(id).then(job => {
            let test = job.description.split('>');
            test.forEach((parsedHtmlElement, index) => {
                if (parsedHtmlElement.indexOf(':') > -1 && parsedHtmlElement.length < 30)
                    test[index - 1] += " class='font-bold my-4' style='color: #4E93A2; text-transform: upperCase;'";
                if (parsedHtmlElement.substring(1, 4) === '<ul' && index >= 2)
                    test[index - 2] += " class='font-bold my-4' style='color: #4E93A2; text-transform: upperCase;'"

            })
            job.description = test.join('>').toString();
            setjob(job);

        }).catch(() => {
            window.location.assign('/');
        }).finally(() => setIsLoading(false))

    }, [id, apiGithub]);
    if (isLoading)
        return (
            <section className="m-1 mt-14 p-4 rounded-xl bg-gray-200 sm:m-8 sm:mt-3">
                <SkeletonLoaderHeaderJobs />
                <div className="my-3 px-2 border-gray-300 border-t-2 h-96 w-full loading">
                </div>
            </section>
        )

    if (job)
        return (
            <section className="m-1 mt-14 p-4 rounded-xl bg-gray-200 sm:m-8 sm:mt-3">
                <HeaderJobs how_to_apply={job.how_to_apply} location={job.location} title={job.title} type={job.type} created_at={new Date(job.created_at)} company={job.company} company_logo={job.company_logo} />
                <div className="my-3 px-2 border-gray-300 border-t-2 pt-4">
                    {parse(job.description)}
                </div>
            </section>
        );
}

export default JobsInformation;
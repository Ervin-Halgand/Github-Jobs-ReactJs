import GithubJobsApi, { ApiResult } from '../API/Api';
import CardLoader from '../Components/skeletonLoader/Card/CardLoader'
import Card from '../Components/Card/Card'

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LandingManager, searchQueryToggle } from '../Store/Reducer/LandingPage'

interface LandingPageProps {
    apiGithub: GithubJobsApi
}

const LandingPage = ({ apiGithub }: LandingPageProps) => {
    const dataManager = useSelector(LandingManager);
    const searchFromHeader = useSelector(searchQueryToggle);
    const [page, setPage] = useState(1);
    const [jobs, setJobs] = useState<ApiResult[]>([]);
    const [initialLoading, setInitialLoading] = useState<Boolean>(true);
    const [loading, setLoading] = useState<Boolean>(false);
    const [reset, setReset] = useState<Boolean>(false);
    const [error, setError] = useState<any>(null);
    const [lenght, setLenght] = useState<Boolean>(false);
    const fetchData = async (load: Function, newSearch: Boolean) => {
        try {
            if (error != null)
                setError(null);
            load(true);
            let result: ApiResult[];
            if (dataManager.isLastActionQuery)
                result = await apiGithub.getArgumentsJobs(dataManager.filterTitle, dataManager.filterLocation, dataManager.filterType, page).finally(() => load(false));
            else
                result = await apiGithub.getArgumentsJobs('', '', false, page).finally(() => load(false));
            result.sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            if (!newSearch)
                setJobs(oldArray => [...oldArray, ...result]);
            else
                setJobs(result);

            setLenght(result.length < apiGithub.requestMaxItemsLength);
        }
        catch (err) {
            setError(err);
            console.error(err)
        }
    }
    useEffect(() => {
        if (searchFromHeader === 0)
            return;
        setPage(1);
        if (page === 1) {
            fetchData(setInitialLoading, true);
            return;
        }
        setReset(true);
        console.log('new');
        // eslint-disable-next-line
    }, [searchFromHeader]
    )
    useEffect(() => {
        console.log('useEffect');
        if (reset === true) {
            fetchData(setInitialLoading, true);
            setReset(false);
            return;
        }
        async function awaitData() {
            await fetchData(setLoading, false);
            if (initialLoading)
                setInitialLoading(false);
        }
        awaitData();
        // eslint-disable-next-line
    }, [page])
    if (error)
        return <div className="flex flex-col items-center justify-start pt-20 sm:pt-9 text-gray-600 min-h-screen" style={{ backgroundColor: "#fcf7f2" }}>
            <h2 className="mb-7 text-xl">An Error occured please reload</h2>
            <button disabled={loading === true} onClick={() => { fetchData(setInitialLoading, true); setReset(true); }} className="bg-red-500 p-3 px-14 mb-4 focus:outline-none hover:bg-red-700 rounded-xl text-white transition-colors duration-300">Reload</button></div>
    if (initialLoading) {
        let loaderComponents = [];
        for (let i = 0; i < 16; i++) {
            loaderComponents.push(<CardLoader key={i} />);
        }
        return (
            <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#fcf7f2" }}>
                <section className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-10 my-20 sm:my-8">
                    {loaderComponents}
                </section>
                {!lenght && <button disabled={loading === true} onClick={() => setPage(page + 1)} className="bg-indigo-500 p-3 mb-4 w-36 self-center focus:outline-none hover:bg-indigo-700 rounded-xl text-white transition-colors duration-300 "> {loading ? "Loading..." : "Load more"}</button>}
            </div>
        )
    }
    if (jobs.length < 1)
        return <div className="flex justify-center pt-24 sm:pt-12 text-4xl text-gray-600 min-h-screen" style={{ backgroundColor: "#fcf7f2" }}> <div>No results</div></div>
    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#fcf7f2" }}>
            <section className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-10 my-20 sm:my-8">
                {jobs.map(({ id, location, title, created_at, company, company_logo, type }, i) =>
                    <Card key={i} id={id} location={location} title={title} type={type} created_at={new Date(created_at)} company={company} company_logo={company_logo} />
                )}
            </section>
            {!lenght && <button disabled={loading === true} onClick={() => setPage(page + 1)} className="flex justify-center items-center bg-indigo-500 p-3 mb-4 w-36 self-center focus:outline-none hover:bg-indigo-700 rounded-xl text-white transition-colors duration-300 ">{loading ? "Loading" : "Load more"}
                {loading ? <svg width="20" height="20" fill="currentColor" className="ml-6 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                    </path>
                </svg> : ''}
            </button>}
        </div>
    );
}

export default LandingPage;
import { ApiResult } from '../API/Api';
import CardLoader from '../Components/skeletonLoader/Card/CardLoader'
import Card from '../Components/Card/Card'

interface LandingPageProps {
    jobs: ApiResult[],
    loadMore: Function,
    initialLoading: Boolean,
    loading: Boolean,
    noMoreItems: Boolean,
    page: number,
    error: any,
    handleErrorReload: Function
}

const LandingPage = ({handleErrorReload, error, jobs, loadMore, initialLoading, loading, noMoreItems, page }: LandingPageProps) => {
    var loaderComponents = [];
    for (var i = 0; i < 16; i++) {
        loaderComponents.push(<CardLoader key={i} />);
    }
    if (error)
    return <div className="flex flex-col items-center justify-start pt-20 sm:pt-9 text-gray-600 min-h-screen" style={{ backgroundColor: "#fcf7f2" }}>
        <h2 className="mb-7 text-xl">An Error occured please reload</h2>
    <button disabled={loading === true} onClick={() => handleErrorReload()} className="bg-red-500 p-3 px-14 mb-4 focus:outline-none hover:bg-red-700 rounded-xl text-white transition-colors duration-300">Reload</button></div>
    if (initialLoading)
        return (
            <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#fcf7f2" }}>
                <section className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-10 my-20 sm:my-8">
                    {loaderComponents}
                </section>
                {!noMoreItems && <button disabled={loading === true} onClick={() => loadMore(page + 1)} className="bg-indigo-500 p-3 mb-4 w-36 self-center focus:outline-none hover:bg-indigo-700 rounded-xl text-white transition-colors duration-300 "> {loading ? "Loading..." : "Load more"}</button>}
            </div>
        )
    if (jobs.length < 1)
        return <div className="flex justify-center pt-24 sm:pt-12 text-4xl text-gray-600 min-h-screen" style={{ backgroundColor: "#fcf7f2" }}> <div>No results</div></div>
    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#fcf7f2" }}>
            <section className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-10 my-20 sm:my-8">
                {jobs.map(({ id, location, title, created_at, company, company_logo, type }) =>
                    <Card key={id}id={id} location={location} title={title} type={type} created_at={new Date(created_at)} company={company} company_logo={company_logo} />
                )}
            </section>
            {!noMoreItems && <button disabled={loading === true} onClick={() => loadMore(page + 1)} className="bg-indigo-500 p-3 mb-4 w-36 self-center focus:outline-none hover:bg-indigo-700 rounded-xl text-white transition-colors duration-300 "> {loading ? "Loading..." : "Load more"}</button>}
        </div>
    );
}

export default LandingPage;
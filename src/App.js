import React, { useEffect, useState } from 'react'
import GithubJobsApi from './API/Api';
import Header from './Components/Header/Header'
import LandingPage from './View/LandingPage'
import JobsInformation from './View/JobsInformation'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [lenght, setLenght] = useState(1);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState(false);
  const [reset, setReset] = useState(false);
  const [error, setError] = useState(null);
  const githubAPI = new GithubJobsApi();

  const fetchData = async (load, newSearch) => {
    try {
      if (error != null)
        setError(null);
      load(true);
      const result = await githubAPI.getArgumentsJobs(filterTitle, filterLocation, filterType, page).finally(() => load(false));
      result.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      if (!newSearch)
        setJobs(oldArray => [...oldArray, ...result]);
      else
        setJobs(result);
      setLenght(result.length < githubAPI.requestMaxItemsLength);
    }
    catch (err) {
      setError(err);
      console.error(err)
    }
  }

  const SearchAction = () => {
    setPage(1);
    if (page === 1) {
      fetchData(setInitialLoading, true);
      return;
    }
    setReset(true);
  }
  useEffect(async () => {
    if (reset === true) {
      await fetchData(setInitialLoading, true);
      setReset(false);
      return;
    }
    await fetchData(setLoading, false);
    if (initialLoading)
      setInitialLoading(false);
  }, [page])

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header titleValue={filterTitle} locationValue={filterLocation} SearchActionhandler={SearchAction} titleHandler={setFilterTitle} locationHandler={setFilterLocation} typeHandler={setFilterType} />
            <LandingPage handleErrorReload={SearchAction} error={error} jobs={jobs} loadMore={setPage} page={page} initialLoading={initialLoading} loading={loading} noMoreItems={lenght} />
          </Route>
          <Route exact path="/jobs/:id">
            <Header titleValue={filterTitle} locationValue={filterLocation} SearchActionhandler={SearchAction} titleHandler={setFilterTitle} locationHandler={setFilterLocation} typeHandler={setFilterType} />
            <JobsInformation apiGithub={githubAPI} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

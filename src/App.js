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

  const githubAPI = new GithubJobsApi();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <LandingPage apiGithub={githubAPI} />
        </Route>
        <Route exact path="/jobs/:id">
          <Header />
          <JobsInformation apiGithub={githubAPI} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

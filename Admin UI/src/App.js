import React, { useState } from 'react';
import Container from './components/ScenarioBuilder';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/registration/SignIn';
import Grid from '@material-ui/core/Grid';
import ScenarioBuilder from './components/ScenarioBuilder';
import MediaCard from './components/dashboard/ScenarioCard';
import CustomNodeFlow from './components/conversation/ConversationBuilder';

function App() {
  const [page, setPage] = useState();
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/conversation'>
            <ScenarioBuilder />
          </Route>
          {/* <Route path=''>
            <div>Home</div>
          </Route> */}
          <Route path='/history'>
            <div>history</div>
          </Route>
          <Route path='/dashboard'>
            {/* <MediaCard /> */}
            <CustomNodeFlow />
          </Route>
          <Route path='/login'>
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

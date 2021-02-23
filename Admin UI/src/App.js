import React, { useState } from 'react';
import Container from './components/Container';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/registration/SignIn';
import Grid from '@material-ui/core/Grid';

const pages = ['conversation', 'history', 'login', 'dashboard'];

function App() {
  const [page, setPage] = useState();
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/conversation'>
            <div>conversation</div>
          </Route>
          <Route path=''>
            <div>Home</div>
          </Route>
          <Route path='/history'>
            <div>history</div>
          </Route>
          <Route path='/dashboard'>
            <div>dashboard</div>
          </Route>
          <Route path='/login'>
            <div>login</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

{
  /* <SignIn /> */
}
{
  /* <Container page={pages[2]} /> */
}

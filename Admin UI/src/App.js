import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/header/Header';
import SignIn from './components/registration/SignIn';
import ScenarioBuilder from './components/ScenarioBuilder';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Router>
      <div>
        <Header/>
        <Route path='/'>
          {userInfo ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
        </Route>
        <Route path='/conversation'>
          <ScenarioBuilder />
        </Route>
        <Route path='/history'>
          <div>history</div>
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/login'>
          <SignIn />
        </Route>
      </div>
    </Router>
  );
}

export default App;

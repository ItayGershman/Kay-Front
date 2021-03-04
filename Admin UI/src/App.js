import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/header/Header';
// import SignIn from './components/registration/SignIn';
import Registration from './components/registration/Registration';
// import Register from './components/registration/Register';
import Dashboard from './components/dashboard/Dashboard';
import History from './components/history/History';
import ConversationBuilder from './components/conversation/ConversationBuilder';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Router>
      <div>
        <Header />
        <Route path='/'>
          {userInfo ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
        </Route>
        <Route path='/history'>
          <History />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/login'>
          <Registration />
        </Route>
        <Route path='/register'>
          <Registration />
        </Route>
        <Route path='/conversation'>
          <ConversationBuilder />
        </Route>
      </div>
    </Router>
  );
}

export default App;

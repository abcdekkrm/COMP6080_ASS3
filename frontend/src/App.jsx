import React from 'react';
import './App.css';
import Landing from './Screens/Landing';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Login from './Screens/Login';
import Account from './Screens/Account';
import CreateListing from './Screens/CreateListing';

function App () {
  <Switch>
    <Route exact path="/" element={Landing} />
    <Route exact path="/" element={Login} />
    <Route exact path="/Account" element={Account} />
    <Route exact path="/Create-Listing" element={CreateListing} />
  </Switch>;

  const route = window.location.pathname;

  if (route === '/' || route === '/landing') {
    return <Landing />;
  }
  if (route === '/' || route === '/Login') {
    return <Login />;
  }
  if (route === '/Account') {
    return <Account />;
  }
  if (route === '/Create-Listing') {
    return <CreateListing />;
  }
}

export default App;

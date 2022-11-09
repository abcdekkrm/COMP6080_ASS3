import React from 'react';
import './App.css';
import Landing from './Screens/Landing';
import Nav from './Components/Nav'
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Login from './Screens/Login';
import Account from './Screens/Account';
import CreateListing from './Screens/CreateListing';
import Signup from './Screens/Signup';
import EditListing from './Screens/EditListing';
import DeleteListing from './Components/DeleteListing';

function App () {
  <Switch>
    <Route exact path="/" element={Landing} />
    <Route exact path="/Login" element={Login} />
    <Route exact path="/Register" element={Signup} />
    <Route exact path="/Landing" element={Landing} />
    <Route exact path="/Account" element={Account} />
    <Route exact path="/Create-Listing" element={CreateListing} />
    <Route exact path="/User-Listings" element={Account} />
    <Route exact path="/Edit-Listing" element={EditListing} />
    <Route exact path="/Edit-Listing" element={DeleteListing} />
  </Switch>;

  const route = window.location.pathname;

  if (route === '/' || route === '/Landing') {
    return <Landing />;
  }
  if (route === '/Login') {
    return (
      <>
      <Nav />
      <Login />
      </>
    );
  }
  if (route === '/Register') {
    return (
      <>
      <Nav />
      <Signup />
      </>
    );
  }
  if (route === '/Account') {
    return <Account />;
  }
  if (route === '/Create-Listing') {
    return <CreateListing />;
  }
  if (route === '/Edit-Listing') {
    return <EditListing />;
  }
  if (route === '/Delete-Listing') {
    return (
      <>
      <Nav />
      <DeleteListing />
      </>
    );
  }
  if (route === '/User-Listings') {
    return <Account />;
  }
  if (route === '/User-Bookings') {
    return <Account />;
  }
}

export default App;

import React from 'react';
import './App.css';
import Landing from './Screens/Landing';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Login from './Screens/Login';


<<<<<<< HEAD
function App() {

  <Switch>
    <Route exact path="/" element={Landing} />
    <Route exact path="/" element={Login} />
  </Switch>;

  const route = window.location.pathname;

  if (route === "/" || route === "/landing") {
    return <Landing />;
  }
  if (route === "/" || route === "/Login") {
    return <Login />;
  }

=======
function App () {
  return <></>;
>>>>>>> update-a30fb54d2e8e2010188e717e84105d2b6aaad044
}

export default App;

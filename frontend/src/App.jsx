import React from 'react';
import './App.css';
import Landing from './Screens/Landing';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Login from './Screens/Login';


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

}

export default App;

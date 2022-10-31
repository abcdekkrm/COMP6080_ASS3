import './App.css';
import Landing from './Screens/Landing';
import { BrowserRouter as Switch, Route } from "react-router-dom";


function App() {

  <Switch>
    <Route exact path="/" element={Landing} />
  </Switch>;

  const route = window.location.pathname;

  if (route === "/" || route === "/landing") {
    return <Landing />;
  }

}

export default App;

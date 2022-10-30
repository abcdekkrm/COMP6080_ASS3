import './App.css';
import Nav from './Nav';
import Search from './Search';
import {
  createMuiTheme,
} from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#',
//     },
//     secondary: {
//       main: '#',
//     },
//   },
// });

function App() {
  return (
    <>
      <Nav/>
      <Search/>
    </>

  )
}

export default App;

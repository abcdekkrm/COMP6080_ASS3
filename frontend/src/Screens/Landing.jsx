import React from 'react';
import * as ReactDOM from 'react-dom';
import Nav from '../Components/Nav';

function Landing () {
  return (
   <>
    <Nav/>
   </>
  );
}

ReactDOM.render(<Landing />, document.querySelector('#root'));

export default Landing;

import { TextField } from '@material-ui/core';
import React from 'react';

const loginStyle = {
    display: 'block',
    height: '500%',
    width: '30%',
    position: 'absolute',
    left: '35%',
    top: '300%',
    'z-index': '1000',
    padding: '1vw',
    border: '0.1vw solid rgb(182, 182, 182)',
};

const Login = ({closePopup }) => {
  return (
    <div className="popup-container" style={loginStyle}>
     <div className="popup-body">
      <button onClick={closePopup}>&times;</button>
      <h1 style={{color:"black"}}>Welcome</h1>
      <TextField type="text" id="email" placeholder="Enter your email"/><br/>
      <TextField type="password" id="password" placeholder="Enter your password"/><br/>
      <button>Log in</button>
      <p style={{color:"black"}}>Don't have an account?</p>
      <button>Sign up</button>
     </div>
    </div>
  );
};

export default Login;
import {
  TextField,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import Config from '../config.json';
import Signup from './Signup'
import PropTypes from 'prop-types';
import Landing from './Landing';

const Login = ({ closeLoginPopup }) => {
  const [signupOpen, setSignupOpen] = useState(false);

  const loginStyle = {
    display: 'block',
    height: '500%',
    width: '30%',
    background: 'white',
    position: 'absolute',
    left: '35%',
    top: '300%',
    zIndex: '1000',
    padding: '1vw',
    border: '0.1vw solid rgb(182, 182, 182)',
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  function handleLoginSubmit () {
    const payload = JSON.stringify({
      email,
      password
    });

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/user/auth/login`, request)
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('password', password);
            localStorage.setItem('email', email);
            localStorage.setItem('logged', true);
            ReactDOM.render(<Landing />, document.querySelector('#root'));
          })
        } else {
          res.json().then((data) => {
            console.log(data.error);
          });
        }
      });
  }

  const isLogged = localStorage.getItem('logged');
  if (isLogged) {
    return null;
  }

  return (
    <div className="popup-container" id="login-popup" style={loginStyle}>
     <div className="popup-body">
      <Button onClick={closeLoginPopup}>&times;</Button>
      <h1 style={{ color: 'black' }}>Welcome</h1>
      <TextField
        type="text"
        id="email"
        placeholder="Enter your email"
        onChange={handleEmail}
        value={email}
      />
      <br/>
      <TextField
        type="password"
        id="password"
        placeholder="Enter your password"
        onChange={handlePassword}
        value={password}
      />
      <br/>
      <Button onClick={() => { handleLoginSubmit(); }}>Log in</Button>
      <p style={{ color: 'black' }}>Don&apos;t have an account?</p>
      <Button onClick={() => setSignupOpen(true)}>Sign up</Button>
      {signupOpen ? <Signup closeSignupPopup={() => setSignupOpen(false)} /> : null}
     </div>
    </div>
  );
};

Login.propTypes = {
  closeLoginPopup: PropTypes.func
};

export default Login;

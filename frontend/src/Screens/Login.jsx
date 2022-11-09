import {
  TextField,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import Config from '../config.json';
import PropTypes from 'prop-types';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const loginStyle = {
    display: 'block',
    height: '100%',
    width: '100%',
    background: 'white',
    position: 'absolute',
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

  function handleLoginSubmit (e) {
    e.preventDefault();

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
            window.location.href = '/Landing'
          })
        } else {
          res.json().then((data) => {
            setErrorMessage(data.error)
            console.log(data.error);
          });
        }
      });
  }

  return (
    <>
    <form onSubmit={handleLoginSubmit} style={loginStyle}>
    {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
     <div className="popup-body">
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
      <Button type="submit">Log in</Button>
      <p style={{ color: 'black' }}>Don&apos;t have an account?</p>
      <Button onClick={() => { window.location.href = '/Register' } }>Sign up</Button>
     </div>
    </form>
    </>
  );
};

Login.propTypes = {
  closeLoginPopup: PropTypes.func
};

export default Login;

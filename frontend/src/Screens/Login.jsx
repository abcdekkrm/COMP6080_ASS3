import {
  TextField,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import Config from '../config.json';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  const loginStyle = {
    display: 'flex',
    height: '100%',
    width: '99.8%',
    background: 'white',
    position: 'absolute',
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
          });
        }
      });
  }

  return (
    <>
    <form
      onSubmit={handleLoginSubmit}
      style={loginStyle}
    >
    {isMobile
      ? <>
        <div
          className="popup-body"
          style = {{ padding: '10vw', width: '100%' }}
          >
            <h1
              style={{ color: 'black', marginBottom: '2%' }}
            >
            Welcome
            </h1>
            <TextField
              type="text"
              id="email"
              placeholder="Enter your email"
              onChange={handleEmail}
              value={email}
              style = {{ width: '80vw' }}
            />
            <br/>
            <TextField
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handlePassword}
              value={password}
              style = {{ width: '80vw' }}
            />
            <br/>
            {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
            <Button
              type="submit"
            >
            Log in
            </Button>
            <p
              style={{ color: 'black', fontSize: 'small' }}
            >
            Don&apos;t have an account?
              <Button
                onClick={() => { window.location.href = '/Register' }}
                style={{ fontSize: 'small' }}
              >
              Sign up
              </Button>
            </p>
        </div>
        </>
      : <>
      <div
        className="popup-body"
        style = {{ padding: '10vw', width: '30%' }}
        >
        <h1
          style={{ color: 'black', marginBottom: '2%' }}
        >
        Welcome
        </h1>
        <TextField
          type="text"
          id="email"
          placeholder="Enter your email"
          onChange={handleEmail}
          value={email}
          style = {{ width: '20vw' }}
        />
        <br/>
        <TextField
          type="password"
          id="password"
          placeholder="Enter your password"
          onChange={handlePassword}
          value={password}
          style = {{ width: '20vw' }}
        />
        <br/>
        {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
        <Button
          type="submit"
        >
        Log in
        </Button>
        <p
          style={{ color: 'black', fontSize: 'small' }}
        >
        Don&apos;t have an account?
          <Button
            onClick={() => { window.location.href = '/Register' }}
            style={{ fontSize: 'small' }}
          >
          Sign up
          </Button>
        </p>
      </div>
      </>
    }
    </form>
    </>
  );
};

Login.propTypes = {
  closeLoginPopup: PropTypes.func
};

export default Login;

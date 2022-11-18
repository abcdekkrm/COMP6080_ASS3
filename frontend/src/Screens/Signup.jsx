import {
  TextField,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import Config from '../config.json';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive'

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  const signupStyle = {
    display: 'block',
    height: '100%',
    width: '99.8%',
    background: 'white',
    position: 'absolute',
    border: '0.1vw solid rgb(182, 182, 182)',
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = event => {
    setConfirmPassword(event.target.value);
  };

  const handleName = event => {
    setName(event.target.value);
  };

  function handleSignupSubmit (e) {
    e.preventDefault();

    if (confirmPassword !== password) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const payload = JSON.stringify({
      email,
      password,
      name
    });

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/user/auth/register`, request)
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', name);
            localStorage.setItem('password', password);
            localStorage.setItem('email', email);
            localStorage.setItem('logged', true);
            window.location.href = '/Landing';
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
        onSubmit={handleSignupSubmit}
        style={signupStyle}
      >
      {isMobile
        ? <>
          <div
            className="popup-body"
            style = {{ padding: '10vw', width: '100%' }}
          >
            <h1
              style={{ color: 'black' }}
            >
            Sign up today
            </h1>
            <TextField
              type="text"
              id="name"
              placeholder="Enter your name"
              onChange={handleName}
              value={name}
              style = {{ width: '80vw' }}
            />
            <br/>
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
              name="PW"
              placeholder="Create a password"
              onChange={handlePassword}
              value={password}
              style = {{ width: '80vw' }}
            />
            <br/>
            <TextField
              type="password"
              id="password"
              name="checkPW"
              placeholder="Confirm password"
              onChange={handleConfirmPassword}
              value={confirmPassword}
              style = {{ width: '80vw' }}
            />
            <br/>
            {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
            <Button
              type="submit"
              role="signUp"
            >
            Sign me up!
            </Button>
          </div>
          </>
        : <>
          <div
            className="popup-body"
            style = {{ padding: '10vw', width: '30%' }}
          >
          <h1
            style={{ color: 'black' }}
          >
          Sign up today
          </h1>
          <TextField
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={handleName}
            value={name}
            style = {{ width: '20vw' }}
          />
          <br/>
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
            name="PW"
            placeholder="Create a password"
            onChange={handlePassword}
            value={password}
            style = {{ width: '20vw' }}
          />
          <br/>
          <TextField
            type="password"
            id="password"
            name="checkPW"
            placeholder="Confirm password"
            onChange={handleConfirmPassword}
            value={confirmPassword}
            style = {{ width: '20vw' }}
          />
          <br/>
          {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
          <Button
            type="submit"
            role="signUp"
          >
          Sign me up!
          </Button>
        </div>
        </>
      }
      </form>
      </>
  );
};

Signup.propTypes = {
  closeSignupPopup: PropTypes.func
};

export default Signup;

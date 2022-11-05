import {
  TextField,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import Config from '../config.json';
import PropTypes from 'prop-types';

const Signup = ({ closeSignupPopup }) => {
  const [errorMessage, setErrorMessage] = useState('');

  function refreshPage () {
    window.location.reload(false);
  }

  const signupStyle = {
    display: 'block',
    height: '100%',
    width: '100%',
    background: 'white',
    position: 'absolute',
    left: '-1%',
    top: '-1%',
    zIndex: '10000',
    padding: '1vw',
    border: '0.1vw solid rgb(182, 182, 182)',
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleName = event => {
    setName(event.target.value);
  };

  function handleSignupSubmit (e) {
    e.preventDefault();

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
            refreshPage();
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
    <form onSubmit={handleSignupSubmit} style={signupStyle}>
    {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
     <div className="popup-body">
      <Button onClick={closeSignupPopup}>&times;</Button>
      <h1 style={{ color: 'black' }}>Sign up today</h1>
      <TextField
        type="text"
        id="name"
        placeholder="Enter your name"
        onChange={handleName}
        value={name}
      />
      <br/>
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
        placeholder="Create a password"
        onChange={handlePassword}
        value={password}
      />
      <br/>
      <Button type="submit">Sign me up!</Button>
     </div>
    </form>
  );
};

Signup.propTypes = {
  closeSignupPopup: PropTypes.func
};

export default Signup;

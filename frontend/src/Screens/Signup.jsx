import {
  TextField,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import Config from '../config.json';
import PropTypes from 'prop-types';

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const signupStyle = {
    display: 'block',
    height: '100%',
    width: '99.8%',
    background: 'white',
    position: 'absolute',
    border: '0.1vw solid rgb(182, 182, 182)',
  };

  const imageStyle = {
    display: 'block',
    height: '95%',
    position: 'absolute',
    left: '48vw',
    top: '0%',
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
      <form onSubmit={handleSignupSubmit} style={signupStyle}>
      <div className="popup-body" style = {{ padding: '10vw', width: '30%' }}>
        <h1 style={{ color: 'black' }}>Sign up today</h1>
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
          placeholder="Create a password"
          onChange={handlePassword}
          value={password}
          style = {{ width: '20vw' }}
        />
        <br/>
        {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
        <Button type="submit">Sign me up!</Button>
      </div>
      <img
      src='https://img.freepik.com/free-vector/tiny-house-concept-illustration_114360-9329.jpg?w=826&t=st=1668000195~exp=1668000795~hmac=04f8f7c97a23ab1fd828560730b3c34a50a955d073dbd8b44bca8ea58286f8e7'
      alt="stock img"
      style = {imageStyle}
      />
      </form>
      </>
  );
};

Signup.propTypes = {
  closeSignupPopup: PropTypes.func
};

export default Signup;

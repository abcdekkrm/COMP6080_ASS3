import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Config from '../config.json';

const Login = ({closePopup }) => {

  const loginStyle = {
    display: 'block',
    height: '500%',
    width: '30%',
    position: 'absolute',
    left: '35%',
    top: '300%',
    zIndex: '1000',
    padding: '1vw',
    border: '0.1vw solid rgb(182, 182, 182)',
  };
  
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  function handleLoginSubmit() {
    const e = {email};
    const p = {password};

    const payload = JSON.stringify({
        e,
        p,
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
                    localStorage.setItem('token', data['token']);
                    localStorage.setItem('password', password);
                    localStorage.setItem('email', email);
                    localStorage.setItem('logged', data['userId']);
                })
            } else {
                res.json().then((data) => {
                    console.log(data["error"]);
                });
            }
        });
  }

  return (
    <div className="popup-container" style={loginStyle}>
     <div className="popup-body">
      <button onClick={closePopup}>&times;</button>
      <h1 style={{color:"black"}}>Welcome</h1>
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
      <button 
        onClick={() => {
          setOpen(false);
          handleLoginSubmit();
        }}
      >
        Log in
      </button>
      <p style={{color:"black"}}>Don't have an account?</p>
      <button
        onClick={() => {
        }}
      >
          Sign up
      </button>
     </div>
    </div>
  );

};

export default Login;
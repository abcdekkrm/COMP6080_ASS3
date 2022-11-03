import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import Login from '../Screens/Login';
import EditListing from '../Screens/EditListing'
import {
  AppBar, Toolbar, Button, Typography,
} from '@material-ui/core';
import Config from '../config.json';
import Landing from '../Screens/Landing';

function Nav () {
  const [loginOpen, setLoginOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  function handleLogout () {
    const token = localStorage.getItem('token');

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/user/auth/logout`, request)
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('password');
          localStorage.removeItem('email');
          localStorage.removeItem('logged');
          ReactDOM.render(<Landing />, document.querySelector('#root'));
        } else {
          res.json().then((data) => {
            console.log(token);
            console.log(data.error);
          });
        }
      });
  }

  const logged = localStorage.getItem('logged');

  return (
    <header>
     <nav>
      <AppBar position="static">
       <Toolbar>
        <img src="logo.svg" className="logo" alt="AirBrb logo" style={{ height: '5vh' }} />
        <Typography
          variant="h6"
          sx={{
            display: 'inline-flex',
            height: '8vh',
            width: '100%',
          }}
        >
         AirBrB
        </Typography>
        {logged
          ? <Button style={{ marginLeft: '80%' }} onClick={() => { handleLogout(); }} >Log out</Button>
          : <Button style={{ marginLeft: '80%' }} onClick={() => setLoginOpen(true)}>Login / Sign up</Button>
        }
        {loginOpen ? <Login closeLoginPopup={() => setLoginOpen(false)} /> : null}
        </Toolbar>
        </AppBar>
        {/* for testing edit listing */}
        <Button onClick={() => setEditOpen(true)}>Edit</Button>
        {editOpen ? <EditListing closeEditPopup={() => setEditOpen(false)} /> : null}
     </nav>
    </header>
  )
}

export default Nav;

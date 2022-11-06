import React, { useState } from 'react';
import Login from '../Screens/Login';
import ProfileMenu from './ProfileMenu'
import {
  AppBar, Toolbar, Button, Typography
} from '@material-ui/core';
import logo from '../Assets/logo.svg';

function Nav () {
  const [loginOpen, setLoginOpen] = useState(false);
  const logged = localStorage.getItem('logged');

  return (
    <header>
     <nav>
      <AppBar position="static">
       <Toolbar>
        <img src={logo} className="logo" alt="AirBrb logo" style={{ height: '5vh' }} />
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
        {logged ? <ProfileMenu /> : <Button style={{ marginLeft: '80%' }} onClick={() => setLoginOpen(true)}>Login / Sign up</Button>}
        {loginOpen ? <Login closeLoginPopup={() => setLoginOpen(false)} /> : null}
        </Toolbar>
        </AppBar>
     </nav>
    </header>
  )
}

export default Nav;

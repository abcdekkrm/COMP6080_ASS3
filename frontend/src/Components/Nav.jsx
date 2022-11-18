import React from 'react';
import ProfileMenu from './ProfileMenu';
import {
  AppBar, Toolbar, Button, Typography
} from '@material-ui/core';
import logo from '../Assets/logo.svg';

function Nav () {
  const logged = localStorage.getItem('logged');

  return (
    <>
    <header style={{ width: '100vw' }}>
     <nav>
      <AppBar position="static" style={{ width: '100vw' }}>
       <Toolbar>
        <img role='logo' src={logo} className="logo" alt="AirBrb logo" style={{ height: '5vh', cursor: 'pointer' }} onClick={() => { window.location.href = '/Landing' } }/>
        <Typography
          variant="h6"
          sx={{
            display: 'inline-flex',
            height: '8vh',
            width: '100%',
          }}
          onClick={() => { window.location.href = '/Landing' } }
          style={{ cursor: 'pointer' }}
        >
         AirBrB
        </Typography>
        {logged ? <ProfileMenu role='profile'/> : <Button role='loginButton' style={{ marginLeft: 'auto', marginRight: '0px', cursor: 'pointer' }} onClick={() => { window.location.href = '/Login' } }>Login / Sign up</Button>}
        </Toolbar>
        </AppBar>
     </nav>
    </header>
    </>
  )
}

export default Nav;

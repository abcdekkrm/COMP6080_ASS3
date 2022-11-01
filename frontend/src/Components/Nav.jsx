import React, { useState } from 'react';
import Login from '../Screens/Login';
import {
  AppBar, Toolbar, Button, Typography,
} from '@material-ui/core';

function Nav () {
  const [open, setOpen] = useState(false);

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
        <Button style={{ marginLeft: '80%' }} onClick={() => setOpen(true)}>Login / Sign up</Button>
         {open ? <Login closePopup={() => setOpen(false)} /> : null}
        </Toolbar>
        </AppBar>
     </nav>
    </header>
  )
}

export default Nav;

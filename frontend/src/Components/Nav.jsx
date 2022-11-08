import React, { useState } from 'react';
// import Login from '../Screens/Login';
import ProfileMenu from './ProfileMenu';
import EditListing from '../Screens/EditListing'
import CreateListing from '../Screens/CreateListing'
import {
  AppBar, Toolbar, Button, Typography
} from '@material-ui/core';
import logo from '../Assets/logo.svg';

function Nav () {
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const logged = localStorage.getItem('logged');

  return (
    <>
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
        {logged ? <ProfileMenu /> : <Button style={{ marginLeft: '80%' }} onClick={() => { window.location.href = '/Login' } }>Login / Sign up</Button>}
        </Toolbar>
        </AppBar>
        {/* for testing edit listing */}
        <Button onClick={() => setCreateOpen(true)}>Create</Button>
        <Button onClick={() => setEditOpen(true)}>Edit</Button>
        {editOpen ? <EditListing closeEditPopup={() => setEditOpen(false)} listingID={'564534127'} /> : null}
        {createOpen ? <CreateListing closeCreatePopup={() => setCreateOpen(false)} /> : null}
     </nav>
    </header>
    </>
  )
}

export default Nav;

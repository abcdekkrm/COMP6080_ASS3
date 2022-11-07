import React, { useState } from 'react';
import {
  Menu, MenuItem, Divider, Tooltip
} from '@material-ui/core'
import profile from '../Assets/profile.svg';
import CreateListing from '../Screens/CreateListing'
import Config from '../config.json';

function ProfileMenu () {
  const [MenuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  function refreshPage () {
    window.location.reload(false);
  }

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
          refreshPage();
        } else {
          res.json().then((data) => {
            console.log(token);
            console.log(data.error);
          });
        }
      });
  }

  return (
        <>
        <Tooltip title="Account settings">
          <img
            src={profile}
            className="profile"
            alt="user profile"
            style={{ height: '20%', marginLeft: '85%' }}
            onClick={handleClick}
            />
        </Tooltip>
      <Menu
        open={MenuOpen}
        anchorEl={anchorEl}
        id="account-menu"
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          }
        }}
        style={{ marginTop: '4%', marginLeft: '-2%' }}
      >
        <MenuItem>
          Profile
        </MenuItem>
        <MenuItem onClick={() => setCreateOpen(true)}>
          Create Listing
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
      {createOpen ? <CreateListing closeCreatePopup={() => setCreateOpen(false)} /> : null}
    </>
  );
}

export default ProfileMenu;

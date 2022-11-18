import React, { useState } from 'react';
import Config from '../config.json';
import { makeStyles, Button } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';

const UnPublishing = ({ closePopUp, listingId }) => {
  const useStyles = makeStyles({
    popup: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px',
    },
    button: {
      backgroundColor: 'white',
      margin: '5px',
    },
    popup_syles: {
      background: 'white',
      height: '20vh',
      width: '50vw',
      padding: '1vw',
    },
    closeIcon: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: '0',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '1%',
    },
  });
  const classes = useStyles();
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const handleRemoveLive = async () => {
    const token = localStorage.getItem('token');
    console.log(listingId);
    const response = await fetch(`http://localhost:${Config.BACKEND_PORT}/listings/unpublish/${listingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token
        },
      });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setAlertContent(data.error);
      setAlert(true);
    } else {
      closePopUp();
    }
  }
  return (
    <>
      <div className={classes.popup}>
        {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
        <div className={classes.popup_syles} id='create-listing-popup'>
          <div className={classes.closeIcon}>
            <IconButton onClick={closePopUp}>
              <CloseIcon/>
            </IconButton>
          </div>
          <div className={classes.title}>Remove your listing from public?</div>
          <Button onClick={handleRemoveLive}>Confirm</Button>
        </div>
      </div>
    </>
  )
}
UnPublishing.propTypes = {
  closePopUp: PropTypes.func,
  listingId: PropTypes.number,
}
export default UnPublishing;

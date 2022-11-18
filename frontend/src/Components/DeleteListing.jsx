import React, { useState } from 'react';
import Config from '../config.json';
import PropTypes from 'prop-types';
import { Button, Paper } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const DeleteListing = ({ id, closeDeletePopup }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  const token = localStorage.getItem('token');
  const [errorMessage, setErrorMessage] = useState('');

  const MobileDeleteStyle = {
    position: 'absolute',
    width: '80%',
    height: '40%',
    top: '30%',
    left: '10%',
    backgroundColor: 'rgb(255, 255, 255)',
    yIndex: '1000000'
  };

  const deleteStyle = {
    position: 'absolute',
    width: '40%',
    height: '20%',
    top: '45%',
    left: '30%',
    backgroundColor: 'rgb(255, 255, 255)',
    yIndex: '1000000'
  };

  function handleDelete () {
    const request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      path: id,
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/listings/${id}`, request)
      .then(res => {
        if (res.ok) {
          window.location.href = '/User-Listings';
        } else {
          res.json().then((data) => {
            setErrorMessage(data.error)
            console.log(data.error);
            console.log(token);
          });
        }
      });
  }

  return (
    <>
      {isMobile
        ? <>
          {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
          <div className="popup-container">
          <Paper className="popup-body" style = {MobileDeleteStyle}>
            <Button onClick={closeDeletePopup}>&times;</Button>
            <h1>Are you sure you want to delete?</h1>
            <Button onClick={handleDelete} >DELETE</Button>
          </Paper>
          </div>
          </>
        : <>
          {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
          <div className="popup-container">
          <Paper className="popup-body" style = {deleteStyle}>
            <Button onClick={closeDeletePopup}>&times;</Button>
            <h1>Are you sure you want to delete?</h1>
            <Button onClick={handleDelete} >DELETE</Button>
          </Paper>
          </div>
          </>
      }
    </>
  )
}

DeleteListing.propTypes = {
  closeDeletePopup: PropTypes.func,
  id: PropTypes.number
};

export default DeleteListing;

import React, { useState } from 'react';
import Config from '../config.json';
import PropTypes from 'prop-types';

const DeleteListing = ({ id, closeDeletePopup }) => {
  const token = localStorage.getItem('token');
  const [errorMessage, setErrorMessage] = useState('');

  const deleteStyle = {
    position: 'absolute',
    width: '50%',
    height: '20%',
    top: '25%',
    left: '25%',
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
      {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
      <div className="popup-container">
      <div className="popup-body" style = {deleteStyle}>
        <button onClick={closeDeletePopup}>&times;</button>
        <h1>Are you sure you want to delete?</h1>
        <button onClick={handleDelete} >DELETE</button>
      </div>
      </div>
    </>
  )
}

DeleteListing.propTypes = {
  closeDeletePopup: PropTypes.func,
  id: PropTypes.number
};

export default DeleteListing;

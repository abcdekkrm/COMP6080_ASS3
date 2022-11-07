import React, { useState, useEffect } from 'react';
import Config from '../config.json';

function UserListings () {
  const [listings, setListings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getListings();
  }, []);

  function getListings () {
    const token = localStorage.getItem('token');

    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/listings`, request)
      .then(res => {
        if (res.ok) {
          setErrorMessage('Success!')
          console.log(res);
          setListings(res.data);
        } else {
          res.json().then((data) => {
            setErrorMessage(data.error)
          });
        }
      });
  }

  return (
    <div>
      {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
      <div className='item-container'>
        {listings.map((listing) => (
          <div className='card' key={listing.id}>
            <img src={listing.thumbnail} alt='' />
            <h3>{listing.title}</h3>
            <p>{listing.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserListings;

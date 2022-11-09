import React, { useState, useEffect } from 'react';
import Config from '../config.json';

function Listings () {
  const [listings, setListings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getListings();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    gap: '1vw'
  };

  const cardStyle = {
    textAlign: 'center',
    width: '10vw',
    borderRadius: '5px',
    padding: '1em',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8'
  };

  const thumbnailStyle = {
    objectFit: 'cover',
    width: '10vw',
    height: '10vw',
  }

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
          return res.json();
        } else {
          res.json().then((data) => {
            setErrorMessage(data.error)
          });
        }
      }).then(data => {
        console.log(data.listings);
        setListings(data.listings);
      });
  }

  return (
    <>
      <div>
        {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
        <div className='item-container' style={containerStyle}>
          {listings?.map((listing) => (
            <div className='card' key={listing.id} style={cardStyle}>
              <img src={listing.thumbnail} alt='' style={thumbnailStyle}/>
              <h3>{listing.title}</h3>
              <p>${listing.price}/night</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Listings;

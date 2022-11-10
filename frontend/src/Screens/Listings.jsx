import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';

function Listings (props) {
  const [listings, setListings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getListings();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    padding: '1vw',
    gap: '1vw'
  };

  const cardStyle = {
    textAlign: 'center',
    width: '14vw',
    padding: '1vw',
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
          // console.log(props.search);
          return res.json();
        } else {
          res.json().then((data) => {
            setErrorMessage(data.error)
          });
        }
      }).then(data => {
        setListings(data.listings.sort((a, b) => a.title.localeCompare(b.title)));
      });
  }

  return (
    <>
      <div>
        {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
        <div className='item-container' style={containerStyle}>
          {listings?.map((listing) => (
            <Paper className='card' key={listing.id} style={cardStyle}>
              <img src={listing.thumbnail} alt='' style={thumbnailStyle}/>
              <h3>{listing.title}</h3>
              <p>${listing.price}/night</p>
            </Paper>
          ))}
          {listings?.filter(listing => listing.title.toLowerCase().includes(props.search)).map(filteredListing => (
            <li key={filteredListing.id}>
              {filteredListing.title}
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

Listings.propTypes = {
  search: PropTypes.string,
  numBed: PropTypes.number,
  dateRange: PropTypes.dateRange,
  min: PropTypes.number,
  max: PropTypes.number
};

export default Listings;

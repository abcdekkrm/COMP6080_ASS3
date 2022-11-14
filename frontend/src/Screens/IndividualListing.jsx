import React, { useState } from 'react';
import Config from '../config.json';

function IndividualListing () {
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBath] = useState('');

  const token = localStorage.getItem('token');
  const id = Number(localStorage.getItem('listingId'));

  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  fetch(`http://localhost:${Config.BACKEND_PORT}/listings/${id}`, request)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        res.json().then((data) => {
          setErrorMessage(data.error)
        });
      }
    }).then(data => {
      setTitle(data.listing.title);
      const addressDict = data.listing.address;
      if (Object.keys(addressDict).length > 0) {
        setAddress(addressDict);
      } else {
        setAddress('No address provided.');
      }

      const metaData = data.listing.metadata;

      const numBeds = Number(metaData.singleBed) + Number(metaData.doubleBed);
      if (!isNaN(numBeds)) {
        setBeds(numBeds);
      } else {
        setBeds('No beds listed.')
      }

      const numBath = metaData.bathroom;
      if (numBath > 0) {
        setBath(numBath);
      } else {
        setBath('No bathrooms listed.')
      }
    });

  return (
    <>
    <div>
    {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
    <h1>{title}</h1>
    <p>{address}</p>
    <p>{beds}</p>
    <p>{baths}</p>
    </div>
    </>
  )
}

export default IndividualListing;

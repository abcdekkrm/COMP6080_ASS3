import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteListing from '../Components/DeleteListing';
import InfoIcon from '@mui/icons-material/Info';
import SimplePopup from '../Components/SimplePopup';
import { Paper } from '@mui/material';

function UserListings () {
  const [listings, setListings] = useState([]);
  const [address, setAddress] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBath] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getListings();
    getListingDetails();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'left',
    overflowX: 'scroll',
    gap: '1vw'
  };

  const cardStyle = {
    textAlign: 'center',
    width: '15vw',
    height: '60vh',
    padding: '1vw',
  };

  const thumbnailStyle = {
    objectFit: 'cover',
    width: '15vw',
    height: '15vw',
  }

  const handleClick = (id) => {
    setDeleteOpen(true);
    localStorage.setItem('listingId', id);
  }

  const handleInfoClick = () => {
    setOpen(true);
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
        setListings(data.listings);
      });
  }

  const getListingDetails = (id) => {
    const token = localStorage.getItem('token');

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
  }

  const email = localStorage.getItem('email');
  const listingId = Number(localStorage.getItem('listingId'));

  return (
    <>
      <div>
        {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
        <div className='item-container' style={containerStyle}>
          {listings?.map(listing => (
            <Paper className='card' key={listing.id} style={cardStyle}>
              {(listing.owner === email)
                ? <>
                    <img src={listing.thumbnail} alt='' style={thumbnailStyle}/>
                    <h3>{listing.title}</h3>
                    <p>${listing.price}/night</p>
                    <InfoIcon onMouseOver={() => getListingDetails(listing.id)} onClick={handleInfoClick} style={{ cursor: 'pointer' }}/><br/>
                    <EditIcon onClick={() => { window.location.href = '/Edit-Listing' } } style={{ marginTop: '40%', cursor: 'pointer' }}/>
                    <DeleteIcon onClick={() => handleClick(listing.id)} style={{ color: 'red', cursor: 'pointer' }}/>
                  </>
                : null}
            </Paper>
          ))}
        </div>
      </div>
      {deleteOpen ? <DeleteListing id={listingId} closeDeletePopup={() => setDeleteOpen(false)} /> : null}
      {open
        ? <SimplePopup
          text={'Address: ' + address + '\n' + 'Number of beds: ' + beds + '\n' + 'Number of bathrooms: ' + baths}
          closePopup={() => setOpen(false)}
          />
        : null}
    </>
  );
}

export default UserListings;

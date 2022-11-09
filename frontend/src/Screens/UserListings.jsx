import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteListing from '../Components/DeleteListing';

function UserListings () {
  const [listings, setListings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState('');

  useEffect(() => {
    getListings();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    gap: '2vw'
  };

  const cardStyle = {
    textAlign: 'center',
    width: '15vw',
    borderRadius: '5px',
    padding: '1em',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8'
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setDeleteOpen(true);
    localStorage.setItem('listingId', id);
  }
  function handleOpenEdit (id) {
    console.log(id);
    localStorage.setItem('listingId', id);
    console.log(localStorage.getItem('listingId'));
    window.location.href = '/Edit-Listing';
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

  const listingId = Number(localStorage.getItem('listingId'));

  return (
    <>
      <div>
        {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
        <div className='item-container' style={containerStyle}>
          {listings?.map((listing) => (
            <div className='card' key={listing.id} style={cardStyle}>
              <img src={listing.thumbnail} alt='' style={{ width: '15vw' }}/>
              <h3>{listing.title}</h3>
              <p>${listing.price}/night</p>
              {/* <EditIcon onClick={() => { window.location.href = '/Edit-Listing' } }/> */}
              <EditIcon onClick={() => handleOpenEdit(listing.id)}/>
              <DeleteIcon style={{ color: 'red' }} onClick={handleClick}/>
            </div>
          ))}
        </div>
      </div>
      {deleteOpen ? <DeleteListing anchorEl={anchorEl} id={listingId} closeDeletePopup={() => setDeleteOpen(false)} /> : null}
    </>
  );
}

export default UserListings;

import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PublicOffRoundedIcon from '@mui/icons-material/PublicOffRounded';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import DeleteListing from '../Components/DeleteListing';
import InfoIcon from '@mui/icons-material/Info';
import SimplePopup from '../Components/SimplePopup';
import { Paper, Rating } from '@mui/material';
import Publishing from '../Components/Publishing';
import { Tooltip } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import UnPublishing from '../Components/UnPublishing';

function UserListings () {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  const [listings, setListings] = useState([]);
  const [listingType, setListingType] = useState('');
  const [address, setAddress] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBath] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectDateOpen, setSelectDateOpen] = useState(false);
  const [removeLive, setRemoveLive] = useState(false);
  const [numReviews, setNumReviews] = useState(0);
  const [score, setScore] = useState(0);

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

  const mobileCardStyle = {
    textAlign: 'center',
    width: '60vw',
    height: '65vh',
    padding: '1vw',
  };

  const cardStyle = {
    textAlign: 'center',
    width: '15vw',
    height: '60vh',
    padding: '1vw',
  };

  const mobileThumbnailStyle = {
    objectFit: 'cover',
    width: '50vw',
    height: '50vw',
  }

  const thumbnailStyle = {
    objectFit: 'cover',
    width: '15vw',
    height: '15vw',
  }

  const handleView = (id) => {
    localStorage.setItem('listingId', id);
    window.location.href = '/Listing';
  }

  const handleClick = (id) => {
    setDeleteOpen(true);
    localStorage.setItem('listingId', id);
  }
  const handleOpenEdit = (id) => {
    localStorage.setItem('listingId', id);
    window.location.href = '/Edit-Listing';
  }
  const handlePublishing = (id) => {
    localStorage.setItem('listingId', id);
    console.log(id);
    setSelectDateOpen(true);
  }
  const handleUnPublishing = (id) => {
    localStorage.setItem('listingId', id);
    setRemoveLive(true);
  }
  const handleInfoClick = () => {
    setOpen(true);
  }
  const handleManageListing = (id) => {
    localStorage.setItem('listingId', id);
    window.location.href = '/Manage-Listing';
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

        const listingType = metaData.listingType;
        if (!isNaN(listingType)) {
          setListingType(listingType);
        } else {
          setListingType('Property type not listed.')
        }

        const reviews = data.listing.reviews;
        setNumReviews(reviews.length);
        let score = 0;
        for (let i = 0; i < reviews.length; i++) {
          score += reviews[i].score;
        }
        const scoreAverage = score / reviews.length;
        if (!isNaN(scoreAverage)) {
          setScore(scoreAverage);
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
          {listings?.map((listing, index) => (
            <>
            {isMobile
              ? <>
                  {(listing.owner === email)
                    ? <>
                        <Paper className='card' key={index} style={mobileCardStyle}>
                        <img src={listing.thumbnail} alt='' style={mobileThumbnailStyle} onClick={() => handleView(listing.id)}/>
                        <h3>{listing.title}</h3>
                        <p>${listing.price}/night</p>
                        <Tooltip title="More Information">
                          <InfoIcon onMouseOver={() => getListingDetails(listing.id)} onClick={handleInfoClick} style={{ cursor: 'pointer' }}/>
                        </Tooltip>
                        <Tooltip title="View Bookings">
                          <ListAltOutlinedIcon style={{ marginTop: '40%', cursor: 'pointer' }}/>
                        </Tooltip>
                        <br/>
                        <Tooltip title="Publish">
                          <PublicOutlinedIcon onClick={() => handlePublishing(listing.id)} style={{ cursor: 'pointer' }} />
                        </Tooltip>
                        <Tooltip title="UnPublish">
                          <PublicOffRoundedIcon onClick={() => handleUnPublishing(listing.id)} style={{ cursor: 'pointer' }} />
                        </Tooltip>
                        <Tooltip title="Edit">
                          <EditIcon onClick={() => handleOpenEdit(listing.id)} style={{ marginTop: '40%', cursor: 'pointer' }}/>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteIcon onClick={() => handleClick(listing.id)} style={{ color: 'red', cursor: 'pointer' }}/>
                        </Tooltip>
                        </Paper>
                      </>
                    : null}
                </>
              : <>
                  {(listing.owner === email)
                    ? <>
                        <Paper className='card' key={index} style={cardStyle}>
                        <img src={listing.thumbnail} alt='' style={thumbnailStyle} onClick={() => handleView(listing.id)}/>
                        <h3>{listing.title}</h3>
                        <p>${listing.price}/night</p>
                        <Tooltip title="More Information">
                          <InfoIcon onMouseOver={() => getListingDetails(listing.id)} onClick={handleInfoClick} style={{ cursor: 'pointer' }}/>
                        </Tooltip>
                        <Tooltip title="View Bookings">
                          <ListAltOutlinedIcon onClick={() => handleManageListing(listing.id)} style={{ marginTop: '40%', cursor: 'pointer' }}/>
                        </Tooltip>
                        <br/>
                        <Tooltip title="Publish">
                          <PublicOutlinedIcon onClick={() => handlePublishing(listing.id)} style={{ cursor: 'pointer' }} />
                        </Tooltip>
                        <Tooltip title="UnPublish">
                          <PublicOffRoundedIcon onClick={() => handleUnPublishing(listing.id)} style={{ cursor: 'pointer' }} />
                        </Tooltip>
                        <Tooltip title="Edit">
                          <EditIcon onClick={() => handleOpenEdit(listing.id)} style={{ marginTop: '40%', cursor: 'pointer' }}/>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteIcon onClick={() => handleClick(listing.id)} style={{ color: 'red', cursor: 'pointer' }}/>
                        </Tooltip>
                        </Paper>
                      </>
                    : null}
                </>
            }
            </>
          ))}
        </div>
      </div>
      {deleteOpen ? <DeleteListing id={listingId} closeDeletePopup={() => setDeleteOpen(false)} /> : null}
      {selectDateOpen ? <Publishing closeDate={() => setSelectDateOpen(false)} listingId={listingId}/> : null}
      {removeLive ? <UnPublishing closePopUp={() => setRemoveLive(false)} listingId={listingId}/> : null}
      {open
        ? <SimplePopup
          text={
            <div style={{ lineHeight: '0.1vh' }}>
            <p>Address: {address}</p>
            <p>Property type: {listingType}</p>
            <p>Number of beds: {beds}</p>
            <p>Number of bathrooms: {baths}</p>
            <p>Reviews: {numReviews}</p>
            <Rating
              readOnly
              value={score}
            />
            </div>
          }
          closePopup={() => setOpen(false)}
          />
        : null}
    </>
  );
}

export default UserListings;

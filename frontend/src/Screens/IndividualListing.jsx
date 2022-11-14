import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import { Paper } from '@mui/material';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';

function IndividualListing () {
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  // const [imgs, setImgs] = useState([]);
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [baths, setBath] = useState('');
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    getListingDetails();
  }, []);

  function getListingDetails () {
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

        setThumbnail(data.listing.thumbnail);

        // setImgs(data.listing.imgArr);

        const addressDict = data.listing.address;
        if (Object.keys(addressDict).length > 0) {
          setAddress(addressDict);
        } else {
          setAddress('No address provided.');
        }

        setPrice(data.listing.price);

        const metaData = data.listing.metadata;

        const numBedrooms = Number(metaData.bedroom);
        if (!isNaN(numBedrooms)) {
          setBedrooms(numBedrooms);
        } else {
          setBedrooms('No beds listed.')
        }

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

        const amenity = metaData.amenities;
        if (!isNaN(amenity)) {
          setAmenities(['no ammenities listed']);
        } else {
          setAmenities(amenity);
        }
      });
  }

  return (
    <>
    <div style={{ padding: '0 10% 0 10%' }}>
      {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
      <h1>{title}</h1>
      <span>
      <img src={thumbnail} style={{ height: '50vh', borderRadius: '1vw' }}/>
        {/* <ImageList sx={{ width: '10vw', height: '10vh' }} cols={3} rowHeight={'10vh'}>
          {imgs?.map((item) => (
            <ImageListItem key='imgId'>
              <img
                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt=''
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList> */}
      </span>
      <div style={{ lineHeight: '15%' }}>
        <p>{address}</p>
        <p style={{ marginBottom: '5%' }}>${price} /night</p>
        <p>Bathrooms: {bedrooms}</p>
        <p>Beds: {beds}</p>
        <p style={{ marginBottom: '5%' }}>Baths: {baths}</p>
        <p>Amenities</p>
      </div>
      {amenities?.map(amenity => (
        <Paper className='card' key='id' style={{ width: '20%' }}>
        <p>{amenity}</p>
        </Paper>
      ))}
    </div>
    </>
  )
}

export default IndividualListing;

import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import { Paper, Button } from '@mui/material';
// import BasicDateRangePicker from '../Components/DateRangePicker';
import SimplePopup from '../Components/SimplePopup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';

function IndividualListing () {
  const [errorMessage, setErrorMessage] = useState('');
  const [bookErrorMessage, setBookErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  // const [imgs, setImgs] = useState([]);
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [baths, setBath] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState([null, null]);

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
      }
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

  const handleBookSubmit = () => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('listingId');
    const checkIn = new Date(value[0].$d);
    const checkOut = new Date(value[1].$d);
    const dateRangee = [checkIn, checkOut];
    console.log(dateRangee);
    const diff = checkIn.getTime() - checkOut.getTime();
    const days = diff / (-1 * 1000 * 3600 * 24);
    console.log(price * days);

    const payload = JSON.stringify({
      dateRange: dateRangee,
      totalPrice: price * days
    });

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: payload
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/bookings/new/${id}`, request)
      .then(res => {
        if (res.ok) {
          console.log('success!')
        } else {
          res.json().then((data) => {
            setBookErrorMessage(data.error)
          });
        }
      });
  }

  const handleBookClick = () => {
    setOpen(true);
  }

  return (
    <>
    <div style={{ padding: '0 10% 0 10%' }}>
      {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
      <h1>{title}</h1>
      <span>
      <img src={thumbnail} style={{ height: '50vh', width: 'auto', borderRadius: '1vw' }}/>
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
        <div style={{ display: 'flex' }}>
          <div>
            <p style={{ fontWeight: 'bold' }}>{address}</p>
            <p style={{ marginBottom: '5%', fontWeight: 'bold' }}>${price} /night</p>
          </div>
          <Button style={{ marginLeft: '15%' }} onClick={handleBookClick}>Book</Button>
        </div>
        <p>Bathrooms: {bedrooms}</p>
        <p>Beds: {beds}</p>
        <p style={{ marginBottom: '5%' }}>Baths: {baths}</p>
        <p>Amenities:</p>
      </div>
      {amenities ? null : <p>No amenities listed.</p>}
      {amenities?.map(amenity => (
        <Paper className='card' key='id' style={{ width: '20%' }}>
        <p>{amenity}</p>
        </Paper>
      ))}
    </div>
    {open
      ? <SimplePopup
        text={
          <>
          {bookErrorMessage && <div className='error' style={{ color: 'red' }}> {bookErrorMessage} </div>}
          <div>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={{ start: 'Check-in', end: 'Check-out' }}
            >
              <DateRangePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </div>
          <Button onClick={handleBookSubmit}>Confirm Booking</Button>
          </>
        }
        closePopup={() => setOpen(false)}
        />
      : null}
    </>
  )
}

export default IndividualListing;

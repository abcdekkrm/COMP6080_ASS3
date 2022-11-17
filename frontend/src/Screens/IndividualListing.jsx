import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import { Paper, Button, Divider, Rating } from '@mui/material';
// import BasicDateRangePicker from '../Components/DateRangePicker';
import SimplePopup from '../Components/SimplePopup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { useMediaQuery } from 'react-responsive'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function IndividualListing () {
  // const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  const [errorMessage, setErrorMessage] = useState('');
  const [bookErrorMessage, setBookErrorMessage] = useState('');
  const [reviewErrorMessage, setReviewErrorMessage] = useState('');

  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [imgs, setImgs] = useState();
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [baths, setBath] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [open, setOpen] = useState(false);

  const [dateValue, setDateValue] = React.useState([null, null]);
  const [starValue, setStarValue] = React.useState(0);
  const [commentValue, setCommentValue] = React.useState('');

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

        setImgs(data.listing.metadata.imgArr);

        console.log(data.listing.metadata.imgArr);

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
    const checkIn = new Date(dateValue[0].$d);
    const checkOut = new Date(dateValue[1].$d);
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

  const handleReviewSubmit = () => {
    const token = localStorage.getItem('token');
    const listingId = localStorage.getItem('listingId');
    const bookingId = '23121313'

    const payload = JSON.stringify({
      review: { score: starValue, comment: commentValue }
    });

    const request = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: payload
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/listings/${listingId}/review/${bookingId}`, request)
      .then(res => {
        if (res.ok) {
          console.log('success!')
        } else {
          res.json().then((data) => {
            setReviewErrorMessage(data.error)
          });
        }
      });
  }

  return (
    <>
    <div style={{ padding: '0 10% 0 10%' }}>
      {errorMessage && <div className='error' style={{ color: 'red' }}> {errorMessage} </div>}
      <h1>{title}</h1>
      <div style={{ display: 'flex', }}>
      <img src={thumbnail} style={{ height: '50vh', width: 'auto', borderRadius: '1vw' }}/>
        <ImageList sx={{ width: 'auto', height: '50vh', marginTop: '-0.1%', marginLeft: '1%' }} variant="masonry" cols={3} gap={8}>
          {imgs?.map((img, index) => {
            return (
              <ImageListItem key={index}>
                <img src={img} style={{ borderRadius: '1vw' }}></img>
              </ImageListItem>
            )
          })}
        </ImageList>
      </div>
      <div style={{ lineHeight: '15%' }}>
        <div style={{ display: 'flex', marginBottom: '5%' }}>
          <div>
            <p style={{ fontWeight: 'bold' }}>{address}</p>
            <p style={{ marginBottom: '5%', fontWeight: 'bold' }}>${price} /night</p>
          </div>
          <Button style={{ marginLeft: '15%' }} onClick={handleBookClick}>Book</Button>
        </div>
        <Divider />
        <p><b>Bedrooms:</b> {bedrooms}</p>
        <p><b>Beds:</b> {beds}</p>
        <p style={{ marginBottom: '5%' }}><b>Bathrooms:</b> {baths}</p>
        <Divider />
        <p style={{ fontWeight: 'bold' }}>Amenities:</p>
      </div>
      {amenities ? null : <p>No amenities listed.</p>}
      {amenities?.map((amenity, index) => (
        <Paper className='card' key={index} style={{ width: '20%' }}>
        <p>{amenity}</p>
        </Paper>
      ))}
      <Divider />
      <p><b>Reviews</b></p>
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        {reviewErrorMessage && <div className='error' style={{ color: 'red' }}> {reviewErrorMessage} </div>}
        <Rating
          value={starValue}
          onChange={(event, newValue) => {
            setStarValue(newValue);
          }}
        />
        <br/>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          style= {{ width: '100%' }}
          value={commentValue}
          onChange={(event, newValue) => {
            setCommentValue(newValue);
          }}
        />
        <Button onClick={handleReviewSubmit}>Submit review</Button>
      </Box>
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
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
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

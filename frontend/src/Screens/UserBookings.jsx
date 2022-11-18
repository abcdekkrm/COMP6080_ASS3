import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import { Chip, List, ListItem, ListItemText, Typography, Avatar, ListItemAvatar } from '@mui/material';
import { useMediaQuery } from 'react-responsive'
import { format } from 'date-fns';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';

function UserBookings () {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookingDetails();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    overflowX: 'scroll',
    gap: '1vw'
  };

  function getBookingDetails () {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/bookings`, request)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            console.log(data.error);
          });
        }
      }).then(data => {
        for (let i = 0; i < data.bookings.length; i++) {
          if (data.bookings[i].owner === email) {
            setBookings((bookings) => [...bookings, data.bookings[i]]);
          }
        }
      })
  }

  const handleClick = (id) => {
    localStorage.setItem('listingId', id);
    window.location.href = '/Listing';
  }

  console.log(bookings);

  return (
    <>
      <div>
        <div className='item-container' style={containerStyle}>
          <List>
          {bookings?.map((booking, index) => (
            <>
            {isMobile
              ? <>
                  <ListItem key={index} style={{ cursor: 'pointer' }} onClick={() => handleClick(booking.listingId)}>
                    <ListItemAvatar>
                      <Avatar>
                        <HolidayVillageOutlinedIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <b>{format(new Date(booking.dateRange[0]), 'dd/MM/yyyy')} - {format(new Date(booking.dateRange[1]), 'dd/MM/yyyy')}</b>
                        </React.Fragment>
                      }
                      secondary= {<Typography>Total Price: ${booking.totalPrice}</Typography>}
                    />
                    <div style={{ marginLeft: '5%' }}>
                    {booking.status === 'accepted'
                      ? <Chip label="Accepted" color='success'/>
                      : <Chip label="Declined" color='error'/>
                    }
                    </div>
                  </ListItem>
                </>
              : <>
                  <ListItem key={index} style={{ cursor: 'pointer' }} onClick={() => handleClick(booking.listingId)} sx={{ width: '40vw', bgcolor: 'background.paper' }}>
                    <ListItemAvatar>
                      <Avatar>
                        <HolidayVillageOutlinedIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <b>{format(new Date(booking.dateRange[0]), 'dd/MM/yyyy')} - {format(new Date(booking.dateRange[1]), 'dd/MM/yyyy')}</b>
                        </React.Fragment>
                      }
                      secondary= {<Typography>Total Price: ${booking.totalPrice}</Typography>}
                    />
                    <div>
                    {booking.status === 'accepted'
                      ? <Chip label="Accepted" color='success'/>
                      : <Chip label="Declined" color='error'/>
                    }
                    </div>
                  </ListItem>
                </>
            }
            </>
          ))}
          </List>
        </div>
      </div>
    </>
  );
}

export default UserBookings;

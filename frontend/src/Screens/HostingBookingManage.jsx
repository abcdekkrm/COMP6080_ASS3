import React, { useEffect } from 'react';
import Config from '../config.json';
import { makeStyles, Typography } from '@material-ui/core';
import Nav from '../Components/Nav';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { format } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// import DeleteIcon from '@mui/icons-material/Delete';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';

const HostingBookingManage = () => {
  useEffect(() => {
    let ignore = false;
    if (!ignore) { getBooking() }
    return () => { ignore = true; }
  }, []);
  const useStyles = makeStyles({
    popup_syles: {
      background: 'white',
      // border: '1px solid #ccc',
      height: '92vh',
      // width: '100vw',
      padding: '1vw',
      zIndex: '1200px',
    },
    closeIcon: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: '0',
    },
    list: {
      width: '90vw',
    }
  });
  const classes = useStyles();
  const listingId = localStorage.getItem('listingId');
  const token = localStorage.getItem('token');
  const [requirements, setRequire] = React.useState();
  const closeManage = () => {
    window.location.href = '/User-Listings';
  }
  const getBooking = async () => {
    const response = await fetch(`http://localhost:${Config.BACKEND_PORT}/bookings`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token
        },
      });
    const data = await response.json();
    console.log(data);
    if (!data.error) {
      setRequire(data.bookings)
    }
  }
  const acceptBooking = async (bookingId, pos) => {
    const response = await fetch(`http://localhost:${Config.BACKEND_PORT}/bookings/accept/${bookingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token
        },
      });
    const data = await response.json();
    console.log(data);
    if (!data.error) {
      const copyReqArr = Object.assign([], requirements);
      copyReqArr.splice(pos, 1);
      setRequire(copyReqArr);
    }
  }
  const declineBooking = async (bookingId, pos) => {
    const response = await fetch(`http://localhost:${Config.BACKEND_PORT}/bookings/decline/${bookingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token
        },
      });
    const data = await response.json();
    console.log(data);
    if (!data.error) {
      const copyReqArr = Object.assign([], requirements);
      copyReqArr.splice(pos, 1);
      setRequire(copyReqArr);
    }
  }
  return (
    <>
      <Nav />
      <div className={classes.popup_syles} id='edit-listing-popup'>
        <div className={classes.closeIcon}>
          <IconButton>
            <CloseIcon onClick={closeManage}/>
          </IconButton>
          <div>
          <Typography variant="h6" gutterBottom>
            Pending Booking Requests
          </Typography>
            <List className={classes.list}>
              {requirements?.map((booking, pos) => {
                console.log(booking);
                console.log(booking.dateRange[0]);
                if (booking.listingId === listingId && booking.status === 'pending') {
                  return (
                    <ListItem
                    key={pos}
                    secondaryAction={
                      <IconButton edge="end" aria-label="Manage">
                        <CheckOutlinedIcon onClick={() => acceptBooking(booking.id, pos)} style={{ color: 'green', cursor: 'pointer' }}/>
                        <ClearOutlinedIcon onClick={() => declineBooking(booking.id, pos)} style={{ color: 'red', cursor: 'pointer' }}/>
                      </IconButton>
                    }
                    // action={
                    //   <IconButton edge="end" aria-label="Accept">
                    //     <CheckOutlinedIcon />
                    //   </IconButton>
                    // }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <HolidayVillageOutlinedIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={'Booking Email: ' + ` ${booking.owner} `}
                      secondary={` ${format(new Date(booking.dateRange[0]), 'MM/dd/yyyy')} - ${format(new Date(booking.dateRange[1]), 'MM/dd/yyyy')} `}
                    />
                  </ListItem>
                  )
                } else {
                  return (<div key={pos}></div>)
                }
              })}
            </List>
          </div>
          {/* <Button onClick={handleGetBooking}>Get Booking</Button> */}
        </div>
      </div>
    </>
  )
};
export default HostingBookingManage;

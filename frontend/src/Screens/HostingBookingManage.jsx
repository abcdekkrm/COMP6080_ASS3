import React, { useEffect, useState } from 'react';
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
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Box, Tab, Tabs } from '@mui/material';

const HostingBookingManage = () => {
  useEffect(() => {
    let ignore = false;
    if (!ignore) { getBooking(); getListing() }
    return () => { ignore = true; }
  }, []);
  const useStyles = makeStyles({
    popup_syles: {
      background: 'white',
      height: '92vh',
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
    content: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    list: {
      width: '90vw',
      backgroundColor: '#E2EEF5',
      height: '50vh',
      overflowY: 'scroll',
    },
    statistics: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '5px',
      width: '90vw',
      float: 'left',
      color: '#555'
    }
  });
  const classes = useStyles();
  const listingId = localStorage.getItem('listingId');
  const token = localStorage.getItem('token');
  const [title, setTitle] = React.useState('');
  const [since, setSince] = React.useState('');
  const [dateRange, setRange] = React.useState('');
  const [requirements, setRequire] = React.useState();
  const [tabIndex, setTabIndex] = useState(0);
  let profit = 0;
  let nights = 0;
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const closeManage = () => {
    window.location.href = '/User-Listings';
  }
  const getListing = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:${Config.BACKEND_PORT}/listings/${listingId}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token
        },
      });
    const data = await response.json();
    if (!data.error) {
      setTitle(data.listing.title);
      setSince(format(new Date(data.listing.postedOn), 'dd/MM/yyyy'));
      setRange(new Date().getDate() - new Date(data.listing.postedOn).getDate() + 1);
      console.log('hi');
    }
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
      console.log(localStorage.getItem('listing'));
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
        </div>
        <div className={classes.content}>
          <Typography variant="h3" gutterBottom style={{ width: '90vw', float: 'left', fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.statistics}>
            <CalendarMonthOutlinedIcon />up online since {since}
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.statistics}>
            <PublicOutlinedIcon /> published {dateRange} days
          </Typography>
          {requirements?.map((booking, pos) => {
            console.log(new Date(booking.dateRange[1]).getFullYear());
            if (new Date(booking.dateRange[1]).getFullYear() === new Date().getFullYear()) {
              profit += booking.totalPrice;
              nights += (new Date(booking.dateRange[1]).getDate() - new Date(booking.dateRange[0]).getDate());
            }
            return (
              <div key={pos}></div>
            )
          })}
          <Typography variant="body1" gutterBottom className={classes.statistics}>
            <BedtimeOutlinedIcon /> {new Date().getFullYear()} total booking {nights} nights
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.statistics}>
            <AttachMoneyOutlinedIcon /> {new Date().getFullYear()} total profit ${profit}
          </Typography>
          <Tabs aria-label="basic tabs example" onChange={handleTabChange}>
            <Tab label="Pending Booking Requests" />
            <Tab label="Booking History" />
          </Tabs>
          {tabIndex === 0 && (
            <Box>
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
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <HolidayVillageOutlinedIcon/>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={'Booking Email: ' + ` ${booking.owner} `}
                          secondary={` ${format(new Date(booking.dateRange[0]), 'dd/MM/yyyy')} - ${format(new Date(booking.dateRange[1]), 'dd/MM/yyyy')} `}
                        />
                      </ListItem>
                      )
                    } else {
                      return (<div key={pos}></div>)
                    }
                  })}
                </List>
              </div>
              </Box>
          )}
          {tabIndex === 1 && (
            <Box>
              <div>
                <Typography variant="h6" gutterBottom>
                  Booking History
                </Typography>
                <List className={classes.list}>
                  {requirements?.map((booking, pos) => {
                    console.log(booking);
                    console.log(booking.dateRange[0]);
                    if (booking.listingId === listingId && booking.status !== 'pending') {
                      return (
                        <ListItem
                          key={pos}
                        >
                        <ListItemAvatar>
                          <Avatar>
                            <HolidayVillageOutlinedIcon/>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={'Booking Email: ' + ` ${booking.owner} ` }
                          secondary={
                            <React.Fragment>
                              <Typography >{booking.status}</Typography>
                              {format(new Date(booking.dateRange[0]), 'dd/MM/yyyy')} - {format(new Date(booking.dateRange[1]), 'dd/MM/yyyy')}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      )
                    } else {
                      return (<div key={pos}></div>)
                    }
                  })}
                </List>
              </div>
            </Box>
          )}
        </div>
      </div>
    </>
  )
};
export default HostingBookingManage;

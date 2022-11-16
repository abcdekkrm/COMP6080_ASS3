import React, { useState } from 'react';
import Config from '../config.json';
import { makeStyles, Button, TextField } from '@material-ui/core';
import { DateRange } from 'react-date-range';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
// import ResponsiveDateRangePicker from '../Components/DateRangePicker';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import InputAdornment from '@mui/material/InputAdornment';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import { addDays, format } from 'date-fns';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';

const DateRangeSelect = ({ closeDate, listingId }) => {
  const useStyles = makeStyles({
    popup: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px',
    },
    button: {
      backgroundColor: 'white',
      margin: '5px',
    },
    popup_syles: {
      background: 'white',
      // border: '1px solid #ccc',
      height: '90vh',
      width: '50vw',
      padding: '1vw',
      overflowY: 'scroll',
      // zIndex: '1200px',
    },
    closeIcon: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: '0',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      width: '100%',
      display: 'flex',
      // flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: '1%',
    },
    availableDate: {
      width: '90%',
      height: '50%',
      overflowY: 'scroll',
    },
    selectorPopup: {
      display: 'none',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000px',
    },
    selector: {
      height: '85vh',
      width: '50vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    inputDate: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    textDate: {
      width: '250px',
    },
    list: {
      height: '60vh',
      overflowY: 'scroll',
    },
  })
  const classes = useStyles();
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [selectionRange, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    }
  ])
  const [selectDate, setDate] = useState(` ${format(selectionRange[0].startDate, 'MM/dd/yyyy')} to ${format(selectionRange[0].endDate, 'MM/dd/yyyy')} `);
  const [DateArr, setDateArr] = React.useState();
  const handleSelect = (ranges) => {
    console.log(ranges);
    setRange([ranges.selection]);
    setDate(` ${format(selectionRange[0].startDate, 'MM/dd/yyyy')} to ${format(selectionRange[0].endDate, 'MM/dd/yyyy')} `);
  }
  // function handleSelect (ranges) {
  //   console.log(ranges);
  // {
  //   selection: {
  //     startDate: [native Date Object],
  //     endDate: [native Date Object],
  //   }
  // }
  // }
  // const selectionRange = {
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   key: 'selection',
  // }
  const handleOpenDateSelect = () => {
    document.getElementById('selector').style.display = 'flex';
  }
  const handleAddDate = () => {
    const copyDateArr = Object.assign([], DateArr);
    copyDateArr.push({ start: selectionRange[0].startDate, end: selectionRange[0].endDate });
    setDateArr(copyDateArr);
    closeSelectDate();
  }
  const handleDeleteDate = (pos) => {
    const copyDateArr = Object.assign([], DateArr);
    copyDateArr.splice(pos, 1);
    setDateArr(copyDateArr);
  }
  const closeSelectDate = () => {
    document.getElementById('selector').style.display = 'none';
  }
  const handleGoLive = async () => {
    const token = localStorage.getItem('token');
    console.log(listingId);
    const response = await fetch(`http://localhost:${Config.BACKEND_PORT}/listings/publish/${listingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(
          {
            availability: DateArr
          }
        )
      });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setAlertContent(data.error);
      setAlert(true);
    } else {
      closeDate();
    }
  }
  return (
    <>
      <div className={classes.popup}>
        {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
        <div className={classes.popup_syles} id='create-listing-popup'>
          <div className={classes.closeIcon}>
            <IconButton onClick={closeDate}>
              <CloseIcon/>
            </IconButton>
          </div>
          <div className={classes.title}>
            Add Available Date
            <IconButton onClick={handleOpenDateSelect}>
              <AddCircleOutlinedIcon />
            </IconButton>
          </div>
          <div>
            {/* <div className={classes.availableDate}>
              {DateArr?.map((date, pos) => {
                console.log(pos);
                return (
                  <div key={pos}>
                    <input value={` ${format(date.start, 'MM/dd/yyyy')} to ${format(date.end, 'MM/dd/yyyy')} `}></input>
                  </div>
                )
              })}
            </div> */}
            <List className={classes.list}>
              {DateArr?.map((date, pos) => {
                return (
                  <ListItem
                    key={pos}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDate(pos)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <DateRangeRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={` ${format(date.start, 'MM/dd/yyyy')} to ${format(date.end, 'MM/dd/yyyy')} `}
                      // secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                )
              })}
            </List>
            <div className={classes.selectorPopup} id='selector'>
              <div className={classes.selector} >
                <div className={classes.inputDate}>
                  <TextField
                    value={selectDate}
                    label="Selected Date"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DateRangeRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    className={classes.textDate}
                  />
                  <Button onClick={handleAddDate}>Select</Button>
                  <Button onClick={closeSelectDate}>Cancel</Button>
                </div>
                <DateRange
                  ranges={selectionRange}
                  onChange={handleSelect}
                  moveRangeOnFirstSelection={false}
                  minDate={new Date()}
                />
              </div>
            </div>
            <Button onClick={handleGoLive}>Go Live</Button>
          </div>
        </div>
      </div>
    </>
  )
}
DateRangeSelect.propTypes = {
  closeDate: PropTypes.func,
  listingId: PropTypes.number,
}
export default DateRangeSelect;

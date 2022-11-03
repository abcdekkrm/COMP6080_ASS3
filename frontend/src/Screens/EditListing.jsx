import React from 'react';
import * as ReactDOM from 'react-dom';
import Config from '../config.json';
import { makeStyles, TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

const EditListing = ({ closeEditPopup }) => {
  // const useStyles = makeStyles
  const useStyles = makeStyles({
    root: {
      width: 300,
    },
    popup_syles: {
      background: 'white',
      border: '1px solid #ccc',
      height: '80vh',
      width: '80%',
      padding: '1vw',
      zIndex: '1200px'
    },
    background: {
      position: 'absolute',
      height: '100vh',
      width: '100vw',
      // background: 'black',
      // display: flexbox,
      // alignItems: 'flex-end',
      // justifyContent: 'center',
      // opacity: '20%',
      // zIndex: '1000px'
    }
  });
  const [title, setTitle] = React.useState('Old Title');
  const [address, setAddress] = React.useState('Old Address');
  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };
  const handleChangeAddress = event => {
    setAddress(event.target.value);
  };
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 10,
      label: '1',
    },
    {
      value: 20,
      label: '2',
    },
    {
      value: 30,
      label: '3',
    },
    {
      value: 40,
      label: '4',
    },
    {
      value: 50,
      label: '5',
    },
    {
      value: 60,
      label: '6',
    },
    {
      value: 70,
      label: '7',
    },
    {
      value: 80,
      label: '8',
    },
    {
      value: 90,
      label: '9',
    },
    {
      value: 100,
      label: '10+',
    },
  ];
  function valuetext (value) {
    return `${value}`;
  }
  function valueLabelFormat (value) {
    return marks.findIndex((mark) => mark.value === value);
  }
  const classes = useStyles();
  return (
    // <div className={classes.background} id='popup-background'>
    <div className={classes.popup_syles} id='edit-listing-popup'>
      {/* <IconButton>
        <CloseIcon />
      </IconButton> */}
      <Button onClick={closeEditPopup}>&times;</Button>
      <div>
        <TextField
        id="edit-title"
        label="title"
        value={title}
        onChange={handleChangeTitle}
        />
      </div>
      <div>
        <TextField
        id="edit-address"
        label="address"
        value={address}
        onChange={handleChangeAddress}
        />
      </div>
      <div className={classes.root} id='bathroom-slider'>
        <Typography id="discrete-slider-restrict" gutterBottom>
          Number of bathroom
        </Typography>
        <Slider
          defaultValue={20}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-restrict"
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </div>
      <div className={classes.root} id='room-slider'>
        <Typography id="discrete-slider-restrict" gutterBottom>
          Number of room
        </Typography>
        <Slider
          defaultValue={20}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-restrict"
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </div>
      <Button>Save Edit</Button>
    </div>
  );
};
EditListing.propTypes = {
  closeEditPopup: PropTypes.func
};
export default EditListing;

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from '@mui/material';

const SimplePopup = ({ text, closePopup }) => {
  const popupStyle = {
    display: 'block',
    height: '20%',
    width: '30%',
    position: 'absolute',
    left: '35%',
    top: '40%',
    zIndex: '1000',
    padding: '1vw',
  };

  const textStyle = {
    whiteSpace: 'pre-wrap'
  }

  return (
    <Paper className='popup-container' style={popupStyle}>
     <div className='popup-body'>
      <Button onClick={closePopup}>&times;</Button>
      <p style = {textStyle}>{text}</p>
     </div>
    </Paper>
  );
};

SimplePopup.propTypes = {
  closePopup: PropTypes.func,
  text: PropTypes.string
};

export default SimplePopup;

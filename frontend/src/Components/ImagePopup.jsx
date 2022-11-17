import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const ImagePopup = ({ text, closePopup }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  const MobilePopupStyle = {
    display: 'block',
    height: '40%',
    width: '80%',
    position: 'absolute',
    left: '10%',
    top: '30%',
    zIndex: '1000',
    padding: '1vw',
  };

  const popupStyle = {
    display: 'block',
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: '0%',
    top: '0%',
    zIndex: '1000',
    padding: '1vw',
  };

  const textStyle = {
    whiteSpace: 'pre-wrap'
  }

  return (
    <>
    {isMobile
      ? <>
        <Paper className='popup-container' style={MobilePopupStyle}>
          <div className='popup-body'>
          <Button onClick={closePopup}>&times;</Button>
          <p style = {textStyle}>{text}</p>
          </div>
        </Paper>
        </>
      : <>
        <Paper className='popup-container' style={popupStyle}>
          <div className='popup-body'>
            <Button onClick={closePopup}>&times;</Button>
            <p style = {textStyle}>{text}</p>
          </div>
        </Paper>
        </>
    }
    </>
  );
};

ImagePopup.propTypes = {
  closePopup: PropTypes.func,
  text: PropTypes.object
};

export default ImagePopup;

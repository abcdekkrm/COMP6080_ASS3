import React from 'react';
import PropTypes from 'prop-types';

const SimplePopup = ({ text, closePopup }) => {
  const popupStyle = {
    display: 'block',
    height: '500%',
    width: '30%',
    background: 'white',
    position: 'absolute',
    left: '35%',
    top: '300%',
    zIndex: '1000',
    padding: '1vw',
    border: '0.1vw solid rgb(182, 182, 182)',
  };

  return (
    <div className='popup-container' style={popupStyle}>
     <div className='popup-body'>
      <h1>{text}</h1>
      <button onClick={closePopup}>&times;</button>
     </div>
    </div>
  );
};

SimplePopup.propTypes = {
  closePopup: PropTypes.func,
  text: PropTypes.func
};

export default SimplePopup;

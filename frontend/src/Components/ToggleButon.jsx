import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';

export default function ColorToggleButton ({ handleChange, type }) {
  //   const [alignment, setAlignment] = React.useState('web');
  //   const handleChange = (event, newAlignment) => {
  //     setAlignment(newAlignment);
  //   };

  return (
    <ToggleButtonGroup
      color="primary"
      value={type}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="house">
        <HomeOutlinedIcon />
        House
      </ToggleButton>
      <ToggleButton value="apartment">
        <ApartmentOutlinedIcon />
        Apartment
      </ToggleButton>
      <ToggleButton value="guesthouse">
        <NightShelterOutlinedIcon />
        Guesthouse
      </ToggleButton>
      <ToggleButton value="hotel">
        <HotelOutlinedIcon />
        Hotel
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
ColorToggleButton.propTypes = {
  handleChange: PropTypes.func,
  type: PropTypes.string,
};

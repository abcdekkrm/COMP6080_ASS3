import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import { useMediaQuery } from 'react-responsive'

export default function ColorToggleButton ({ handleChange, type }) {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });
  //   const [alignment, setAlignment] = React.useState('web');
  //   const handleChange = (event, newAlignment) => {
  //     setAlignment(newAlignment);
  //   };

  return (
    <>
      {isMobile
        ? <ToggleButtonGroup
            color="primary"
            value={type}
            exclusive
            onChange={handleChange}
            aria-label="Small"
            size='small'
          >
            <ToggleButton value="house" style={{ fontSize: '1vw' }}>
              <HomeOutlinedIcon />
              House
            </ToggleButton>
            <ToggleButton value="apartment" style={{ fontSize: '1vw' }}>
              <ApartmentOutlinedIcon />
              Apartment
            </ToggleButton>
            <ToggleButton value="guesthouse" style={{ fontSize: '1vw' }}>
              <NightShelterOutlinedIcon />
              Guesthouse
            </ToggleButton>
            <ToggleButton value="hotel" style={{ fontSize: '1vw' }}>
              <HotelOutlinedIcon />
              Hotel
            </ToggleButton>
          </ToggleButtonGroup>
        : <ToggleButtonGroup
            role='toggleGroup'
            color="primary"
            value={type}
            exclusive
            onChange={handleChange}
            aria-label="Small sizes"
            size='small'
          >
            <ToggleButton role="houseButton" value="house">
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
      }
    </>
  );
}
ColorToggleButton.propTypes = {
  handleChange: PropTypes.func,
  type: PropTypes.string,
};

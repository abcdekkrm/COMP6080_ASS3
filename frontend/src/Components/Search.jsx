import React from 'react';
import {
  TextField
} from '@material-ui/core';
import Box from '@mui/material/Box';
import { Slider } from '@mui/material';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

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

function Search () {
  return (
    <>
    <form>
     <div className="search-body">
      <h3 style={{ color: 'black' }}>Find your perfect homestay today.</h3>
      <TextField
        id="outlined-basic"
        variant="outlined"
        type="text"
        placeholder="Start searching ..."
        inputProps={{
          style: {
            padding: 5,
            width: '20vw'
          }
        }}
      />
     </div>
     <Box sx={{ width: '80%', margin: 'auto', marginTop: '10%', marginBottom: '10%' }}>
      <p>Filter by number of bedrooms</p>
      <Slider
        aria-label="Restricted values"
        defaultValue={1}
        getAriaValueText={valuetext}
        step={null}
        marks={marks}
      />
    </Box>
    <Box sx={{ width: '80%', margin: 'auto', marginTop: '10%', marginBottom: '10%' }}>
      <p>Filter by Price</p>
      <RangeSlider />
    </Box>
    </form>
    </>
  );
}

export default Search;

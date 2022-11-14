import React, { useState } from 'react';
import {
  TextField
} from '@material-ui/core';
import { Divider, Button } from '@mui/material';
import DiscreteSliderLabel from './Slider';
import BasicDateRangePicker from './DateRangePicker';
import * as ReactDOM from 'react-dom';
import Listings from '../Screens/Listings';

function Search () {
  const [search, setSearch] = useState('');
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('99999999');
  // const [bed, setBed] = useState('0');

  const handleSearchChange = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  const searchHandler = () => {
    setMin('0');
    setMax('99999999');
    // setBed('0');
    ReactDOM.render(<Listings search={search}/>, document.querySelector('#Listings-box'));
  };

  const handleMinChange = (e) => {
    setMin(e.target.value);
  };

  const handleMaxChange = (e) => {
    setMax(e.target.value);
  };

  const priceHandler = () => {
    setSearch('');
    // setBed('0');
    ReactDOM.render(<Listings min={min} max={max}/>, document.querySelector('#Listings-box'));
  };

  // const handleBedChange = (e) => {
  //   setBed((e.target.value) / 10);
  // };

  // const bedHandler = () => {
  //   setSearch('');
  //   setMin('0');
  //   setMax('99999999');
  //   ReactDOM.render(<Listings bed={bed}/>, document.querySelector('#Listings-box'));
  //   setBed('0');
  // }

  return (
    <>
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
          width: '20vw',
        }
      }}
      style= {{ marginTop: '10%' }}
      onChange={handleSearchChange}
      value={search}
    />
    <Button type="submit" onClick={searchHandler}>Search</Button>
    </div>
  <Divider/>
    <div id='room-slider' style={{ width: '80%', margin: 'auto' }} >
      <p>Number of bedrooms</p>
      <DiscreteSliderLabel
        // onChange={handleBedChange}
        // value={bed}
      />
      <Button type="submit">Apply</Button>
    </div>
    <Divider/>
    <div id='date-range' style={{ width: '80%', margin: 'auto' }} >
      <p>Date range</p>
      <BasicDateRangePicker/>
      <Button type="submit">Apply</Button>
    </div>
    <Divider/>
    <div id='price-range' style={{ width: '80%', margin: 'auto' }} >
      <p>Filter by Price</p>
      <span>
        <TextField
        id="outlined-basic"
        variant="outlined"
        type="text"
        inputProps={{
          style: {
            width: '5vw',
          }
        }}
        style= {{ margin: 'auto', marginRight: '5%' }}
        label="min"
        onChange={handleMinChange}
        value={min}
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        type="text"
        inputProps={{
          style: {
            width: '5vw',
          }
        }}
        style= {{ margin: 'auto', marginLeft: '5%' }}
        label="max"
        onChange={handleMaxChange}
        value={max}
      />
    </span>
    <Button type="submit" onClick={priceHandler}>Apply</Button>
    </div>
    </>
  );
}

export default Search;

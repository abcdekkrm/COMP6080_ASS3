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
  // const [bedroom, setBed] = React.useState('0');

  // const handleBed = (event, newValue) => {
  //   setBed(newValue / 10);
  // };
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  const searchHandler = () => {
    console.log(search);
    ReactDOM.render(<Listings search={search}/>, document.querySelector('#Listings-box'));
  };

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
        // handleChange={handleBed}
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
        type="number"
        inputProps={{
          style: {
            width: '5vw',
          }
        }}
        style= {{ margin: 'auto', marginRight: '5%' }}
        label="min"
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        type="number"
        inputProps={{
          style: {
            width: '5vw',
          }
        }}
        style= {{ margin: 'auto', marginLeft: '5%' }}
        label="max"
      />
    </span>
    <Button type="submit">Apply</Button>
    </div>
    </>
  );
}

export default Search;

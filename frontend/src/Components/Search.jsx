import React, { useState } from 'react';
import {
  TextField
} from '@material-ui/core';
import { Divider, Button } from '@mui/material';
import DiscreteSliderLabel from './Slider';
import BasicDateRangePicker from './DateRangePicker';
import * as ReactDOM from 'react-dom';
import Listings from '../Screens/Listings';
import { useMediaQuery } from 'react-responsive'

function Search () {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  const [search, setSearch] = useState('');
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('99999999');
  const [bed, setBed] = useState(0);

  const handleSearchChange = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  const searchHandler = () => {
    setMin('0');
    setMax('99999999');
    setBed(0);
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
    setBed(0);
    ReactDOM.render(<Listings min={min} max={max}/>, document.querySelector('#Listings-box'));
  };

  const handleBedChange = (e, newValue) => {
    setBed(String(newValue / 10));
  };

  const bedHandler = () => {
    setSearch('');
    setMin('0');
    setMax('99999999');
    ReactDOM.render(<Listings bed={bed}/>, document.querySelector('#Listings-box'));
  }

  const clearHandler = () => {
    setSearch('');
    setMin('0');
    setMax('99999999');
    window.location.href = '/Landing';
  }

  return (
    <>
    <div className="search-body">
    <h3 style={{ color: 'black' }}>Find your perfect homestay today.</h3>
    {isMobile
      ? <TextField
          id="outlined-basic"
          variant="outlined"
          type="text"
          placeholder="Start searching ..."
          inputProps={{
            style: {
              padding: 5,
              width: '80vw',
            }
          }}
          onChange={handleSearchChange}
          value={search}
        />
      : <TextField
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
    }
    <span>
      <Button type="submit" onClick={searchHandler}>Search</Button>
      <Button onClick={clearHandler}>Clear</Button>
    </span>
    </div>
  <Divider/>
    <div id='room-slider' style={{ width: '80%', margin: 'auto' }} >
      <p>Number of bedrooms</p>
      <DiscreteSliderLabel
        handleChange={handleBedChange}
        currValue={bed}
      />
      <Button type="submit" onClick={bedHandler}>Apply</Button>
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
        {isMobile
          ? <>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="text"
              inputProps={{
                style: {
                  width: '20vw',
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
                  width: '20vw',
                }
              }}
              style= {{ margin: 'auto', marginLeft: '5%' }}
              label="max"
              onChange={handleMaxChange}
              value={max}
            />
            </>
          : <>
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
            </>
      }
    </span>
    <span>
      <Button type="submit" onClick={priceHandler}>Apply</Button>
      <Button onClick={clearHandler}>Clear</Button>
    </span>
    </div>
    </>
  );
}

export default Search;

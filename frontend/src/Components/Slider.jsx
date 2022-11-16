import * as React from 'react';
// import Box from '@mui/material/Box';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

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

export default function DiscreteSliderLabel ({ handleChange, currValue }) {
  return (
    <Slider
      // defaultValue={10}
      valueLabelFormat={valueLabelFormat}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider-restrict"
      step={null}
      valueLabelDisplay="auto"
      marks={marks}
      onChange={handleChange}
      value={Number(currValue) * 10}
    />
  );
}
DiscreteSliderLabel.propTypes = {
  handleChange: PropTypes.func,
  currValue: PropTypes.string,
};

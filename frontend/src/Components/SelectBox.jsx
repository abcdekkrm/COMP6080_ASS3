import * as React from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import PropTypes from 'prop-types';

export default function SelectSmall ({ handleChange, currValue }) {
  return (
    <NativeSelect
      role='select'
      onChange={handleChange}
      value={Number(currValue)}
    >
      <option role='option' value={0}>0</option>
      <option role='option' value={1}>1</option>
      <option role='option' value={2}>2</option>
      <option role='option' value={3}>3</option>
      <option role='option' value={4}>4</option>
      <option role='option' value={5}>5</option>
      <option role='option' value={6}>6</option>
      <option role='option' value={7}>7</option>
      <option role='option' value={8}>8</option>
      <option role='option' value={9}>9</option>
      <option role='option' value={10}>10+ contact for more info</option>
    </NativeSelect>
  );
}
SelectSmall.propTypes = {
  handleChange: PropTypes.func,
  currValue: PropTypes.string,
};

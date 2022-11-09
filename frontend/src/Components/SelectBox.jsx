import * as React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@mui/material/InputLabel';
// import option from '@mui/material/option';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import PropTypes from 'prop-types';

export default function SelectSmall ({ handleChange }) {
  // const [age, setAge] = React.useState('2');
  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //   // setAge(event.target.value);
  // };
  // const useStyles = makeStyles({
  //   Select: {
  //     width: '45%',
  //   },
  // });
  // const classes = useStyles();
  return (
    <NativeSelect
      // value={age}
      // className={classes.Select}
      onChange={handleChange}
    >
      {/* <option value={10}>Ten</option>
      <option value={20}>Twenty</option>
      <option value={30}>Thirty</option> */}
      {/* <option value="">None</option> */}
      <option value={0}>0</option>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
      <option value={9}>9</option>
      <option value={10}>10+ contact for more info</option>
      {/* <option value={10}>10+ contact for more info</option> */}
    </NativeSelect>
  );
}
SelectSmall.propTypes = {
  handleChange: PropTypes.func,
};

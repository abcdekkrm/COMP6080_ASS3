import * as React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@mui/material/InputLabel';
// import option from '@mui/material/option';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';

export default function SelectSmall () {
//   const [age, setAge] = React.useState('');
//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };
  // const useStyles = makeStyles({
  //   Select: {
  //     width: '45%',
  //   },
  // });
  // const classes = useStyles();
  return (
    <NativeSelect
      defaultValue={2}
    >
      {/* <option value={10}>Ten</option>
      <option value={20}>Twenty</option>
      <option value={30}>Thirty</option> */}
      <option value="">0</option>
      <option value={0}>1</option>
      <option value={1}>2</option>
      <option value={2}>3</option>
      <option value={3}>4</option>
      <option value={4}>5</option>
      <option value={5}>6</option>
      <option value={6}>7</option>
      <option value={7}>8</option>
      <option value={8}>9</option>
      <option value={9}>10+ contact for more info</option>
      {/* <option value={10}>10+ contact for more info</option> */}
    </NativeSelect>
  );
}

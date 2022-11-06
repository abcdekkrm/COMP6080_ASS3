import React from 'react';
import {
  TextField
} from '@material-ui/core';

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
    </form>
    </>
  );
}

export default Search;

import React from 'react';
import './App.css';
import {
  Drawer, TextField, Button, Typography,
} from '@material-ui/core';

function Search() {
	return (
			<Drawer class="column" id="search">
				<TextField id="outlined-basic" label="search-bar" variant="Start searching" />
			</Drawer>
	);
};
  
export default Search;
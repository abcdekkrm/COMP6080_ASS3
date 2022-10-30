import React from 'react';
import './App.css';
import {
  AppBar, Toolbar, Button, Typography,
} from '@material-ui/core';

function Nav() {
	return (
		<header>
			<nav>
				<AppBar position="static">
					<Toolbar>
						<img src="logo.svg" class="logo" alt="AirBrb logo" />
						<Typography 
						variant="h6"
						sx={{
								display: 'inline-flex',
								height: '8vh',
								width: '100%',
						}}
						>
							AirBrB
						</Typography>
						<Button>Login / Sign up</Button>
					</Toolbar>
				</AppBar>
			</nav>
		</header>
  );
};
  
export default Nav;
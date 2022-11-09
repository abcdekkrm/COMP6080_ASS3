import React from 'react';
import Nav from '../Components/Nav';
import {
  Grid, Box, Paper, styled
} from '@material-ui/core'
import Search from '../Components/Search';
import Listings from './Listings';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: '1vh',
  height: '100vh'
}));

function Landing () {
  const logged = localStorage.getItem('logged');

  return (
   <>
    <Nav/>
    {logged
      ? <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Item><Search /></Item>
            </Grid>
            <Grid item xs={9}>
              <Item>
                <Listings />
              </Item>
            </Grid>
          </Grid>
        </Box>
      : null
    }
   </>
  );
}

export default Landing;

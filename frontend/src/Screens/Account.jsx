import React from 'react';
import Nav from '../Components/Nav';
import {
  Grid, Box, Paper, styled
} from '@material-ui/core'
import SimpleTabs from '../Components/SimpleTabs'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: '1vh',
  height: '10vh'
}));

function Account () {
  const logged = localStorage.getItem('logged');

  return (
    <>
      <Nav/>
        {logged
          ? <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0} grid-auto-rows='minmax(50px,auto)'>
                <Grid item xs={12}>
                  <Item>
                    <h1>View and edit your listings or check out your current and past bookings.</h1>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item style = {{ height: '70vh' }}>
                    <SimpleTabs />
                  </Item>
                </Grid>
              </Grid>
            </Box>
          : null
    }
    </>
  );
}

export default Account;

import React from 'react';
import Nav from '../Components/Nav';
import {
  Grid, Box, Paper, styled, AppBar, Tabs, Tab
} from '@material-ui/core'
// import TabPanel from '@mui/lab/TabPanel';

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
  const [value, setValue] = React.useState(0);

  function a11yProps (index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
                    <AppBar position="static">
                      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                        <Tab label="Listings" {...a11yProps(0)} />
                        <Tab label="Bookings" {...a11yProps(1)} />
                        <Tab label="..." {...a11yProps(2)} />
                      </Tabs>
                    </AppBar>
                      {/* <TabPanel value={value} index={0}>
                        Item One
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        Item Two
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        Item Three
                      </TabPanel> */}
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

import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import UserListings from '../Screens/UserListings';
import UserBookings from '../Screens/UserBookings'

function SimpleTabs () {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Your Listings" onClick={() => { window.location.href = '/User-Listings' } }/>
          <Tab label="Your Bookings" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <Box>
            <UserListings />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <UserBookings />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SimpleTabs;

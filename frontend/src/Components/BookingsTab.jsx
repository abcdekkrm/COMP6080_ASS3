import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import UserListings from '../Screens/UserListings';

function BookingsTabs () {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Your Listings" onClick={() => { window.location.href = '/User-Listings' } }/>
          <Tab label="Your Bookings" onClick={() => { window.location.href = '/User-Bookings' } }/>
          <Tab label="..." />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 1 && (
          <Box>
            <UserListings />
          </Box>
        )}
        {tabIndex === 0 && (
          <Box>
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BookingsTabs;
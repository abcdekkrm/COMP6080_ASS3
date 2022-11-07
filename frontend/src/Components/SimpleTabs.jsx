import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

function SimpleTabs () {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Your Listings" />
          <Tab label="Your Bookings" />
          <Tab label="..." />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <Box>
            <Typography>Listings go here</Typography>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Typography>Bookings go here</Typography>
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <Typography>...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SimpleTabs;

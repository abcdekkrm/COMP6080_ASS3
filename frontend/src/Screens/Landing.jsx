import React from 'react';
import Nav from '../Components/Nav';
import {
  Grid, Box, Paper, styled
} from '@material-ui/core'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Search from '../Components/Search';
import Listings from './Listings';
import { useMediaQuery } from 'react-responsive'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: '1vh',
  height: 'auto'
}));

function Landing () {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  return (
   <>
    <Nav/>
    <Box sx={{ flexGrow: 1 }}>
      {isMobile
        ? <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p>Expand search filters</p>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Item><Search /></Item>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Item id="Listings-box">
                <Listings/>
              </Item>
            </Grid>
          </Grid>
          </>
        : <>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Item><Search /></Item>
            </Grid>
            <Grid item xs={9}>
              <Item id="Listings-box">
                <Listings/>
              </Item>
            </Grid>
          </Grid>
          </>
      }
    </Box>
   </>
  );
}

export default Landing;

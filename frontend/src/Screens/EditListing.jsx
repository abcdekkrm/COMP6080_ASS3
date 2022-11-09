import React, { useState } from 'react';
// import * as ReactDOM from 'react-dom';
// import Config from '../config.json';
import Nav from '../Components/Nav';
import DiscreteSliderLabel from '../Components/Slider';
import SelectSmall from '../Components/SelectBox';
import { makeStyles, TextField, Button, Typography } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
// import { CloseIcon, ImageIcon, AddCircleOutlineIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const EditListing = ({ listingID }) => {
  // const useStyles = makeStyles
  const useStyles = makeStyles({
    root: {
      width: 300,
    },
    popup_syles: {
      background: 'white',
      border: '1px solid #ccc',
      height: '92vh',
      width: '100%',
      padding: '1vw',
      zIndex: '1200px',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: '1%',
    },
    closeIcon: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: '0',
    },
    textImageContainer: {
      width: '100%',
      height: '84%',
      display: 'flex',
      flexDirection: 'row',
      // backgroundColor: 'blue',
    },
    listingText: {
      height: '100%',
      width: '49%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '1%',
      // backgroundColor: 'blue',
    },
    listingImg: {
      height: '100%',
      width: '49%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1%',
      // backgroundColor: 'blue',
    },
    imageInput: {
      display: 'none',
    },
    thumbnail: {
      height: '20vw',
      width: '20vw',
      // backgroundColor: '#aaa'
    },
    thumbnailActions: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    propertyImgs: {
      border: '1px solid #ccc',
      display: 'flex',
      overflowX: 'auto',
      width: '99%',
      height: '100px',
      gap: '5px',
      // backgroundColor: 'red',
    },
    img: {
      border: '1px solid #ccc',
      width: '98px',
      height: '98px',
      backgroundColor: '#ccc',
      display: 'flex',
      flex: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: '#eee',
        opacity: '20%',
        cursor: 'pointer',
      },
      '& label:hover': {
        cursor: 'pointer',
      }
    },
    delete: {
      position: 'absolute',
      // backgroundColor: 'red',
      // width: '98px',
      // height: '98px',
      bottom: '100%',
      left: '0%',
      zIndex: '1000px',
      '&:hover': {
        backgroundColor: '#eee',
        color: 'red',
        cursor: 'pointer',
      },
    }
  });
  const classes = useStyles();
  const [title, setTitle] = React.useState('Old Title');
  const [price, setPrice] = React.useState('');
  const [address, setAddress] = React.useState('Old Address');
  const [bathroom, setBath] = React.useState('0');
  const [bedroom, setBed] = React.useState('0');
  const [singleBed, setSingle] = React.useState('Old Single');
  const [doubleBed, setDouble] = React.useState('Old Double');
  const [thumbnail, setTnImage] = useState();
  const [imgArr, setImgArr] = React.useState();
  // let imgArr = [];
  // let imgObj = null;
  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };
  const handleChangePrice = event => {
    setPrice(event.target.value);
  };
  const handleChangeAddress = event => {
    setAddress(event.target.value);
  };
  const handleBath = (event, newValue) => {
    setBath(newValue / 10);
  };
  const handleBed = (event, newValue) => {
    setBed(newValue / 10);
  };
  const handleChangeSingle = event => {
    setSingle(event.target.value);
  };
  const handleChangeDouble = event => {
    console.log(event.target.value);
    setDouble(event.target.value);
  };
  const handleChangeThumbnail = event => {
    console.log(event.target.files);
    setTnImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleDeleteThumbnail = () => {
    setTnImage('');
  };
  // setImgArr = set
  const handleUploadProperties = event => {
    console.log(event.target.files);
    console.log(URL.createObjectURL(event.target.files[0]));
    const copyImgArr = Object.assign([], imgArr);
    copyImgArr.push(URL.createObjectURL(event.target.files[0]));
    console.log(copyImgArr.length);
    // console.log(imgArr.length);
    setImgArr(copyImgArr);
  }
  function handleDeleteProperties (pos) {
    // console.log(pos);
    const copyImgArr = Object.assign([], imgArr);
    copyImgArr.splice(pos, 1);
    setImgArr(copyImgArr);
  }
  function closeEdit () {
    window.location.href = '/User-Listings';
  }
  const handleEdit = async () => {
    console.log('edit');
    // closeEditPopup();
    closeEdit();
    console.log(listingID);
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5005/listings/${listingID}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(
          {
            title,
            address,
            price,
            thumbnail,
            metadata: {
              bathroom,
              bedroom,
              singleBed,
              doubleBed,
              imgArr,
            }
          }
        )
      });
    const data = await response.json();
    console.log(data);
  }
  return (
    <>
      <Nav/>
      <div className={classes.popup_syles} id='edit-listing-popup'>
        <div className={classes.closeIcon}>
          <IconButton>
            <CloseIcon onClick={closeEdit}/>
          </IconButton>
        </div>
        <div className={classes.title}><div>Listing Title</div></div>
        {/* <Button onClick={closeEditPopup}>&times;</Button> */}
        <div className={classes.textImageContainer}>
          <div className={classes.listingText} id='edit-listing-text'>
            <div>
              <TextField
              id="edit-title"
              label="title"
              value={title}
              onChange={handleChangeTitle}
              variant="standard"
              />
              <TextField
              id="edit-price"
              label="$ Price per night"
              value={price}
              onChange={handleChangePrice}
              variant="standard"
              />
            </div>
            <div>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '90%',
                }}
              >
                <TextField
                  fullWidth
                  id="edit-address"
                label="Address"
                value={address}
                onChange={handleChangeAddress}
                />
              </Box>
            </div>
            <div className={classes.root} id='bathroom-slider'>
              <Typography id="discrete-slider-restrict" gutterBottom>
                Number of bathroom
              </Typography>
              <DiscreteSliderLabel
                handleChange={handleBath}
              />
            </div>
            <div className={classes.root} id='room-slider'>
              <Typography id="discrete-slider-restrict" gutterBottom>
                Number of room
              </Typography>
              <DiscreteSliderLabel
                handleChange={handleBed}
              />
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                {/* <InputLabel>Sigle Bed</InputLabel> */}
                <InputLabel variant="standard">
                Sigle Bed
                </InputLabel>
                <SelectSmall
                  id="selcte-single"
                  value={singleBed}
                  // label="single bed"
                  handleChange={handleChangeSingle}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                {/* <InputLabel >Double Bed</InputLabel> */}
                <InputLabel variant="standard">
                  Double Bed
                </InputLabel>
                <SelectSmall
                  // defaultValue={1}
                  id="selcte-double"
                  value={doubleBed}
                  // label="double bed"
                  // defaultValue={30}
                  // inputProps={{
                  //   name: 'double bed',
                  //   id: 'selcte-double',
                  // }}
                  handleChange={handleChangeDouble}
                />
              </FormControl>
            </div>
          </div>
          <div className={classes.listingImg} id='edit-listing-image'>
            <img className={classes.thumbnail} src={thumbnail}></img>
            <input className={classes.imageInput} type="file" multiple accept="image/*" id='thumbnailUpload' onChange={handleChangeThumbnail}/>
            <div className={classes.thumbnailActions}>
              <label htmlFor='thumbnailUpload'>
                <ImageIcon />
              </label>
              <DeleteIcon onClick={handleDeleteThumbnail}/>
            </div>
            <input className={classes.imageInput} type="file" multiple accept="image/*" id='propertyImgUpload' onChange={handleUploadProperties}/>
            <div className={classes.propertyImgs} id='property-images'>
              <div className={classes.img}>
                <label htmlFor='propertyImgUpload'>
                  <AddCircleOutlineIcon fontSize="large"/>
                </label>
              </div>
              {imgArr?.map((img, pos) => {
                console.log(pos);
                return (
                  <div key={pos}>
                    <img src={img} className={classes.img}></img>
                    <IconButton className={classes.delete} onClick={() => handleDeleteProperties(pos)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Button onClick={handleEdit}>Save Edit</Button>
      </div>
    </>
  );
};
EditListing.propTypes = {
  listingID: PropTypes.string
};
export default EditListing;

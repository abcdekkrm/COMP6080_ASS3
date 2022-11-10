import React, { useState } from 'react';
// import * as ReactDOM from 'react-dom';
import Config from '../config.json';
// import Nav from '../Components/Nav';
import DiscreteSliderLabel from '../Components/Slider';
import SelectSmall from '../Components/SelectBox';
import { makeStyles, TextField, Button, Typography } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Input from '@mui/material/Input';
// import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';
import IconButton from '@mui/material/IconButton';
// import { CloseIcon, ImageIcon, AddCircleOutlineIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormGroup } from '@mui/material';

const CreateListing = () => {
  const useStyles = makeStyles({
    root: {
      width: 300,
    },
    popup_syles: {
      background: 'white',
      // border: '1px solid #ccc',
      height: '92vh',
      // width: '100vw',
      padding: '1vw',
      // zIndex: '1200px',
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
      height: '95%',
      display: 'flex',
      flexDirection: 'row',
      // backgroundColor: 'blue',
    },
    listingText: {
      height: '100%',
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '1%',
      // backgroundColor: 'blue',
    },
    sliderTitle: {
      fontSize: '10px',
    },
    listingImg: {
      height: '100%',
      width: '50%',
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
      width: '30vw',
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
      width: '150px',
      height: '100px',
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
    },
    amenities: {
      display: 'flex',
      flexDirection: 'row',
      border: '1px solid #ccc',
      padding: '5px',
    },
    label: {
      fontSize: '10px',
    }
  });
  const classes = useStyles();
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [bathroom, setBath] = React.useState('0');
  const [bedroom, setBed] = React.useState('0');
  const [singleBed, setSingle] = React.useState('0');
  const [doubleBed, setDouble] = React.useState('0');
  // const [amenitiesArr, setAmenitiesArr] = React.useState();
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
    setSingle(Number(event.target.value));
  };
  const handleChangeDouble = event => {
    console.log(event.target.value);
    setDouble(Number(event.target.value));
  };
  const handleChangeThumbnail = event => {
    console.log(event.target.files);
    setTnImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleDeleteThumbnail = () => {
    setTnImage('');
  };
  const handleCheckBox = event => {
    console.log(event.target.name);
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
  function closeCreate () {
    window.location.href = '/User-Listings';
  }
  const handleCreate = async () => {
    // console.log('create');
    // closeCreatePopup();
    closeCreate();
    // const Authorization = 'Bearer ' + localStorage.token;
    const token = localStorage.getItem('token');
    console.log(thumbnail);
    const response = await fetch(`http://localhost:${Config.BACKEND_PORT}/listings/new`,
      {
        method: 'POST',
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
    // alert(data);
  }
  return (
    <>
      {/* <Nav/> */}
      <div className={classes.popup_syles} id='create-listing-popup'>
        <div className={classes.closeIcon}>
          <IconButton>
            <CloseIcon onClick={closeCreate}/>
          </IconButton>
        </div>
        <div className={classes.textImageContainer}>
          <div className={classes.listingText} id='create-listing-text'>
            <div>
              {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
              <TextField
              id="create-title"
              label="Listing Title"
              value={title}
              onChange={handleChangeTitle}
              variant="standard"
              />
              <TextField
              id="create-price"
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
                  id="create-address"
                label="Address"
                value={address}
                onChange={handleChangeAddress}
                />
              </Box>
            </div>
            <div className={classes.root} id='bathroom-slider'>
              <Typography className={classes.sliderTitle} id="discrete-slider-restrict" gutterBottom>
                Number of bathroom
              </Typography>
              <DiscreteSliderLabel
                // mark={bathroom}
                handleChange={handleBath}
              />
            </div>
            <div className={classes.root} id='room-slider'>
              {/* <Typography id="discrete-slider-restrict" gutterBottom> */}
              <Typography className={classes.sliderTitle} id="discrete-slider-restrict" gutterBottom>
                Number of room
              </Typography>
              {/* </Typography> */}
              <DiscreteSliderLabel
                // defaultValue={20}
                // D={bedroom}
                handleChange={handleBed}
              />
            </div>
            <FormControl size="small" >
              {/* <InputLabel>Sigle Bed</InputLabel> */}
              <InputLabel variant="standard">
              Sigle Bed
              </InputLabel>
              <SelectSmall
                id="selcte-single"
                number={singleBed}
                // label="single bed"
                handleChange={handleChangeSingle}
              />
            </FormControl>
            <FormControl size="small">
              <InputLabel variant="standard">
                Double Bed
              </InputLabel>
              <SelectSmall
                number={doubleBed}
                // onChange={handleChangeDouble}
                handleChange={handleChangeDouble}
              />
            </FormControl>
            <div>
              <div>Amenities</div>
              <div className={classes.amenities}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name="Wi-Fi" />} label="Wi-Fi"/>
                  <FormControlLabel control={<Checkbox size="small" />} label="Kitchen" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Washing machine" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Dryer" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Air-conditioning" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label="Heating" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Dedicated workspace" />
                  <FormControlLabel control={<Checkbox size="small" />} label="TV" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Hair dryer" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Iron" />
                </FormGroup>
              </div>
            </div>
          </div>
          <div className={classes.listingImg} id='create-listing-image'>
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
        {/* <Button onClick={closecreatePopup}>&times;</Button> */}
        <Button onClick={handleCreate}>Create Listing</Button>
      </div>
    </>
  );
};
export default CreateListing;

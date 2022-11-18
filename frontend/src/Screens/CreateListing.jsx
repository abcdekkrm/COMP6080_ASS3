import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import { useMediaQuery } from 'react-responsive';
import DiscreteSliderLabel from '../Components/Slider';
import SelectSmall from '../Components/SelectBox';
import { makeStyles, TextField, Button, Typography } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormGroup } from '@mui/material';
import ColorToggleButton from '../Components/ToggleButon';

const CreateListing = () => {
  const useStyles = makeStyles({
    root: {
      width: 300,
    },
    popup_syles: {
      background: 'white',
      height: '92vh',
      padding: '1vw',
      zIndex: '1200px',
      '@media (max-width: 700px)': {
        height: '100%',
      }
    },
    closeIcon: {
      width: '100vw',
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
      '@media (max-width: 700px)': {
        flexDirection: 'column',
      }
    },
    listingText: {
      height: '100%',
      width: '49%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '1%',
      '@media (max-width: 700px)': {
        width: '95vw',
      }
    },
    sliderTitle: {
      fontSize: '10px',
    },
    listingImg: {
      height: '100%',
      width: '49%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1%',
      '@media (max-width: 700px)': {
        width: '95vw',
      }
    },
    imageInput: {
      display: 'none',
    },
    thumbnail: {
      height: '20vw',
      width: '30vw',
      backgroundColor: '#aaa',
      '@media (max-width: 700px)': {
        height: '62vw',
        width: '93vw',
      }
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
      '@media (max-width: 700px)': {
        width: '93vw',
        height: '80px',
      }
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
      },
      '@media (max-width: 700px)': {
        width: '120px',
        height: '80px',
      }
    },
    delete: {
      position: 'absolute',
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
      '@media (max-width: 700px)': {
        width: '90%',
      }
    },
  });
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [bathroom, setBath] = React.useState('0');
  const [bedroom, setBed] = React.useState('0');
  const [singleBed, setSingle] = React.useState('0');
  const [doubleBed, setDouble] = React.useState('0');
  const [amenities, setAmenities] = React.useState();
  const [thumbnail, setTnDisplayImage] = useState();
  const [thumbnailFile, setTnImage] = useState();
  const [imgArr, setImgArr] = React.useState();
  const [listingType, setListingType] = React.useState('house');
  // const [wifi, setWiFt] = React.useState(false);
  // const [kitchen, setKitchen] = React.useState(false);
  // const [washingMachine, setWashingMachine] = React.useState(false);
  // const [dryer, setDryer] = React.useState(false);
  // const [airConditioning, setAirConditioning] = React.useState(false);
  // const [heating, setHeating] = React.useState(false);
  // const [dedicatedWorkspace, setDedicatedWorkspace] = React.useState(false);
  // const [TV, setTV] = React.useState(false);
  // const [hairDryer, setHairDryer] = React.useState(false);
  // const [iron, setIron] = React.useState(false);
  // const amenities = [wifi]

  // const [imgDisplay, setDisplayImage] = useState();
  // const [propertyFile, setProperty] = useState();
  // const amenitiesArr = [];
  // let imgObj = null;
  useEffect(() => {
    if (thumbnailFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTnDisplayImage(reader.result);
      };
      reader.readAsDataURL(thumbnailFile);
    } else {
      setTnDisplayImage(null);
    }
  }, [thumbnailFile]);
  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };
  const handleChangePrice = event => {
    setPrice(event.target.value);
  };
  const handleChangeAddress = event => {
    setAddress(event.target.value);
  };
  const handleTypeChange = (event, newType) => {
    console.log(event);
    console.log(newType);
    setListingType(newType);
  };
  const handleBath = (event, newValue) => {
    setBath(String(newValue / 10));
  };
  const handleBed = (event, newValue) => {
    setBed(String(newValue / 10));
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
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setTnImage(file);
    } else {
      setTnImage(null);
    }
  };
  const handleDeleteThumbnail = () => {
    setTnImage(null);
  };
  const handleCheckBox = event => {
    console.log(event.target.name);
    const copyAmnArr = Object.assign([], amenities);
    if (event.target.checked) {
      copyAmnArr.push(event.target.name)
    } else { const index = copyAmnArr.indexOf(event.target.name); copyAmnArr.splice(index, 1) }
    setAmenities(copyAmnArr);
    console.log(amenities);
  };
  // setImgArr = set
  const handleUploadProperties = (file) => {
    const copyImgArr = Object.assign([], imgArr);
    const reader = new FileReader();
    reader.onloadend = () => {
      copyImgArr.push(reader.result);
      setImgArr(copyImgArr);
    };
    reader.readAsDataURL(file);
  }
  function handleDeleteProperties (pos) {
    const copyImgArr = Object.assign([], imgArr);
    copyImgArr.splice(pos, 1);
    setImgArr(copyImgArr);
  }
  function closeCreate () {
    window.location.href = '/User-Listings';
  }
  const handleCreate = async () => {
    closeCreate();
    const token = localStorage.getItem('token');
    console.log(thumbnailFile);
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
              listingType,
              amenities,
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
      <div className={classes.popup_syles} id='create-listing-popup'>
        <div className={classes.closeIcon}>
          <IconButton>
            <CloseIcon onClick={closeCreate}/>
          </IconButton>
        </div>
        <div className={classes.textImageContainer}>
          <div className={classes.listingText} id='create-listing-text'>
            <div>
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
              {isMobile
                ? <Box
                    sx={{
                      width: 500,
                      maxWidth: '70%',
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
                : <Box
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
              }
            </div>
            <div>
              <Typography className={classes.sliderTitle} gutterBottom>
                Listing Type
              </Typography>
              <ColorToggleButton
                handleChange={handleTypeChange}
                type={listingType}
              />
            </div>
            <div className={classes.root} id='bathroom-slider'>
              <Typography className={classes.sliderTitle} id="discrete-slider-restrict" gutterBottom>
                Number of bathroom
              </Typography>
              <DiscreteSliderLabel
                // mark={bathroom}
                handleChange={handleBath}
                currValue={bathroom}
              />
            </div>
            <div className={classes.root} id='room-slider'>
              <Typography className={classes.sliderTitle} id="discrete-slider-restrict" gutterBottom>
                Number of room
              </Typography>
              <DiscreteSliderLabel
                handleChange={handleBed}
                currValue={bedroom}
              />
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                {/* <InputLabel>Sigle Bed</InputLabel> */}
                <InputLabel variant="standard">
                Sigle Bed
                </InputLabel>
                <SelectSmall
                  id="selcte-single"
                  currValue={singleBed}
                  // label="single bed"
                  handleChange={handleChangeSingle}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel variant="standard">
                  Double Bed
                </InputLabel>
                <SelectSmall
                  currValue={doubleBed}
                  // onChange={handleChangeDouble}
                  handleChange={handleChangeDouble}
                />
              </FormControl>
              <div>
                <div>Amenities</div>
                <div className={classes.amenities}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name="Wi-Fi" />} label="Wi-Fi"/>
                    <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name="Kitchen" />} label="Kitchen" />
                    <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name='Washing machine' />} label="Washing machine" />
                    <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name="Dryer" />} label="Dryer" />
                    <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name="Air-conditioning" />} label="Air-conditioning" />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name="Heating" />} label="Heating" />
                    <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name="Dedicated workspace" />} label="Dedicated workspace" />
                    <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name="TV" />} label="TV" />
                    <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name="Hair dryer" />} label="Hair dryer" />
                    <FormControlLabel control={<Checkbox size="small" onClick={handleCheckBox} name="Iron" />} label="Iron" />
                  </FormGroup>
                </div>
              </div>
            </div>
            {isMobile
              ? null
              : <Button onClick={handleCreate}>Create Listing</Button>
            }
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
            <input className={classes.imageInput} type="file" multiple accept="image/*" id='propertyImgUpload' onChange={e => handleUploadProperties(e.target.files[0])}/>
            <div className={classes.propertyImgs} id='property-images'>
              <div className={classes.img}>
                <label htmlFor='propertyImgUpload'>
                  <AddPhotoAlternateOutlinedIcon fontSize="large"/>
                </label>
              </div>
              {imgArr?.map((img, pos) => {
                console.log(pos);
                console.log(img);
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
            {isMobile
              ? <Button onClick={handleCreate}>Create Listing</Button>
              : null
            }
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateListing;

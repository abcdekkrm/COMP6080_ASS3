import React, { useState } from 'react';
// import * as ReactDOM from 'react-dom';
// import Config from '../config.json';
import { makeStyles, TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';
// import ImageUploading from 'react-images-uploading';
import IconButton from '@mui/material/IconButton';
// import { CloseIcon, ImageIcon, AddCircleOutlineIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const EditListing = ({ closeEditPopup }) => {
  // const useStyles = makeStyles
  const useStyles = makeStyles({
    root: {
      width: 300,
    },
    popup_syles: {
      background: 'white',
      border: '1px solid #ccc',
      height: '70%',
      width: '80%',
      padding: '1vw',
      zIndex: '1200px',
    },
    background: {
      position: 'absolute',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        cursor: 'pointer',
      }
    }
  });
  const classes = useStyles();
  const [title, setTitle] = React.useState('Old Title');
  const [address, setAddress] = React.useState('Old Address');
  const [tnImage, setTnImage] = useState();
  const [imgArr, setImgArr] = React.useState();
  // let imgArr = [];
  // let imgObj = null;
  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };
  const handleChangeAddress = event => {
    setAddress(event.target.value);
  };
  const handleChangeThumbnail = event => {
    console.log(event.target.files);
    setTnImage(URL.createObjectURL(event.target.files[0]));
  }
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
  const handleDeleteProperties = (index) => {
    console.log('delete' + index);
    // const copyImgArr = Object.assign([], imgArr);
    // copyImgArr.splice(index, 1);
    // setImgArr(copyImgArr);
  }
  const handleEdit = () => {
    console.log('edit');
    closeEditPopup();
  }
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 10,
      label: '1',
    },
    {
      value: 20,
      label: '2',
    },
    {
      value: 30,
      label: '3',
    },
    {
      value: 40,
      label: '4',
    },
    {
      value: 50,
      label: '5',
    },
    {
      value: 60,
      label: '6',
    },
    {
      value: 70,
      label: '7',
    },
    {
      value: 80,
      label: '8',
    },
    {
      value: 90,
      label: '9',
    },
    {
      value: 100,
      label: '10+',
    },
  ];
  function valuetext (value) {
    return `${value}`;
  }
  function valueLabelFormat (value) {
    return marks.findIndex((mark) => mark.value === value);
  }
  return (
    <div className={classes.background} id='popup-background'>
      <div className={classes.popup_syles} id='edit-listing-popup'>
        <div className={classes.closeIcon}>
          <IconButton>
            <CloseIcon onClick={closeEditPopup}/>
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
              />
            </div>
            <div>
              <TextField
              id="edit-address"
              label="address"
              value={address}
              onChange={handleChangeAddress}
              />
            </div>
            <div className={classes.root} id='bathroom-slider'>
              <Typography id="discrete-slider-restrict" gutterBottom>
                Number of bathroom
              </Typography>
              <Slider
                defaultValue={20}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </div>
            <div className={classes.root} id='room-slider'>
              <Typography id="discrete-slider-restrict" gutterBottom>
                Number of room
              </Typography>
              <Slider
                defaultValue={20}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </div>
          </div>
          <div className={classes.listingImg} id='edit-listing-image'>
            <img className={classes.thumbnail} src={tnImage}></img>
            <input className={classes.imageInput} type="file" multiple accept="image/*" id='thumbnailUpload' onChange={handleChangeThumbnail}/>
            <label htmlFor='thumbnailUpload'>
              <ImageIcon />
            </label>
            <input className={classes.imageInput} type="file" multiple accept="image/*" id='propertyImgUpload' onChange={handleUploadProperties}/>
            <div className={classes.propertyImgs} id='property-images'>
              <div className={classes.img}>
                <img></img>
                <label htmlFor='propertyImgUpload'>
                  <AddCircleOutlineIcon fontSize="large"/>
                </label>
              </div>
              {imgArr?.map((img, pos) => {
                console.log(pos);
                return (
                  <div key={pos}>
                    <img src={img} className={classes.img}></img>
                    {/* <div className={classes.delete}> */}
                    <IconButton className={classes.delete} onClick={handleDeleteProperties(pos)}>
                      <DeleteIcon />
                    </IconButton>
                    {/* </div> */}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Button onClick={handleEdit}>Save Edit</Button>
      </div>
    </div>
  );
};
EditListing.propTypes = {
  closeEditPopup: PropTypes.func
};
export default EditListing;

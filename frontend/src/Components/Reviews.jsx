import React, { useState, useEffect } from 'react';
import Config from '../config.json';
import { Divider, Rating } from '@mui/material';

function Reviews () {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getListingReviews();
  }, []);

  function getListingReviews () {
    const token = localStorage.getItem('token');
    const id = Number(localStorage.getItem('listingId'));

    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/listings/${id}`, request)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            console.log(data.error);
          });
        }
      }).then(data => {
        const reviews = data.listing.reviews;
        setReviews(reviews);
      })
  }

  return (
    <>
    {reviews?.map((review, index) => (
      <>
      <div key={index}>
        <Rating
          readOnly
          value={review.score}
        />
        <p>{review.comment}</p>
      </div>
      <Divider/>
      </>
    ))}
    </>
  )
}

export default Reviews;

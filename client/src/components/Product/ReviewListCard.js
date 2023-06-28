import React from 'react';
import { Box, Stack, Rating, Typography, Avatar } from '@mui/material';
import './reviewList.css'

const ReviewListCard = ({ review }) => {
  return (
    <>
      <section id="testimonials">
        
        {/* <!--testimonials-box-container------> */}
        <div class="testimonial-box-container">
          {/* <!--BOX-1--------------> */}
          <div class="testimonial-box">
            {/* <!--top-------------------------> */}
            <div class="box-top">
              {/* <!--profile-----> */}
              <div class="profile">
                {/* <!--img----> */}
                <div class="profile-img">
                  <img src={review.user.avatar.url} alt={review.user.name} />
                </div>
                {/* <!--name-and-username--> */}
                <div class="name-user">
                  <strong>{review.user.name}</strong>
                  <span>{review.user.email}</span>
                </div>
              </div>
              {/* <!--reviews------> */}
              <div class="reviews">
                <Stack spacing={1} sx={{ display: 'block' }}>
                  <Rating value={review.rating}
                    precision={0.1}
                    readOnly
                  />
                </Stack>
              </div>
            </div>
            {/* <!--Comments----------------------------------------> */}
            <div class="client-comment">
              <p>{review.comment}</p>
            </div>
          </div>
        </div>
      </section>

      {/* <Box sx={{m:'0 auto', mt:2, display:'flex', flexDirection:'column',alignItems:'center',padding:2,
                    border:'1px solid #dadada', width:'90%'}}>
        <Avatar style={{height:80,width:80}}>
            <img src={review.user.avatar.url} alt={review.user.name} style={{height:80,width:80}}/>
        </Avatar>
        <Typography>{review.user.name}</Typography>
        <Stack spacing={1} sx={{display:'block'}}>
                <Rating value={review.rating} 
                        precision={0.1} 
                        readOnly
                />
        </Stack>
        <Typography>{review.comment}</Typography>
    </Box> */}
    </>
  )
}

export default ReviewListCard
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Avatar, Typography } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import TopRatedProducts from '../Home/TopRatedProducts';
import Header2 from '../Layout/Header2';

const OrderSuccess = () => {
  return (
    <>
      <Header2 />
      {/*Banner starts*/}
      <section class="banner productpage">
        <div class="container container2">
          <div class="row">
          <div class="col-lg-12 d-flex justify-content-center">

            
              <div class="text-center">
                <h2 class="banner-title">Order Success</h2>
                <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to='/'><HomeIcon /> Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Order Success</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Banner Ends*/}
      
      <Box
        sx={{
          m: '20px auto',
          maxWidth: '550px',
          textAlign: 'center',
          minWidth: '500px',
          marginTop: '10rem',
          marginBottom: '10rem',
          padding: '25px 10px',
          borderRadius: '20px',
          boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.7)',
          background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
          '@media (max-width: 600px)': {
            maxWidth: '100%',
            minWidth: 'auto',
            padding: '15px',
            marginTop: '5rem',
            marginBottom: '5rem',
          },
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#9ABC66',
            height: '80px',
            width: '80px',
            m: '0 auto',
            fontSize: '4.5rem',
          }}
        >
          <DoneAllIcon fontSize="3.5rem" />
        </Avatar>
        <Typography variant="h5" component="h1" sx={{  mt: 1, mb: 1 ,fontFamily:'Poppins, opens-serif' }}>
          Your order has been placed successfully.
        </Typography>
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
        <button className='btn02 explorebtn'>
          <Link to="/order" style={{ color: 'black' }} >
            View orders
          </Link></button>
        <button className='btn02 explorebtn'>
          <Link to="/" style={{ color: 'black' }}>Go Home</Link></button>
        </div>
      </Box>

    </>
  )
}

export default OrderSuccess
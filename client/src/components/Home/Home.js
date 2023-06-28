
import AboutUs2 from '../Pages/AboutUs2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { axiosPublic } from '../../redux/axiosPublic';
import ProductCard from '../Product/ProductCard';
import { getCategories, selectAllCategories } from '../../redux/features/categorySlice';
import { Box, Typography } from '@mui/material';
import AboutUs from '../Pages/Aboutus';
import ContactUs from '../Pages/Contactus';
import WhyWorkWithUs from './WhyWorkWithUs'
import WhyChoosingUs from './WhyChoosingUs';
import TopRatedProducts from './TopRatedProducts';
import './home.css';


import { alignPropType } from 'react-bootstrap/esm/types';
import Header from '../Layout/Header';
import VideoPopup from './VideoPopup';
import OurTeam from './OurTeam';



const Home = () => {
  return (
    <Box className='fullDiv'>

      {/*div02  */}
      <div className='WhyChoosingUs'>
        <WhyChoosingUs />
      </div>

      <div className='topRated'>
        <TopRatedProducts />
      </div>

      <div className='WhyWorkWithUs'>
        <WhyWorkWithUs />
      </div>


      {/* end div 2 */}

      <VideoPopup />
      {/* div 3 */}
      <div className='aboutUs'>
        <AboutUs2 />
      </div>
      {/* <AboutUs /> */}
      <ContactUs />
      {/* <OurTeam/> */}


    </Box>
  );
};

export default Home;


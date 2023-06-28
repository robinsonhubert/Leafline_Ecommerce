import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { axiosPublic } from '../../redux/axiosPublic';

import ProductCard from '../Product/ProductCard';
import { Grid, Box, Typography } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getCategories, selectAllCategories } from '../../redux/features/categorySlice';

const TopRatedProducts=()=> {
  useEffect(() => {
    AOS.init();
  }, []);
  const limit = 3;
  const dispatch = useDispatch();
 

  const [topRatedProduct, setTopRatedProduct] = useState();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosPublic.get(`/products?&limit=${limit}&sort_by_ratings=${true}`);
        setTopRatedProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div style={{display: 'block',background: 'rgb(218, 226, 182)',boxShadow: '0 0 10px rgba(0, 100, 0, 0.5)',paddingBottom:'50px'}} data-aos="fade-up">
      <div className='col-lg-12 text-center'>
        <Box className="containerx col-lg-8 offset-lg-2 text-center" sx={{ textAlign: 'center'}}>
          <Typography variant="h5" className="m-4 p-1 text-dark text-center" sx={{fontFamily: 'Open Sans , sans-serif',fontWeight: 'bold',fontSize:'40px'}}>
            <span style={{color:'green'}}>Top</span><span>&nbsp;</span>  Picks
          </Typography>
          <Typography variant="" className="m-4 p-1 text-dark text-center"sx={{ fontFamily: 'Poppins, sans-serif', textAlign: 'justify',fontSize: '20px'}}  data-aos="fade-up" data-aos-delay="100">
          Banana leaf plates, also known as "vaazhai ilai" in some regions, are a traditional and eco-friendly alternative to disposable plates.          </Typography>
          <Grid container spacing={5} justifyContent="center"sx={{paddingTop:'20px'}}  data-aos="fade-up" data-aos-delay="200">
            {topRatedProduct &&
              topRatedProduct.products.map((product) => (
                <Grid item key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </div>
    </div>
  )
}

export default TopRatedProducts
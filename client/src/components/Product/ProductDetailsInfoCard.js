import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';


import { Box, Typography, Stack, Rating, IconButton, Tooltip, Button } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { formatCurrency } from '../../utility/formatCurrency';

import { addItemsToCart } from '../../redux/features/cartSlice';

const ProductDetailsInfoCard = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    if (1 === quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  }
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  }
  const addToCartHandler = () => {
    const _id = product._id;
    dispatch(addItemsToCart({ _id, quantity, toast }))
    toast.success('Item added to cart');
  }
  return (
    <Box
      sx={{
        marginTop:"60px",

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 4px #5F8D4E',
        borderRadius: '4px',
        padding: '50px',
        backgroundColor: '#fff',
        height: "400px",
        width: "580px",
        marginRight: "100px",
        marginLeft:"100px",

      }}
    >
      <Box>
        <Typography variant='h6' component='div'>{product.title}</Typography>
        <Box>
          <Stack spacing={1} className='rating-review' display='block'>
            <Rating value={product.ratings} precision={0.1} readOnly />
          </Stack>
          <Typography gutterBottom
            sx={{ display: 'block' }}
            component='span'>Reviews : ({product.numOfReviews})
          </Typography>
        </Box>
        <Typography sx={{ display: 'block' }} variant='button'>Price : {formatCurrency(product.price - product.discount)}
        </Typography>
        <Box className='btn-cart'>
          <Box className='btn-quantity'>
            <Tooltip title='Decrease quantity' placement='top'>
              <IconButton color='error' component='span' onClick={decreaseQuantity}>
                <RemoveCircleIcon style={{ height: '40px', width: '40px' }} />
              </IconButton>
            </Tooltip>
            <label>{quantity}</label>
            <Tooltip title='Increase quantity' placement='top'>
              <IconButton color='success' component='span' onClick={increaseQuantity}>
                <AddCircleIcon style={{ height: '40px', width: '40px' }} />
              </IconButton>
            </Tooltip>
          </Box>
          {product.stock > 1 ?
            <Button variant='contained'
              className='addtocart'
              color='success'
              startIcon={<AddShoppingCartIcon />}
              onClick={addToCartHandler}>Add to cart</Button>
            :
            <Button variant='contained'
              className='addtocart'
              // disabled
              color='success'
              startIcon={<AddShoppingCartIcon />}
              onClick={addToCartHandler}>Add to cart</Button>
          }
        </Box>

        <Typography sx={{ display: 'block' }}>Status :
          {product.stock > 0 ?
            <span style={{ color: 'green' }}>InStock</span>
            :
            <span style={{ color: 'green' }}>Out of Stock</span>
          }
        </Typography>
        <Typography sx={{ display: 'block' }}>Category : {product.category.title}</Typography>
        <Typography sx={{ whiteSpace: 'pre-line', mt: 2 }}
          variant='body2'>
          Description : {product.description}
        </Typography>
      </Box>
    </Box>
  )
}

export default ProductDetailsInfoCard
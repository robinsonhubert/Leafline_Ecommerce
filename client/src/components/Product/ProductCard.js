import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../utility/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Box, Stack, Rating } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import './productCart.css'
import { addItemsToCart, selectCartItems, removeItem } from '../../redux/features/cartSlice';
import { Opacity } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';



const ProductCard = React.forwardRef(({ product }, ref) => {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(false);
  const [color, setColor] = useState('info');
  const [icon, setIcon] = useState(<AddShoppingCartIcon />);
  const [text, setText] = useState('Add to cart');
  const [isHovered, setIsHovered] = useState(false);


  const { products } = useSelector(selectCartItems);

  const remove = () => {
    setExist(true);
    setColor('error');
    setIcon(<DeleteIcon />);
    setText('Remove from cart');
  }

  const add = () => {
    setExist(false);
    setColor('info');
    setIcon(<AddShoppingCartIcon />);
    setText('Add to Cart');
  }

  const cartHandler = () => {
    const _id = product._id;
    const quantity = 1;

    if (exist) {
      dispatch(removeItem(_id));
      toast('Item remove from cart', {
        className: 'custom-toast', // Add the custom class here
        bodyClassName: 'custom-toast-body', // Add a separate class for the toast body if needed
      });
      add();
      return;
    }
    if (!exist) {
      dispatch(addItemsToCart({ _id, quantity, toast }))
      toast('Item added to cart', {
        className: 'custom-toast', // Add the custom class here
        bodyClassName: 'custom-toast-body', // Add a separate class for the toast body if needed
      });
      remove();
      return;
    }

  }

  const getExist = () => {
    if (products) {
      const e = products.some(p => p._id === product._id);
      if (e === true) {
        remove();
      }
    }
  }
  useEffect(() => {
    getExist();
  }, [])
  const navigate = useNavigate();
  const linkToDetails = () => { navigate(`/product/${product._id}`); }

  // Add event handlers for mouse enter and leave
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (

    <div class="card">

      <div class="price-corner" data-content={formatCurrency(product.price)}></div>
      <div class="img-wrapper">
        <img src={
          product && product.images && product.images.length > 0
            ? product.images[0].url || 'placeholder.jpg'
            : ''
        } alt="" style={{ height: '200px', width: '200px', objectFit: 'cover' }} />
      </div>
      <div class="content-wrapper">
        <span class="cardtitle">{product?.title && product.title.length > 15
          ? product.title.slice(0, 14)
          : product.title}</span>

        <p class="price" data-price={product.price}>{product.discount > 0 ? (
          <Box>
            <Typography
              sx={{ display: 'block', textDecoration: 'line-through', color: 'red' }}
              variant="caption"
            >
              Price: ({formatCurrency(product.price)})
            </Typography>
            <Typography sx={{ display: 'block' }} variant="caption">
              Price: ({formatCurrency(product.price - product.discount)})
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ display: 'block' }} variant="caption">
            Price: {formatCurrency(product.price)}
          </Typography>
        )}</p>
        <div class="inner-content-wrapper">
          <p class="about">
            {/* {product.localShipmentPolicy === 'free' ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LocalShippingIcon sx={{ mr: 1, color: '#458a6f' }} />
                <Typography variant="caption">Free Shipping</Typography>
              </Box>
            ) : (
              <br />
            )} */}
          </p>
          {/* <p class="about">
            <Stack spacing={1} sx={{ display: 'block' }}>
              <Rating
                name="half-rating-read"
                value={product.ratings}
                precision={0.1}
                readOnly
              />
            </Stack>
          </p> */}

          <div class="icons">
            {ref ? (
              <span class="icon icon1" ref={ref} onClick={cartHandler}>{icon}</span>
            ) : (
              <span class="icon icon1" ref={ref} onClick={cartHandler}>{icon}</span>
            )}
          </div>
      <div class="icons">
          <span class="icon icon1" onClick={linkToDetails}>View Product</span>
      </div>
        </div>
      </div>
    </div>

  )
})

export default ProductCard





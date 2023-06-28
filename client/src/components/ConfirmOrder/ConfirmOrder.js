import React from 'react';
import './ConfirmOrder.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utility/formatCurrency';

import { Box, Typography, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText, Grid, Button } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { selectShippingInfo } from '../../redux/features/shippingSlice';
import { selectCartItems } from '../../redux/features/cartSlice';

const ConfirmOrder = () => {
    const { shipInfo } = useSelector(selectShippingInfo);
    const { products } = useSelector(selectCartItems);

    const address = shipInfo.address + ' , ' + shipInfo.zipCode + ' , ' + shipInfo.city + ' , ' + shipInfo.country;

    let subTotal = products.reduce((acc, item) => acc + item.quantity * item.price, 0);

    let unitShippingCharge = [];
    let shippingCharge = 0;
    if (shipInfo.country === 'IN') {
        for (let i = 0; i < products.length; i++) {

            if (products[i].localShipmentPolicy === 'free') {
                shippingCharge = shippingCharge + 0;
                unitShippingCharge[i] = 0;
            }
            if (products[i].localShipmentPolicy === 'custom') {
                shippingCharge = shippingCharge + (products[i].quantity * products[i].customLocalShipmentCost);
                unitShippingCharge[i] = products[i].quantity * products[i].customLocalShipmentCost;
            }
            if (products[i].localShipmentPolicy === 'standard') {

                if (products[i].weight && products[i].weight > 5) {
                    products[i].weight = Math.ceil(products[i].weight / 5);
                    shippingCharge = shippingCharge + (products[i].weight * products[i].quantity * process.env.REACT_APP_LOCAL_CHARGE);
                    unitShippingCharge[i] = products[i].weight * products[i].quantity * process.env.REACT_APP_LOCAL_CHARGE;
                } else {
                    shippingCharge = shippingCharge + (products[i].quantity * process.env.REACT_APP_LOCAL_CHARGE);
                    unitShippingCharge[i] = products[i].quantity * process.env.REACT_APP_LOCAL_CHARGE;
                }

            }

        }
    } else {
        for (let i = 0; i < products.length; i++) {

            if (products[i].internationalShipmentPolicy === 'free') {
                shippingCharge = shippingCharge + 0;
                unitShippingCharge[i] = 0;
            }
            if (products[i].internationalShipmentPolicy === 'custom') {
                shippingCharge = shippingCharge + (products[i].quantity * products[i].customInternationShipmentCost);
                unitShippingCharge[i] = products[i].quantity * products[i].customInternationShipmentCost;
            }
            if (products[i].internationalShipmentPolicy === 'standard') {

                if (products[i].weight && products[i].weight > 5) {
                    products[i].weight = Math.ceil(products[i].weight / 5);
                    shippingCharge = shippingCharge + (products[i].weight * products[i].quantity * process.env.REACT_APP_INTER_CHARGE);
                    unitShippingCharge[i] = products[i].weight * products[i].quantity * process.env.REACT_APP_INTER_CHARGE;
                } else {
                    shippingCharge = shippingCharge + (products[i].quantity * process.env.REACT_APP_INTER_CHARGE);
                    unitShippingCharge[i] = products[i].quantity * process.env.REACT_APP_INTER_CHARGE;
                }
            }
        }
    }
    const totalPrice = subTotal + shippingCharge ;

    const navigate = useNavigate();
    const proccedToPayment = () => {
        const data = {
            subTotal, shippingCharge, totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    }
    return (
        <>
        
            <div style={{}}>
                <Typography component='h1'
                    variant='h5'
                    color="green"
                    sx={{ textAlign: 'center' }}>
                    Cart & Shipping Information
                </Typography>
                <Divider />
                <div style={{ display: 'grid', placeItems: 'center' }}>
                    <Box className='base-div3' >
                        <div id='cardDiv'>
                            <Box className='div1'>
                                <Box className='confirmOrderTitle '>
                                    <Avatar sx={{ mr: 1, background: '#fff', color: '#2e7d32', width: 30, height: 30 }}>
                                        <LocalShippingIcon />
                                    </Avatar>
                                    <Typography component='div'
                                        variant='button'
                                        sx={{ textAlign: 'center' }}>Shipping Address
                                    </Typography>
                                </Box>
                                <Box>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PhoneIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>{shipInfo && shipInfo.phone}</ListItemText>
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <LocationOnIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>{address}</ListItemText>
                                        </ListItem>

                                    </List>
                                </Box>
                            </Box>

                            <Box className='div2'>
                                <Box className='confirmOrderTitle'>
                                    <Avatar sx={{ mr: 1, background: '#fff', color: '#2e7d32', width: 30, height: 30 }}>
                                        <ShoppingCartIcon />
                                    </Avatar>
                                    <Typography component='div'
                                        variant='button'
                                        sx={{ textAlign: 'center' }}>Cart Items Info
                                    </Typography>
                                </Box>
                                <Box>
                                    {products && products.map((item, i) => (
                                        <Box key={item._id} sx={{ display: 'flex', width: '100%', mb: 2 }}>
                                            <Box>
                                                <img src={item.image} alt={item.title} style={{ maxWidth: 100, marginRight: '5px' }} />
                                            </Box>
                                            <Box>
                                                <Typography component='div'
                                                    variant='button'>
                                                    <Link to={`/product/${item._id}`} >{item.title}</Link>

                                                </Typography>
                                                <Typography component='div'
                                                    variant='button'>
                                                    Price : {formatCurrency(item.price)} x {item.quantity}={formatCurrency(item.price * item.quantity)}
                                                </Typography>
                                                <Typography component='div'
                                                    variant='button'>
                                                    Shipping charge : {formatCurrency(unitShippingCharge[i])}
                                                </Typography>
                                            </Box>

                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </div>

                        <Box className='div3'>
                            <Box className='confirmOrderTitle'>
                                <Avatar sx={{ mr: 1, background: '#fff', color: '#2e7d32', width: 30, height: 30 }}>
                                    <PaidIcon />
                                </Avatar>
                                <Typography component='div'
                                    variant='button'
                                    sx={{ textAlign: 'center' }}>Orders Info
                                </Typography>
                            </Box>
                            <Box>

                                <Grid container>
                                    <Grid item xs>
                                        <Typography component='div'
                                            variant='button'>Subtotal :
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component='div'
                                            variant='button'> {formatCurrency(subTotal)}
                                        </Typography></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs>
                                        <Typography component='div'
                                            variant='button'> Shipping charges :
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component='div'
                                            variant='button'>{formatCurrency(shippingCharge)}
                                        </Typography></Grid>
                                </Grid>
                                

                                <Grid container sx={{paddingTop:'100px'}}>
                                    <Grid item xs>
                                        <Typography component='div'
                                            variant='button'>Total :
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component='div'
                                            variant='button'>{formatCurrency(totalPrice)}
                                        </Typography></Grid>
                                </Grid>

                            </Box>
                        </Box>

                    </Box>
                </div>

                <Button variant='contained'
                    color='success'
                    sx={{ m: 4, width: 250, m: '0 auto', display: 'block', }}
                    onClick={proccedToPayment}>Proceed to payment

                </Button>
            </div>
        </>

    )
}

export default ConfirmOrder
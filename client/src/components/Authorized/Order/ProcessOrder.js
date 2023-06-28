import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getOrderDetails, selectOrderDetails, updateOrder, selectOrderMutationResult, resetMutationResult } from '../../../redux/features/orderSlice';
import BoxShadowLoader from '../../Skeletons/BoxShadowLoader';
import { IMAGE_BASEURL } from '../../../constants/baseURL';
import { formatCurrency } from '../../../utility/formatCurrency';

import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Grid, FormControl, InputLabel, MenuItem, Button, Select } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';


const ProcessOrder = () => {
    const { id } = useParams();
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    const { loading, order } = useSelector(selectOrderDetails);
    const { success } = useSelector(selectOrderMutationResult);

    const submitHandler = (e) => {
        e.preventDefault();
        if (status === '') {
            toast.error('Please select a process option');
            return;
        }
        const jsonData = { status };
        dispatch(updateOrder({ id, jsonData, toast }));
    }

    useEffect(() => {
        if (success) {
            dispatch(resetMutationResult());
        }
        dispatch(getOrderDetails({ id, toast }));
    }, [success, id, dispatch])


    return (

        <>
            <Box
                className='dash-box'
                sx={{
                    padding: '40px',
                    minHeight: '100vh',
                    backgroundColor: "white"

                }}
            >
                {loading ? <BoxShadowLoader /> :
                    <>
                        <div className='container'>
                            <Typography component='h1' variant='h5' gutterBottom sx={{
                                textAlign: 'center', fontFamily: 'poppins, sans-serif', marginTop: "25px", color: "#1b5e20"
                            }}>
                                Order Details
                            </Typography>
                            <Box sx={{ paddingTop: '50px', boxShadow: '2px 2px 2px 2px #588157', padding: "15px", width: "1312px", marginTop: "20px" , marginLeft:"-22px"}}>
                                <Box className='title' sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ background: '#fff', color: '#285430', minWidth: '30px', height: '30px' }}>
                                        <MonitorHeartIcon />
                                    </Avatar>
                                    <Typography variant='button' fontFamily='poppins, sans-serif' component='div' gutterBottom sx={{ marginLeft: '0.5rem', color: "#1b5e20" }}>
                                        Order Status
                                    </Typography>
                                </Box>


                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FingerprintIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={order && 'Order Id - ' + order.shortId} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AccessTimeIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={order && 'Ordered at : ' + String(order.createdAt).substr(0, 10)} />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AttachMoneyIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                {order && order.paymentInfo && order.paymentInfo.status === 'succeeded'
                                                    ? 'Paid'
                                                    : 'Not Paid'}
                                            </ListItemText>
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <TakeoutDiningIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={order && order.orderStatus} />
                                        </ListItem>
                                    </List>
                                    {order && order.orderStatus === 'Delivered' ?
                                        <Box sx={{ mt: '20px', textAlign: 'center' }}>
                                            <Avatar>
                                                <DeliveryDiningRoundedIcon />
                                            </Avatar>
                                            <Typography variant='button'
                                                component='div'
                                                gutterBottom>This product delivered.
                                            </Typography>
                                        </Box>
                                        :
                                        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '150px', mt: '20px' }}>
                                            <FormControl sx={{ mb: '5px' }}>
                                                <InputLabel id='status' fontFamily='poppins, sans-serif'>Select process</InputLabel>
                                                <Select labelId='status'
                                                    id='status'
                                                    value={status}
                                                    label='process'
                                                    onChange={(e => setStatus(e.target.value))}>
                                                    {order && order.orderStatus === 'Processing' ?
                                                        <MenuItem value='Shipped'>Shipped</MenuItem>
                                                        :
                                                        <MenuItem value='Delivered'>Delivered</MenuItem>
                                                    }
                                                </Select>
                                            </FormControl>
                                            <Button variant='contained' sx={{
                                                backgroundColor: "rgb(70, 88, 73)", '&:hover': {
                                                    backgroundColor: "#9DC183",
                                                    color: "#000",
                                                    border: "black",
                                                    boxShadow: 'none',
                                                },
                                            }}

                                                startIcon={<UpdateIcon />}
                                                onClick={submitHandler}
                                            >
                                                Update
                                            </Button>
                                        </Box>
                                    }
                                </Box>
                            </Box>

                            <Grid container spacing={3} style={{ marginTop: "20px" }}>
                                <Grid item xs={4} style={{ boxShadow: '2px 2px 2px 2px #588157' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ background: '#fff', color: '#285430', width: 30, height: 30, marginRight: '0.5rem' }}>
                                            <LocalShippingIcon />
                                        </Avatar>
                                        <Typography component='div' variant='button' sx={{ textAlign: 'center', fontFamily: 'poppins, sans-serif', color: "#1b5e20" }}>
                                            Shipping
                                        </Typography>
                                    </div>

                                    <Box sx={{ paddingTop: '40px' }}>
                                        <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <PhoneIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>{order?.shippingInfo?.phone}</ListItemText>
                                            </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <LocationOnIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={order && `${order?.shippingInfo?.firstname},${order?.shippingInfo?.lastname},${order?.shippingInfo?.address},${order?.shippingInfo?.city},${order?.shippingInfo?.zipCode},${order?.shippingInfo?.country}`} />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Grid>
                            <Grid item xs={4} style={{ boxShadow: '2px 2px 2px 2px #588157' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ background: '#fff', color: '#285430', width: 30, height: 30, marginRight: '0.5rem' }}>
                                        <ShoppingCartIcon />
                                    </Avatar>
                                    <Typography component='div' variant='button' sx={{ textAlign: 'center', fontFamily: 'poppins, sans-serif',color:"#1b5e20" }}>
                                        Cart Items Info
                                    </Typography>
                                </Box>

                                    <Box sx={{ paddingTop: '50px' }}>
                                        {order.orderItems &&
                                            order.orderItems.map((item, i) => (
                                                <Box key={item._id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                                    <Box>
                                                        <img src={item.product.images[0].url} alt={item.title} style={{ maxWidth: 100 }} />
                                                    </Box>
                                                    <Box ml={2}>
                                                        <Typography component='div' variant='button'>
                                                            <Link to={`/product/${item.product._id}`}>{item.product.title}</Link>
                                                        </Typography>
                                                        <Typography component='div' variant='button'>
                                                            Price: {formatCurrency(item.price)} x {item.quantity} = {formatCurrency(item.price * item.quantity)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                    </Box>
                                </Grid>
                                <Grid item xs={4} style={{ boxShadow: '2px 2px 2px 2px #588157' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ background: '#fff', color: '#285430', width: 30, height: 30, marginRight: '0.5rem' }}>
                                            <FactCheckIcon />
                                        </Avatar>
                                        <Typography component='div' variant='button' sx={{ textAlign: 'center', fontFamily: 'poppins, sans-serif', color: "#1b5e20" }}>
                                            Orders Info
                                        </Typography>
                                    </Box>

                                    <Grid sx={{ paddingTop: '50px' }}>
                                        <Grid item xs>
                                            <Typography variant='button' component='div' fontFamily='poppins, sans-serif'>
                                                Subtotal : {formatCurrency(order && order.itemsPrice)}
                                            </Typography>
                                        </Grid>
                                        <Grid item >
                                            <Typography variant='button' component='div' fontFamily='poppins, sans-serif'>
                                                Shipping Charges : {formatCurrency(order && order.shippingPrice)}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='button' component='div' fontFamily='poppins, sans-serif'>

                                            </Typography>
                                        </Grid>
                                    </Grid>




                                    <Grid>
                                        <Grid item xs>
                                            <Typography variant='button' component='div' fontFamily='poppins, sans-serif'>
                                                Tax : <span style={{ textAlign: 'right' }}>{formatCurrency(order && order.taxPrice)} </span>
                                            </Typography>
                                        </Grid>

                                    </Grid>

                                    <Grid >
                                        <Grid item xs>
                                            <Typography variant='button' component='div' fontFamily='poppins, sans-serif'>
                                                Total : {formatCurrency(order && order.totalPrice)}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </>
                }
            </Box>
        </>

    )
}

export default ProcessOrder


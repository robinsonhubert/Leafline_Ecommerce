import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getOrderDetails, selectOrderDetails } from '../../redux/features/orderSlice';
import BoxShadowLoader from '../Skeletons/BoxShadowLoader';
import { formatCurrency } from '../../utility/formatCurrency';
import HomeIcon from '@mui/icons-material/Home';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import Header2 from '../Layout/Header2';
import './OrderDetails.css';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, order } = useSelector(selectOrderDetails);

  useEffect(() => {
    dispatch(getOrderDetails({ id, toast }));
  }, [id, dispatch]);

    return (
        <>
            <Header2 />
            {/*Banner starts*/}
            <section class="banner productpage">
        <div class="container container2">
            <div class="row">
            <div class="col-lg-12 d-flex justify-content-center">
                    <div class="text-center">
                        <h2 class="banner-title">Order Details</h2>
                        <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                            <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/'><HomeIcon/> Home</Link></li>
                              <li class="breadcrumb-item active" aria-current="page">Order Details</li>
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
                    marginTop: 8,

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 2px 4px #5F8D4E',
                    borderRadius: '4px',
                    padding: '50px',
                    backgroundColor: '#fff',
                    height: "100% !important",
                    width: "auto",

                }}
            >
                <>

                    {loading ? <BoxShadowLoader /> :
                        <>

                            <Typography component='h1' variant='h5' gutterBottom sx={{ textAlign: 'center' }}>
                                Order details
                            </Typography>

                            <Container className='order-details-base'>

                                <Col style={{ maxHeight: '100px' }}>
                                    <div style={{ backgroundColor: 'rgb(70, 88, 73)', borderRadius: '5px' }}>
                                        <h5 style={{ padding: '5px' }}>
                                            <span style={{ background: '#fff', color: 'green', width: 30, height: 30 }} className='rounded-circle'>
                                                <MonitorHeartIcon /></span>
                                                <span style={{paddingLeft:'10px'}}>Orders Status</span>
                                        </h5>
                                    </div>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <span className='rounded-circle' style={{ paddingRight: '20px' }}>
                                                <AttachMoneyIcon />
                                            </span>
                                            {order?.paymentInfo?.status === 'succeeded' ? 'Paid' : 'Not Paid'}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <span className='rounded-circle' style={{ paddingRight: '20px' }}>
                                                <TakeoutDiningIcon />
                                            </span>
                                            {order?.orderStatus}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>

                                <Col className='base-div4'>
                                    <Col className='div3'>

                                        <h5>
                                            <span style={{ background: '#fff', color: 'green', width: 30, height: 30 }} className='rounded-circle'>
                                                <LocalShippingIcon />
                                            </span>
                                            Shipping
                                        </h5>
                                        <ListGroup style={{ paddingBottom: '50px', paddingTop: '50px' }}>
                                            <ListGroup.Item>
                                                <span className='rounded-circle' style={{ paddingRight: '20px' }}>
                                                    <PhoneIcon />
                                                </span>
                                                {order?.shippingInfo?.phone}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <span className='rounded-circle' style={{ paddingRight: '20px' }}>
                                                    <LocationOnIcon />
                                                </span>
                                                {order && `${order?.shippingInfo?.firstname},${order?.shippingInfo?.lastname},${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.zipCode},  ${order?.shippingInfo?.country}`}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>

                                    <Col className='div3'>
                                        <div style={{ backgroundColor: 'rgb(70, 88, 73)', borderRadius: '5px' }}>
                                            <h5 style={{ padding: '5px' }}>
                                                <span style={{ background: '#fff', color: 'green', width: 30, height: 30 }} className='rounded-circle'>
                                                    <ShoppingCartIcon />
                                                </span>
                                                <span style={{paddingLeft:'10px'}}>Cart Info</span>
                                            </h5>
                                        </div>
                                        {order.orderItems && order.orderItems.map((item, i) => (
                                            <Row key={item._id} className='mb-2' style={{ paddingBottom: '50px', paddingTop: '50px' }}>
                                                <Col>
                                                    <Image src={item.product.images[0].url} alt={item.title} style={{ maxWidth: 100, marginRight: '5px' }} />
                                                </Col>
                                                <Col>
                                                    <h6>
                                                        <Link to={`/product/${item.product._id}`} style={{ color: 'black', }}>{item.product.title}</Link>
                                                    </h6>
                                                    <p>
                                                        Price: {formatCurrency(item.price)} x {item.quantity} = {formatCurrency(item.price * item.quantity)}
                                                    </p>
                                                </Col>
                                            </Row>
                                        ))}
                                    </Col>

                                    <Col className='div3'>
                                        <div style={{ backgroundColor: 'rgb(70, 88, 73)', borderRadius: '5px' }}>
                                            <h5 style={{padding:'5px'}}>
                                                <span style={{ background: '#fff', color: 'green', width: 30, height: 30 }} className='rounded-circle'>
                                                    <FactCheckIcon />
                                                </span>
                                                <span style={{paddingLeft:'10px'}}>Orders Info</span>
                                            </h5>
                                        </div>
                                        <Row>
                                            <Col xs>
                                                <p>Subtotal :</p>
                                            </Col>
                                            <Col>
                                                <p>{formatCurrency(order && order.itemsPrice)}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs>
                                                <p>Shipping Charges :</p>
                                            </Col>
                                            <Col>
                                                <p>{formatCurrency(order && order.shippingPrice)}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs>
                                                <p>Tax :</p>
                                            </Col>
                                            <Col>
                                                <p>{formatCurrency(order && order.taxPrice)}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs>
                                                <p>Total :</p>
                                            </Col>
                                            <Col>
                                                <p>{formatCurrency(order && order.totalPrice)}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>

                            </Container>



                            {/* <div className='container order-details-base'>

                            <Box>
                                <Box className='title'>
                                    <Typography variant='button'
                                        component='div'
                                        gutterBottom><MonitorHeartIcon style={{background: '#fff', color: 'green', width: 30, height: 30}}  />
                                        Order Status
                                    </Typography>
                                </Box>
                                    <Box>
                                        <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <AttachMoneyIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    {order?.paymentInfo?.status === 'succeeded' ? 'Paid' : 'Not Paid'}
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <TakeoutDiningIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={order?.orderStatus} />
                                            </ListItem>

                                        </List>
                                    </Box>
                            </Box>



                            <Box className='base-div4'>
                                <Box className='div3'>
                                    <Box className='title'>
                                        <Avatar sx={{ mr: 1, background: '#fff', color: '#9c27b0', width: 30, height: 30 }}><LocalShippingIcon /></Avatar>
                                        <Typography variant='button'
                                            component='div'
                                            gutterBottom>Shipping
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
                                                <ListItemText>{order?.shippingInfo?.phone}</ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <LocationOnIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={order && `${order?.shippingInfo?.address},${order?.shippingInfo?.city},${order?.shippingInfo?.zipCode},${order?.shippingInfo?.state},${order?.shippingInfo?.country}`} />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>

                                <Box className='div3'>
                                    <Box className='title'>
                                        <Avatar sx={{ mr: 1, background: '#fff', color: '#9c27b0', width: 30, height: 30 }}>
                                            <ShoppingCartIcon />
                                        </Avatar>
                                        <Typography component='div'
                                            variant='button'
                                            sx={{ textAlign: 'center' }}>Cart Items Info
                                        </Typography>
                                    </Box>
                                    <Box>
                                        {order.orderItems && order.orderItems.map((item, i) => (
                                            <Box key={item._id} sx={{ display: 'flex', width: '100%', mb: 2 }}>
                                                <Box>
                                                    <img src={item.product.images[0].url} alt={item.title} style={{ maxWidth: 100, marginRight: '5px' }} />
                                                </Box>
                                                <Box>
                                                    <Typography component='div'
                                                        variant='button'>
                                                        <Link to={`/product/${item.product._id}`}>{item.product.title}</Link>

                                                    </Typography>
                                                    <Typography component='div'
                                                        variant='button'>
                                                        Price : {formatCurrency(item.price)} x {item.quantity}={formatCurrency(item.price * item.quantity)}
                                                    </Typography>
                                                </Box>

                                            </Box>
                                        ))}
                                    </Box>
                                </Box>

                                <Box className='div3'>
                                    <Box className='title'>
                                        <Avatar sx={{ mr: 1, background: '#fff', color: '#9c27b0', width: 30, height: 30 }}>
                                            <FactCheckIcon />
                                        </Avatar>
                                        <Typography component='div'
                                            variant='button'
                                            sx={{ textAlign: 'center' }}>Orders Info
                                        </Typography>
                                    </Box>

                                    <Grid container>
                                        <Grid item xs>
                                            <Typography variant='button' component='div'>
                                                Subtotal :
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='button' component='div'>
                                                {formatCurrency(order && order.itemsPrice)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs>
                                            <Typography variant='button' component='div'>
                                                Shipping Charges :
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='button' component='div'>
                                                {formatCurrency(order && order.shippingPrice)}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs>
                                            <Typography variant='button' component='div'>
                                                Tax :
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='button' component='div'>
                                                {formatCurrency(order && order.taxPrice)}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs>
                                            <Typography variant='button' component='div'>
                                                Total :
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='button' component='div'>
                                                {formatCurrency(order && order.totalPrice)}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Box>
                            </div> */}

                        </>
                    }
                </>
            </Box>
        </>
    )
}


export default OrderDetails
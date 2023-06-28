import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosPrivate from '../../redux/axiosPrivate';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart } from '../../redux/features/cartSlice';
import logo from '../../images/logoo.png'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Card, Avatar, Typography, Grid, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PaymentIcon from '@mui/icons-material/Payment';

import { selectCartItems } from '../../redux/features/cartSlice';
import { selectShippingInfo } from '../../redux/features/shippingSlice';
import { selectLoggedInUser } from '../../redux/features/authSlice';
import jwtDecode from 'jwt-decode';
import { selectOrderMutationResult, createOrder, resetMutationResult } from '../../redux/features/orderSlice';
import { formatCurrency } from '../../utility/formatCurrency';
import Header2 from '../Layout/Header2';


const StripeCheckoutForm = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const stripe = useStripe();
    const elements = useElements();
    const [proccessing, setProcessing] = useState(false);
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { shipInfo } = useSelector(selectShippingInfo);
    const { products } = useSelector(selectCartItems);
    const { user, accessToken } = useSelector(selectLoggedInUser);
    const { UserInfo } = jwtDecode(accessToken);
    const userEmail = UserInfo.email.toString();
    const { success } = useSelector(selectOrderMutationResult);
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const orderItems = products.map(({ _id, ...rest }) => ({ ...rest, product: _id }));

    const order = {
        shippingInfo: shipInfo,
        orderItems: orderItems,
        itemsPrice: orderInfo.subTotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharge,
        totalPrice: orderInfo.totalPrice

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const { data } = await axiosPrivate.post(`/create-payment-intent`, paymentData);
            const client_secret = data.clientSecret;
            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: userEmail,
                        address: {
                            line1: shipInfo.address,
                            city: shipInfo.city,
                            state: shipInfo.state,
                            postal_code: shipInfo.zipCode,
                            country: shipInfo.country
                        }
                    }
                }
            });

            if (result.error) {
                toast.error(result.error.message);
                setProcessing(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder({ order, toast }));
                } else {
                    toast.error('Processing Error');
                    setProcessing(false);
                }
            }

        } catch (error) {
            toast.error(error.response.data.message);
            setProcessing(false);
        }
    }
    useEffect(() => {
        if (success) {
            dispatch(resetMutationResult());
            setProcessing(false);
            navigate('/order/success');
            dispatch(clearCart())

        }
    }, [dispatch, success, navigate]);

    return (
        <>
            <Header2 />
            {/*Banner starts*/}
            <section class="banner productpage">
                <div class="container container2">
                    <div class="row">
                    <div class="col-lg-12 d-flex justify-content-center">
                            <div class="text-center">
                                <h2 class="banner-title">Payment</h2>
                                <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><Link to='/'><HomeIcon /> Home</Link></li>
                                        <li class="breadcrumb-item active" aria-current="page">Payment</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Banner Ends*/}
            <Box component='form'
                onSubmit={(e) => submitHandler(e)}
                sx={{ m: '0 auto', maxWidth: '550px', textAlign: 'center', minWidth: '500px', paddingTop: '10rem', paddingBottom: '10rem' }}>
                <Card sx={{ p: 1, pt: 3 }}>
                    <Avatar sx={{ bgcolor: 'white', height: '150px', width: '400px', m: '0 auto' }}>
                        <img src={logo} alt="" style={{ width: '400px' }} />
                    </Avatar>

                    <Divider sx={{ m: '10px 0' }} />
                    <Box sx={{ textAlign: 'right' }}>
                        <Grid container sx={{ alignItems: 'center', m: '20px 0' }}>
                            <Grid item xs sx={{ mr: 1 }}><Typography>Card Number : </Typography></Grid>
                            <Grid item xs><CardNumberElement style={{ border: '1px solid #dadada' }} /></Grid>
                        </Grid>

                        <Grid container sx={{ alignItems: 'center', m: '20px 0' }}>
                            <Grid item xs sx={{ mr: 1 }}><Typography>Card Expire Date : </Typography></Grid>
                            <Grid item xs><CardExpiryElement style={{ border: '1px solid #dadada' }} /></Grid>
                        </Grid>

                        <Grid container sx={{ alignItems: 'center', m: '20px 0' }}>
                            <Grid item xs sx={{ mr: 1 }}><Typography>Card CVC : </Typography></Grid>
                            <Grid item xs><CardCvcElement style={{ border: '1px solid #dadada' }} /></Grid>
                        </Grid>
                    </Box>

                    <LoadingButton type='submit'
                        loading={proccessing}
                        loadingPosition='start'
                        startIcon={<PaymentIcon />}
                        className='btn02 explorebtn'
                        style={{backgroundColor:'rgb(70, 88, 73)',color:'#ffffff',borderRadius:'20px'}}
                        >
                        Pay - {orderInfo && formatCurrency(orderInfo.totalPrice)}

                    </LoadingButton>
                </Card>
            </Box>
        </>
    )
}

export default StripeCheckoutForm
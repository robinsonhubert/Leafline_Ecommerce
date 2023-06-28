import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Link, useNavigate } from 'react-router-dom';
import delivery from '../../images/delivery.svg'
import { selectShippingInfo, saveShippingInfo } from '../../redux/features/shippingSlice';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import './shipping.css'
import { Box,  TextField, Button, TextareaAutosize, Grid, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import './ConfirmOrder.css';
import { formatCurrency } from '../../utility/formatCurrency';

// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import { selectCartItems } from '../../redux/features/cartSlice';
import Header2 from '../Layout/Header2';

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shipInfo } = useSelector(selectShippingInfo);
  const validationCriteria = {
    firstname: {
      required: true,
    },
    lastname: {
      required: true,
    },
    address: {
      required: true,
      minLength: 5, // Example: Address should have at least 5 characters
    },
    city: {
      required: true,
    },
    zipCode: {
      required: true,
      pattern: /^\d{5}$/ // Example: Zip code should be a 5-digit number
    },
    // state: {
    //   required: true,
    // },
    country: {
      required: true,
    },
    phone: {
      required: true,
      pattern: /^\d{10}$/ // Example: Phone number should be a 10-digit number
    },
  };

  const [firstname, setFirstname] = useState(shipInfo.firstname || '')
  const [lastname, setLastname] = useState(shipInfo.lastname || '')
  const [address, setAddress] = useState(shipInfo.address || '');
  const [city, setCity] = useState(shipInfo.city || '');
  const [zipCode, setZipCode] = useState(shipInfo.zipCode || '');
  const [state, setState] = useState(shipInfo.state || '');
  const [country, setCountry] = useState(shipInfo.country || '');
  const [phone, setPhone] = useState(shipInfo.phone || '');
  const [errors, setErrors] = useState({});

  const validateShippingInfo = () => {
    const newErrors = {};

    // Validate each shipping field based on the validation criteria
    for (const field in validationCriteria) {
      const value = eval(field); // Get the value of the field dynamically

      // Check if the field is required and value is empty
      if (validationCriteria[field].required && !value) {
        newErrors[field] = 'This field is required.';
      }

      // Check if the field has a pattern to match
      if (
        validationCriteria[field].pattern &&
        value &&
        !validationCriteria[field].pattern.test(value)
      ) {
        newErrors[field] = 'Invalid format.';
      }

      // Check if the field has a minimum length
      if (
        validationCriteria[field].minLength &&
        value &&
        value.length < validationCriteria[field].minLength
      ) {
        newErrors[field] = `Must be at least ${validationCriteria[field].minLength} characters long.`;
      }
    }

    setErrors(newErrors); // Update the errors state
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const { products } = useSelector(selectCartItems);

  const addres = shipInfo.address + ' , ' + shipInfo.zipCode + ' , ' + shipInfo.city + ' , ' + shipInfo.country;

  let subTotal = products.reduce((acc, item) => acc + item.quantity * item.price, 0);

  let unitShippingCharge = [];
  let shippingCharge = 0;
  if (shipInfo.country === 'LK') {
    for (let i = 0; i < products.length; i++) {
      if (products[i].localShipmentPolicy === 'free') {
        shippingCharge = shippingCharge + 0;
        unitShippingCharge[i] = 0;
      }
      if (products[i].internationalShipmentPolicy === 'custom') {
        shippingCharge = shippingCharge + (products.customLocalShipmentCost);
        unitShippingCharge[i] = products.customLocalShipmentCost;
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].internationalShipmentPolicy === 'free') {
        shippingCharge = shippingCharge + 0;
        unitShippingCharge[i] = 0;
      }
      if (products[i].internationalShipmentPolicy === 'custom') {
        shippingCharge = shippingCharge + (products[i].customInternationalShipmentCost);
        unitShippingCharge[i] = products[i].customInternationalShipmentCost;
      }

    }
  }
  const totalPrice = subTotal + shippingCharge;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateShippingInfo()) {
      dispatch(saveShippingInfo({ firstname, lastname, address, phone, city, zipCode, country }));
      // navigate('/confirm-order');
    }
  }
  const proccedToPayment = () => {
    const data = {
      subTotal, shippingCharge, totalPrice
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/payment');
  }
  return (
    <>
      <Header2 />
      {/*Banner starts*/}
      <section class="banner productpage">
        <div class="container container2">
          <div class="row">
            <div class="col-lg-12 d-flex justify-content-center">
              <div class="text-center">
                <h2 class="banner-title">Checkout</h2>
                <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to='/'><HomeIcon /> Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Checkout </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Banner Ends*/}







      <main className='productDetailsContainer container'>
        <div class="container3">
          <div class="card__body">
            <form id="" className='glassmorphism-form' style={{ backgroundColor: '#DAE2B6' }} onSubmit={handleSubmit} >
              <header style={{ }}>
                Shipping Details
              </header>
              <div class="grid-container" style={{ backgroundColor: '#DAE2B6' }}>
                <div className="area">
                  <div class="grid-child purple">
                    <div className="row2">
                      <div className="col2">
                        <input
                          type="text"
                          name="firstname"
                          value={firstname}
                          onChange={(e => setFirstname(e.target.value))}
                        />
                        <label htmlFor="firstname">First Name</label>
                        {errors.firstname && <p className='validationError' color="red">{errors.firstname}</p>}

                      </div>
                      <div className="col2">
                        <input
                          type="text"
                          name="lastname"
                          value={lastname}
                          onChange={(e => setLastname(e.target.value))}
                        />
                        <label htmlFor="lastname">Last Name</label>
                        {errors.lastname && <p className='validationError' color="red">{errors.lastname}</p>}

                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={(e => setPhone(e.target.value))}
                      />
                      {errors.phone && <p className='validationError'>{errors.phone}</p>}
                    </div>
                    <div className="row">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e => setAddress(e.target.value))}
                      />
                      {errors.address && <p className='validationError'>{errors.address}</p>}

                    </div>
                  </div>
                  <div className="area">
                    <div className="ckeckarea">

                    </div>
                    <div className="row2">
                      <div className="col2">
                        <input
                          type="text"
                          name="newfirstname"
                          value={city}
                          onChange={(e => setCity(e.target.value))}
                        />
                        {errors.city && <p className='validationError'>{errors.city}</p>}

                        <label htmlFor="newfirstname">City</label>
                      </div>
                      <div className="col2">
                        <input
                          type="text"
                          name="newlastname"
                          value={zipCode}
                          onChange={(e => setZipCode(e.target.value))}
                        />
                        <label htmlFor="newlastname">Zip Code</label>
                        {errors.zipCode && <p className='validationError'>{errors.zipCode}</p>}
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="selectTheCountry">Select The Country</label>
                      <CountryDropdown classes='ship-drop-down'
                        defaultOptionLabel=''
                        id='selectTheCountry'
                        style={{ width: '100%', backgroundColor: '#ffffff', color: '#000', border: '2px solid #000' }}
                        value={country}
                        valueType='short'
                        priorityOptions={['CA', 'US', 'IN', 'GB']}
                        onChange={(e => setCountry(e))}
                      />
                      {errors.country && <p className='validationError'>{errors.country}</p>}

                    </div>
                  </div>

                </div>


              </div>
              <div class="action">
                <button type="submit" value="Submit" className="btn02 explorebtn"><LocalShippingIcon />Checkout</button>
              </div>
            </form>
          </div>
        </div>

        <div className='container3'>
          {/* <!--heading---> */}
          <div class='card__body1'>
            <header style={{ backgroundColor: '#DAE2B6' }}>
              Order Details
            </header>
            <Box>
              <div class="grid-child green area">
                <div className='base-div3'>
                  <div id='cardDiv'>
                    <Box className='div1'>
                      <Box className='confirmOrderTitle '>
                        <p component='div' style={{fontWeight:'bold', textAlign: 'left', color: "#17432f" }}>
                          Shipping Address
                        </p>
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
                            <ListItemText>{shipInfo && shipInfo.address},</ListItemText>
                            <ListItemText>{shipInfo && shipInfo.city},</ListItemText>
                            <ListItemText>{shipInfo && shipInfo.country},</ListItemText>
                            <ListItemText>{shipInfo && shipInfo.zipCode}</ListItemText>
                          </ListItem>
                        </List>
                      </Box>
                    </Box>

                    <Box className='div2'>
                      <Box className='confirmOrderTitle'>
                        <p component='div'  style={{fontWeight:'bold', textAlign: 'left', color: "#17432f" }}>
                          Cart Items Info
                        </p>
                      </Box>
                      <Box>
                        {products &&
                          products.map((item, i) => (
                            <Box key={item._id} sx={{ display: 'flex', width: '100%', mb: 2 }}>
                              <Box>
                                <img src={item.image} alt={item.title} style={{ maxWidth: 100, marginRight: '5px' }} />
                              </Box>
                              <Box style={{paddingLeft:'40px'}}>
                                <p component='div' variant='button'>
                                  <Link to={`/product/${item._id}`} style={{color:'#008000'}}>{item.title}</Link>
                                </p>
                                <p component='div' variant='button' style={{fontSize:'15px'}}>
                                  Price : {formatCurrency(item.price)} x {item.quantity}={formatCurrency(item.price * item.quantity)}
                                </p>
                              </Box>
                            </Box>
                          ))}
                      </Box>
                    </Box>

                    <Box className='div3'>
                      <Box className='confirmOrderTitle'>
                      <p style={{fontWeight:'bold', textAlign: 'left', color: "#17432f" }}>
                          Orders Info
                        </p>
                      </Box>
                      <Box>
                        <Grid container>
                          <Grid item >
                          <p style={{textAlign: 'left', color: "" }}>
                              Subtotal :
                            </p>
                          </Grid>
                          <Grid item>
                          <p style={{textAlign: 'left', color: "" }}>
                              {formatCurrency(subTotal)}
                            </p>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item >
                          <p style={{textAlign: 'left', color: "" }}>
                              Shipping charges :
                            </p>
                          </Grid>
                          <Grid item>
                            <p style={{textAlign: 'left', color: "" }}>
                              {formatCurrency(shippingCharge)}
                            </p>
                          </Grid>
                        </Grid>
                        <Grid container sx={{ paddingTop: '100px' }}>
                          <Grid item >
                            <p style={{ textAlign: 'left', color: "" }}>
                              Total :
                            </p>
                          </Grid>
                          <Grid item >
                            <p style={{ textAlign: 'left', color: "" }}>
                              {formatCurrency(totalPrice)}
                            </p>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </div>
                </div>
                <Box>
                </Box>
              </div>
            </Box>
          </div>
        </div>

      </main >
      <div class='action' style={{paddingBottom:'30px'}}>
        <button
          className='btn02 explorebtn'
          onClick={proccedToPayment}
        >
          <PaidIcon />
          Proceed to payment
        </button>
      </div>

    </>
  )
}

export default Shipping
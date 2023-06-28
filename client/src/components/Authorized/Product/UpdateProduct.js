import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import BoxShadowLoader from '../../../components/Skeletons/BoxShadowLoader';

import { Box, Typography, TextField, Button, TextareaAutosize, Grid, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import UpdateIcon from '@mui/icons-material/Update';
import PhotoIcon from '@mui/icons-material/Photo';
import CollectionsIcon from '@mui/icons-material/Collections';

import { getCategories, selectAllCategories } from '../../../redux/features/categorySlice';
import { productDetails, resetMutationResult, selectProductDetails, selectProductMutationResult, updateProduct } from '../../../redux/features/productSlice';
import { POLICIES } from '../../../constants/policies';
import { IMAGE_BASEURL } from '../../../constants/baseURL';

const UpdateProduct = () => {

  const Input = styled('input')({
    display: 'none',
  })

  const InfoTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      padding: '10px 5px',
      maxWidth: 220
    },
  }));

  const { id } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState(0);
  const [weight, setWeight] = useState(0);
  const [stock, setStock] = useState(1);
  const [category, setCategory] = useState('');
  const [localShipmentPolicy, setLocalShipmentPolicy] = useState('standard');
  const [internationalShipmentPolicy, setInternationalShipmentPolicy] = useState('standard');
  const [customLocalShipmentCost, setCustomLocalShipmentCost] = useState('');
  const [customInternationalShipmentCost, setCustomInternationalShipmentCost] = useState('');
  const [images, setImages] = useState([]);
  const [productFiles, setProductFiles] = useState([]);

  const { loading, product } = useSelector(selectProductDetails);
  const { categories } = useSelector(selectAllCategories);

  const { loading: isUdating, success } = useSelector(selectProductMutationResult);

  const imageHandler = (e) => {
    const files = Array.from(e.target.files);
    setProductFiles(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result])
        }
      }
      reader.readAsDataURL(file);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('weight', weight);
    formData.append('stock', stock);
    formData.append('category', category);
    formData.append('localShipmentPolicy', localShipmentPolicy);
    formData.append('internationalShipmentPolicy', internationalShipmentPolicy);
    formData.append('customLocalShipmentCost', customLocalShipmentCost);
    formData.append('setCustomInternationalShipmentCost', setCustomInternationalShipmentCost);


    Object.keys(productFiles).forEach(key => {
      formData.append(productFiles.item(key).name, productFiles.item(key));
    })
    dispatch(updateProduct({ id, formData, toast }));
  }

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }

    dispatch(productDetails({ id, toast }));
  }, [dispatch, id, success]);

  useEffect(() => {
    if (product) {
      setTitle(product?.title);
      setDescription(product?.description);
      setPrice(product?.price);
      setDiscount(product?.discount);
      setWeight(product?.weight);
      setStock(product?.stock);
      setCategory(product?.category?._id);
      setLocalShipmentPolicy(product?.localShipmentPolicy);
      setInternationalShipmentPolicy(product?.internationalShipmentPolicy);
      setCustomLocalShipmentCost(product?.customLocalShipmentCost);
      setCustomInternationalShipmentCost(product?.setCustomInternationalShipmentCost);
      setImages(product.images);
    }
  }, [product]);

  return (
    <>
      <Box
        className='dash-box'
        sx={{
          padding: '40px',
          minHeight: '100vh',
          marginTop: '30px'

        }}
      >
        <Typography component='div' variant='h5' color="green" fontFamily='poppins, sans-serif' style={{ textAlign: 'center' }}>Update Product</Typography>

        {loading ? <BoxShadowLoader /> :
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridGap: '20px',
              width: '85%',
              textAlign: 'center',
              boxShadow: '2px 2px 2px 2px #588157',
              borderRadius: '4px',
              backgroundColor: '#fff',
              padding: '55px',
              justifyContent: "center",
              marginLeft: "115px",
              marginTop: "45px",
              marginBottom: "20px",
              cursor: 'pointer',
            }}
          >
            <div>
              {images && (
                <Box className='galleryback'>
                  {images.map((image, index) => (
                    image.url ?
                      <img key={index} src={image.url}
                        alt='product image'
                        style={{maxWidth: '500px', maxHeight: '500px', padding: '0 5px' }} color="success" />
                      :
                      <img key={index} src={image} alt='product image'
                        style={{ maxWidth: '500px', maxHeight: '500px', padding: '0 5px' }} color="success" />
                  ))
                  }
                </Box>
              )}
              <Box>
                <label htmlFor='productImage'>
                  <Input accept='image/*'
                    id='productImage'
                    fontFamily='poppins, sans-serif'
                    multiple
                    type='file'
                    name='productImage'
                    onChange={imageHandler}
                  />
                  <Button type='button'
                    fullWidth
                    component='span'
                    variant='outlined'
                    startIcon={<CollectionsIcon />}
                    sx={{ marginLeft:'55px',marginTop:'16px', fontFamily: 'poppins, sans-serif',borderRadius:'20px' }}
                    color="success"

                  >Upload photo</Button>
                </label>
              </Box>
            </div>
            <div>
              <Box sx={{ m: '0 auto', marginTop: 2, maxWidth: '550px' }}>
                <Box component='form' onSubmit={handleSubmit} >
                  <TextField type='text'
                    id='title'
                    label='Title'
                    name='title'
                    margin='normal'
                    required
                    fullWidth
                    autoFocus
                    value={title}
                    onChange={(e => setTitle(e.target.value))}
                    color="success"
                  />
                  <TextareaAutosize required
                    aria-label='description'
                    fontFamily='poppins, sans-serif'
                    minRows={5}
                    placeholder='Description'
                    value={description}
                    style={{ width: '100%', marginTop: '16px' }}
                    onChange={(e => setDescription(e.target.value))}
                    color="success"
                  />


                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField type='number'
                        id='price'
                        fontFamily='poppins, sans-serif'
                        label='Price'
                        name='price'
                        margin='normal'
                        required
                        fullWidth
                        value={price}
                        onChange={(e => setPrice(e.target.value))}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField type='number'
                        id='discount'
                        fontFamily='poppins, sans-serif'
                        label='Discount'
                        name='discount'
                        margin='normal'
                        required
                        fullWidth
                        value={discount}
                        onChange={(e => setDiscount(e.target.value))}
                        color="success"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <InfoTooltip placement='right'
                        arrow
                        title='Weight in kg. Put weight if items weight exceed 5kg'>
                        <TextField type='number'
                          id='weight'
                          label='Weight'
                          fontFamily='poppins, sans-serif'
                          name='weight'
                          margin='normal'
                          fullWidth
                          value={weight}
                          onChange={(e => setWeight(e.target.value))}
                          color="success"
                        />
                      </InfoTooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField type='number'
                        id='stock'
                        label='Stock'
                        name='stock'
                        fontFamily='poppins, sans-serif'
                        margin='normal'
                        required
                        fullWidth
                        value={stock}
                        onChange={(e => setStock(e.target.value))}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: '4px' }}>
                    <Grid item xs={6}>
                      <FormControl fullWidth color="success">
                        <InputLabel id='category' color="success">Category</InputLabel>
                        <Select required
                          labelId='category'
                          id='category'
                          fontFamily='poppins, sans-serif'
                          value={category}
                          label='Category'
                          onChange={(e => setCategory(e.target.value))}>

                          {categories && categories.map((cat) =>
                            <MenuItem key={cat._id} value={cat._id}>{cat.title}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>

                  </Grid>



                  <Grid container spacing={2} sx={{ mt: '16px' }} >
                    <Grid item xs={6}>
                      <FormControl fullWidth color="success">
                        <InputLabel id='localShipmentPolicy' color="success">Local Shipment Policy</InputLabel>
                        <Select required
                          labelId='localShipmentPolicy'
                          fontFamily='poppins, sans-serif'
                          id='localShipmentPolicy'
                          value={localShipmentPolicy}
                          label='Local Shipment Policy'
                          onChange={(e => setLocalShipmentPolicy(e.target.value))}>

                          {POLICIES && POLICIES.map((policy) =>
                            <MenuItem key={policy.id} value={policy.type}>{policy.title}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth color="success">
                        <InputLabel id='internationalShipmentPolicy' color="success">International Shipment Policy</InputLabel>
                        <Select required
                          labelId='internationalShipmentPolicy'
                          fontFamily='poppins, sans-serif'
                          id='internationalShipmentPolicy'
                          value={internationalShipmentPolicy}
                          label='International Shipment Policy'
                          onChange={(e => setInternationalShipmentPolicy(e.target.value))}>

                          {POLICIES && POLICIES.map((policy) =>
                            <MenuItem key={policy.id} value={policy.type}>{policy.title}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {localShipmentPolicy !== 'custom' ? '' :
                        <TextField type='number'
                          id='customLocalShipmentCost'
                          fontFamily='poppins, sans-serif'
                          label='Local Shipment Cost'
                          name='customLocalShipmentCost'
                          margin='normal'
                          fullWidth
                          value={customLocalShipmentCost}
                          onChange={(e => setCustomLocalShipmentCost(e.target.value))}
                          color="success"
                        />
                      }
                    </Grid>
                    <Grid item xs={6}>
                      {internationalShipmentPolicy !== 'custom' ? '' :
                        <TextField type='number'
                          id='customInternationalShipmentCost'
                          label='International Shipment Cost'
                          fontFamily='poppins, sans-serif'
                          name='customInternationalShipmentCost'
                          margin='normal'
                          fullWidth
                          value={customInternationalShipmentCost}
                          onChange={(e => setCustomInternationalShipmentCost(e.target.value))}
                          color="green"
                        />
                      }
                    </Grid>
                  </Grid>







                  <Button type='submit'
                    fullWidth
                    disabled={isUdating ? true : false}
                    variant='contained'
                    startIcon={<UpdateIcon />}
                    sx={{
                      mt: 3, mb: 2, backgroundColor: "rgb(70, 88, 73)", borderRadius: "10px", fontFamily: 'poppins, sans-serif', '&:hover': {
                        backgroundColor: "#9DC183",
                        color: "#000",
                        border: "black",
                        boxShadow: 'none',
                      },
                    }}

                  >Update Product</Button>
                </Box>
              </Box>
            </div>

          </Box>
        }
      </Box >
    </>
  )
}

export default UpdateProduct
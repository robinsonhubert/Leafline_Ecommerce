import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './Product.css';
import { Box, Typography, TextField, Button, TextareaAutosize, Grid, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { styled } from '@mui/material/styles';
import CollectionsIcon from '@mui/icons-material/Collections';
import { getCategories, selectAllCategories } from '../../../redux/features/categorySlice';
import { addProduct, resetMutationResult, selectProductMutationResult } from '../../../redux/features/productSlice';
import { POLICIES } from '../../../constants/policies';
import gallery from '../../../images/gallery.png';
import galleryback from '../../../images/galleryback.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const AddNewProduct = () => {
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
  const dispatch = useDispatch();
  const { loading, success } = useSelector(selectProductMutationResult);
  const { categories } = useSelector(selectAllCategories);
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
    if (images.length < 1) {
      toast.error('Please select images.');
      return;
    }
    if ((localShipmentPolicy === 'custom') && (customLocalShipmentCost < 1)) {
      toast.error('Please enter custom shipping cost');
      return;
    }
    if ((internationalShipmentPolicy === 'custom') && (setCustomInternationalShipmentCost < 1)) {
      toast.error('Please enter custom shipping cost');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('weight', weight);
    formData.append('category', category);
    ;
    formData.append('localShipmentPolicy', localShipmentPolicy);
    formData.append('internationalShipmentPolicy', internationalShipmentPolicy);
    formData.append('customLocalShipmentCost', customLocalShipmentCost);
    formData.append('setCustomInternationalShipmentCost', setCustomInternationalShipmentCost);
    Object.keys(productFiles).forEach(key => {
      formData.append(productFiles.item(key).name, productFiles.item(key));
    })
    dispatch(addProduct({ formData, toast }));
  }
  useEffect(() => {
    dispatch(getCategories({ toast }));
  }, [dispatch]);
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
      setTitle('');
      setDescription('');
      setPrice('');
      setDiscount(0);
      setWeight(0);
      setStock(1);
      setCategory('');
      setImages([]);
      setProductFiles([]);
    }
  }, [success, dispatch]);
  return (
    <>
      <Box
        className='dash-box'
        sx={{
          padding: '40px',
          minHeight: '100vh',
          marginTop:'30px'

        }}
      >
                  <Typography component='div' color="#1B5E20" variant='h5' sx={{ textAlign: 'center', fontFamily: 'poppins, sans-serif' }}>Add New Product</Typography>

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
            {images.length > 0 ?
              <Box className='galleryback'  >
                {images.map((image, index) => (
                  <img key={index} src={image} alt='product image' style={{ maxWidth: '500px', maxHeight: '500px', padding: '0 5px'}} color="success" />
                ))}
              </Box>
              :
              <Box className='galleryback' style={{ backgroundImage: `url("${galleryback}")`,width:'500px',height:'500px'}}>
                <img src={gallery} alt='LeafLine nophoto' color="success" />
              </Box>
            }
            <Box>
              <label htmlFor='productImage' >
                <Input accept='image/'
                  id='productImage'
                  multiple
                  type='file'
                  name='productImage'
                  onChange={imageHandler}
                  color="success"
                  
                />
                <Button type='button'
                  fullWidth
                  component='span'
                  variant='outlined'
                  startIcon={<CollectionsIcon />}
                  sx={{
                    m: '16px 0', fontFamily: 'poppins, sans-serif',borderRadius:'20px'
                  }}
                  color="success"
                >Upload photo</Button>
              </label>
            </Box>

          </div>
          <div>
          <Box component='form' onSubmit={handleSubmit}>
              <TextField type='text'
                id='title'
                label='Title'
                fontFamily='poppins, sans-serif'
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
                color="green"
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
        
                <Grid item xs={6} style={{marginTop:'1rem'}}>
                  <FormControl fullWidth>
                    <InputLabel id='category'>Category</InputLabel>
                    <Select required
                      labelId='category'
                      id='category'
                      fontFamily='poppins, sans-serif'
                      value={category}
                      label='Category'
                      onChange={(e => setCategory(e.target.value))}
                      color="success"
                    >
                      {categories && categories.map((cat) =>
                        <MenuItem key={cat._id} value={cat._id}>{cat.title}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6}style={{marginTop:'0.3rem'}}>
                  <TextField type='number'
                    id='stock'
                    fontFamily='poppins, sans-serif'
                    label='Stock'
                    name='stock'
                    margin='normal'
                    required
                    fullWidth
                    value={stock}
                    onChange={(e => setStock(e.target.value))}
                    color="success"
                    min="10"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: '4px' }}>
                
              </Grid>
             
              <Grid container spacing={2} sx={{ mt: '16px' }}style={{marginTop:'0.2rem'}}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id='localShipmentPolicy'>Local Shipment Policy</InputLabel>
                    <Select required
                      labelId='localShipmentPolicy'
                      fontFamily='poppins, sans-serif'
                      id='localShipmentPolicy'
                      value={localShipmentPolicy}
                      label='Local Shipment Policy'
                      onChange={(e => setLocalShipmentPolicy(e.target.value))}
                      color="success">
                      {POLICIES && POLICIES.map((policy) =>
                        <MenuItem key={policy.id} value={policy.type}>{policy.title}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id='internationalShipmentPolicy'>International Shipment Policy</InputLabel>
                    <Select required
                      labelId='internationalShipmentPolicy'
                      id='internationalShipmentPolicy'
                      fontFamily='poppins, sans-serif'
                      value={internationalShipmentPolicy}
                      label='International Shipment Policy'
                      onChange={(e => setInternationalShipmentPolicy(e.target.value))}
                      color="success">
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
                      color="success"
                    />
                  }
                </Grid>
              </Grid>

              <button type='submit'
                fullWidth
                disabled={loading ? true : false}
                startIcon={<AddBoxOutlinedIcon />}
                className='btn02 explorebtn'
                style={{ marginTop: '20px' }}
              >Add Product</button>
            </Box>
          </div>
          {/* <div>
          <Box sx={{ m: '0 auto', maxWidth: '550px', marginTop:'-9rem' }}>
            <Box component='form' onSubmit={handleSubmit}>
              <TextField type='text'
                id='title'
                label='Title'
                fontFamily='poppins, sans-serif'
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
                color="green"
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
        
                <Grid item xs={6} style={{marginTop:'1rem'}}>
                  <FormControl fullWidth>
                    <InputLabel id='category'>Category</InputLabel>
                    <Select required
                      labelId='category'
                      id='category'
                      fontFamily='poppins, sans-serif'
                      value={category}
                      label='Category'
                      onChange={(e => setCategory(e.target.value))}
                      color="success"
                    >
                      {categories && categories.map((cat) =>
                        <MenuItem key={cat._id} value={cat._id}>{cat.title}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6}style={{marginTop:'0.3rem'}}>
                  <TextField type='number'
                    id='stock'
                    fontFamily='poppins, sans-serif'
                    label='Stock'
                    name='stock'
                    margin='normal'
                    required
                    fullWidth
                    value={stock}
                    onChange={(e => setStock(e.target.value))}
                    color="success"
                    min="10"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: '4px' }}>
                
              </Grid>
             
              <Grid container spacing={2} sx={{ mt: '16px' }}style={{marginTop:'0.2rem'}}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id='localShipmentPolicy'>Local Shipment Policy</InputLabel>
                    <Select required
                      labelId='localShipmentPolicy'
                      fontFamily='poppins, sans-serif'
                      id='localShipmentPolicy'
                      value={localShipmentPolicy}
                      label='Local Shipment Policy'
                      onChange={(e => setLocalShipmentPolicy(e.target.value))}
                      color="success">
                      {POLICIES && POLICIES.map((policy) =>
                        <MenuItem key={policy.id} value={policy.type}>{policy.title}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id='internationalShipmentPolicy'>International Shipment Policy</InputLabel>
                    <Select required
                      labelId='internationalShipmentPolicy'
                      id='internationalShipmentPolicy'
                      fontFamily='poppins, sans-serif'
                      value={internationalShipmentPolicy}
                      label='International Shipment Policy'
                      onChange={(e => setInternationalShipmentPolicy(e.target.value))}
                      color="success">
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
                      color="success"
                    />
                  }
                </Grid>
              </Grid>

              <button type='submit'
                fullWidth
                disabled={loading ? true : false}
                startIcon={<AddBoxOutlinedIcon />}
                className='btn02 explorebtn'
                style={{ marginTop: '20px' }}
              >Add Product</button>
            </Box>
          </Box>
          </div> */}
        </Box>
      </Box>
    </>
  )
}
export default AddNewProduct


















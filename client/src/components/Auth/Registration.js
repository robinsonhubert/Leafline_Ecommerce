import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { registration } from '../../redux/features/authSlice';

import { Box, Avatar, Typography, TextField, Button, Grid, FormGroup, FormControlLabel, Checkbox, Link } from '@mui/material';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoIcon from '@mui/icons-material/Photo'
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import reg from '../../images/regg.png';

const Registration = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const [previewAvatar, setPreviewAvatar] = useState('');
  const [avatar, setAvatar] = useState('');

  const imageHandler = (e) => {
    console.log(e.target.name);
    if (e.target.name === 'avatar') {
      setAvatar(e.target.files);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewAvatar(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatar === '') {
      toast.warn('Please select a profile picture');
      return false;
    }
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    Object.keys(avatar).forEach(key => {
      formData.append(avatar.item(key).name, avatar.item(key));
    })
    dispatch(registration({ formData, toast }));
  }
  const handleKeepMeLoggedIn = () => {

  }
  const glassmorphismStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity as desired
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Adjust the shadow properties as desired
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.18)', // Adjust the border color and opacity as desired
    padding: '10px',
    margin: '0 auto',

  };
  return (
    <>

      <MDBContainer fluid className="p-3 my-5" style={glassmorphismStyles}>
        <MDBRow>
          <h2 style={{ textAlign: 'center', fontFamily: 'Poppins,Opens-serif' }}>REGISTRATION</h2>

          <MDBCol col='10' md='6'>
            {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" /> */}
            {/* <img src={reg} className="img-fluid" alt="Login image" style={{width:'500px',paddingTop:'60px'}}/> */}
            <img src="https://media.istockphoto.com/id/1146491866/photo/green-banana-leaf.jpg?s=612x612&w=0&k=20&c=Qjlha-KIeVxMRkixFRUqXx0EfUWVf-YMyn1Vca5D4Yg=" className="img-fluid" alt="Phone image" style={{ width: '500px', height: '600px', paddingTop: '10px', borderRadius: '40px', objectFit: 'cover' }} />

          </MDBCol>
          <MDBCol col='4' md='6'>


            <MDBCol>
              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <MDBInput
                  wrapperClass='mb-2'
                  type="text"
                  id="name"
                  style={{ color: 'black' }}
                  // label="Name"
                  name="name"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Email</label>

                <MDBInput
                  wrapperClass='mb-2'
                  type="email"
                  id="email"
                  style={{ color: 'black' }}
                  // label="Email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>

                <MDBInput
                  wrapperClass='mb-3'
                  type="password"
                  id="password"
                  style={{ color: 'black' }}
                  // label="Password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MDBRow className="align-items-center mt-4">
                  <MDBCol>
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: '80px', height: '80px', fontSize: '3.35rem' }}
                    >
                      {!previewAvatar ? (
                        <AccountCircleIcon fontSize="2.5rem" />
                      ) : (
                        <img src={previewAvatar} alt={previewAvatar} style={{ width: 80, height: 80 }} />
                      )}
                    </div>
                  </MDBCol>
                  <MDBCol>
                    <Button fullWidth
                      variant='contained'
                      component='label'
                      color="success"
                      startIcon={<PhotoIcon />}
                      style={{
                        cursor: "pointer",
                        border: "2px solid #fff",
                        padding: "14px 5px",
                        width: "250px",
                        bordeRadius: '200px',
                        color: " #fff",
                        background: "#1b4333",
                        fontFamily: "Poppins,Opens-serif",
                        fontSize: "16px",
                        transition: "200ms"
                      }}
                    >
                      <input type='file'
                        hidden
                        name='avatar'
                        onChange={imageHandler}
                      />
                      Upload Profile Picture
                    </Button>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mt-2">
                  <MDBCheckbox
                    style={{ color: 'black' }}

                    name='keepLoggedIn'
                    value=''
                    id='keepLoggedIn'
                    label='Keep Me Logged-In'
                    checked={checked}
                    onChange={handleKeepMeLoggedIn}
                  // style={{marginLeft:'100px'}}
                  />
                </MDBRow>
                <Button type='submit'
                  class='explorebtn'
                >Registration</Button>

              </form>
            </MDBCol>
          </MDBCol>

        </MDBRow>
      </MDBContainer>


      {/* <Box sx={{marginTop:2, display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Avatar sx={{m:1,bgcolor:'#1b5e20'}}>
            <NoAccountsIcon/>
        </Avatar>
        <Typography component='div' variant='h5' color="#1b5e20">Registration</Typography>

        <Box component='form' onSubmit={handleSubmit} >
            <TextField type='text'
                        id='name'
                        label='Name'
                        name='name'
                        margin='normal'
                        color="success"
                        required
                        fullWidth
                        autoFocus
                        value={name}
                        onChange={(e=>setName(e.target.value))}
            />
            <TextField type='email'
                        id='email'
                        label='Email'
                        name='email'
                        margin='normal'
                        required
                        color="success"
                        fullWidth
                        autoComplete='email'
                        value={email}
                        onChange={(e=>setEmail(e.target.value))}
            />
            <TextField type='password'
                        id='password'
                        label='Password'
                        name='password'
                        margin='normal'
                        required
                        color="success"
                        fullWidth
                        autoFocus
                        value={password}
                        onChange={(e=>setPassword(e.target.value))}
            />
            <Grid container style={{alignItems:'center',margin:'10px 0'}}>
                <Grid item xs>
                  <Avatar sx={{m:1,bgcolor:'green', height:'80px',width:'80px',fontSize:'5.35rem'}}>
                    {!previewAvatar ?
                    <AccountCircleIcon fontSize='2.5rem'/>
                    :
                    <img src={previewAvatar} alt={previewAvatar} style={{width:80,height:80}}/>
                    }
                </Avatar>
                </Grid>
                <Grid>
                  <Button fullWidth
                          variant='contained'
                          component='label'
                          color="success"
                          startIcon={<PhotoIcon/>}
                  >
                    <input type='file' 
                            hidden
                            name='avatar'
                            onChange={imageHandler}
                    />
                    Upload Profile Picture
                  </Button>
                </Grid>
            </Grid>
            <Button type='submit'
                        fullWidth
                        variant='contained'
                        color="success"
                        sx={{mt:3,mb:2}}
            >Registration & Login</Button>

            <Grid container style={{}}>
                <Grid item xs>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox/>}
                       
                                            label='Keep me logged in.'
                                            checked={checked}
                                            onChange={handleKeepMeLoggedIn}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </Box>  
    </Box> */}
    </>
  )
}

export default Registration
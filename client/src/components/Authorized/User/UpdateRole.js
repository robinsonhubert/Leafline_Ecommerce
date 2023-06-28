import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserDetails, selectUserDetails, updateUserRole, selectMutationResult, resetMutationResult } from '../../../redux/features/authSlice';
import { IMAGE_BASEURL } from '../../../constants/baseURL';

import { Box, Typography, Grid, Divider, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

const UpdateRole = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
  const [blocked, setBlocked] = useState('');
  const { user } = useSelector(selectUserDetails);

  const { success } = useSelector(selectMutationResult);

  const submitHandler = (e) => {
    e.preventDefault();

    let updatedRoles = [];
    let updatedBlocked = false;

    if (role === 'admin') {
      updatedRoles = ['admin']; // Change the user's roles to "admin"
      updatedBlocked = false; // Update the block status as desired
    } else {
      updatedRoles = ['user']; // Change the user's roles to "user"
      updatedBlocked = true; // Update the block status as desired
    }

    const jsonData = {
      roles: updatedRoles,
      blocked: updatedBlocked,
    };

    dispatch(updateUserRole({ id, jsonData, toast }));
  };


  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(getUserDetails({ id, toast }));
  }, [id, dispatch, success]);

  useEffect(() => {
    setRole(user?.roles);
    setBlocked(user?.blocked);

    if (user?.roles && user.roles.length > 1 && user.roles[1] === 'admin') {
      setRole('admin');
      setBlocked(false);
    } else {
      setRole('user');
      setBlocked(true);
    }
  }, [user]);

  return (
    <>
      <Box
        className='dash-box'
        sx={{
          padding: '40px',
          minHeight: '100vh',

        }}
      >
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
            width: "580px",
            marginLeft: "530px",
            marginTop: "45px",
            marginBottom: "20px"

          }}
        >
          <Box sx={{ maxWidth: '550px', m: '0 auto', display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            <Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography component='h1' fontFamily='poppins, sans-serif'
                  variant='h6'>Account Deatil's
                </Typography>
                <img src={user?.avatar?.url}
                  alt={user.name}
                  style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto' }}
                />
              </Box>


              <Grid container sx={{ alignItems: 'center', mt: 1 }}>

                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>User's Name</Typography></Grid>
                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>{user?.name}</Typography></Grid>

                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>User's Email</Typography></Grid>
                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>{user?.email}</Typography></Grid>

                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>Joined date:</Typography></Grid>
                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>{String(user?.createdAt).substr(0, 10)}</Typography></Grid>

                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>User's Role</Typography></Grid>
                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>{user?.roles}</Typography></Grid>

                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>User's Status</Typography></Grid>
                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>{user?.blocked ? 'Blocked' : 'Active'}</Typography></Grid>

              </Grid>

              <Divider />

              <Grid container sx={{ alignItems: 'center', mt: 3 }}>

                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>Change User's Status</Typography></Grid>

                <Grid item xs={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id='status'>Status</InputLabel>
                    <Select required
                      labelId='status'
                      id='status'
                      value={blocked}
                      label='Status'
                      onChange={(e => setBlocked(e.target.value))}>

                      <MenuItem value='true' fontFamily='poppins, sans-serif'>Block</MenuItem>
                      <MenuItem value='false' fontFamily='poppins, sans-serif'>Active</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>

              <Grid container sx={{ alignItems: 'center', mt: 3 }}>

                <Grid item xs={6}><Typography variant='button' component='div' fontFamily='poppins, sans-serif'>Change User's Role</Typography></Grid>

                <Grid item xs={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id='status'>Role</InputLabel>
                    <Select required
                      labelId='role'
                      id='role'
                      value={role || ''}
                      label='Role'
                      onChange={(e => setRole(e.target.value))}>

                      <MenuItem value='admin' fontFamily='poppins, sans-serif'>Admin</MenuItem>
                      <MenuItem value='user' fontFamily='poppins, sans-serif'>User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>



              <Button variant='contained'
                fullWidth
                startIcon={<UpdateIcon />}
                sx={{
                  mt: 3, mb: 2, backgroundColor: "rgb(70, 88, 73)",
                  borderRadius: "10px", fontFamily: 'poppins, sans-serif', '&:hover': {
                    backgroundColor: "#9DC183",
                    color: "#000",
                    border: "black",
                    boxShadow: 'none',
                  },
                }}
                onClick={submitHandler}>Change
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default UpdateRole
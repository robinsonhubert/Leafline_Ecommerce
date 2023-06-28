import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassword, selectMutationResult, resetMutationResult } from '../../redux/features/authSlice';
import { Button, Form } from 'react-bootstrap';
import HomeIcon from '@mui/icons-material/Home';
import Header2 from '../Layout/Header2';

import './UserProfile.css'
import { Box, Typography, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success } = useSelector(selectMutationResult);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.warn('New & confirm password not matched.');
      return;
    }
    const jsonData = {
      newPassword,
      oldPassword
    }
    dispatch(changePassword({ jsonData, toast }));
  }

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
      navigate('/profile');
    }
  }, [success, navigate, dispatch])

  return (
    <>
      <Header2 />
      {/*Banner starts*/}
      <div style={{ paddingBottom: '50px' }}>
        <section class="banner productpage">
          <div class="container container2">
            <div class="row">
              <div class="col-lg-12 d-flex justify-content-center">
                <div class="text-center">
                  <h2 class="banner-title">Product List</h2>
                  <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"><Link to='/'><HomeIcon /> Home</Link></li>
                      <li class="breadcrumb-item active" aria-current="page">Product List</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Banner Ends*/}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f1f1' }}>
          <div className=" border-0 bg-transparent mx-auto mt-4" style={{ maxWidth: '550px' }}>
            <h1 className="text-center mb-4">Change Password</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="oldPassword">
                <Form.Label style={{ color: 'black' }}>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter old password"
                  value={oldPassword}
                  style={{ color: 'black' }}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="newPassword">
                <Form.Label style={{ color: 'black' }}>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  style={{ color: 'black' }}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label style={{ color: 'black' }}>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  style={{ color: 'black' }}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 mt-3 mb-2">
                Update
              </Button>
            </Form>
          </div>
        </div>
        </div>
      </>
      )
}

      export default UpdatePassword
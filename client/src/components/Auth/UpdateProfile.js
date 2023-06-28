import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Avatar, Grid } from '@mui/material';
import { Photo } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { selectLoggedInUser, updateProfile, resetMutationResult, selectMutationResult } from '../../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header2 from '../Layout/Header2'
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectLoggedInUser);
  const { loading, success } = useSelector(selectMutationResult);

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [previewProfileImage, setPreviewProfileImage] = useState('');
  const [file, setFile] = useState('');

  const imageHandler = (e) => {
    setFile(e.target.files);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    if (file !== '' || file !== null) {
      Object.keys(file).forEach((key) => {
        formData.append(file.item(key).name, file.item(key));
      });
    }
    dispatch(updateProfile({ formData, toast }));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfileImage(user.avatar.url);
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
      navigate('/profile');
    }
  }, [success, navigate, dispatch]);

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
                  <h2 class="banner-title">Profile Update</h2>
                  <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"><Link to='/'><HomeIcon /> Home</Link></li>
                      <li class="breadcrumb-item active" aria-current="page">Profile Update</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Banner Ends*/}
        < div className="container" style={{ padding: '150px', fontFamily: 'Poppins, sans-serif', fontSize: '15px', color: '' }}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                  <h3 className="card-title text-center">Update Profile</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <TextField
                        type="text"
                        id="name"
                        label="Name"
                        name="name"
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 text-center">
                      <div className="d-flex justify-content-center align-items-center mb-2">
                        <Avatar className="me-2" style={{ width: '80px', height: '80px', fontSize: '5.35rem', background: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
                          {previewProfileImage === '' ? (
                            <img src={profileImage} alt={name} style={{ width: 80, height: 80 }} />
                          ) : (
                            <img src={previewProfileImage} alt={name} style={{ width: 80, height: 80 }} />
                          )}
                        </Avatar>
                      </div>
                      <div style={{ paddingTop: '5px' }}>
                        <label className="btn" style={{ backgroundColor: 'rgb(70, 88, 73)', backdropFilter: 'blur(10px)', borderColor: 'transparent', borderRadius: '20px', color: 'white' }}>
                          <Photo className="me-2" />
                          Change Profile Picture
                          <input type="file" hidden name="avatar" onChange={imageHandler} />
                        </label>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={loading ? true : false}
                      variant="contained"
                      className="mb-3"
                      sx={{ backgroundColor: 'rgb(70, 88, 73)', color: 'white', borderRadius: '20px' }}
                    >
                      Update Profile
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div >
        </div>
      </>
      )
}

      export default UpdateProfile;

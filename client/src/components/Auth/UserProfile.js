import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

import { selectLoggedInUser } from '../../redux/features/authSlice';
import jwtDecode from 'jwt-decode';
import Header2 from '../Layout/Header2';


const UserProfile = () => {
  const { user, accessToken } = useSelector(selectLoggedInUser);
  const { UserInfo } = jwtDecode(accessToken);

  return (
    <>{/*Banner starts*/}
      <Header2 />
      <section class="banner productpage">
        <div class="container container2">
          <div class="row">
            <div class="col-lg-12 d-flex justify-content-center">
              <div class="text-center">
                <h2 class="banner-title">My Profile</h2>
                <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to='/'><HomeIcon /> Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Profile</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Banner Ends*/}
      <div class="container" style={{ paddingTop: '100px', fontFamily: 'Poppins, sans-serif', fontSize: '15px', color: '', width: 'auto' }}>
        <div class="">
          <div class="card-header">
            <h3 class="card-title">Account Details</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',paddingTop:'20px'}}>
              <div>
              <img class="card-img-top user-profile-avatar" src={user.avatar.url} alt={user.name} style={{
                width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto', marginBottom: '1rem',marginLeft:'60px'
              }} />
              </div>
              <div style={{paddingTop:'20px'}}>
              <h5 class="card-subtitle">{user.name}</h5>
              <p class="card-text">{UserInfo.roles}</p>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-4">
                    <span class="font-weight-bold">Email:</span>
                  </div>
                  <div class="col-8">
                    <span>{UserInfo.email}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-4">
                    <span class="font-weight-bold">Date:</span>
                  </div>
                  <div class="col-8">
                    <span>{String(user.createdAt).substr(0, 10)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-6">
                <a href="/me/update" class="btn" style={{cursor: 'pointer',
  // padding: 14px 30px;
  borderRadius: '20px',
  backgroundColor: 'rgb(70, 88, 73)',
  borderColor: '#9DC183',
  color: '#ffffff',
  fontFamily: 'Poppins, Opens-serif'}}>
                  Update Profile
                </a>
              </div>
              <div class="col-md-6">
                <a href="/password/update" class="btn"style={{cursor: 'pointer',
  // padding: 14px 30px;
  borderRadius: '20px',
  backgroundColor: 'rgb(70, 88, 73)',
  borderColor: '#9DC183',
  color: '#ffffff',
  fontFamily: 'Poppins, Opens-serif'}}>
                  Change Password
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

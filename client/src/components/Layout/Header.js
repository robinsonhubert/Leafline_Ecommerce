import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import AuthMenu from './AuthMenu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import { Tooltip } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../redux/features/cartSlice';


import '../Layout/Header.css';
import logoo from '../../images/logoo.png';
import bg from '../../images/png1.png';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 6,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    background:'#609a33',
    padding: '0 4px',
  },
}));

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    setScrolled(isScrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { products } = useSelector(selectCartItems);

  return (



    <div className={`container-fluid main ${scrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar navbar-expand navbar-dark fixed-top ${scrolled ? 'navbar-transparent' : ''}`} style={{ backgroundColor: scrolled ? 'rgb(218, 226, 182)' : '' }}>
        <div className="container" style={{ marginTop: '-40px', marginBottom: '-40px' }}>
          <NavLink to="/" className="navbar-brand">
            <img src={logoo}black alt="Logo" className="logo" style={{ height: 'auto', aspectRatio: '3/2', width: '50%' }} />
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto justify-content-center align-items-center" style={{ marginRight: '20px' }}>
              <li className="nav-item" style={{ marginLeft: '100px',marginRight: '15px' }}>
                <NavLink to="/" className="" activeClassName="active" style={{ color: '#9DC183' }}>
                  <HomeIcon />
                </NavLink>
              </li>
              <li className="nav-item mr-sm-2">
                <NavLink to="/product" className="" activeClassName="active" style={{ color: '#9DC183',marginRight: '15px' }}>
                  <StoreIcon />
                </NavLink>
              </li>
              <li className="nav-item mr-sm-2">
                <NavLink to="/cart" className="" activeClassName="active" style={{ color: '#9DC183' ,marginRight: '5px'}}>
                  <StyledBadge badgeContent={products.length>0?products.length:'0'} color='secondary'>
                    <ShoppingCartIcon />
                  </StyledBadge>
                </NavLink>
              </li>
              <li className="nav-item mr-sm-2">
                <NavLink className="" activeClassName="active" style={{ fontWeight: 'bold', fontFamily: 'Open Sans', color: '#9DC183' }}>
                </NavLink>
              </li>
            </ul>

            <AuthMenu style={{ color: '#9DC183' ,marginRight: '5px'}}/>

          </div>
          {/* <div className="d-flex align-items-center justify-content-end" style={{ marginTop: '80px',color:'#bdf890' }}>
          
        </div> */}
        </div>

      </nav>


      <div id="myCarousel" class="carousel carousel-fade slide" data-ride="carousel" data-interval="3000" style={{ backgroundImage: `url(${bg})` }}>
        <div class="carousel-inner" role="listbox" >
          <div class="item active background a zoom-effect">
            {/* <img src={bg} alt="Image" style={{ opacity: 0.2 }} /> */}

          </div>

        </div>

      </div>
      {/* <div className="item active background a zoom-effect" style={{ backgroundColor: '#5E8862', overflow: 'hidden',paddingTop:'100px',paddingBottom:'100px' }}>
  <img src={bg} alt="Image" style={{ textAlign: 'center', paddingRight: '100px', paddingTop:'10px',paddingBottom:'100px' }} />
</div> */}

      <div class="covertext ">
        {/* <div class="" style={{ float: "none", margin: "0 auto", marginTop: '10rem',fontFamily: 'Bodoni, sans-serif', color: '#fff', border: '2px ' }}> */}
          
          <p class="title1" style={{fontFamily:'Poppins,Sans-serif',fontSize:'50px'}}>BIO-DEGRADABLE PLATES FOR </p>
          <p class="title1" style={{fontFamily:'Poppins,sans-serif',fontSize:'50px'}}>CLEANER PLANET</p>
        <div class="col-xs-12 explore">
          <a href="/product"><button type="button" class="btn02 explorebtn"><ShopTwoIcon style={{paddingRight:'5px'}}/>SHOP</button></a>
        </div>
      </div>


    </div>



  );
};

export default Header;




import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import { spacing } from '@mui/system'; // Import the spacing function separately
import AOS from 'aos';
import 'aos/dist/aos.css';
import './WhyWorkingWithUs.css'
import { Container, Row, Col } from 'react-bootstrap';
import sl001 from '../../images/eco.png';
import sl002 from '../../images/ecobg.jpg'
import SpaTwoToneIcon from '@mui/icons-material/SpaTwoTone';
import RecyclingIcon from '@mui/icons-material/Recycling';
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import sl0001 from '../../images/bg1.jpeg';
import { faBorderTopLeft, faRecycle } from '@fortawesome/free-solid-svg-icons';
// import { faLeaf } from 'font-awesome-library';
// import { solid } from 'font-awesome-library';







const useStyles = makeStyles((theme) => ({
  icon: {
    marginTop: '10px',
    marginBottom: '20px',
    color: "black",
    fontSize: '3rem',

  },
  heading: {
    marginBottom: spacing(3),
    fontSize: '1.5rem',
    fontWeight: 'bold',

  },
}));

const WhyWorkWithUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const classes = useStyles();

  const sectionStyle = {
    padding: "100px 0px",
    backgroundColor: "black",
    // Define your inline CSS styles for the section
  };

  const headingStyle = {
    // Define your inline CSS styles for the heading
  };

  const iconStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white'
  };

  const serviceHeadingStyle = {
    // Define your inline CSS styles for the service heading
  };

  const serviceParagraphStyle = {
    // Define your inline CSS styles for the service paragraph
  };

  



return (
    <Container >
 <div style={{boxShadow: '2 2 50px rgba(0, 100, 0, 0.5)' }}>
   <section className="eco_services_environment" style={{sectionStyle, }} data-aos="fade-up">
    
      <div className="eco_services" data-aos="fade-up" data-aos-delay="100">
        <Row>
          <Col md={4} sm={6} xs={12} style={{paddingTop:'30px', marginTop:'30px',marginBottom:'25px' }}>
            <div className="eco_items-services">
              <div className="eco_service_cols">
                <span style={iconStyle}>
              <RecyclingIcon  style={{color: "#0a330d" ,width:'100px', height:'100px',paddingLeft:'auto',paddingRight:'auto'}}/></span>
                <div data-aos="fade-up" data-aos-delay="100">
                  <h3 style={{serviceHeadingStyle,fontFamily: 'Open Sans',color: 'green',textAlign:'center'}}>Recycling</h3>
                  <p style={{serviceParagraphStyle, fontFamily: 'Poppins, sans-serif',textAlign:'justify',fontSize: '20px'}} >
                     Reuse items whenever possible before considering recycling.It's helps mitigate these environmental risks.
                  </p>
                </div>
              </div>
              <div className="eco_service_cols">
                <span style={iconStyle}>
                 
                <WaterDropTwoToneIcon  style={{color: "#0a330d" ,width:'100px', height:'100px'}}/>
                </span>
              
                <div data-aos="fade-up" data-aos-delay="100">
                <h3 style={{serviceHeadingStyle,fontFamily: 'Open Sans',color: 'green',textAlign:'center'}}>ECO System</h3>
                  <p style={{serviceParagraphStyle, fontFamily: 'Poppins, sans-serif',textAlign:'justify',fontSize: '20px'}} >
                  Eco systems support biodiversity by providing habitats and food sources for a variety of species.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} sm={6} xs={12} className="hidden-sm-down">
            <figure data-aos="fade-up" data-aos-delay="100">
              <div className="thumb-widthout-layer">
                <img src={sl001} alt=""  style={{padding:'50px',paddingTop :'4rem'}} />
              </div>
            </figure>
          </Col>
          <Col md={4} sm={6} xs={12} style={{paddingTop: '30px', marginTop:'30px',marginBottom:'25px'}}>
            <div className="eco_items-services">
              <div className="eco_service_cols rtl_service">
                <span style={iconStyle}>
                   {/* <FontAwesomeIcon icon={faRecycle}style={{color: "#0a330d" ,width:'100px', height:'100px'}} /> */}
                  <SpaTwoToneIcon  style={{color: "#0a330d" ,width:'100px', height:'100px'}}/>               </span>
                <div data-aos="fade-up" data-aos-delay="100">
                <h3 style={{serviceHeadingStyle,fontFamily: 'Open Sans',color: 'green',textAlign:'center'}}>Organic</h3>
                  <p style={{serviceParagraphStyle, fontFamily: 'Poppins, sans-serif',textAlign:'justify',fontSize: '20px'}} >
                  Organic agriculture helps protect water quality.It's promote more sustainable and eco-friendly practices.</p>
                </div>
              </div>
              <div className="eco_service_cols rtl_service">
                <span style={iconStyle}>
                <FavoriteTwoToneIcon style={{color: "#0a330d" ,width:'100px', height:'100px'}} />
                </span>
                <div data-aos="fade-up" data-aos-delay="100" >
                <h3 style={{serviceHeadingStyle,fontFamily: 'Open Sans',color: 'green',textAlign:'center'}}>Nature friendly</h3>
                  <p style={{serviceParagraphStyle, fontFamily: 'Poppins, sans-serif',textAlign:'justify',fontSize: '20px'}} >
                  A Taste of Sustainability for a Greener World, Rediscover Nature's Bounty with Banana Plates!                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
   </section>
  </div>
    </Container>
);
};


export default WhyWorkWithUs;

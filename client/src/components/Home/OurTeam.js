import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Row, Col } from 'react-bootstrap';
import { Container } from '@mui/material';

import AOS from 'aos';
import 'aos/dist/aos.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import './ourTeam.css'

const useStyles = makeStyles((theme) => ({
    background: {
        background: '#f5f5f5'
        // Add your custom styles for the background container
    },
    container: {
        margin: '0 auto',
        marginTop: '10px',
        textAlign: 'left',
    },
    title: {
        fontFamily: 'Jack Rooney , sans-serif',
        marginTop: '0rem',
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        fontFamily: 'cursive',
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '0.5rem',
    },
    imageCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '250px',
        width: '300px',
        margin: '18px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        border: '1px solid #ddd',
        borderRadius: '4px',
        overflow: 'hidden',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: '#fff',
        padding: '8px',
        textAlign: 'center',
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '3rem',
        textAlign: 'center',
        padding: '0 2rem 2rem',
    },
}));

const OurTeam = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    const classes = useStyles();
    return (
        <div>
            <div className="mt-150" data-aos="fade-up">
                <Container style={{maxWidth:'1140px', paddingRight: '20px', paddingLeft: '20px' }}>
                    <Row className='col-lg-8 offset-lg-2 text-center'>
                        <Col className={classes.description} >
                            <div className="section-title" style={{marginBottom: '0px'}}>
                            <h2 style={{ fontFamily: 'Open Sans , sans-serif', fontSize: '40px', fontWeight:'bold' }}><span style={{color:'#008000'}}>Our </span>Team</h2>
                            </div>
                            <p style={{fontFamily: 'Poppins, sans-serif', fontSize:'15px',color: '#555', paddingTop:'20px',fontFamily: 'Poppins', fontSize: '20px', display: 'block',color:'green'}}>This is our wondeful team members feel free to contact us</p>

                        </Col>
                    </Row>
                    <Row sx={{height:'200px'}}>
                        <Col lg={4} md={6} data-aos="fade-up" data-aos-delay="100">
                            <div className="single-team-item">
                                <div className="team-bg team-bg-1" style={{borderRadius:'10px'}}></div>
                                <h4 style={{fontSize:'20px',textAlign: 'center',marginTop: '15px',marginBottom: '10px', color: '#051922',fontFamily: 'Poppins, sans-serif'}}>Jenard Robinson Hubert<span style={{fontSize: '70%',display: 'block',marginTop: '10px',opacity: '0.7'}}>Student</span></h4>
                                <ul className="social-link-team" style={{ position: 'relative', bottom: '110px', left: '0', right: '0', margin: '0', padding: '0', textAlign: 'center',fontFamily: 'Poppins, sans-serif' }}>
                                <a href="#" target="_blank"><FacebookIcon style={{color: 'green'}} /></a>
                                    <a href="#" target="_blank"><TwitterIcon style={{color: 'green'}} /></a>
                                    <a href="#" target="_blank"><InstagramIcon style={{color: 'green'}} /></a>
                                </ul>
                            </div>
                        </Col>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                            <div className="single-team-item">
                                <div className="team-bg team-bg-1" style={{borderRadius:'10px'}}></div>
                                <h4 style={{fontSize:'20px',fontFamily: 'Poppins, sans-serif',textAlign: 'center',marginTop: '15px',marginBottom: '10px', color: '#051922'}}>Gowshi Santhiran <span style={{fontSize: '70%',display: 'block',marginTop: '10px',opacity: '0.7'}}>Student</span></h4>
                                <ul className="social-link-team" style={{ position: 'relative', bottom: '110px', left: '0', right: '0', margin: '0', padding: '0', textAlign: 'center' }}>
                                    <a href="#" target="_blank"><FacebookIcon style={{color: 'green'}} /></a>
                                    <a href="#" target="_blank"><TwitterIcon style={{color: 'green'}} /></a>
                                    <a href="#" target="_blank"><InstagramIcon style={{color: 'green'}} /></a>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                            <div className="single-team-item">
                                <div className="team-bg team-bg-1" style={{borderRadius:'10px'}}></div>
                                <h4 style={{fontSize:'20px',fontFamily: 'Poppins, sans-serif',textAlign: 'center',marginTop: '15px',marginBottom: '10px', color: '#051922'}}>Kayathiri<span style={{fontSize: '70%',display: 'block',marginTop: '10px',opacity: '0.7'}}>Student</span></h4>
                                <ul className="social-link-team" style={{ position: 'relative', bottom: '110px', left: '0', right: '0', margin: '0', padding: '0', textAlign: 'center' }}>
                                <a href="#" target="_blank"><FacebookIcon style={{color: 'green'}} /></a>
                                    <a href="#" target="_blank"><TwitterIcon style={{color: 'green'}} /></a>
                                    <a href="#" target="_blank"><InstagramIcon style={{color: 'green'}} /></a>
                                </ul>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div >
        </div >
    )
}

export default OurTeam

// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Avatar, Grid } from '@material-ui/core';

// const teamMembers = [
//   { name: 'John Doe', avatarUrl: 'https://example.com/avatar1.jpg' },
//   { name: 'Jane Smith', avatarUrl: 'https://example.com/avatar2.jpg' },
//   { name: 'Michael Johnson', avatarUrl: 'https://example.com/avatar3.jpg' },
//   // Add more team members as needed
// ];

// const TeamCarousel = () => {
//   // return (
//   //   // <Carousel
//   //   //   showArrows={true}
//   //   //   infiniteLoop={true}
//   //   //   showThumbs={false}
//   //   //   showStatus={false}
//   //   //   autoPlay={true}
//   //   //   interval={3000}
//   //   // >
//   //   //   {teamMembers.map((member, index) => (
//   //   //     <div key={index}>
//   //   //       <Grid container justifyContent="center">
//   //   //         <Avatar alt={member.name} src={member.avatarUrl} style={{ width: '150px', height: '150px' }} />
//   //   //       </Grid>
//   //   //       <p style={{ textAlign: 'center' }}>{member.name}</p>
//   //   //     </div>
//   //   //   ))}
//   //   // </Carousel>
//   // );
// };

// export default TeamCarousel;

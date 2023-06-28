import React, { useEffect, useState } from 'react';
// import './aboutUs.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Container, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { spacing } from '@mui/system';
import sl17 from '../../images/bgrem01.png';
import sl18 from '../../images/bgrem02.png';
import sl19 from '../../images/bgrem03.png';
import AOS from 'aos';
import 'aos/dist/aos.css';


const theme = createTheme({
    palette: {
        primary: {
            main: '#000000', // Replace with your desired primary color
            contrastText: '#ffffff', // Replace with your desired text color
        },
        secondary: {
            main: '#ff0000', // Replace with your desired secondary color
            contrastText: '#ffffff', // Replace with your desired text color
        },
    },
});

const useStyles = makeStyles((theme) => ({
    shopBanner: {
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: spacing(3),
        textAlign: 'start',
    },
    orangeText: {
        color: 'black',
    },
    salePercent: {
        marginTop: spacing(2),
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    cartBtn: {
        marginTop: spacing(3),
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
            backgroundColor: 'blue',
        },
    },
    largeImage: {
        width: '100%',
        height: '600px',
        borderRadius: '20px',
        borderTopLeftRadius: '20px',
        marginLeft: '15px',
        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.9)',
    },
    smallImage: {
        width: '175px',
        height: '175px',
        borderRadius: '20px',
        borderTopLeftRadius: '20px',
        marginTop: '5px',
        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.9)',
        cursor: 'pointer',
    },
}));

function AboutUs2() {
    useEffect(() => {
        AOS.init();
    }, []);
    const classes = useStyles();
    const [selectedImage, setSelectedImage] = useState(sl18);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <>
            <div style={{ backgroundColor: '#fff' }}>

                

                <div className="container" style={{ paddingBottom: '20px' }} data-aos="fade-up">
                    <div className="row">
                        <section className="latest section">
                            <div className="container">
                            
                                <h2 className="pb-3" style={{ fontFamily: 'Open Sans',fontSize:'40px',fontWeight:'bold',color: '#008000',textAlign:"center" }}>
                                    About <span className="orange-text" style={{ color:'#212529'  }}>us</span>
                                </h2>
                                <p style={{ fontFamily: 'Poppins, sans-serif',fontFamily: 'Poppins', fontSize: '20px', display: 'block',color:'green',textAlign:"center" }}>
                                    Welcome to our LeafLine
                                </p>
                                <div className="latest_wrapper d-flex flex-column-reverse flex-lg-row">
                                    <div className="latest_promo aos-init aos-animate" data-aos="fade-right">
                                        <picture>
                                            <img
                                                src={selectedImage}
                                                alt="about something"
                                                className={classes.largeImage}
                                                data-aos="fade-up"
                                                data-aos-delay="100"
                                                style={{ width: '600px', borderRadius: '20px', borderTopLeftRadius: '20px', marginLeft: '15px', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.9)' }} />
                                        </picture>
                                    </div>
                                    <ul className="latest_list col-lg-7 col-xl-6">
                                        <li className="list-item d-flex flex-column flex-sm-row aos-init aos-animate" data-aos="fade-up">
                                            <span className="latest_list-preview">
                                              
                                                    <img
                                                        src={sl17}
                                                        alt="about something"
                                                        className={classes.smallImage}
                                                        data-aos="fade-up"
                                                        data-aos-delay="100"
                                                        onClick={() => handleImageClick(sl17)}
                                                        style={{ width: '175px', height: '175px', borderRadius: '20px', marginTop: '1px', borderTopLeftRadius: '20px', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.9)' }}

                                                    />
                                              
                                            </span>
                                            {/* Rest of the code */}
                                            <div className="latest_list-main d-sm-flex flex-column justify-content-between flex-grow-1" style={{  display: 'Block', marginLeft: '20px' }}>
                                                <span>
                                                    <h3 className="title" style={{  color: 'green', fontFamily: 'Open Sans', fontSize: '30px',textAlign: 'justify' }}>
                                                        Environmentally Friendly
                                                    </h3>
                                                    <p className="text" style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'justify' }}>
                                                        Banana leaf plates are a great choice for those looking to reduce their carbon footprint. It helps in preserving the environment.
                                                    </p>
                                                </span>
                                            </div>
                                        </li>
                                        <li className="list-item d-flex flex-column flex-sm-row aos-init aos-animate" data-aos="fade-up">
                                            <span className="latest_list-preview">
                                                <picture>
                                              
                                                    <img
                                                        src={sl18}
                                                        alt="about something"
                                                        className={classes.smallImage}
                                                        data-aos="fade-up"
                                                        data-aos-delay="100"
                                                        onClick={() => handleImageClick(sl18)}
                                                        style={{ width: '175px', height: '175px', borderRadius: '20px', marginTop: '40px', borderTopLeftRadius: '20px', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.9)' }}

                                                    />
                                                </picture>
                                            </span>
                                            {/* Rest of the code */}
                                            <div className="latest_list-main d-sm-flex flex-column justify-content-between flex-grow-1" style={{ textAlign: 'center', display: 'Block', marginTop: '40px', marginLeft: '20px' }}>
                                                <span className="metadata">
                                                    <h4 className="title" style={{ textAlign: 'justify', color: 'green', fontFamily: 'Open Sans', fontSize: '30px' }}>
                                                        Natural and Chemical-Free
                                                    </h4>
                                                    <p className="text" style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'justify' }}>
                                                        Banana leaf plates are free from chemicals and additives, making them a safe and healthy option for serving food.
                                                    </p>
                                                </span>
                                            </div>
                                        </li>
                                        <li className="list-item d-flex flex-column flex-sm-row aos-init aos-animate" data-aos="fade-up">
                                            <span className="latest_list-preview">
                                                <picture>
                                                    <img
                                                        src={sl19}
                                                        alt="about something"
                                                        className={classes.smallImage}
                                                        data-aos="fade-up"
                                                        data-aos-delay="100"
                                                        onClick={() => handleImageClick(sl19)}
                                                        style={{ width: '175px', height: '175px', borderRadius: '20px', marginTop: '35px', borderTopLeftRadius: '20px', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.9)' }}
                                                    />
                                                </picture>
                                            </span>
                                            {/* Rest of the code */}
                                            <div className="latest_list-main d-sm-flex flex-column justify-content-between flex-grow-1" style={{ textAlign: 'center', display: 'Block', marginTop: '40px', marginLeft: '20px' }}>
                                                <span className="metadata">
                                                    <h4 className="title" style={{textAlign: 'justify', color: 'green', fontFamily: 'Open Sans', fontSize: '30px' }}>
                                                        Cultural Significance
                                                    </h4>
                                                    <p className="text" style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'justify' }}>
                                                        In many cultures, especially in South Asia, serving food on banana leaves is considered traditional and has cultural significance.
                                                    </p>
                                                </span>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </section>
                        {/* Rest of the code */}
                    </div>
                </div>
                <div>


                </div>

            </div>
        </>
    );
}

export default AboutUs2;


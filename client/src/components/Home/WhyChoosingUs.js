// import React, { useEffect } from 'react';
// import { makeStyles } from '@mui/styles';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import sl9 from '../../images/image1.jpeg';
// import sl10 from '../../images/image02.jpeg';
// import sl11 from '../../images/image03.jpeg';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './WhyChoosingUs.css';

// const useStyles = makeStyles((theme) => ({
//   background: {
//     background: '#DAE2B6',
//     // Add your custom styles for the background container
//     marginTop:'0.5rem',
//     padding:'20px',
//     paddingLeft:'50px',
//     paddingRight:'50px',
//   },
//   container: {
//     margin: '0 auto',
//     // marginTop: '3px',
//     textAlign: 'left',

//   },
//   title: {
//     fontFamily: 'Jack Rooney , sans-serif',
//     marginTop: '0rem',
//     textAlign: 'center',
//   },
//   subtitle: {
//     textAlign: 'center',
//     fontFamily: 'cursive',
//   },
//   cardContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     // marginTop: '1.5rem',
//   },
//   imageCard: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '250px',
//     width: '300px',
//     margin: '18px',
//     position: 'relative',
//     cursor: 'pointer',
//     transition: 'transform 0.3s ease',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     overflow: 'hidden',
//     '&:hover': {
//       transform: 'scale(1.05)',
//     },
//   },
//   overlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     color: '#fff',
//     padding: '8px',
//     textAlign: 'center',
//   },
//   description: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     marginTop: '3rem',
//     textAlign: 'center',
//     padding: '0 2rem 2rem',
//   },
// }));

// const WhyChoosingUs = () => {
//   useEffect(() => {
//     AOS.init();
//   }, []);
//   const classes = useStyles();

//   return (


//     <Box className={classes.background}>


//       <Box className={classes.container} textAlign="left" style={{ margin: '0 auto', marginTop: '15px' }} data-aos="fade-up">
//         <Typography variant="h6" className={classes.title} sx={{fontFamily: 'Jack Rooney , sans-serif', fontSize:'30px', paddingTop: '30px'}}>
//           <span style={{color: '#7eaf6c'}}>Why Choosing </span> Us!
//         </Typography>
//         <Box mt={4} data-aos="fade-up" data-aos-delay="100">
//           <Typography style={{textAlign: 'center',fontFamily: 'Poppins, sans-serif', fontSize:'15px',color: '#555'}}>Few Reasons Why People Choose Us!</Typography>

//           <Grid container className={classes.cardContainer} data-aos="fade-up" data-aos-delay="200">
//             <div className={classes.imageCard } style={{ padding:'50px',height: '400px', width: '350px'} }>
//               <img src={sl9} style={{ height: '500px', width: '350px', margin: '0px' }} alt="Image" />
//               <div className={classes.overlay}>
//                 <Typography variant="body1">Image 1</Typography>
//               </div>
//             </div>

//             <div className={classes.imageCard}style={{padding:'50px',height: '400px', width: '350px'} }>
//               <img src={sl10} style={{ height: '500px', width: '350px', margin: '0px' }} alt="Image" />
//               <div className={classes.overlay}>
//                 <Typography variant="body1">Image 2</Typography>
//               </div>
//             </div>

//             <div className={classes.imageCard}style={{padding:'50px',height: '400px', width: '350px'} }>
//               <img src={sl10} style={{ height: '500px', width: '350px', margin: '0px' }} alt="Image" />
//               <div className={classes.overlay}>
//                 <Typography variant="body1">Image 2</Typography>
//               </div>
//             </div>
//           </Grid>

//           <Grid>
//             <Grid item className={classes.description} data-aos="fade-up" data-aos-delay="300">
//               <Typography variant="body1" style={{fontFamily: 'Poppins, sans-serif', lineHeight: '1.2', width: '',paddingLeft:'350px',
//     paddingRight:'350px',textAlign:'justify' ,paddingTop:'-60px',paddingBottom:'60px'}}>
//                 Banana leaf plates are an eco-friendly alternative to traditional disposable plates. They are made from
//                 the leaves of the banana plant, which are biodegradable and renewable. 
//               </Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default WhyChoosingUs;


import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import sl9 from '../../images/image1.jpeg';
import sl10 from '../../images/pic06.png';
import sl11 from '../../images/pic07.jpeg';
import sl12 from '../../images/land04.jpeg';
import sl13 from '../../images/land05.jpeg';
import sl14 from '../../images/land06.jpeg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './WhyChoosingUs.css';


const useStyles = makeStyles((theme) => ({
  background: {
    background: '#DAE2B6',
    // Add your custom styles for the background container
    marginTop: '0.5rem',
    padding: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
    boxShadow: '0 0 10px rgba(0, 100, 0, 0.5)',
  },
  container: {
    margin: '0 auto',
    // marginTop: '3px',
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
    marginTop: '1.5rem',
    boxSizing: 'border-box'
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

const WhyChoosingUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const classes = useStyles();

  const carouselSettings = {

    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div id="shopify-section-template--14397371580514__1650880520dc2a6427" class="shopify-section">
      <div class="our-history-area" id="section-template--14397371580514__1650880520dc2a6427">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="section-title text-center mb-35">
                <h2 style={{ fontFamily: 'Open Sans , sans-serif', fontSize: '40px', fontWeight: 'bold' }}><span style={{ color: '#008000' }}>Who </span>We Are</h2>
                <span style={{ fontFamily: 'Poppins', fontSize: '20px', display: 'block', color: 'green' }}>A little story about us</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8 ml-auto mr-auto">
              <div class="history-area-content text-center">
                <img src="https://linguini.akamaized.net/starchef2_website/idli_sambar.png" alt="Image 1" style={{ width: '200px', height: '200px' }} />
                <img src="https://cdn.shopify.com/s/files/1/0518/1980/6879/articles/IMG_1_2_a5e73e89-8457-4b59-b9b8-d2d82a78b5f3_1200x1200.jpg?v=1649835611" alt="Image 2" style={{ width: '200px', height: '200px' }} />
                <img src="https://i.pinimg.com/736x/df/13/0a/df130a5def95229783839705e55dcd94.jpg" alt="Image 3" style={{ width: '200px', height: '200px' }} />
                <p style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'justify', fontSize: '20px' }}>Located in the heart of the city, our banana leaf plates shop is a haven for eco-conscious individuals seeking sustainable alternatives to disposable dinnerware. We offer a wide selection of beautifully crafted plates made from naturally fallen banana leaves. Each plate is meticulously cleaned and shaped, showcasing the intricate veins and vibrant hues of the leaves. Our shop is committed to promoting environmentally friendly practices, providing customers with a guilt-free dining experience that combines elegance and sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  );
};

export default WhyChoosingUs;


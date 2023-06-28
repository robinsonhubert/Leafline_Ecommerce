import React, { useEffect } from 'react'
import { Grid, Container, Typography, Button } from '@mui/material';
import { PlayCircleFilled } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import sl0001 from '../../images/rebg.jpg';
import video from '../../images/video.mp4'
const VideoPopup = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>

      <div className="abt-section mb-150" data-aos="fade-up" style={{ background: 'rgb(218, 226, 182)'}}>
        <Container sx={{ marginTop: '50px', marginBottom: '50px', }}>
          <Grid container spacing={2}>

            <Grid>
              <Typography variant="h3" component="h3" data-aos="fade-up" data-aos-delay="500" style={{ fontFamily: 'Open Sans , sans-serif',fontWeight: 'bold',fontSize:'40px', paddingLeft: '300px', margin: '0 ', paddingTop: '20px',textAlign:'center' }}>
              <span style={{ color: 'green' }} >Experiment </span> with different style
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h6" component="h6" style={{ fontFamily: 'Poppins', fontSize: '20px', display: 'block', paddingLeft: '400px', margin: '0 ', paddingTop: '10px', color: 'green' }}>
                <span data-aos="fade-up" data-aos-delay="500">Watch our amazing video tutorial</span>
              </Typography>
            </Grid>
            <Grid item lg={6} md={12} style={{ textAlign: 'center' }}>
              <div className="abt-bg" data-aos="fade-up" data-aos-delay="100"

                style={{
                  position: 'relative',
                  paddingBottom: '85.25%',
                  paddingTop: '20px',
                  height: '0',
                  // overflow: 'hidden',
                  paddingRight: '80px',
                  paddingLeft: '10px'


                }}
              >

                <video width="1200" controls autoPlay muted style={{
                 objectFit: 'cover',
                 margin: '0 auto',
                 display: 'block',
                 paddingRight: '120px',
                 paddingLeft: '90px',
                 paddingBottom: '8px',
                 position: 'relative',
                  
                }}>
                  <source src={video} type="video/mp4" autoplay />
                </video>

                {/* <img
                    src="`url(${sl0001})`"
                    alt="Video Overlay"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  /> */}
              </div>
            </Grid>



            {/* <Button href="about.html" variant="contained" className="boxed-btn mt-4" sx={{fontFamily: 'Poppins, sans-serif',fontSize:'15px', backgroundColor: '#5f8273', borderRadius:'50px'}} data-aos="fade-up" data-aos-delay="400">
                know more
              </Button> */}


          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default VideoPopup



// import { makeStyles } from '@mui/styles';
// import { Box, Container, Grid, Link, Typography } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram'
// import TwitterIcon from '@mui/icons-material/Twitter'
// import logoo from '../../images/logoo.png';
// const useStyles = makeStyles((theme) => ({
//   footer: {
//     backgroundColor: '#DAE2B6', 
//     padding: '24px 0', 
//   },
//   link: {
//     margin: '8px 12px', 
//   },
// }));

// const Footer = () => {
//   const classes = useStyles();

//   return (
//     <Box component="footer" className={classes.footer} style={{backgroundColor:'#DAE2B6'}}>
//       <Container maxWidth="lg">
//         <Box mt={5}>
//           <Typography variant="body2" color="textSecondary" align="center">
//             {'© '}
//             {new Date().getFullYear()}
//             {' LEAFLINE. All rights reserved.'}
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;


import { makeStyles } from '@mui/styles';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import logoo from '../../images/logoo.png';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#043927', 
    padding: '10px ', 
    // position: 'fixed',
    bottom: 5,
    left: 0,
    width: '100%',
    zIndex: 9999,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    
  },
  logoImg: {
    width: '200px',
    marginRight: '10px',
  },
  link: {
    margin: '8px 12px', 
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box component="footer" className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box className={classes.logo}>
              <Typography variant="body2" color="white">
                {'© '}
                {new Date().getFullYear()}
                {' LEAFLINE. All rights reserved.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Link href="#" className={classes.link}>
              <FacebookIcon style={{color: "#fff" ,width:'20px', height:'20px'}}/>
            </Link>
            <Link href="#" className={classes.link}>
              <InstagramIcon style={{color: "#fff" ,width:'20px', height:'20px'}}/>
            </Link>
            <Link href="#" className={classes.link}>
              <TwitterIcon style={{color: "#fff" ,width:'20px', height:'20px'}}/>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;


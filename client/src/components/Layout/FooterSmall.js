import React from 'react'
import { makeStyles } from '@mui/styles';
import { Box,  Link, Typography } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: '#f5f5f5', // Set your desired background color here
      padding: '24px 0', // Set your desired padding here
      marginTop: 'auto',

    },
    link: {
      margin: '8px 12px', // Set your desired margin here
    },
  }));
  const FooterSmall = () => {
 const classes = useStyles();
  return (
    <Box sx={{ bgcolor: '#DAE2B6', py: 2, textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        <Link
            variant="button"
            color="textPrimary"
            href="/"
            className={classes.link}>
                Home
        </Link> | 
        <Link
            variant="button"
            color="textPrimary"
            href="/product"
            className={classes.link}>
                Products
        </Link> |
        <Link
            variant="button"
            color="textPrimary"
            href="/about-us"
            className={classes.link}>
                About Us
        </Link> | 
        <Link
            variant="button"
            color="textPrimary"
            href="/contact-us"
            className={classes.link}>
                Contact Us
        </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} LEAFLINE All rights reserved.
      </Typography>
    </Box>
  )
}

export default FooterSmall
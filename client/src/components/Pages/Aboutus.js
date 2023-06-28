import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

import sl15 from '../../images/about.png';
import sl16 from '../../images/about3.png';
import sl17 from '../../images/pic05.jpeg';
import sl18 from '../../images/pic07.jpeg';

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
  borderRadius: '5px',
  transition: 'transform 0.3s',
});

const AboutUs = () => {
  return (
    <Box textAlign="center" marginTop="5rem">
      <Typography variant="h3">About Us</Typography>
      <Box mt={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'serif, system-ui' }}>
        <Box sx={{ width: '50%', textAlign: 'justify', marginLeft: '100px', fontFamily: 'system-ui' }}>
          <Typography variant="body2" mt={2}>
            The Leafline Banana Leaf Plates are eco-friendly and sustainable alternatives to traditional disposable plates.
            These plates are made from 100% natural and biodegradable banana leaves.
          </Typography>
          <Typography variant="body2">
            They are fully biodegradable, meaning they can naturally decompose without causing harm to the environment.
          </Typography>
          <Typography variant="body2">
            They are a safe and healthy option for serving food, as they do not leach harmful substances into the food.
          </Typography>
          <Typography variant="body2" mt={2}>
            After use, these plates can be easily disposed of in compost or organic waste bins.
            They can be used for serving appetizers, main courses, desserts, and snacks at both indoor and outdoor events.
          </Typography>
        </Box>
        <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Image src={sl17} alt="About" sx={{ height: '400px', width: '400px', margin: '10px' }} />
        </Box>
      </Box>
      <Box mt={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Image src={sl18} alt="Another Image" sx={{ height: '400px', width: '400px', margin: '10px' }} />
        </Box>
        <Box sx={{ width: '50%', textAlign: 'justify', marginRight: '100px' }}>
          <Typography variant="body2" mt={2}>
            Leafline Banana Leaf Plates are sturdy and durable.
            They can hold various types of food, including hot and cold dishes, without leaking or becoming soggy.
            The natural texture and patterns of banana leaves give the plates a unique and elegant appearance.
            They add a touch of natural beauty to any table setting, making them ideal for special events, parties, or eco-friendly weddings.
            Leafline Banana Leaf Plates come in various sizes and shapes, offering versatility for different types of food presentations.
          </Typography>
          <Typography variant="body2" mt={2}>
            The production of Leafline Banana Leaf Plates often involves sourcing the leaves from local farmers and communities.
            By using these plates, you support sustainable farming practices and contribute to the livelihoods of these communities.
            Leafline Banana Leaf Plates offer a sustainable and stylish alternative to conventional disposable plates, reducing the environmental impact associated with single-use plastics or non-biodegradable materials.
            They provide an eco-friendly solution without compromising on quality or aesthetics.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;

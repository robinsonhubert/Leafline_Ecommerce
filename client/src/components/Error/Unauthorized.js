import React from 'react';
import {Box} from '@mui/material';
import noentry from '../../images/restricted.svg';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Header2 from '../Layout/Header2';

const Unauthorized = () => {
  return (
  <>
  <Header2/>
  <section class="banner productpage">
        <div class="container container2">
            <div class="row">
                <div class="col-lg-12 d-flex justify-content-start">
                    <div class="text-center">
                        <h2 class="banner-title">I Thing You Are Lost</h2>
                        <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                            <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/'><HomeIcon/> Home</Link></li>
                              <li class="breadcrumb-item active" aria-current="page"> ??? </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Box sx={{textAlign:'center'}}>
        <img src={noentry} alt='unauthorized' width={450}/>
    </Box>
    </>
  )
}

export default Unauthorized
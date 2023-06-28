// import React,{useEffect,useState,useRef,useCallback} from 'react';
// import {useDispatch,useSelector} from 'react-redux';
// import {toast} from 'react-toastify';

// import {Typography,Box,Accordion,AccordionSummary,AccordionDetails,TextField,Slider,List, ListItemButton,ListItemText } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import HomeIcon from '@mui/icons-material/Home';


// import { selectAllProducts, getProducts, resetProducts } from '../../redux/features/productSlice';
// import { getCategories, selectAllCategories } from '../../redux/features/categorySlice';
// import './Product.css';
// import ProductCard from './ProductCard';
// import ProductCardSkeleton from '../Skeletons/ProductCardSkeleton';
// import HeadingWaveSkeleton from '../Skeletons/HeadingWaveSkeleton';

// const Products = () => {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState('');
//   let minPrice = 1;
//   let maxPrice = 50000;
//   const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
//   const [ratingsfilter, setRatingsFilter] = useState(0);
//   const [category, setCategory] = useState('')
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [hasMorepage, setHasMorePage] = useState(true);
//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//     dispatch(resetProducts());
//   }
//   const priceHandler = (e, newPriceRange) => {
//     setPriceRange(newPriceRange);
//     setCurrentPage(1); {/* <StyledTreeItem nodeId="6" label="Review List" onClick={()=>goto('reviewlist')}  /> */ }

//     dispatch(resetProducts());
//   }
//   const ratingHandler = (e) => {
//     setRatingsFilter(e.target.value);
//     setCurrentPage(1);
//     dispatch(resetProducts());
//   }
//   const handleListItemClick = (event, index, id) => {
//     setSelectedIndex(index);
//     setCategory(id);
//     setCurrentPage(1);
//     dispatch(resetProducts());
//   };

//   const { loading, products, filteredProductsCount, resultPerPage } = useSelector(selectAllProducts);
//   const { categories } = useSelector(selectAllCategories);

//   //infinite scrolling
//   const observer = useRef();
//   const lastElementRef = useCallback((lastElement) => {
//     if (loading) return
//     if (observer.current) observer.current.disconnect()
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMorepage) {
//         setCurrentPage(prev => prev + 1)
//       }
//     })
//     if (lastElement) observer.current.observe(lastElement)
//   }, [loading, hasMorepage])

//   useEffect(() => {
//     dispatch(resetProducts());
//   }, [dispatch]);


//   useEffect(() => {
//     dispatch(getCategories({ toast }));
//     const promise = dispatch(getProducts({ search, currentPage, priceRange, category, ratingsfilter, toast }));
//     return () => { promise.abort() }
//   }, [dispatch, search, currentPage, priceRange, category, ratingsfilter])

//   useEffect(() => {
//     if (filteredProductsCount && resultPerPage) {
//       setHasMorePage(Math.ceil(filteredProductsCount / resultPerPage) > currentPage)
//     }
//   }, [filteredProductsCount, resultPerPage, currentPage])

//   // Reset the price range to its initial values
//   const resetPriceRange = () => {
//     setPriceRange([minPrice, maxPrice]);
//   };

//   // Reset the rating to its initial value
//   const resetRating = () => {
//     setRatingsFilter(0);
//   };  
    
//   return (
//     <div className="breadcrumb-tow" style={{ background: '#f4f4f4', paddingTop: '55px', paddingBottom: '50px' }}>
//       <div className="container">
//         <div className="row">
//           <div className="col-12">

//             <div className="breadcrumb-title"style={{color:'#40513B'}}>
//               <h1 style={{fontSize: '40px',fontFamily: 'Open Sans',color: 'green',fontWeight: 'bold'}}>Products</h1>
//             </div>

//             <div className="breadcrumb-content breadcrumb-content-tow"style={{backgroundColor:'#E9EDC9'}}>

//               <nav className="link " role="navigation" aria-label="breadcrumbs" style={{marginLeft:"43%"}}>
//                 <ul className="breadcrumb-list"style={{color:'#609966',textDecoration: 'none',}}>

//                   <li>
//                     <a href="/" title="Back to the home page"style={{color:'#609966',textDecoration: 'none',fontFamily: 'Poppins, sans-serif'}}>Home </a>
//                   </li>
//                   <li>
//                    <span style={{color:'#609966',textDecoration: 'none',marginRight:'5px'}}>|</span>
//                   </li>
//                   <li>
//                   <a href="/cart" title="Back to the cart page"style={{color:'#609966',textDecoration: 'none',marginRight:'35px',fontFamily: 'Poppins, sans-serif'}}>Cart </a>
//                   </li>
//                 </ul>
//               </nav>

//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="breadcrumb-one mb-70">
//       <div className="breadcrumb-img">
//         <a href="/">
//           {/* <img src="https://i.ndtvimg.com/i/2015-12/banana-leaf_625x350_51450425264.jpg" alt="banner-img" style={{marginLeft:'325px',width:'1250px',height:'350px',boxSizing: 'border-box',
// }} /> */}
//         </a>
//       </div>
//     </div>
    
//     <Box className='wrapper' style={{marginTop:'5rem'}}>
//         <Box className='filter-box'>
//         <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon /> }
//           aria-controls="panel1a-content"
          
//           id="panel1a-header"
//         >
//           <Typography sx={{display:'flex'}}><FilterAltIcon/>Filter products</Typography>
//         </AccordionSummary>
//         <AccordionDetails>

//               <Box className='search-filter-box'>
//                 <Accordion>
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                   >
//                     <Typography sx={{ display: 'flex' }}>Search products</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <TextField type='text'
//                       id='search'
//                       label='Search'
//                       name='search'
//                       margin='normal'
//                       fullWidth
//                       value={search}
//                       onChange={handleSearch}
//                     />
//                   </AccordionDetails>
//                 </Accordion>
//               </Box>

//               <Box className='price-filter-box'>
//                 <Accordion>
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                   >
//                     <Typography sx={{ display: 'flex' }}>By price</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Slider
//                       value={priceRange}
//                       min={minPrice}
//                       step={1000}
//                       max={maxPrice}
//                       onChange={(e, newPriceRange) => priceHandler(e, newPriceRange)}
//                       valueLabelDisplay="on"
//                     />
//                     <button onClick={resetPriceRange}>Reset Price</button>

//                   </AccordionDetails>
//                 </Accordion>
//               </Box>

//               <Box className='rating-filter-box'>
//                 <Accordion>
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                   >
//                     <Typography sx={{ display: 'flex' }}>By rating</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Slider
//                       defaultValue={0}
//                       min={0}
//                       step={.1}
//                       max={5}
//                       onChange={ratingHandler}
//                       valueLabelDisplay="on"
//                     />
//                     <button onClick={resetRating}>Reset Rating</button>

//                   </AccordionDetails>
//                 </Accordion>
//               </Box>

//               <Box className='category-filter-box'>
//                 <Accordion>
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                   >
//                     <Typography sx={{ display: 'flex' }}>By categories</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <List component="nav" aria-label="main mailbox folders">

//                       <ListItemButton
//                         key={0}
//                         id={0}
//                         selected={selectedIndex === 0}
//                         onClick={(event) => handleListItemClick(event, 0, '')}>
//                         <ListItemText primary="All" />
//                       </ListItemButton>

//                       {categories && categories.map((cat, index) =>

//                         <ListItemButton
//                           key={cat._id}
//                           id={cat._id}
//                           selected={selectedIndex === index + 1}
//                           onClick={(event) => handleListItemClick(event, index + 1, cat._id)}>
//                           <ListItemText primary={cat.title} />
//                         </ListItemButton>

//                       )}

//                     </List>

//                   </AccordionDetails>
//                 </Accordion>
//               </Box>



//             </AccordionDetails>
//           </Accordion>

//         </Box>
        
//         <Box className='container'>
//           {loading && loading ? <HeadingWaveSkeleton/>:
//             <Typography variant='div'
//               component='h5'
//               sx={{ ml: '10px', mb: '20px', textAlign: 'left' }}
//             >
//               {filteredProductsCount && filteredProductsCount > 0 ?
//                 `Found ${filteredProductsCount} items`
//                 :
//                 'No product found'}
//             </Typography>
//           }


//           <Box className='card-container' sx={{ textAlign: 'left' }}>
//             {products && products.map((product, index) =>
//               products.length === index + 1 ?
//                 <ProductCard ref={lastElementRef} product={product} key={product._id} />
//                 :
//                 <ProductCard product={product} key={product._id} />
//             )}
//           </Box>

//           {loading &&
//             <Box className='card-container'>
//               {[...Array(8)].map((e, i) => (<ProductCardSkeleton key={i} />))}
//             </Box>
//           }
//         </Box>
//     </Box>
//     </div>
//   )
// }

// export default Products


import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, TextField, Slider, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeIcon from '@mui/icons-material/Home';
import Header2 from '../Layout/Header2';
import { selectAllProducts, getProducts, resetProducts } from '../../redux/features/productSlice';
import { getCategories, selectAllCategories } from '../../redux/features/categorySlice';
import './Product.css';
import ProductCard from './ProductCard';
import ProductCardSkeleton from '../Skeletons/ProductCardSkeleton';
import HeadingWaveSkeleton from '../Skeletons/HeadingWaveSkeleton';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  let minPrice = 1;
  let maxPrice = 50000;
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [ratingsfilter, setRatingsFilter] = useState(0);
  const [category, setCategory] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasMorepage, setHasMorePage] = useState(true);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    dispatch(resetProducts());
  }
  const priceHandler = (e, newPriceRange) => {
    setPriceRange(newPriceRange);
    setCurrentPage(1); {/* <StyledTreeItem nodeId="6" label="Review List" onClick={()=>goto('reviewlist')}  /> */ }

    dispatch(resetProducts());
  }
  const ratingHandler = (e) => {
    setRatingsFilter(e.target.value);
    setCurrentPage(1);
    dispatch(resetProducts());
  }
  const handleListItemClick = (event, index, id) => {
    setSelectedIndex(index);
    setCategory(id);
    setCurrentPage(1);
    dispatch(resetProducts());
  };

  const { loading, products, filteredProductsCount, resultPerPage } = useSelector(selectAllProducts);
  const { categories } = useSelector(selectAllCategories);

  //infinite scrolling
  const observer = useRef();
  const lastElementRef = useCallback((lastElement) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMorepage) {
        setCurrentPage(prev => prev + 1)
      }
    })
    if (lastElement) observer.current.observe(lastElement)
  }, [loading, hasMorepage])

  useEffect(() => {
    dispatch(resetProducts());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getCategories({ toast }));
    const promise = dispatch(getProducts({ search, currentPage, priceRange, category, ratingsfilter, toast }));
    return () => { promise.abort() }
  }, [dispatch, search, currentPage, priceRange, category, ratingsfilter])

  useEffect(() => {
    if (filteredProductsCount && resultPerPage) {
      setHasMorePage(Math.ceil(filteredProductsCount / resultPerPage) > currentPage)
    }
  }, [filteredProductsCount, resultPerPage, currentPage])

  // Reset the price range to its initial values
  const resetPriceRange = () => {
    setPriceRange([minPrice, maxPrice]);
  };

  // Reset the rating to its initial value
  const resetRating = () => {
    setRatingsFilter(0);
  };





  return (
    <>
      <Header2/>
      {/*Banner starts*/}
      <section class="banner productpage">
                        <div class="container container2">
                            <div class="row">
                            <div class="col-lg-12 d-flex justify-content-center">
                                    <div class="text-center">
                                        <h2 class="banner-title">Our Product</h2>
                                        <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><Link to='/'><HomeIcon /> Home</Link></li>
                                                <li class="breadcrumb-item active" aria-current="page">Products </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*Banner Ends*/}


      <Box className='container wrapper'>
        <Box className='filter-box'>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"

              id="panel1a-header"
            >
              <Typography sx={{ display: 'flex' }}><FilterAltIcon />Filter products</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Box className='search-filter-box'>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ display: 'flex' }}>Search products</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField type='text'
                      id='search'
                      label='Search'
                      name='search'
                      margin='normal'
                      fullWidth
                      value={search}
                      onChange={handleSearch}
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box className='price-filter-box'>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ display: 'flex' }}>By price</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Slider
                      value={priceRange}
                      min={minPrice}
                      step={1000}
                      max={maxPrice}
                      onChange={(e, newPriceRange) => priceHandler(e, newPriceRange)}
                      valueLabelDisplay="on"
                    />
                    <button onClick={resetPriceRange}>Reset Price</button>

                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box className='rating-filter-box'>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ display: 'flex' }}>By rating</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Slider
                      defaultValue={0}
                      min={0}
                      step={.1}
                      max={5}
                      onChange={ratingHandler}
                      valueLabelDisplay="on"
                    />
                    <button onClick={resetRating}>Reset Rating</button>

                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box className='category-filter-box'>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ display: 'flex' }}>By categories</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List component="nav" aria-label="main mailbox folders">

                      <ListItemButton
                        key={0}
                        id={0}
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0, '')}>
                        <ListItemText primary="All" />
                      </ListItemButton>

                      {categories && categories.map((cat, index) =>

                        <ListItemButton
                          key={cat._id}
                          id={cat._id}
                          selected={selectedIndex === index + 1}
                          onClick={(event) => handleListItemClick(event, index + 1, cat._id)}>
                          <ListItemText primary={cat.title} />
                        </ListItemButton>

                      )}

                    </List>

                  </AccordionDetails>
                </Accordion>
              </Box>



            </AccordionDetails>
          </Accordion>

        </Box>

        <Box className='container'style={{  }}>
          {loading && loading ? <HeadingWaveSkeleton /> :
            <Typography variant='div'
              component='h5'
              sx={{ ml: '10px', mb: '20px', textAlign: 'center' }}
            >
              {filteredProductsCount && filteredProductsCount > 0 ?
                `Found ${filteredProductsCount} Products`
                :
                'No product found'}
            </Typography>
          }


          <Box className='card-container' sx={{ textAlign: 'left' }}>
            {products && products.map((product, index) =>
              products.length === index + 1 ?
                <ProductCard ref={lastElementRef} product={product} key={product._id} />
                :
                <ProductCard product={product} key={product._id} />
            )}
          </Box>

          {loading &&
            <Box className='card-container'style={{paddingTop:'10rem'}}>
              {[...Array(8)].map((e, i) => (<ProductCardSkeleton key={i} />))}
            </Box>
          }
        </Box>
      </Box>
    </>
  )
}

export default Products

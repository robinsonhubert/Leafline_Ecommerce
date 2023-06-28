// import React,{useEffect,useState} from 'react';
// import {useParams} from 'react-router-dom';
// import {useSelector,useDispatch} from 'react-redux';
// import {toast} from 'react-toastify';
// import BoxShadowLoader from '../../../components/Skeletons/BoxShadowLoader';

// import {Box, Typography,TextField, Button} from '@mui/material';
// import UpdateIcon from '@mui/icons-material/Update';
// import { categoryDetails, resetMutationResult, selectCategoryDetails, selectCategoryMutationResult, updateCategory } from '../../../redux/features/categorySlice';

// const UpdateCategory = () => {
//     const {id}=useParams();
//     const dispatch=useDispatch();

//     const [title,setTitle]=useState('');
//     const [description,setDescription]=useState('');

//     const {loading, category}=useSelector(selectCategoryDetails);
//     const {loading:isUdating, success}=useSelector(selectCategoryMutationResult);

//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         const jsonData={title,description};
//         dispatch(updateCategory({id,jsonData,toast}));
//     }

//     useEffect(() => {
//         if(success){
//             dispatch(resetMutationResult());
//         }
//         dispatch(categoryDetails({id,toast}));
//     }, [dispatch,id,success]);

//     useEffect(() => {
//         if(category)
//         {
//             setTitle(category.title);
//             setDescription(category.description);
//         }
//       }, [category]);

//   return (
//     <>
//     {loading ? <BoxShadowLoader/> :
//     <Box sx={{marginTop:2, display:'flex',flexDirection:'column',alignItems:'center'}}>
//         <Typography component='div' color="#1b5e20" variant='h5'>Update category</Typography>
//         <Box component='form' onSubmit={handleSubmit}>
//             <TextField type='text'
//                         id='title'
//                         label='Title'
//                         name='title'
//                         margin='normal'
//                         required
//                         fullWidth
//                         autoFocus
//                         value={title}
//                         onChange={(e=>setTitle(e.target.value))}
//                         color='success'

//             />
//             <TextField type='text'
//                         id='description'
//                         label='Description'
//                         name='description'
//                         margin='success'
//                         required
//                         fullWidth
//                         autoFocus
//                         value={description}
//                         onChange={(e=>setDescription(e.target.value))}
//                         color='success'

//             />
//             <Button type='submit'
//                         color="success"
//                         fullWidth 
//                         disabled={isUdating?true:false}                       
//                         variant='contained'
//                         startIcon={<UpdateIcon/>}
//                         sx={{mt:3,mb:2,backgroundImage:'linear-gradient(to right, #143a0d, #c0dca5)'}}
//             >Update Category</Button>
//         </Box>
//     </Box>
//     }
//     </>
//   )
// }

// export default UpdateCategory


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import BoxShadowLoader from '../../../components/Skeletons/BoxShadowLoader';

import { Box, Typography, TextField, Button, Container } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import {
  categoryDetails,
  resetMutationResult,
  selectCategoryDetails,
  selectCategoryMutationResult,
  updateCategory,
} from '../../../redux/features/categorySlice';

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { loading, category } = useSelector(selectCategoryDetails);
  const { loading: isUpdating, success } = useSelector(selectCategoryMutationResult);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = { title, description };
    dispatch(updateCategory({ id, jsonData, toast }));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(categoryDetails({ id, toast }));
  }, [dispatch, id, success]);

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setDescription(category.description);
    }
  }, [category]);

  return (
    <>
    <Box
        className='dash-box'
        sx={{
          
          padding: '40px',
          minHeight: '100vh',
        }}
      >
                <Typography component='div' color='#1b5e20' variant='h5' fontFamily='poppins, sans-serif'style={{textAlign:'center'}}>
                  Update Category
                </Typography>
      <div className="bigbox" >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '2px 2px 2px 2px #588157',
            borderRadius: '4px',
            padding: '50px',
            backgroundColor: '#fff',
            width: '100%',
            maxWidth: '580px',
            margin: '0 auto',
            marginTop: "85px",
            fontFamily: 'poppins, sans-serif',
          }}
        >
          <Container maxWidth="sm">
            {loading ? (
              <BoxShadowLoader />
            ) : (
              <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <TextField
                    type='text'
                    id='title'
                    label='Title'
                    name='title'
                    margin='normal'
                    required
                    fullWidth
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    color='success'
                    fontFamily='poppins, sans-serif'
                  />
                  <TextField
                    type='text'
                    id='description'
                    label='Description'
                    name='description'
                    margin='normal'
                    required
                    fullWidth
                    autoFocus
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    color='success'
                    fontFamily='poppins, sans-serif'
                  />
                  <Button
                    type='submit'
                    color='success'
                    fullWidth
                    disabled={isUpdating ? true : false}
                    variant='contained'
                    startIcon={<UpdateIcon />}
                    sx={{
                      mt: 3, mb: 2, fontFamily: 'poppins, sans-serif', backgroundColor: "rgb(70, 88, 73)",
                      borderRadius: "10px",
                      '&:hover': {
                        backgroundColor: "#9DC183",
                        color: "#000",
                        border: "black",
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Update Category
                  </Button>
                </Box>
              </Box>
            )}
          </Container>
        </Box>
        </div>
        </Box>
      </>
      );
};

      export default UpdateCategory;

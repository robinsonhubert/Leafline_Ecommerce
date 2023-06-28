



// import React, { useEffect } from 'react';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   deleteCategory,
//   getCategories,
//   resetMutationResult,
//   selectAllCategories,
//   selectCategoryMutationResult,
// } from '../../../redux/features/categorySlice';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

// import { Box, Typography, IconButton, Tooltip, Container } from '@mui/material';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import EditIcon from '@mui/icons-material/Edit';
// import BoxShadowLoader from '../../../components/Skeletons/BoxShadowLoader';

// const CategoryList = () => {
//   const dispatch = useDispatch();
//   const { loading, categories } = useSelector(selectAllCategories);
//   const { success } = useSelector(selectCategoryMutationResult);

//   const deleteHandler = (id) => {
//     dispatch(deleteCategory({ id, toast }));
//   };

//   const columns = [
//     { field: 'title', headerName: 'Categories', headerClassName: 'gridHeader', flex: 1, minWidth: 170 },
//     { field: 'description', headerName: 'Description', headerClassName: 'gridHeader', flex: 1, minWidth: 170 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       headerClassName: 'gridHeader',
//       flex: 1,
//       minWidth: 170,
//       type: 'number',
//       sortable: false,
//       textAlign: "left",
     
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/authorized/category/${params.getValue(params.id, 'id')}`}>
//               <Tooltip title='Edit' placement='top'>
//                 <EditIcon sx={{ width: '30px', height: '30px', color: '#1b5e20' }} />
//               </Tooltip>
//             </Link>

//             <Tooltip title='Delete' placement='top'>
//               <IconButton
//                 color='error'
//                 component='span'
//                 onClick={() => deleteHandler(params.getValue(params.id, 'id'))}
//               >
//                 <DeleteForeverIcon sx={{ width: '30px', height: '30px' }} />
//               </IconButton>
//             </Tooltip>
//           </>
//         );
//       },
//     },
//   ];

//   const rows = categories
//     ? categories.map((category) => ({
//         id: category._id,
//         title: category.title,
//         description: category.description,
//       }))
//     : [];

//   useEffect(() => {
//     if (success) {
//       dispatch(resetMutationResult());
//     }
//     dispatch(getCategories({ toast }));
//   }, [dispatch, success]);

//   return (
//     <>
//     <Box
//       className='dash-box'
//       sx={{
//         backgroundColor:"#F6F7C1",
//         padding: '40px',
//         minHeight: '100vh',
//       }}
//     >
//     <Container maxWidth="lg">
//       <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 width: '1410px',
//                 textAlign: 'center',
//                 boxShadow: '2px 2px 2px 2px #588157',                
//                 borderRadius: '4px',
//                 backgroundColor: '#fff',
//                 padding: '55px',
//                 marginTop: "45px",
//                 marginLeft:"-130px"

//                 // marginBottom: "20px",
//             }}
//         >
//         <div
//           style={{
//             maxHeight: '560px',
//             overflowY: 'scroll',
//           }}
//         >
//           <Box style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '15px'}}>

//           <Typography component='h1' color='#1b5e20' variant='h5' sx={{ m: 4, fontFamily: 'poppins, sans-serif' }}>
//             List of Categories
//           </Typography>
//           {loading ? (
//             <BoxShadowLoader />
//           ) : (
//             <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} autoHeight />
//           )}
//           </Box>
//         </div>
//       </Box>
//     </Container>
//     </Box>
//     </>
//   );
// };

// export default CategoryList;
import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCategory,
  getCategories,
  resetMutationResult,
  selectAllCategories,
  selectCategoryMutationResult,
} from '../../../redux/features/categorySlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { Box, Typography, IconButton, Tooltip, Container } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import BoxShadowLoader from '../../../components/Skeletons/BoxShadowLoader';
import './Categorylist.css';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector(selectAllCategories);
  const { success } = useSelector(selectCategoryMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteCategory({ id, toast }));
  };

  const columns = [
    { field: 'title', headerName: 'Categories', headerClassName: 'gridHeader', flex: 1, maxWidth: 200 },
    { field: 'description', headerName: 'Description', headerClassName: 'gridHeader', flex: 1, minWidth: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      headerClassName: 'gridHeader',
      align: 'right', // Aligns the header text to the right
      flex: 1,
      maxWidth: 180,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="actions-cell">
            <Link to={`/authorized/category/${params.getValue(params.id, 'id')}`}>
              <Tooltip title='Edit' placement='top'>
                <EditIcon sx={{ width: '30px', height: '30px', color: '#1b5e20' }} />
              </Tooltip>
            </Link>

            <Tooltip title='Delete' placement='top'>
              <IconButton
                color='error'
                component='span'
                onClick={() => deleteHandler(params.getValue(params.id, 'id'))}
              >
                <DeleteForeverIcon sx={{ width: '30px', height: '30px' }} />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const rows = categories
    ? categories.map((category) => ({
        id: category._id,
        title: category.title,
        description: category.description,
      }))
    : [];

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(getCategories({ toast }));
  }, [dispatch, success]);

  return (
    <>
      <Box
        className='dash-box'
        sx={{
          padding: '40px',
          minHeight: '100vh',
          marginTop:'30px'

        }}
      >
        <Typography component="div" variant="h5" color='#1b5e20' style={{fontFamily: 'poppins, sans-serif' ,textAlign:'center'}}>
          List of Categories
        </Typography>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '117%',
              textAlign: 'center',
              boxShadow: '2px 2px 2px 2px #588157',
              borderRadius: '4px',
              backgroundColor: '#fff',
              padding: '55px',
              marginTop: "45px",
              marginLeft: "-106px"
            }}
          >
            <div>
              <Box style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '15px' }}>

                {loading ? (
                  <BoxShadowLoader />
                ) : (
                  <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} autoHeight />
                )}
              </Box>
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CategoryList;


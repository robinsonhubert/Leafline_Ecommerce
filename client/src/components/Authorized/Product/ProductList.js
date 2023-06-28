import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProductsByAuthorizeRoles, resetMutationResult, selectAllProducts, selectProductMutationResult } from '../../../redux/features/productSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteForeeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import BoxShadowLoader from '../../../components/Skeletons/BoxShadowLoader';

const ProductList = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector(selectAllProducts);
  const { success } = useSelector(selectProductMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteProduct({ id, toast }));
  }

  // const columns = [
  //     { field: 'title', headerName: 'Products', headerClassName: 'gridHeader', flex: 1, minWidth: 170 },
  //     { field: 'description', headerName: 'Description', headerClassName: 'gridHeader', flex: 1.5, minWidth: 250 },
  //     {
  //         field: 'actions',
  //         headerName: 'Actions',
  //         headerClassName: 'gridHeader',
  //         flex: .5,
  //         minWidth: 80,
  //         type: 'number',
  //         sortable: false,
  //         renderCell: (params) => {
  //             return (

  //                 <>
  //                     <Link to={`/authorized/product/${params.getValue(params.id, 'id')}`}>
  //                         <Tooltip title='Edit' placement='top'>
  //                             <EditIcon sx={{ width: '30px', height: '30px', color: '#1b5e20' }} />
  //                         </Tooltip>
  //                     </Link>

  //                     <Tooltip title='Delete' placement='top'>
  //                         <IconButton color='error'
  //                             component='span'
  //                             onClick={() => deleteHandler(params.getValue(params.id, 'id'))}>
  //                             <DeleteForeeverIcon sx={{ width: '30px', height: '30px' }} />
  //                         </IconButton>
  //                     </Tooltip>

  //                 </>
  //             )
  //         }
  //     }
  // ]
  const columns = [
    { field: 'title', headerName: 'Products', headerClassName: 'gridHeader', flex: 1, maxWidth:200 },
    { field: 'description', headerName: 'Description', headerClassName: 'gridHeader', flex: 1 , minWidth: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      headerClassName: 'gridHeader',
      flex: .5,
      sortable: false,
      maxWidth:180,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/authorized/product/${params.getValue(params.id, 'id')}`}>
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
                <DeleteForeeverIcon sx={{ width: '30px', height: '30px' }} />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const rows = [];
  products && products.forEach(product => {
    rows.push({
      id: product._id,
      title: product.title,
      description: product.description
    })
  });
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(getProductsByAuthorizeRoles({ toast }))
  }, [dispatch, success])

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
        <Typography component='h1' variant='h5'  color='#1b5e20' fontFamily='poppins, sans-serif' style={{textAlign:'center'}}>List of Products</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '85%',
            height: "620px",
            maxheight: "100%",
            textAlign: 'center',
            boxShadow: '2px 2px 2px 2px #588157',
            borderRadius: '4px',
            backgroundColor: '#fff',
            padding: '55px',
            alignItems:'center',
            // justifyContent: "center",
            marginLeft: "124px",
            marginTop: "45px",


            // marginBottom: "20px",
          }}
        >
          {/* <div
                style={{
                    maxHeight: '520px',
                    overflowY: 'scroll',
                }}
            > */}


          <Box style={{ display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center' }}>
            
            {loading ? <BoxShadowLoader /> :
              <DataGrid rows={rows}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                autoHeight
              />
            }
          </Box>
          {/* </div> */}
        </Box>
      </Box>
    </>
  )
}

export default ProductList
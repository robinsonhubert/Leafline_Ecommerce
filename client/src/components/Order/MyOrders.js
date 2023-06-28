import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders, selectAllOrders } from '../../redux/features/orderSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
// import { selectShippingInfo, saveShippingInfo } from '../../redux/features/shippingSlice';

import { Box, Typography, Tooltip } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import BoxShadowLoader from '../Skeletons/BoxShadowLoader';
import Header2 from '../Layout/Header2';
import './OrderDetails.css'

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector(selectAllOrders);
  // const { shipInfo } = useSelector(selectShippingInfo);
  const columns = [
    { field: 'orderId', headerName: 'Order ID', headerClassName: 'gridHeader', flex: 1, maxWidth: 200 },
      // { field: 'Name', headerName: 'Name', headerClassName: 'gridHeader', flex: 1, maxWidth: 90 },
    { field: 'status', headerName: 'Status', headerClassName: 'gridHeader',cellClassName: 'gridCell gridCellStatus', flex: 1, maxWidth: 250,minWidth:100 },
    { field: 'itemsQty', headerName: 'Quantity', headerClassName: 'gridHeader',cellClassName: 'gridCell', flex: 1, maxWidth: 250, type: 'number',},
    { field: 'amount', headerName: 'Amount', headerClassName: 'gridHeader',cellClassName: 'gridCell', flex: 1, maxWidth: 250, type: 'number' },
    {
      field: 'details',
      headerName: 'Details',
      headerClassName: 'gridHeader',
      flex: 1,
      cellClassName: 'gridCell',
      maxWidth: 250,
      type: 'number',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.getValue(params.id,'id')}`}>
              <Tooltip title='View Details' placement='top'>
                <LaunchIcon sx={{ width: '40px', height: '40px', color: 'green' }} />
              </Tooltip>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = orders?.map((order) => ({
    orderId: order.shortId,
    id: order._id,
    status: order.orderStatus,
    itemsQty: order.orderItems.length,
    amount: 'LKR' + '.' + order.totalPrice,
  }));

  useEffect(() => {
    dispatch(getMyOrders({ toast }));
  }, [dispatch]);

  return (
    <>
      <Header2 />
      <section class="banner productpage">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 d-flex justify-content-center">
                    <div class="text-center">
                        <h2 class="banner-title">My Orders</h2>
                        <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                            <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/'><HomeIcon/> Home</Link></li>
                              <li class="breadcrumb-item active" aria-current="page">My Orders</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>
      <Box className='container'
        sx={{
          marginTop: 8,
          marginBottom: 10
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          // boxShadow: '0 2px 4px green',
          // borderRadius: '4px',
          // padding: '50px',
          // backgroundColor: '#fff',
          // height: "100% !important",
          // width: "80%",
          // marginTop:'150px',
          // marginLeft: "160px",
          // marginRight: "0px"

        }}
      >
        <div style={{paddingLeft:'180px'}}>
          {loading ? (
            <BoxShadowLoader />
          ) : (
            <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }}  style={{height:'500px', width: '1000px' }}/>
          )}
      </div>
      </Box>

    </>
  );
};

export default MyOrders;

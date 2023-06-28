import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './redux/features/authSlice';
import CategoryReducer from './redux/features/categorySlice';
import ProductReducer from './redux/features/productSlice';
import CartReducer from './redux/features/cartSlice';
import ReviewReducer from './redux/features/reviewSlice';
import ShippingReducer from './redux/features/shippingSlice';
import OrderReducer from './redux/features/orderSlice';

export default configureStore({
    reducer:{
        auth:AuthReducer,
        category:CategoryReducer,
        product:ProductReducer,
        cart:CartReducer,
        review:ReviewReducer,
        shipping:ShippingReducer,
        order:OrderReducer,
    }
})
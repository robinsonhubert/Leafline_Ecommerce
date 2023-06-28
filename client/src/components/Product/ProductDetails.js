import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { selectProductDetails, productDetails } from '../../redux/features/productSlice';
import { toast } from 'react-toastify';
import BoxShadowLoader from '../Skeletons/BoxShadowLoader';
import HomeIcon from '@mui/icons-material/Home';
import ProductDetailsInfoCard from './ProductDetailsInfoCard';
import './ProductDetails.css';
import { newReview, selectAllReviews, selectReviewMutationResult, resetMutationResult, getReviews } from '../../redux/features/reviewSlice';
import ReviewListCard from './ReviewListCard';
import { formatCurrency } from '../../utility/formatCurrency';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addItemsToCart } from '../../redux/features/cartSlice';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Dialog, IconButton, Tooltip, DialogActions, DialogContent, DialogTitle, TextareaAutosize, Stack, Rating, Typography } from '@mui/material';
import Header2 from '../Layout/Header2';

const ProductDetails = () => {
    const [submitRating, setSubmitRating] = useState(5);
    const [submitReview, setSubmitReview] = useState('');
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const decreaseQuantity = (_id, qty) => {
        const quantity = qty - 1;
        if (qty <= 1) return;
        dispatch(addItemsToCart({ _id, quantity }));
    }
    const increaseQuantity = (_id, qty, stock) => {
        const quantity = qty + 1;
        if (stock <= qty) return;
        dispatch(addItemsToCart({ _id, quantity }));
    }

    const addToCartHandler = () => {
        const _id = product._id;
        dispatch(addItemsToCart({ _id, quantity, toast }))
        toast.success('Item added to cart');
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, product } = useSelector(selectProductDetails);
    const { reviews } = useSelector(selectAllReviews);
    const { success } = useSelector(selectReviewMutationResult);


    useEffect(() => {
        if (success) {
            toast.success('Thank for your valuable review.');
            dispatch(resetMutationResult());
        }
        dispatch(productDetails({ id, toast }));
        dispatch(getReviews({ id, toast }));
    }, [dispatch, id, success]);

    const handleSubmitReviewRating = () => {
        setOpen(false);

        const jsonData = {
            rating: submitRating,
            comment: submitReview,
            productId: product._id
        }
        dispatch(newReview({ jsonData, toast }));
    }

    return (
        <>
            {loading ? <BoxShadowLoader /> :
                <>
                    <Header2 />
                    {/*Banner starts*/}
                    <section class="banner productpage">
                        <div class="container container2">
                            <div class="row">
                                <div class="col-lg-12 d-flex justify-content-center">
                                    <div class="text-center">
                                        <h2 class="banner-title">Product Details</h2>
                                        <nav aria-label="breadcrumb" class="d-flex justify-content-center fast-breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><Link to='/'><HomeIcon /> Home</Link></li>
                                                <li class="breadcrumb-item active" aria-current="page">Product Details </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*Banner Ends*/}
                    <main className='productDetailsContainer container'>
                        <div class="container3">
                            <div class="card__title">
                                <div class="icon">
                                    <a href="/product"><ArrowBackIcon /></a>
                                </div>
                                <h3></h3>
                            </div>
                            <div class="card__body">
                                <div class="half">
                                    <div class="featured_text">
                                        <h1>{product && product.title && product.title.length > 15
                                            ? product.title.slice(0, 14)
                                            : product && product.title}</h1>
                                        <p class="sub">{product && product.category.title}</p>
                                        <p class="price">{product && formatCurrency(product.price - product.discount)}
                                        </p>
                                        <p class=''>{product && product.stock > 0 ?
                                            <span class="stock"> In stock</span>
                                            :
                                            <span class="stock"></span>
                                        }</p>
                                    </div>
                                    <div class="productcardimage">
                                        <img src={
                                            product && product.images && product.images.length > 0
                                                ? product.images[0].url || 'placeholder.jpg'
                                                : ''
                                        } alt="" />
                                    </div>
                                </div>
                                <div class="half"style={{paddingTop:'60px'}}>
                                    <div className='ratingsDiv'>
                                        <div class="reviews">
                                            <ul class="stars">
                                                <li>
                                                    <Stack spacing={1} className='rating-review'>
                                                        <Rating value={product && product.ratings} precision={0.1} readOnly />
                                                    </Stack>
                                                </li>
                                            </ul><br />
                                            <span>Reviews: ({product && product.numOfReviews})</span>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="description">
                                        <p>{product && product.description}</p>
                                    </div>
                                    {/* <div id="quantity">
                                        <label for="quantity-input">Quantity</label>
                                        <p></p>
                                    </div> */}
                                </div>
                            </div>
                            <div class="card__footer">
                                <div class="recommend">
                                    <p>Produced by</p>
                                    <h3>Leaf Line</h3>
                                </div>
                                <div class="action">
                                    <button type="button" class='btn01 explorebtn' onClick={addToCartHandler}>Add to cart</button>
                                </div>
                            </div>
                        </div>

                        <Box className='product-reviews'>
                            {/* <!--heading---> */}
                            <div class="testimonial-heading">
                                <h4>Clients Says</h4>
                            </div>
                            <Box className='reviews' spacing={10} style={{ textAlign: 'center', marginRight: "0px" }} >
                                <button onClick={handleClickOpen} className='btn02 explorebtn'>Submit Review</button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle sx={{ backgroundImage: 'linear-gradient(to right, #143a0d, #c0dca5)', color: '#fff', mb: 2 }}>Review &#38; Rating</DialogTitle>
                                    <DialogContent sx={{ minWidth: '350px' }} fullWidth>
                                        <Stack spacing={1} sx={{ display: 'block' }}>
                                            <Rating value={submitRating}
                                                precision={0.1}
                                                onChange={((e, newValue) => setSubmitRating(newValue))}
                                            />
                                        </Stack>
                                        <TextareaAutosize
                                            id="review"
                                            style={{ width: '100%', margin: '10px 0', padding: "10px", borderRadius: "20px" }}
                                            minRows={5}

                                            value={submitReview}
                                            variant="standard"
                                            onChange={(e => setSubmitReview(e.target.value))}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <button onClick={handleClose} class='explorebtn'>Cancel</button>
                                        <button onClick={handleSubmitReviewRating} class='explorebtn' >Submit</button>
                                    </DialogActions>
                                </Dialog>

                                {product?.reviews && product.reviews[0] ?
                                    <Box className='review'>
                                        {product?.reviews && product.reviews.map(review =>
                                            <ReviewListCard review={review} />
                                        )}
                                    </Box>
                                    :
                                    <Typography variant='button' spacing={10} marginLeft="20px" style={{ color: '#AA8B56' }}>No reviews yet</Typography>
                                }
                                { }
                            </Box>
                        </Box>
                    </main>

                </>
            }
        </>
    )
}

export default ProductDetails

import { useSelector } from 'react-redux';
import { useNavigate, Outlet, Navigate, Link, NavLink } from 'react-router-dom';
import { selectLoggedInUser } from '../../redux/features/authSlice';
import jwtDecode from 'jwt-decode';
import { Box, Typography } from '@mui/material';
import TreeMenu from './Menus/TreeMenu';
import './Authorized.css';
import DrawerTreeMenu from './Menus/DrawerTreeMenu';
import AdminDashboard from '../Authorized/Dashboard/AdminDashboard';
import AuthMenu from '../Layout/AuthMenu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { selectCartItems } from '../../redux/features/cartSlice';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import StoreIcon from '@mui/icons-material/Store';
import logoo from '../../images/logoo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';



const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 6,
        top: 5,
        border: `2px solid ${theme.palette.background.paper}`,
        background: '#609a33',
        padding: '0 4px',
    },
}));

const AuthorizedRoute = () => {
    const { products } = useSelector(selectCartItems);
    const navigate = useNavigate();
    const { accessToken } = useSelector(selectLoggedInUser);
    let role;
    const { UserInfo } = jwtDecode(accessToken);
    role = UserInfo.roles[0].toString();
    if (role === 'admin') {

        return (
            <>
                <Box
                    sx={{
                        backgroundColor: "white",
                        transition: ".4s all",
                        overflow: "visible",
                        top: "0",
                        left: "0",
                        width: "100%",
                        zIndex: "100",
                        position: "fixed",
                        boxShadow: '2px 2px 10px #7b9c56',
                        display: 'flex',
                        color: '#fff',
                        p: 1,
                        // borderRadius: '8px',
                        // marginLeft: "20px",
                        // marginRight: "20px",
                        // paddingTop:"5px"
                    }}
                >
                    <Box className='mTreeMenu' sx={{ minWidth: '225px', mr: 1 }}>
                        <DrawerTreeMenu />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link to="dashboard" className="link-no-underline">




                            <Typography
                                component='div'
                                variant='h6'
                                sx={{
                                    textAlign: 'left',
                                    color: '#132a13',
                                    textShadow: '1px 1px 1px #555',
                                    marginLeft: '20px',
                                    marginTop: '15px'
                                }}
                            >

                                LEAFLINE
                            </Typography>

                        </Link>





                    </Box>
                    <div className="d-flex align-items-center justify-content-end">
                        {/* <NavLink to="/" className="navbar-brand">
    <img src={logoo} alt="Logo" className="logo" style={{ height: "100px" }} />
  </NavLink> */}
                        <NavLink
                            to="/"
                            className="nav-link custom-nav-link"
                            activeClassName="active"
                            style={{
                                color: '#263A29'
                            }}
                        >
                            <HomeIcon/>
                        </NavLink>

                        <NavLink
                            to="/product"
                            className="nav-link custom-nav-link"
                            activeClassName="active"
                            style={{
                                color: '#263A29'
                            }}
                        >
                            <StoreIcon />
                        </NavLink>
                        <NavLink
                            to="/cart"
                            className="nav-link custom-nav-link"
                            activeClassName="active"
                            style={{
                                color: '#263A29'
                            }}
                        >
                            <StyledBadge badgeContent={products.length > 0 ? products.length : '0'} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </NavLink>

                        <div className="auth-area text-left">
                            <AuthMenu />
                        </div>
                    </div>

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        // marginLeft: "20px",
                        // height:'1000px',
                        overflow: 'hidden',
                        marginTop: '75px',
                        marginBottom: '0px'
                    }}
                >
                    <Box
                        className='dTreeMenu'
                        sx={{
                            backgroundColor: '#263A29',
                            // '#E9EDC9',
                            boxShadow: '2px 2px 15px #7b9c56',
                            minWidth: '240px',
                            mr: 1,

                            // borderRadius: '10px',
                        }}
                    >
                        <TreeMenu />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{}}>
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            </>
        );
    } else {
        return <Navigate to='/unauthorized' />;
    }
};

export default AuthorizedRoute;

import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import './mainLayout.css'
import Footer from './Footer';
import FooterSmall from './FooterSmall';
import Header2 from './Header2';
const MainLayout = () => {
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    return (
        <>
            <div className='site'>
                <div className='header'>
                    {isHomePage ? <Header /> : ''}
                </div>
                {/* {isHomePage ? '' : <div className="content"></div>} */}

                <Outlet />
            </div>
             <Footer /> 

        </>
    )
}

export default MainLayout;
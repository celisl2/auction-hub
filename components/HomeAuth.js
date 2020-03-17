import Navigation from './Navigation';
import CurrentAuction from './CurrentAuction';
import HomeProducts from './HomeProducts';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import {getCode} from '../utils/helperFunctions';

const HomeAuth = (apiData) => {
   
    return (
        <div className="home-body">
            <Navigation />
            <Container>
                <CurrentAuction data={apiData.data}/>
                <HomeProducts />
            </Container>
            <Footer />
            <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
        </div>
    )
};


export default HomeAuth;
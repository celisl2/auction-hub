import Navigation from '../components/Navigation';
import CurrentAuction from '../components/CurrentAuction';
import HomeProducts from '../components/HomeProducts';



//import TESTReadDatabase from '../components/TESTReadDatabase';
import getAuctionProducts from './api/getAuctionProducts';

// RTA: Edited for sake of showing data entering Next.JS/React page
// Remove {getAuctionProducts()} from this file to restore. 

let Home = () =>
    <div className="home-body">
        <Navigation />
        <CurrentAuction />
        <HomeProducts />
        <div>
            {getAuctionProducts()}
        </div>;
    </div>
    

export default Home;
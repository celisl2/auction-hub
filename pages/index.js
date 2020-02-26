import Navigation from '../components/Navigation';
import CurrentAuction from '../components/CurrentAuction';
import HomeProducts from '../components/HomeProducts';

// ------
import CreateProduct from './create_product';
import CreateAuction from './create_auction';
// ------

let Home = () =>
    <div className="home-body">
        <Navigation />
        <CurrentAuction />
        <HomeProducts />

        <div>

        <hr/>
        <hr/>
            <CreateProduct />
        <hr/>
        <hr/>
            <CreateAuction />
        </div>
    </div>;
export default Home;
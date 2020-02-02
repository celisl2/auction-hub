import Navigation from '../components/Navigation';
import CurrentAuction from '../components/CurrentAuction';
import HomeProducts from '../components/HomeProducts';
let Home = () =>
    <div className="home-body">
        <Navigation />
        <CurrentAuction />
        <HomeProducts />
    </div>;

export default Home;
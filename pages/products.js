import Navigation from '../components/Navigation';
import {getCode} from '../utils/helperFunctions';


let Products = () =>
    <div className="products-body">
        <Navigation />
        <div className="products-header">
            {/* use logic in element below to: __find auction name */}
            <h2>Auction Name</h2>
            <div className="products-timer">
                <div className="grid-item"><h4>HH{getCode(58)}</h4></div>
                {/* use logic in div below to: __find hours left for auction event */}
                <div className="grid-item"><h4>11{getCode(58)}</h4></div>
                <div className="grid-item"><h4>MM{getCode(58)}</h4></div>
                {/* use logic in div below to: __find hours left for auction event */}
                <div className="grid-item"><h4>11{getCode(58)}</h4></div>
                <div className="grid-item"><h4>SS</h4></div>
                {/* use logic in div below to: __find hours left for auction event */}
                <div className="grid-item"><h4>11</h4></div>
                <h4 className="banner time-left">Time Left to Bid</h4>
            </div>
        </div>
        <div className="products">
            <h3>Products</h3>
             {/* logic here to display all products */}
        </div>
        <div className="Login">
            <h3>Products</h3>
             {/* logic here to display all products */}
        </div>
    </div>;

export default Products;

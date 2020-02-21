import Navigation from '../components/Navigation';
import {getCode} from '../utils/helperFunctions';
import {loadDB} from '../lib/db';
import HomeForbidden from '../components/HomeForbidden';
const React = require('react');

let firebase = loadDB();

//Products react component
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
    </div>;

//This class renders a react component based on if the user is logged in or not
//Here's the tutorial i found this from https://medium.com/@650egor/react-30-day-challenge-day-3-firebase-user-authentication-879e484e5934
class ProductsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => { this.setState({user}) })
    }
    render() {
        //short hand conditional for if/else
        let content = this.state.user ? <Products /> : <HomeForbidden />;
        return (
            <div>
                {content}
            </div>
        )
    }
};

module.exports = ProductsPage;
import Navigation from '../components/Navigation';
import CurrentAuction from '../components/CurrentAuction';
import HomeProducts from '../components/HomeProducts';
import {loadDB} from '../lib/db';
import HomeForbidden from '../components/HomeForbidden';
const React = require('react');

let firebase = loadDB();

const HomeAuth = () =>
    <div className="home-body">
        <Navigation />
        <CurrentAuction />
        <HomeProducts />
    </div>;


//This class renders a react component based on if the user is logged in or not
//Here's the tutorial i found this from https://medium.com/@650egor/react-30-day-challenge-day-3-firebase-user-authentication-879e484e5934
class Home extends React.Component {
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
        let content = this.state.user ? <HomeAuth /> : <HomeForbidden />;
        return (
            <div>
                {content}
            </div>
        )
    }

};

module.exports = Home;
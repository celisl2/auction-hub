import Navigation from '../components/Navigation';
import CurrentAuction from '../components/CurrentAuction';
import HomeProducts from '../components/HomeProducts';
import {loadDB} from '../lib/db';
import HomeForbidden from '../components/HomeForbidden';
import Loading from '../components/Loading';
const React = require('react');
import Cookies from 'js-cookie';
import Router from 'next/router';

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
            user: 'loading'
        }
    }

    componentDidMount() {
        this._isMounted = true;
        
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                if(this._isMounted)
                    this.setState({ user });

                user.getIdToken().then(function (token) {
                    Cookies.set('ssid', token);
                })
            }
            else {
                if(this._isMounted)
                    this.setState(null);
                    
                setTimeout(() => {
                    Router.push('/login');
                }, 4000);
                
                
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        //we check for state since every time state is changed the render function will be called again
        //let content = Cookies.get('ssid') ? <HomeAuth /> : <HomeForbidden />; 
        if(this.state.user === 'loading')
            return <Loading />;
        else if(this.state.user === null)
            return <HomeForbidden />;
        else
            return <HomeAuth />;
    }

};

module.exports = Home;
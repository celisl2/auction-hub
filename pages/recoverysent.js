import Navigation from '../components/Navigation';
import CurrentAuction from '../components/CurrentAuction';
import HomeProducts from '../components/HomeProducts';
import {loadDB} from '../lib/db';
import HomeForbidden from '../components/HomeForbidden';
import Loading from '../components/Loading';
const React = require('react');
import Cookies from 'js-cookie';
import Router from 'next/router';
import Link from 'next/link'

//This class renders a react component based on if the user is logged in or not
//Here's the tutorial i found this from https://medium.com/@650egor/react-30-day-challenge-day-3-firebase-user-authentication-879e484e5934
class Recovery extends React.Component {

    render() {
        return(
            <div>
            <h4>A recovery email has been sent to your mailbox.</h4>
            <Link href="/login">
            <a className="card">
            <h3>Return to Login&rarr;</h3>
            </a></Link>
            </div>
            )
    }

};

export default Recovery

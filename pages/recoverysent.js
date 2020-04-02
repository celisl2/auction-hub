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
import {getCode} from '../utils/helperFunctions';
import Head from 'next/head';
import ImageHeader from '../components/ImageHeader';
import Container from 'react-bootstrap/Container';
import Footer from '../components/Footer';

//This class renders a react component based on if the user is logged in or not
//Here's the tutorial i found this from https://medium.com/@650egor/react-30-day-challenge-day-3-firebase-user-authentication-879e484e5934
let Recovery = () =>
<div className="login-body">
    <Head>
        <title>Log In | Auction Hub</title>
    </Head>

        <ImageHeader />
        <Container>
            <h3 className="text-center mx-auto login-header">Recover Password</h3>
        <div className="mx-auto login-form">
        <h5>A recovery email has been sent to the entered address. If your email
        matches a registered account, you will be sent a link to reset your account.</h5>
        </div>
        <div className="login-register-recovery">
        <Link href="/login">
            <a className="card">Return to Log In</a>
        </Link>
            <p className="login-special">Not registered yet{getCode(63)}</p>
            <div className='line'></div>
            {/** need on click for the buttons below */}
            <Link href="/registration">
                <a className="card">Register</a>
            </Link>
            <Link href="/admin_registration">
                <a className="card">Administrator Registration</a>
            </Link>
        </div>
    </Container>
    <Footer />
    <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
</div>;
export default Recovery;

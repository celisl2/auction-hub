/*

File Name: confirmregister.js
Purpose: Displays a confirmation that an account was sucessfuly created.
Document Created By: Team 1

*/

import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import Head from 'next/head';
import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import Footer from '../components/Footer';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

//Class to render content.
///Note that All data was process in the registration API and this is only
//a Page that informns the user and routes them back to the login page.
let Login = () =>
    <div className="login-body">
        <Head>
            <title>Log In | Auction Hub</title>
        </Head>

            <ImageHeader />
            <Container>
            <div>
            <Alert variant="success">
                Your account has been sucessfully registered. An email confirmation has been sent. Please confirm your email and then log in using the link below.
            </Alert>

            <div className="center-btn">
                <Button className="customer-button" variant="dark"><Link href="/login"><a className="makeWhite">Log In</a></Link></Button>
            </div>
            </div>
        </Container>
        <Footer />
        <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
    </div>;
export default Login;

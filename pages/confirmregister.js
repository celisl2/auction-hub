import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {loadDB} from '../lib/db';
let firebase = loadDB();
import "firebase/auth";
import Cookies from 'js-cookie';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Footer from '../components/Footer';
import Alert from 'react-bootstrap/Alert';


let Login = () =>
    <div className="login-body">
        <Head>
            <title>Log In | Auction Hub</title>
        </Head>

            <ImageHeader />
            <Container>
            <div>
            <h4>Your account has been sucessfully registered.
An email Confirmation has been sent.
Please confirm your email and then log in using the link below.</h4>
                <Link href="/login">
                    <a className="card">Login</a>
                </Link>
            </div>
        </Container>
        <Footer />
        <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
    </div>;
export default Login;

import "firebase/auth";
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {ChevronDown, MoreHorizontal} from 'react-feather';

import {loadDB} from '../lib/db';
let firebase = loadDB();
import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import Footer from '../components/Footer';

const VerifyForm = () => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={
                Yup.object({
                    email: Yup.string()
                        .required('Please enter your email')
                        .email('Invalid Email'),
                })}

                onSubmit={ async (values, {setSubmitting}) => {
                setSubmitting(true)

                    try {
                    firebase.auth().onAuthStateChanged(function(user) {
                        user.sendEmailVerification();
                        if (user.emailVerified) {
                          console.log('Email is verified');
                          return Router.push('/index');
                        }
                        console.log('Sent email verification');
                        Router.push('/login');
                        });

                    } catch(error) {
                        console.error('An unknown error has occurred.');
                        throw new Error(error);
                    }
            }}
        >
        {formik => (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="md-width text-center">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control name="email" {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>) : null}
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>) : null}
                    <button className="btn space smallScreen customer-button" type="submit">Submit</button>
                </Form.Group>
               
            </Form>
        )}
        </Formik>
    );
};

let Recovery = () =>
    <div className="login-body">
        <Head>
            <title>Auction Hub</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link href="https://fonts.googleapis.com/css?family=Merriweather:400,700|Open+Sans:300,400|Oswald:300,400&display=swap" rel="stylesheet"></link>

        </Head>
        <ImageHeader />
        <Container>
            <h3 className="space text-center">Verify Your Account</h3>
            <p className="text-center md-width border-reset">We will send you an email with simple instructions on how to verify your account</p>
            <ChevronDown className="icon-center" size='30' color="#5F4E9C"/>
            <VerifyForm/>
            <MoreHorizontal className="icon-center" size='30' color="#5F4E9C"/>
            
            <div className="text-center link-group">
                <p className="bold-text">Useful Links</p>
                <Link href="/login">
                    <a>Log In</a>
                </Link>
                <Link href="/registration">
                    <a>Register</a>
                </Link>
                <Link href="/admin_registration">
                    <a>Administrator Registration</a>
                </Link>
            </div>
        </Container>
        <Footer />
        <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
        
    </div>;
export default Recovery;

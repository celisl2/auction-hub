/* /////////////////////////////////////////////////////////

File Name: admin_registration.js
Purpose: Creates the form for registering an Admin account
Document Created By: Team 1

///////////////////////////////////////////////////////// */

import ImageHeader from '../components/ImageHeader';
import {getCode} from '../utils/helperFunctions';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Footer from '../components/Footer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import {useState, useEffect} from 'react';
import {loadDB} from './../lib/db';

let db = loadDB();

/*
Function: AdminRegistration
Purpose: Creates the form for admin registration using formik.
*/

const AdminRegistrationForm = (props) => {
    return (
        <Formik
        //Initial Values are null.
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                passwordConfirm: '',
            }}

            //Builds the validation for entering data.
            validationSchema={
                Yup.object({
                    firstName: Yup.string()
                .required('Required'),
                lastName: Yup.string()
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                phone: Yup.string().required('Required'),
                password: Yup.string()
                    .min(6, "Password should be at least 6 characters")
                    .required('Required'),
                passwordConfirm: Yup.string()
                    .required('Required')
                    .oneOf([Yup.ref('password')], 'Passwords do not match')
                })}

                //Submit the data to process.
                onSubmit={ async (values, {setSubmitting}) => {
                    //setSubmitting(true)
                    const email = values.email;
                    const pssw = values.password;
                    const fName = values.firstName;
                    const lName = values.lastName;
                    const phone = values.phone;

                    //Attempt to send data to API to process
                    //Note that the cookie created determines admin access.
                    //This allows for the API to process both user types.
                    try {
                        const response = await fetch('api/registration', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email, password: pssw, firstName: fName, lastName: lName, phone: phone, isAdmin: "true" })
                        });

                        // If sucessful, route user to confirm
                        if(response.ok) {
                            //redirect user to login page
                            /*
                            const {token} = await response.json();
                            console.log('token from front end being called. Here is info from back end -- ' + token);
                            */
                            Router.push('/confirmregister');
                        }

                        //If the response failed.
                        else {
                            //display errors here
                            console.log("response not ok");
                        }

                        //If an unknown error has occurred.
                    } catch(error) {
                        console.error('yout code sucks');
                        throw new Error(error);
                    }
            }}
        >
        {formik => (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="firstName">First Name</Form.Label>
                    <Form.Control name="firstName" {...formik.getFieldProps('firstName')} />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div>{formik.errors.firstName}</div>) : null}
                    <Form.Label htmlFor="lastName">Last Name</Form.Label>
                    <Form.Control name="lastName" {...formik.getFieldProps('lastName')} />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <div>{formik.errors.lastName}</div>) : null}
                    <Form.Label htmlFor="email">Email Address</Form.Label>
                    <Form.Control name="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>) : null}
                    <Form.Label htmlFor="phone">Phone</Form.Label>
                    <Form.Control name="phone" {...formik.getFieldProps('phone')} />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div>{formik.errors.phone}</div>) : null}
                    <Form.Label htmlFor="password">Password</Form.Label>
                    {/*<Form.Control name="password" {...formik.getFieldProps('password')} />*/}
                    <Form.Control
                        id="password"
                        name="password" {...formik.getFieldProps('password')}
                        type="password"
                    />
                    <Form.Label htmlFor="passwordConfirm">Confirm Password</Form.Label>
                    <Form.Control
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passwordConfirm}
                    />
                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                        <div>{formik.errors.passwordConfirm}</div>) : null}
                    <button className="btn space customer-button" type="submit">Register</button>
                </Form.Group>

            </Form>
        )}

        </Formik>
    );
};

//Render the page and its contents.
const AdminRegistration = () => {
    const [showPage, setShowPage] = useState(false);
    const [dbCode, setDBCode] = useState(null);

    useEffect(() => {
        const unsubscribe = db
        .firestore()
        .collection('AdminResources').doc('RegistrationCode')
        .onSnapshot( (snapshot) => {
            if(snapshot.get('accessCode')) {
                setDBCode(snapshot.get('accessCode'));
            }
        });
        return () => { unsubscribe() };
    })

    if(!showPage) {
        return (
            <div className="admin-registration-body">
                <ImageHeader />
                <Container>
                <h2 className="text-center mx-auto text-header">Please enter access code to view this page</h2>
                <Formik
                    initialValues={{
                        code: '',
                    }}
                    //Builds the validation for entering data.
                    validationSchema={
                        Yup.object({
                            code: Yup.string()
                                .required('Please contact administrator to access this page.'),
                        })}
                    //Submit the data to process.
                    onSubmit={(values, {setSubmitting}) => {
                        //console.log(values);
                        if(dbCode == values.code) {
                            setShowPage(true);
                        }
                        //important part for this to work is to set the showPage to true when user actually puts in the right code
                        //also using another state to display when the user doesnt enter the correct code (check bid component to see how this works)
                    }}
                >
                {formik => (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="code">Access Code</Form.Label>
                    <Form.Control name="code" {...formik.getFieldProps('code')} />
                    {formik.touched.code && formik.errors.code ? (
                        <Alert variant='danger'>{formik.errors.code}</Alert>) : null}
                    <button className="btn space customer-button" type="submit">Register</button>
                </Form.Group>
            </Form>
        )}

                </Formik>
                </Container>
            </div>
        )
    }
    else {

        return (
            <div className="admin-registration-body">
                <ImageHeader />
                <Container>
                    <h2 className="text-center mx-auto text-header">Administrator Registration</h2>
                    <AdminRegistrationForm />
                </Container>
                <Footer/>
                <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
            </div>
        )
    }
}
export default AdminRegistration;

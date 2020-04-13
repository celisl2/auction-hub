/* /////////////////////////////////////////////////////////

File Name: registration.js
Purpose: Builds the form for registering any user.
Document Created By: Team 1

///////////////////////////////////////////////////////// */

import ImageHeader from '../components/ImageHeader';
import {getCode} from '../utils/helperFunctions';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Footer from '../components/Footer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import Alert from 'react-bootstrap/Alert';

/*
Function: CustomerRegistration
Purpose: Creates the registration form using formik.
*/

const CustomerRegistration = () => {
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                passwordConfirm: '',
            }}

            //Builds the validation for entering an email address.
            validationSchema={
                Yup.object({
                    firstName: Yup.string().required('Required'),
                    lastName: Yup.string().required('Required'),
                    email: Yup.string().email('Invalid email address')
                        .required('Required'),
                    phone: Yup.string().required('Required'),
                    password: Yup.string().required('Required'),
                    passwordConfirm: Yup.string().required('Required')
                        .oneOf([Yup.ref('password')], 'Passwords do not match')
                })}

                //Submit the data to process.
                onSubmit={ async (values, {setSubmitting}) => {
                    const email = values.email;
                    const pssw = values.password;
                    const fName = values.firstName;
                    const lName = values.lastName;
                    const phone = values.phone;

                    //Attempt to send data to API to process
                    try {
                        const response = await fetch('api/registration', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email, password: pssw, firstName: fName, lastName: lName, phone: phone, isAdmin: "false" })
                        });

                        // If sucessful, route user to confirm
                        // and send the data to the console.
                        if(response.ok) {
                            console.log('response ok');
                            const {token} = await response.json();
                            console.log('token from front end being called. Here is info from back end -- ' + token);
                                console.log('Email verification has been sent.');
                                Router.push('/confirmregister');
                                }

                        //If the response failed.
                        else {
                            console.log( response + "response not ok");
                        }

                        //If an unknown error has occurred.
                    } catch(error) {
                        console.error('Your code sucks');
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
                        <Alert variant='danger'>{formik.errors.firstName}</Alert>) : null}

                    <Form.Label htmlFor="lastName">Last Name</Form.Label>
                    <Form.Control name="lastName" {...formik.getFieldProps('lastName')} />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <Alert variant='danger'>{formik.errors.lastName}</Alert>) : null}

                    <Form.Label htmlFor="email">Email Address</Form.Label>
                    <Form.Control name="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? (
                        <Alert variant='danger'>{formik.errors.email}</Alert>) : null}

                    <Form.Label htmlFor="phone">Phone</Form.Label>
                    <Form.Control name="phone" {...formik.getFieldProps('phone')} />
                    {formik.touched.phone && formik.errors.phone ? (
                        <Alert variant='danger'>{formik.errors.phone}</Alert>) : null}

                    <Form.Label htmlFor="password">Password</Form.Label>
                    {/*<Form.Control name="password" {...formik.getFieldProps('password')} />*/}
                    <Form.Control
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
                        <Alert variant='danger'>{formik.errors.passwordConfirm}</Alert>) : null}
                        <div className="text-center space">
                           <button className="btn customer-button" type="submit">Register</button>
                        </div>

                </Form.Group>

            </Form>
        )}

        </Formik>
    );
};

//Builds the Website rendering.
const Registration = () =>
    <div className="registration-body">
        <ImageHeader />
        <Container>
            <div className="registration-content">
                <h2 className="text-center mx-auto text-header">Register</h2>
                <CustomerRegistration />
            </div>
        </Container>
        <Footer />
        <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
    </div>;
export default Registration;

import ImageHeader from '../components/ImageHeader';
import {getCode} from '../utils/helperFunctions';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Footer from '../components/Footer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import Cookies from 'js-cookie';

const AdminRegistrationForm = (props) => {
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConfirm: '',
            }}
            validationSchema={
                Yup.object({
                    firstName: Yup.string()
                .required('Required'),
                lastName: Yup.string()
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .min(6, "Password should be at least 6 characters")
                    .required('Required'),
                passwordConfirm: Yup.string()
                    .required('Required')
                    .oneOf([Yup.ref('password')], 'Passwords do not match')
                })}
                onSubmit={ async (values, {setSubmitting}) => {
                    setSubmitting(true)
                    const email = values.email;
                    const pssw = values.password;
                    const fName = values.firstName;
                    const lName = values.lastName;

                    try {
                        const response = await fetch('api/registration', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email, password: pssw, firstName: fName, lastName: lName, isAdmin: "true" })
                        });

                        if(response.ok) {
                            //redirect user to login page
                            /*
                            const {token} = await response.json();
                            console.log('token from front end being called. Here is info from back end -- ' + token);
                            */
                            if(Cookies.get('ssid') !== undefined) {
                            }
                            Router.push('/confirmregister');

                        }
                        else {
                            //display errors here
                            console.log("response not ok");
                        }
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
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control name="password" {...formik.getFieldProps('password')} />
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

const AdminRegistration = () =>
    <div className="admin-registration-body">
        <ImageHeader />
        <Container>
            <h2 className="text-center mx-auto text-header">Administrator Registration</h2>
            <AdminRegistrationForm />
        </Container>
        <Footer/>
        <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
    </div>;
export default AdminRegistration;

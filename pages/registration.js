import ImageHeader from '../components/ImageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

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
                onSubmit={ async (values, {setSubmitting}) => {
                    setSubmitting(true)
                    const email = values.email;
                    const pssw = values.password;

                    try {
                        const response = await fetch('api/registration', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email, password: pssw })
                        });

                        if(response.ok) {
                            console.log('response ok');
                            const {token} = await response.json();
                            console.log('token from front end being called. Here is info from back end -- ' + token);
                            Router.push('/login');

                        }
                        else {
                            console.log( response + "response not ok");
                        }
                    } catch(error) {
                        console.error('Your code sucks');
                        throw new Error(error);
                    }

            }}
        >
        {formik => (
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" {...formik.getFieldProps('firstName')} />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>) : null}

                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" {...formik.getFieldProps('lastName')} />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>) : null}

                <label htmlFor="email">Email Address</label>
                <input name="email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>) : null}

                <label htmlFor="phone">Phone</label>
                <input name="phone" {...formik.getFieldProps('phone')} />
                {formik.touched.phone && formik.errors.phone ? (
                    <div>{formik.errors.phone}</div>) : null}

                <label htmlFor="password">Password</label>
                <input name="password" {...formik.getFieldProps('password')} />
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                />
                {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                    <div>{formik.errors.passwordConfirm}</div>) : null}
                <button type="submit">Register</button>
            </form>
        )}

        </Formik>
    );
};

const AdminRegistration = (props) => {
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
                    const email = values.email
                    const pssw = values.password

                    try {
                        const response = await fetch('api/registration', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email, password: pssw })
                        });

                        if(response.ok) {
                            //redirect user to login page
                            /*
                            const {token} = await response.json();
                            console.log('token from front end being called. Here is info from back end -- ' + token);
                            */
                            if(Cookies.get('ssid') !== undefined) {

                            }
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
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" {...formik.getFieldProps('firstName')} />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>) : null}
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" {...formik.getFieldProps('lastName')} />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>) : null}
                <label htmlFor="email">Email Address</label>
                <input name="email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>) : null}
                <label htmlFor="password">Password</label>
                <input name="password" {...formik.getFieldProps('password')} />
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                />
                {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                    <div>{formik.errors.passwordConfirm}</div>) : null}
                <button type="submit">Register</button>
            </form>
        )}

        </Formik>
    );
};

const Registration = () =>
    <div className="registration-body">
        <ImageHeader />
        <div className="registration-content">
            <h2>Register</h2>
            <CustomerRegistration />
        </div>
    </div>;
export default Registration;

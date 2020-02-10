import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LogInForm = () => {
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
                    password: Yup.string()
                        .required('Please enter password')
                })}

                onSubmit={ async (values, {setSubmitting}) => {
                setSubmitting(true)
                
                    //event.preventDefault()
                    const email = values.email
                    const pssw = values.password

                    try {
                        const response = await fetch('api/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email, password: pssw })
                        });

                        if(response.ok) {
                            const {token} = await response.json();
                            console.log('token from front end being called. Here is info from back end -- ' + token);
                        }
                        else {
                            console.log( response + "response not ok");
                        }
                    } catch(error) {
                        console.error('yout code sucks');
                        throw new Error(error);
                    }


            }} 

        >
        {formik => (
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input name="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>) : null}
                <label htmlFor="password">Password</label>
                <input name="password" type="password" autoComplete="off" {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>) : null}
                <button type="submit">Log In</button>
            </form>
        )}

        </Formik>
    );
};

let Login = () =>
    <div className="login-body">
        <ImageHeader />
        <div className="login-form">
        <LogInForm />
        </div>
        <div className="login-register">
            <p>Not registered yet{getCode(63)}</p>
            {/** need on click for the buttons below */}
            <button type="button" name="customerBtn">Register</button>
            <button type="button" name="adminBtn">Administrator Registration</button>
        </div>
    </div>;
export default Login;

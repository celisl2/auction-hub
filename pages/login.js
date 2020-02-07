import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LogInForm = () => {
    return (
        <html>
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
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
        >
        {formik => (
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input name="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>) : null}
                <label htmlFor="password">Password</label>
                <input name="password" type="password" {...formik.getFieldProps('password')} />
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

import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LogInForm = () => {
    return (
        <html>
        <head>
        <script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"></script>
        <Link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css" />
        </head>
        </html>
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

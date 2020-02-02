import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';

let Login = () =>
    <div className="login-body">
        <ImageHeader />
        <div className="login-form">

        </div>
        <div className="login-register">
            <p>Not registered yet{getCode(63)}</p>
            {/** need on click for this */}
            <button type="button" name="customerBtn">Register</button>
            <button type="button" name="adminBtn">Administrator Registration</button>
        </div>
    </div>;
export default Login;
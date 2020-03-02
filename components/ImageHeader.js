import {getCode} from '../utils/helperFunctions';


export default () =>
    <div className="image-header">
        <h1 className="text-center login-page">Auction Hub</h1>
        <div className="login-header-info login-text">
            <p className="text-center login-p">Don{'\''}t miss out{getCode(46)}</p>
            <p className="login-p"> Join the Auction Hub </p>
            <p className="login-p">{getCode(38)} Bid Today{getCode(33)}</p>
        </div>
    </div>;
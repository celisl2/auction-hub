import {getCode} from '../utils/helperFunctions';
import Link from 'next/link';


export default () =>
    <footer className="footer">
        <div className='footer-left'>
            <h6>Auction Hub | All Things Possible</h6>
            <p>Auction Hub is an online bidding system made by Winthrop University students for All Things Possible{getCode(46)}</p>
        </div>
        <div className='footer-right'>
            <p>Useful Links</p>
            <Link href="/index"><a>Home</a></Link>
            <Link href="/register"><a>Register</a></Link>
            <a href="www.allthingspossible.org">All Things Possible</a>
        </div>
    </footer>;
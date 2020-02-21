import Link from 'next/link';
import SignOut from './SignOut';

export default () =>
    <nav>
        <ul>
            <li>
                <Link href="/index">
                    <a>Auction Hub</a>
                </Link>
            </li>
            <li>
                <Link href="/index#currentAction">
                    <a>Current Auction</a>
                </Link>
            </li>
            <li>
                <Link href="/products">
                    <a>Products</a>
                </Link>
            </li>
            <li>
                <SignOut />
            </li>
        </ul>
    </nav>;
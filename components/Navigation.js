import Link from 'next/link';

export default () =>
    <nav>
        <ul>
            <li>
                <Link href="/indexAuth">
                    <a>Home</a>
                </Link>
            </li>
           <li>
                <Link href="/indexAuth#currentAction">
                    <a>Current Auction</a>
                </Link>
            </li>
            <li>
                <Link href="/products">
                    <a>Products</a>
                </Link>
            </li>
            <li>
                <Link href="/Dashboard">
                    <a>Dashboard</a>
                </Link>
            </li>
            <li>
                <Link href="/SignOut">
                    <a>Signout</a>
                </Link>
            </li>
        </ul>
    </nav>;
1

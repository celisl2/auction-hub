import Link from 'next/link';

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
        </ul>
    </nav>;
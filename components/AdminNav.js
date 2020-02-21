import Link from 'next/link';

export default () =>
<nav>
    <ul>
        <li>
            <Link href="/admin_home">
                <a>Home</a>
            </Link>
        </li>
        <li>
            <Link href="/create_auction">
                <a>Create New Auction</a>
            </Link>
        </li>
        <li>
            <Link href="/create_product">
                <a>Create New Product</a>
            </Link>
        </li>
        <li>
            <Link href="/edit_auction">
                <a>Edit Auction Events</a>
            </Link>
        </li>
        <li>
            <Link href="/edit_product">
                <a>Edit Product</a>
            </Link>
        </li>
        <li>
            <Link href="/reports">
                <a>See Reports</a>
            </Link>
        </li>
    </ul>
</nav>;

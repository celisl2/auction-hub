import Link from 'next/link';

const AdminHome = () =>
    <div className="admin-home-body">
        <div className="create-new">
            <Link href="/create_auction">
                <a>Create New Auction</a>
            </Link>
            <Link href="/create_product">
                <a>Create New Product</a>
            </Link>
        </div>
        <div className="edit-item">
            <Link href="/edit-auction">
                <a>Edit Auction Events</a>
            </Link>
            <Link href="/edit-product">
                <a>Edit Product</a>
            </Link>
        </div>
        <div className="report-link">
            <Link href="/reports">
                <a>See Reports</a>
            </Link>
        </div>
    </div>;

export default AdminHome;
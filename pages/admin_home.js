import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import AdminNav from '../components/AdminNav';

const AdminHome = () =>
    <div className="admin-home-body">
        <AdminNav />
        <Container>
        <h2>Administrator Home</h2>
            <CardDeck className="card-format">
            <Link href="/create_auction">
                <Card bg="dark" text="white" className="next-link">
                    <Card.Header>Create</Card.Header>
                    <Card.Body>
                        <Card.Title>Create New Auction</Card.Title>
                        <Card.Text>This allows you to create a new auction event. The creation of this event will not send emails to your users but it will create the event in the Auction Hub.</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
            <Link href="/create_product">
                <Card bg="dark" text="white" className="next-link">
                    <Card.Header>Create</Card.Header>
                    <Card.Body>
                        <Card.Title>Create New Product</Card.Title>
                        <Card.Text>This allows you to create a new product for the auction event. The creation of this product will not send emails to your users but it will create the product in the Auction Hub.</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
            </CardDeck>
            <CardDeck className="card-format">
                <Link href="/edit_auction">
                    <Card bg="dark" text="white" className="next-link">
                        <Card.Header>Edit</Card.Header>
                        <Card.Body>
                            <Card.Title>Edit Auction</Card.Title>
                            <Card.Text>This allows you to edit an auction event. Users will not be notified of this change automatically.</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link href="/edit_product">
                    <Card bg="dark" text="white" className="next-link">
                        <Card.Header>Edit</Card.Header>
                        <Card.Body>
                            <Card.Title>Edit Product</Card.Title>
                            <Card.Text>This allows you to edit products listed for the active auction event. Users will not be notified of this change automatically.</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </CardDeck>
            <CardDeck className="card-format">
            <Link href="/reports">
                    <Card bg="dark" text="white" className="next-link">
                        <Card.Header>View</Card.Header>
                        <Card.Body>
                            <Card.Title>See Reports</Card.Title>
                            <Card.Text>This allows you to view available reports for an auction event. You will have the option to download this report if needed. Auction Hub will flush out and permanently delete all event information, including products, after a 3 weeks of the creation of the event.</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </CardDeck>
        </Container>
    </div>;

export default AdminHome;
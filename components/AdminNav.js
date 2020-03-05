import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignOut from './SignOut';

export default () =>
<Navbar bg='light' expand='lg'>
        <Navbar.Brand href="/admin_home">Auction Hub | Administrator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='mr-auto'>
                <Nav.Link href="/admin_home">Home</Nav.Link>
                <Nav.Link href="/create_auction">Create New Auction</Nav.Link>
                <Nav.Link href="/create_product">Create New Product</Nav.Link>
                <Nav.Link href="/edit_auction">Edit Auction Events</Nav.Link>
                <Nav.Link href="/edit_product">Edit Product</Nav.Link>
                <Nav.Link href="/reports">See Reports</Nav.Link>
            </Nav>
            <SignOut />
        </Navbar.Collapse>
    </Navbar>;

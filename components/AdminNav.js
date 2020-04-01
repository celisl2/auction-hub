import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignOut from './SignOut';

export default () =>
<Navbar bg='light' expand='lg'>
        <Navbar.Brand className="brand" href="/index">Auction Hub | Administrator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='mr-auto'>
                <Nav.Link className="special-font" href="/index">Home</Nav.Link>
                <Nav.Link className="special-font" href="/create_auction">Create New Auction</Nav.Link>
                <Nav.Link className="special-font" href="/create_product">Create New Product</Nav.Link>
                <Nav.Link className="special-font" href="/edit_auction">Edit Auction Events</Nav.Link>
                <Nav.Link className="special-font" href="/edit_product">Edit Product</Nav.Link>
                <Nav.Link className="special-font" href="/reports">See Reports</Nav.Link>
            </Nav>
            <SignOut />
        </Navbar.Collapse>
    </Navbar>;

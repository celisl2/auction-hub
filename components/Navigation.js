import SignOut from './SignOut';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default () =>
    <Navbar bg='light' expand='lg'>
        <Navbar.Brand href="/index">Auction Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='mr-auto'>
                <Nav.Link href="#currentAuction">Current Auction</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
            </Nav>
            <SignOut />
        </Navbar.Collapse>
    </Navbar>;

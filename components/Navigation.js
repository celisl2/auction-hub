import SignOut from './SignOut';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default () =>
    <Navbar bg='light' expand='lg' sticky="top">
        <Navbar.Brand className="brand" href="/index">Auction Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="purpleNav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='mr-auto'>
                <Nav.Link className="special-font" href="/#currentAuction">Current Auction</Nav.Link>
                <Nav.Link className="special-font" href="#products">Products</Nav.Link>
            </Nav>
            <SignOut />
        </Navbar.Collapse>
    </Navbar>;

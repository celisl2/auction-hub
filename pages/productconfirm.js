/*

File Name: productconfirm.js
Purpose: Displays the confirmation that a product has been sucessfully created.
Document Created By: Team 1

*/

import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import AdminNav from '../components/AdminNav';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

// Renders the page, using a class to display to the user that a product has
// been successfully created and allows them to navigate to other pages.
const AdminHome = () =>
    <div className="admin-home-body">
        <AdminNav />
        <Container>
        <div className="centerAxis">
            <Alert variant="success" className="space">Your product has been sucessfully created</Alert>
            <div className="center-btn">
                <Button className="customer-button" variant="dark"><Link href="/"><a className="makeWhite">Go back to dashboard</a></Link></Button>
            </div>
                <Button className="customer-button makeBlock center-btn" variant="dark"><Link href="/create_product"><a className="makeWhite">Create More Products</a></Link></Button>
        </div>

        </Container>
    </div>;

export default AdminHome;

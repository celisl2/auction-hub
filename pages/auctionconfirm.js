import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import AdminNav from '../components/AdminNav';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


const AdminHome = () =>
    <div className="admin-home-body">
        <AdminNav />
        <Container>
        <div className="centerAxis">
            <Alert variant="success" className="space">Your auction has been sucessfully created</Alert>
            <div className="center-btn">
                <Button className="customer-button" variant="dark"><Link href="/"><a className="makeWhite">Go back to dashboard</a></Link></Button>
            </div>
            
        </div>
            
        </Container>
    </div>;

export default AdminHome;

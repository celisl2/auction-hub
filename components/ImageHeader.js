import {getCode} from '../utils/helperFunctions';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default () =>
    <div className="image-header">
        <Head>
            <title>Auction Hub</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link href="https://fonts.googleapis.com/css?family=Merriweather:400,700|Open+Sans:300,400|Oswald:300,400&display=swap" rel="stylesheet"></link>
        </Head>
        <Container>
            <Row className='justify-content-center'>
                <h1 className='justify-content-center'>Auction Hub</h1>
            </Row>
            <Row>
                <div className="login-header-info justify-content-center">
                    <p>Join the Auction Hub {getCode(38)} Bid Today{getCode(33)}</p>
                </div>
            </Row>
            
        </Container>
        
    </div>;
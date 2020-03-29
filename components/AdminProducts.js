// ProductDisplay.js // <ProductDisplay aucID prodData /> Robert Ashley 22 Mar
// 2020 Given its props from another component, this renders a product card
// showing information on the product as well as the interface to bid on the
// item. PROPS:
// - aucID: string value representing the document under /AuctionEvent/ in the
// Google Cloud Firestore database containing auction data. Useful for
// determining if bids are valid.
// - prodData: object in JSON format that has all information on the product
// displayed: obtained via   a query on Firestore and passed into here.

import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import {PlusCircle} from 'react-feather';
import CurrentBid from './CurrentBid';
import Bid from './Bid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DataContext from '../lib/bidDataContext';
import EditProductForm from './EditProductForm';
import {getCode} from '../utils/helperFunctions';



const EditProductModal = (props) => {
    //when you call the dynamic created pages change this useState below to true
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //console.log(props)
    return (
        <div>
            <Button onClick={handleShow}>Edit</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit -product name here-</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProductForm data={props}/>
                </Modal.Body>
            </Modal>
        </div>

    );
};

export default(props) => {
    const [show,
        setShow] = useState(false);
    const [bidData, setBidData] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let aucID = props.props['auctionEventID'];
    let prodData = props.props['productData'];

    useEffect(() => {
        if(props)
            setBidData(props)
    })

    if (aucID && aucID !== "" && prodData && prodData !== {}) {
        //console.log(JSON.stringify(prodData, null, 4));

        return (
            <div className="productCell">
                <Row>
                    <Col xs={12} md={6}>
                        <h4 className="productHead">{prodData.productName}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <img
                            className="productImg"
                            src={(prodData.productImageURL)}
                            alt="product image"/>
                    </Col>
                    <Col xs={12} md={6}>
                        <h5>Description{':'}</h5>
                        <p className="responsive">{prodData.productDescription}</p>
                        <h5>Min Bid{':'}</h5>
                        <p>{prodData.minBid}</p>
                        <h5>Max Bid{':'}</h5>
                        <p>{prodData.maxBid}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EditProductModal data={prodData} auction={aucID}/>
                    </Col>
                </Row>
            </div>
        );
    } else {
        // Product is loading or something went wrong...
        return (
            <div>Product Loading...</div>
        );
    }

};

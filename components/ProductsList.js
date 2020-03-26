// ProductsList.js // <ProductsList auctionID />
// Robert Ashley
// 22 Mar 2020
// Used to collectively load and render the data for all products available at a given auction event.

import React, { useState, useEffect } from 'react';
import {loadDB} from './../lib/db';
import HomeProducts from './HomeProducts';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {splitRows} from '../utils/helperFunctions';

let db = loadDB();

const ProductsList = (props) => {
    //console.log(JSON.stringify(props));
    let auctionID = props.props;
    const [productsList, setProductsList] = useState([]);

    useEffect( () => {
        console.log("Attempting to display auction products for auction event id " + auctionID);
        const unsubscribe = db
            .firestore()
            .collection('AuctionEvent').doc(auctionID).collection('AuctionProduct')
            .onSnapshot( (snapshot) => {
                //console.log(snapshot.docs)
                if (snapshot.size) {
                    let arrProductData = snapshot.docs.map((product) => ({
                        id: product.id,
                        ...product.data()
                    }));
                    setProductsList(arrProductData);
                }
                else {
                    // No products found
                }
            }, (err) => {
                console.error("Error in obtaining product list data for auction event id " + auctionID + ": " + err);
            });
            return () => { unsubscribe() };
    }, [db] );

    const getRows = () => {
        return splitRows(productsList)
    };
    
    if (!auctionID || auctionID === "") {
        console.log("Auction ID not provided to obtain products list");
        return null;
    }
    if (productsList && productsList !== []) {
        // We have data to display 
        return (
            <div className="space">
               <Container fluid>
                {
                    getRows().map((cols) => (
                        
                        <Row className="fixMargin">
                            {cols.map((product) => (
                                <Col>
                                    <HomeProducts props={{auctionEventID: auctionID, productData: product}} />
                                </Col>
                            ))}
                        </Row>
                        
                    ))
                }
                </Container>
            </div>
        );
    }
    else {
        // Loading / Couldn't obtain
        return (<div><b>Loading Product Data...</b></div>);
    }
}

export default ProductsList;
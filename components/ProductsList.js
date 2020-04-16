/* /////////////////////////////////////////////////////////
//
// File Name: Navigation.js
// Original Creator: Robert Ashley
// Purpose: Control the navigation bar for admins and users.
// 22 Mar 2020
//
///////////////////////////////////////////////////////// */

import React, { useState, useEffect } from 'react';
import {loadDB} from './../lib/db';
import HomeProducts from './HomeProducts';
import Container from 'react-bootstrap/Container';
import AdminProducts from './AdminProducts';

let db = loadDB();

//Displaying the product list.
const ProductsList = (props) => {
    console.log(JSON.stringify(props.time));
    let auctionID = props.props;
    const [productsList, setProductsList] = useState([]);

//Pull database data
    useEffect( () => {
        console.log("Attempting to display auction products for auction event id " + auctionID);
        const unsubscribe = db
            .firestore()
            .collection('AuctionEvent').doc(auctionID).collection('AuctionProduct')
            .onSnapshot( (snapshot) => {
                //console.log(snapshot.docs)
                ///If an auction is active
                if (snapshot.size) {
                    let arrProductData = snapshot.docs.map((product) => ({
                        id: product.id,
                        ...product.data()
                    }));
                    setProductsList(arrProductData);
                }
                //If no products exist
                else {
                    // No products found
                }

                //If an unspecified error has occurred.
            }, (err) => {
                console.error("Error in obtaining product list data for auction event id " + auctionID + ": " + err);
            });
            return () => { unsubscribe() };
    }, [db] );

//If the auction is not active or an ID does not exist.
    if (!auctionID || auctionID === "") {
        console.log("Auction ID not provided to obtain products list");
        return null;
    }
    if (productsList && productsList !== []) {
        // We have data to display
        let count = 0;
        //Render components

        return (
            <div className="space">
                <Container fluid>
                {productsList.map((product, i) => (
                        props.user == 'admin' ? <AdminProducts props={{auctionEventID: auctionID, productData: product}} key={i}/>:
                        <HomeProducts props={{auctionEventID: auctionID, productData: product}} key={i}/>
                ))}
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

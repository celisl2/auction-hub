import Navigation from './Navigation';
import CurrentAuction from './CurrentAuction';
import ProductsList from './ProductsList';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import {getCode} from '../utils/helperFunctions';
import {loadDB} from './../lib/db';
import React, { useState, useEffect } from 'react';

let db = loadDB();

const HomeAuth = () => {
    const [auctionID, setAuctionId] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        const unsubscribe = db
            .firestore()
            .collection('AuctionEvent')
            .where('isActive', '==', true)
            .onSnapshot( (snapshot) => {
                if (snapshot && snapshot.size > 0)
                {
                    setAuctionId(snapshot.docs[0].id);
                }

                setIsLoaded(true);
                
            });
            return () => { unsubscribe() };
    }, [db] ); 


    let productsDisplay = (<div><h3>Loading Products...</h3>{console.log("Auction not loaded yet")}</div>);
    if (isLoaded) {
        if (auctionID) {
            productsDisplay = (<div><ProductsList props={auctionID}/>{console.log("loaded, auctionID provided")}</div>);
        }
        else {
            productsDisplay = (<div><h3>No Products Available</h3><p>There are currently no events configured to be active.</p>{console.log("loaded, no valid auctionID")}</div>)
        }
    }

    return (
        <div className="home-body">
            <Navigation />
            <h3 className="flag-title" id="currentAuction">Current Auction</h3>
            <Container>
            <CurrentAuction />
            </Container>
            <h3 className="flag-title" id="products">Auction Products</h3>

                {/* {auctionID ? <ProductsList props={auctionID}/> : <p>loading</p>} */}
                { /*
                    isLoaded
                        ? ( auctionID 
                            ? <div><ProductsList props={auctionID}/>{console.log("loaded, auctionID provided")}</div>
                            : <div><h3>There are no products to display</h3><p>There are currently no events configured to be active.</p>{console.log("loaded, no valid auctionID")}</div>
                        )
                        : <div><h3>Loading Auction Event...</h3>{console.log("Auction not loaded yet")}</div>
                */ }

                {productsDisplay}

            <Footer />
            <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
        </div>
    )
};


export default HomeAuth;
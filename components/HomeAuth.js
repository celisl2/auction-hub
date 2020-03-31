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

    useEffect( () => {
        const unsubscribe = db
            .firestore()
            .collection('AuctionEvent')
            .where('isActive', '==', true)
            .onSnapshot( (snapshot) => {
                //console.log(snapshot)
                setAuctionId(snapshot.docs[0].id);
            });
            return () => { unsubscribe() };
    }, [db] ); 

    return (
        <div className="home-body">
            <Navigation />
            <h3 className="flag-title">Current Auction</h3>
            <Container>
            <CurrentAuction />
            </Container>
            <h3 className="flag-title">Auction Products</h3>

                {auctionID ? <ProductsList props={auctionID}/> : <p>loading</p>}

            <Footer />
            <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
        </div>
    )
};


export default HomeAuth;
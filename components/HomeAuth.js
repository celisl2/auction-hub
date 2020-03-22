import Navigation from './Navigation';
import CurrentAuction from './CurrentAuction';
import HomeProducts from './HomeProducts';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import {getCode} from '../utils/helperFunctions';
import React, { useState, useEffect } from 'react';

const HomeAuth = () => {
    //const [auctionId, setAuctionId] = useEffect(null);

    /*
    useEffect(() => {

    });
    */

    return (
        <div className="home-body">
            <Navigation />
            <h3 className="flag-title">Current Auction</h3>
            <Container>
                <CurrentAuction/>
            </Container>
            <h3 className="flag-title">Auction Products</h3>
            <Container>
                <HomeProducts/>
            </Container>
            <Footer />
            <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
        </div>
    )
};


export default HomeAuth;
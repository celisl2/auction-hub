/* /////////////////////////////////////////////////////////
//
//    Filename:   getAuctionProducts.js
//    Programmer: Robert Ashley
//    Created:    17 Feb 2020
//    Updated:    4 April 2020
//
///////////////////////////////////////////////////////// */

import loadDB from '../../lib/db';
import React, { useState, useEffect } from 'react';

//Get the auction products using states
function useAuctionProducts() {
    const [auctionProducts, setAuctionProducts] = useState([])

    console.log("Start of useAuctionProduct.");

    useEffect( () => {

        loadDB()
            .firestore()
            .collection('AuctionEvent/vOwsw3o6VFijgeOEDKXM/AuctionProduct')
            .onSnapshot( (snapshot) => {
                const newAuctionProducts = snapshot.docs.map((prod) => ({
                    id: prod.id,
                    ...prod.data()
                }));

                setAuctionProducts(newAuctionProducts);
            })

        return;
    }, [])

    return auctionProducts;
}

//Displays the list of products from the active auction database.
const auctionProductList = () => {
    const prods = useAuctionProducts()

    return (
       <div>
            <h1>Products</h1>
            <ul>
                {prods.map( (prod) =>
                    <li key={prod.id}>
                        <h3>{prod.name}</h3>
                        <img data-src={prod.image} alt="ImageGoesHere" />
                        <br/> ImageURL: {prod.image}
                        <br/><b>Description:</b> {prod.description}
                        <br/><b>MinBid:</b> ${prod.bid} <br/><b>Buyout</b>: ${prod.buyoutPrice}
                        <br/>BIDS ---
                        <br/><br/>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default auctionProductList

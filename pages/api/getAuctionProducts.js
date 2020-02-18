// /////////////////////////////////////////////////////////
//    
//    Filename:   getAuctionProducts.js
//    Programmer: Robert Ashley
//    Created:    17 Feb 2020
//    Updated:    
//
// /////////////////////////////////////////////////////////

import loadDB from '../../lib/db';
import React, { useState, useEffect } from 'react';
//import Img from 'react-image';

//import { firestore } from 'firebase';

function useAuctionProducts() {
    const [auctionProducts, setAuctionProducts] = useState([])

    useEffect( () => {
        //const unsubscribe = fb;
        //fb
        loadDB()
            .firestore()
            .collection('AuctionEvent/vOwsw3o6VFijgeOEDKXM/AuctionProduct')
            .onSnapshot( (snapshot) => {
                //debugger;
                const newAuctionProducts = snapshot.docs.map((prod) => ({
                    id: prod.id,
                    ...prod.data()
                }));

                setAuctionProducts(newAuctionProducts);
            })

        //return () => unsubscribe();
        return;
    }, [])

    return auctionProducts;
}


const auctionProductList = () => {
    const prods = useAuctionProducts()

    //console.log(JSON.stringify(prods));
    console.log(prods);

    return (
        /*
        <div>
            <h1>Products</h1>
            <ul>
                {prods.map( (prod) => 
                <li key={prod.id}>
                    {prod.name}   {prod.description}
                </li>
                )}
            </ul>
        </div>
        */
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
                        {console.log(prod.image)}
                        <br/>BIDS ---
                        <br/><br/>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default auctionProductList

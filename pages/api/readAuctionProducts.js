// /////////////////////////////////////////////////////////
//    
//    Filename:   getAuctionProducts.js
//    Programmer: Robert Ashley
//    Created:    17 Feb 2020
//    Purpose:    Provide options to query the Firestore NoSQL database for data on auction products.
//    Updated:    6 March 2020 - Robert Ashley :: Combined both onSnapshot (listener) and get (single time) options.
//
// /////////////////////////////////////////////////////////




// ================================================================================================
//  getAllAuctionProducts
//      These functions pull all auction product data for a given auction event in one query.
//
// ================================================================================================


import {loadDB} from '../../lib/db';
import { useState, useEffect } from 'react';

//function useAuctionProductsOnSnapshot(AuctionEventId) {
export function getAllAuctionProductsOnSnapshot(auctionEventId) {
    const [auctionProducts, setAuctionProducts] = useState([])

    useEffect( () => {
        
        loadDB()
            .firestore()
            .collection('AuctionEvent/' + AuctionEventId + '/AuctionProduct')
            .onSnapshot( (snapshot) => {
                const newAuctionProducts = snapshot.docs.map((prod) => ({
                    id: prod.id,
                    ...prod.data()
                }));

                setAuctionProducts(newAuctionProducts);
            }, (err) => {
                console.error("Error in getAllAuctionProductsOnSnapshot: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionProducts;
}


/*
export function getAuctionProductsOnSnapshot (AuctionEventId) {
    const productsObject = useAuctionProductsOnSnapshot(AuctionEventId);

    return productsObject;
}
*/


// =========== Single Read Version ===========
//function useAuctionProducts(AuctionEventId) {
export function getAllAuctionProducts(auctionEventId) {
    const [auctionProducts, setAuctionProducts] = useState([])

    useEffect( () => {
        
        loadDB()
            .firestore()
            .collection('AuctionEvent/' + auctionEventId + '/AuctionProduct')
            .get()
            .then( (snapshot) => {
                const newAuctionProducts = snapshot.docs.map((prod) => ({
                    id: prod.id,
                    ...prod.data()
                }));

                setAuctionProducts(newAuctionProducts);
            })
            .catch ( (err) => {
                console.error("Error in getAllAuctionProducts: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionProducts;
}

/*
export function getAuctionProducts (AuctionEventId) {
    const productsObject = useAuctionProducts(AuctionEventId);

    return productsObject;
}
*/


// ================================================================================================
//  getAuctionProduct
//      These functions pull a product's data for a given auction event and product id.
//
// ================================================================================================

//function useAuctionProductsOnSnapshot(AuctionEventId) {
export function getAuctionProductOnSnapshot(auctionEventId, productId) {
    const [auctionProduct, setAuctionProduct] = useState([])

    useEffect( () => {
        
        loadDB()
            .firestore()
            .doc('AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId)
            .onSnapshot( (snapshot) => {
                const newAuctionProducts = {
                    id: snapshot.id,
                    ...snapshot.data()
                };

                setAuctionProduct(newAuctionProducts);
            }, (err) => {
                console.error("Error in getAuctionProductOnSnapshot: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionProduct;
}


/*
export function getAuctionProductsOnSnapshot (AuctionEventId) {
    const productsObject = useAuctionProductsOnSnapshot(AuctionEventId);

    return productsObject;
}
*/


// =========== Single Read Version ===========
//function useAuctionProducts(AuctionEventId) {
export function getAuctionProduct(auctionEventId, productId) {
    const [auctionProduct, setAuctionProduct] = useState([])

    useEffect( () => {
        
        loadDB()
            .firestore()
            .doc('AuctionEvent/' + auctionEventId + '/AuctionProduct' + productId)
            .get()
            .then( (snapshot) => {
                const newAuctionProduct = {
                    id: snapshot.id,
                    ...snapshot.data()
                };

                setAuctionProduct(newAuctionProduct);
            })
            .catch ( (err) => {
                console.error("Error in getAuctionProduct: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionProduct;
}
















//export default getAuctionProductsOnSnapshot;
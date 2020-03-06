// /////////////////////////////////////////////////////////
//    
//    Filename:   updateAuctionProduct.js
//    Programmer: Robert Ashley
//    Created:    6 Mar 2020
//    Updated:    
//
// /////////////////////////////////////////////////////////

import {loadDB} from '../../lib/db';
import Cookies from 'js-cookie';

let firebase = loadDB();

export function updateAuctionProduct (auctionEventID, productID, productData) {
    
    // To Do: Add an authentication check to assure user has privelleges to create auction product listings.
    firebase
        .firestore()
        .doc("/AuctionEvent/" + auctionEventID + "/AuctionProduct/" + productID)
        .update(productData)
        .then( (results) => {
            //console.log("DEBUG:: Product creation successful: Product ID " + results.id);
            alert("DEBUG:: Product creation successful: Product ID " + results.id);
            return results;
        })
        .catch( (error) => {
            let errorMessage = "Error in updateAuctionProduct: Product creation unsuccessful\n" + error.code + " : " + error.message
            console.error(errorMessage)
            Cookies.set('errorMessage', errorMessage)
            return error;
        })
}


export default createAuctionProduct;
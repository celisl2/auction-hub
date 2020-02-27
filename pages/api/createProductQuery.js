// /////////////////////////////////////////////////////////
//    
//    Filename:   createProductQuery.js
//    Programmer: Robert Ashley
//    Created:    21 Feb 2020
//    Updated:    
//
// /////////////////////////////////////////////////////////

import {loadDB} from '../../lib/db';

function createAuctionProduct (auctionEventID, productData) {
    
    // To Do: Add an authentication check to assure user has privelleges to create auction product listings.
    loadDB()
        .firestore()
        .collection("/AuctionEvent/" + auctionEventID + "/AuctionProduct")
        .add(productData)
        .then( (results) => {
            //console.log("DEBUG:: Product creation successful: Product ID " + results.id);
            alert("DEBUG:: Product creation successful: Product ID " + results.id);
            return results;
        })
        .catch( (error) => {
            alert("DEBUG:: Product creation unsuccessful\n" + error.code + " : " + error.message);
            return error;
        })
}


export default createAuctionProduct;
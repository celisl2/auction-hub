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

//export function updateAuctionProduct (auctionEventID, productID, productChangedData) {
export default function updateAuctionProduct (req, res) {

    let auctionEventID = req.params['auctionEventID'];
    let productID = req.params['productID'];
    let productChangedData = req.params['productChangedData'];
    
    // To Do: Add an authentication check to assure user has privelleges to create auction product listings.
    firebase
        .firestore()
        .doc("/AuctionEvent/" + auctionEventID + "/AuctionProduct/" + productID)
        .update(productChangedData)
        .then( (results) => {
            //console.log("DEBUG:: Product creation successful: Product ID " + results.id);
            console.log("DEBUG:: Product creation successful: Product ID " + results.id);
            
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({success: true}));
            //return true;
        })
        .catch( (error) => {
            let errorMessage = "Error in updateAuctionProduct: Product creation unsuccessful\n" + error.code + " : " + error.message
            console.error(errorMessage)
            Cookies.set('errorMessage', errorMessage)
            
            res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({success: false}));
            
            //return false;
        })
}


//export default createAuctionProduct;
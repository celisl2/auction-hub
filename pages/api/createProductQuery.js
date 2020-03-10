// /////////////////////////////////////////////////////////
//    
//    Filename:   createProductQuery.js
//    Programmer: Robert Ashley
//    Created:    21 Feb 2020
//    Updated:    
//
// /////////////////////////////////////////////////////////

import {loadDB} from '../../lib/db';
let firebase = loadDB();

export default (auctionEventID, productData) => {
    
    // To Do: Add an authentication check to assure user has privelleges to create auction product listings.
    
    if(firebase.auth().currentUser !== null) {


        try {
            //let minimumBid = Number.parseFloat(req.params.minBid);
            productData.minBid = Number.parseFloat(productData.minBid);
            if (NaN(productData.minBid)) {
                throw "The value provided for minumum bid could not be interpreted as a number.";
            }
            //let maximumBid = Number.parseFloat(req.params.maxBid);
            productData.maxBid = Number.parseFloat(productData.maxBid);
            if (NaN(productData.maxBid)) {
                throw "The value provided for maximum bid could bot be interpreted as a number."
            }

            firebase
            .firestore()
            .collection("/AuctionEvent/" + auctionEventID + "/AuctionProduct")
            .add(productData)
            .then( (results) => {
                //console.log("DEBUG:: Product creation successful: Product ID " + results.id);
                console.log("Product creation successful: Product ID " + results.id);
                return true;
            })
            .catch( (error) => {
                console.error("Product creation unsuccessful\n" + error.code + " : " + error.message);
                return false;
            })

        }
        catch (err) {
            console.error("createProductnQuery.js: Error: ", err)
            return false;
        }

    }
    else {
        console.error("You are not authorized to view this page!");
        // Return to front end for login
    }
    
}
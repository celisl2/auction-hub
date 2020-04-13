/* /////////////////////////////////////////////////////////
//
//    Filename:   createProductQuery.js
//    Programmer: Robert Ashley
//    Created:    21 Feb 2020
//    Updated:
//
///////////////////////////////////////////////////////// */

import {loadDB} from '../../lib/db';
let firebase = loadDB();

export default (auctionEventID, productData) => {
    //export default (req, res) => {

    //let auctionEventID = req.params['auctionEventID'];
    //let productData = req.params['productData'];

    // To Do: Add an authentication check to assure user has privelleges to create auction product listings.
    //alert(firebase.auth().currentUser);

    //If the user is not null
    if(firebase.auth().currentUser !== null) {

      //Attempt a bid and determine if the input is valid
        try {
            productData.minBid = Number.parseFloat(productData.minBid);
            if (isNaN(productData.minBid)) {
                throw "The value provided for minumum bid could not be interpreted as a number.";
            }
            productData.maxBid = Number.parseFloat(productData.maxBid);
            if (isNaN(productData.maxBid)) {
                throw "The value provided for maximum bid could bot be interpreted as a number."
            }

            firebase
            .firestore()
            .collection("/AuctionEvent/" + auctionEventID + "/AuctionProduct")
            .add(productData)
            .then( (results) => {
                return results.id;
            })

            //catch errors
            .catch( (error) => {
                let errorMsg = "Product creation unsuccessful\n" + error;
                console.error(errorMsg);
                /*
                res.setHeader('Content-Type', 'application/json');
                res.status(500).end(JSON.stringify({success: true, error: errorMsg}));
                */
                return false;
            })

        }

        //catch error message errors
        catch (err) {
            let errorMsg = "createProductnQuery.js: Throwing error: " + err;
            console.error(errorMsg);
            /*
            res.setHeader('Content-Type', 'application/json');
            res.status(500).end(JSON.stringify({success: true, error: errorMsg}));
            */
            return false;
        }

    }

    //If a user is not authorized to view the page.
    else {
        let errorMsg = "You are not authorized to view this page!";
        console.error(errorMsg);
        /*
        res.setHeader('Content-Type', 'application/json');
        res.status(500).end(JSON.stringify({success: true, error: errorMsg}));
        */
        return false;
        // Return to front end for login
    }

}

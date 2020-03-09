// /////////////////////////////////////////////////////////
//    
//    Filename:   readSingleAuctionProduct.js
//    Programmer: Robert Ashley
//    Created:    9 March 2020
//    Purpose: Returns the JSON data of a product in a single auction event 
//      indicated by the auctionEventId in request from the Firestore database via 
//      http response
//
// /////////////////////////////////////////////////////////


import {loadDB} from '../../lib/db';

export default (req, res) => {
  
    if(firebase.auth().currentUser !== null) {

        try {
            if (req.method === 'POST') {
                let auctionEventId = req.params.auctionEventId;
                let productId = req.params.productId;
    
                loadDB()
                    .firestore()
                    .doc('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId)
                    .onSnapshot( (snapshot) => {
                        let productData = {
                            id: snapshot.id,
                            ...snapshot.data()
                        }

                        res.setHeader('Content-Type', 'application/json');
                        res.json(productData);
                        res.status(200).end();
                    })
            }
            else {
                console.error("Please request via POST!");
            }

        }
        catch (err) {
            res.status(500).end();
            console.error(e.stack);
        }
        
    }
    else {
        console.error("You are not authorized to view this page!");
        // Return to front end for login
    }

};
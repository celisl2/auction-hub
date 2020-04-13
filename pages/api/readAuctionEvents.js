/* /////////////////////////////////////////////////////////
//
//    Filename:   getAuctionProducts.js
//    Programmer: Robert Ashley
//    Created:    17 Feb 2020
//    Purpose:    Provide options to query the Firestore NoSQL database for data on auction products.
//    Updated:    6 March 2020 - Robert Ashley :: Combined both onSnapshot (listener) and get (single time) options.
//
///////////////////////////////////////////////////////// */
import {loadDB} from '../../lib/db';


let firebase = loadDB();


export default (req, res) => {


    try {
        firebase
        .firestore()
        .collection('/AuctionEvent/')
        .onSnapshot( (snapshot) => {
            const newAuctionEventData = snapshot.docs.map((auctionEvent) => ({
                id: auctionEvent.id,
                ...auctionEvent.data()
            }));

            //setAuctionEvent(newAuctionEventData); !! this is commented out due to an error
            res.setHeader('Content-Type', 'application/json');
            res.json(newAuctionEventData);
            res.status(200).end();

        }, (err) => {
            console.error("Error in useAllAuctionEventsOnSnapshot: " + err.code + " => " + err.message);
        })



    } catch (e) {
        res.status(500).end();
        console.error(e.stack);
    }
};

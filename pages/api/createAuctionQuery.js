// /////////////////////////////////////////////////////////
//    
//    Filename:   createAuctionQuery.js
//    Programmer: Robert Ashley
//    Created:    24 Feb 2020
//    Updated:    9 Mar 2020 Robert Ashley: convert to use react router POST request and response.
//
// /////////////////////////////////////////////////////////



import {loadDB} from '../../lib/db';

//export default (req, res) => {
export default (auctionEventData) => {

    if(firebase.auth().currentUser !== null) {

        //let eventName = req.params.title;
        
        
        try {
            //CONVERT DATE & TIME INTO TIMESTAMP
            auctionEventData.timestampStart = Date.parse(auctionEventData.timestampStart);
            if (isNaN(auctionEventData.timestampStart)) {
                throw "starting date and time fields could not be interpreted!"
            }

            auctionEventData.timestampEnd = Date.parse(auctionEventData.timestampEnd);
            if (isNaN(auctionEventData.timestampEnd)) {
                throw "ending date and time fields could not be interpreted!"
            }
    
            loadDB()
            .firestore()
            .collection("/AuctionEvent")
            .add(auctionEventData)
            .then( (results) => {
                console.log("Auction event creation successful: Auction ID " + results.id)
                return true;
            })
            .catch( (error) => {
                console.error("Auction event creation unsuccessful\nError: " + error.code + " : " + error.message);
                return false;
            })

        } 
        catch (err) {
            console.error("createAuctionQuery.js: Error: ", err)
            return false;
        }
 
    }
    else {
        console.error("You are not authorized to view this page!");
        // Return to front end for login
    }
}
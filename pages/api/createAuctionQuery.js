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
export default (auctionEventData)

    if(firebase.auth().currentUser !== null) {

        //let eventName = req.params.title;
        
        //CONVERT DATE & TIME INTO TIMESTAMP
        try {
            //let timestampStart = Date.parse(req.params.dateStart + " " + req.params.timeStart);
            auctionEventData.timestampStart = Date.parse(auctionEventData.timestampStart);
            if (isNaN(auctionEventData.timestampStart)) {
                throw "starting date and time fields could not be interpreted!"
            }

            //let timestampEnd = Date.parse(req.params.dateEnd + " " + req.params.timeEnd);
            auctionEventData.timestampEnd = Date.parse(auctionEventData.timestampEnd);
            if (isNaN(auctionEventData.timestampEnd)) {
                throw "ending date and time fields could not be interpreted!"
            }

            /*
            let eventData = {
                title: req.params.title,
                timeStart: timestampStart,
                timeEnd: timestampEnd,
                description: req.params.description,
                imageURL: req.params.imageURL,
                location: req.params.location,
                paymentLimitTime: req.params.paymentLimitTime,
                pickupInformation: req.params.pickupInformation
            }
            */
    
            //EventData = {};


    
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
        let startTime = Date.parse(req.params.timeStart + " " + req.params.dateStart)


        
    }
    else {
        console.error("You are not authorized to view this page!");
        // Return to front end for login
    }
}


export default createAuctionEvent;
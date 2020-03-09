// /////////////////////////////////////////////////////////
//    
//    Filename:   readSingleAuctionEvent.js
//    Programmer: Robert Ashley
//    Created:    9 March 2020
//    Purpose: Returns the JSON data of a single auction event from the Firestore database via http response
//
// /////////////////////////////////////////////////////////


import {loadDB} from '../../lib/db';

export default (req, res) => {
  
    if(firebase.auth().currentUser !== null) {

        try {
            if (req.method === 'POST') {
                let auctionEventId = req.params.auctionEventId;
    
                loadDB()
                    .firestore()
                    .doc('/AuctionEvent/' + auctionEventId)
                    .onSnapshot( (snapshot) => {
                        let auctionData = {
                            id: snapshot.id,
                            ...snapshot.data()
                        }

                    if (auctionData.hasOwnProperty("timeStart")) {
                        auctionData.timeStart = auctionData.timeStart.toDate();
                    }
    
                    if (auctionData.hasOwnProperty("timeEnd")) {
                        auctionData.timeEnd = auctionData.timeEnd.toDate();
                    }


                    res.setHeader('Content-Type', 'application/json');
                    res.json(auctionData);
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
        
        //read db data
        //* let userId = firebase.auth().currentUser.uid;
        //* https://firebase.google.com/docs/database/web/read-and-write
    }
    else {
        console.error("You are not authorized to view this page!");
        // Return to front end for login
    }

};
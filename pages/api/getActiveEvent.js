// getActiveEvent
// Robert Ashley
// Mar 22, 2020
// Updates:
//    - Mar 23, 2020 (Robert Ashley) : Revised strategy for tracking active event by posting
//                                     the data to a seperate document.
// Searches AuctionEvent database collection for auction event set as 'active'

import {loadDB} from '../../lib/db';

let db = loadDB();
export default function getActiveEvent (param) {
    db
    .firestore().collection("GlobalSettings")
    .doc('Settings')
    .get()
    .then((auctionSettings) => {
        if (auctionSettings.exists) {
            if (!auctionSettings.data().activeAuctionEventID || auctionSettings.data().activeAuctionEventID === "") {
                console.error("Auction Hub settings has no active event configured.");
                return false;
            }
            else {
                const dt = auctionSettings.data().activeAuctionEventID;
                console.log("getActiveEvent: active event id is: " + dt);
                return dt;
            }
        }
        else {
            console.error("The Auction Hub configuration settings document cannot be found.");
            return false;
        }
    })
    .catch( (getError) => {
        console.error("Error getting active event: " + getError)
        return false;
    })
}
/**
 * Laura Celis
 * March 24th, 2020
 * These functions manipulate auction events and sets/unsets them as active
 */

import {loadDB} from './db';

const db = loadDB();

//set event as inactive (isActive property will be set to false)
// @param - document path of auction event
// @return - boolean that indicates if event was successfuly deactivated
function deActivateEvent(eventID) {
    let eventRef = db.firestore().collection("AuctionEvent").doc(eventID);
    eventRef.update({
        isActive: false,
    }).then(() => {
        console.log('event deactivated');
        return true;
    })
    .catch((error) => {
        console.error('Error updating document: ' + error);
        return false;
    });
};

//set event as active (isActive property will be set to true)
// @param - document path of auction event
// @return - boolean that indicates if event was successfuly activated
function activateEvent(eventID) {
    let eventRef = db.firestore().collection("AuctionEvent").doc(eventID);
    eventRef.update({
        isActive: true,
    }).then(() => {
        console.log('event activated');
        return true;
    })
    .catch((error) => {
        console.error('Error updating document: ' + error);
        return false;
    });
};

export {deActivateEvent, activateEvent};
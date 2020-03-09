// /////////////////////////////////////////////////////////
//    
//    Filename:   getAuctionProducts.js
//    Programmer: Robert Ashley
//    Created:    17 Feb 2020
//    Purpose:    Provide options to query the Firestore NoSQL database for data on auction products.
//    Updated:    6 March 2020 - Robert Ashley :: Combined both onSnapshot (listener) and get (single time) options.
//
// /////////////////////////////////////////////////////////



import {loadDB} from '../../lib/db';
    let firebase = loadDB();
import { useState, useEffect } from 'react';


// ================================================================================================
//  useAuctionEvent
//      These functions pull a single auction event's data, given
//      the parameter given.
// ================================================================================================
// ===== Listener / .onSnapshot() Version =====
// ================================================================================================

//function useAuctionEventOnSnapshot(auctionEventId) {
export function getAuctionEventOnSnapshot(auctionEventId) {
    const [auctionEvent, setAuctionEvent] = useState([])

    useEffect( () => {
        
        firebase
            .firestore()
            .doc('/AuctionEvent/' + auctionEventId)
            .onSnapshot( (snapshot) => {

                let newAuctionEventData = {
                    id: snapshot.id,
                    ...snapshot.data()
                };

                // MARCH 9 EDITS
                if (newAuctionEventData.hasOwnProperty("timeStart")) {
                    newAuctionEventData.timeStart = newAuctionEventData.timeStart.toDate();
                }

                if (newAuctionEventData.hasOwnProperty("timeEnd")) {
                    newAuctionEventData.timeEnd = newAuctionEventData.timeEnd.toDate();
                }

                setAuctionEvent(newAuctionEventData);
            }, (err) => {
                console.error("Error in useAuctionEventOnSnapshot: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionEvent;
}

/*
export function getAuctionEventOnSnapshot (AuctionEventId) {
    const auctionEventObject = 
    useAuctionEventOnSnapshot(AuctionEventId);

    return auctionEventObject;
}
*/


// =========== One Time / .get() Version ===========
// ================================================================================================

//function useAuctionEvent(AuctionEventId) {
export function getAuctionEvent(AuctionEventId) {
    const [auctionEvent, setAuctionEvent] = useState([])

    useEffect( () => {
        
        firebase
            .firestore()
            .doc('/AuctionEvent/' + AuctionEventId)
            .get()
            .then( (snapshot) => {
                
                let newAuctionEventData = {
                    id: snapshot.id,
                    ...snapshot.data()
                };

                // MARCH 9 EDITS
                if (newAuctionEventData.hasOwnProperty("timeStart")) {
                    newAuctionEventData.timeStart = newAuctionEventData.timeStart.toDate();
                }

                if (newAuctionEventData.hasOwnProperty("timeEnd")) {
                    newAuctionEventData.timeEnd = newAuctionEventData.timeEnd.toDate();
                }

                console.log ( "getAuctionEvent:", JSON.stringify(newAuctionEventData, null, 4));

                setAuctionEvent(newAuctionEventData);
            })
            .catch ( (err) => {
                console.error("Error in useAuctionEvent: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionEvent;
}

/*
export function getAuctionEvent (AuctionEventId) {
    const auctionEventObject = useAuctionEvent(AuctionEventId);

    return auctionEventObject;
}
*/



// ================================================================================================
//  useAllAuctionEvents
//      These functions pull all auction event data in one query.
//
// ================================================================================================


//function useAllAuctionEventsOnSnapshot() {
export function getAllAuctionEventsOnSnapshot() {
    const [auctionEvent, setAuctionEvent] = useState([])

    useEffect( () => {
        
        firebase
            .firestore()
            .collection('/AuctionEvent/')
            .onSnapshot( (snapshot) => {
                let newAuctionEventData = snapshot.docs.map((auctionEvent) => ({
                    id: auctionEvent.id,
                    ...auctionEvent.data()
                }));

                newAuctionEventData.forEach( (auction) => {
                    // MARCH 9 EDITS
                    if (newAuctionEventData.hasOwnProperty("timeStart")) {
                        newAuctionEventData.timeStart = newAuctionEventData.timeStart.toDate();
                    }

                    if (newAuctionEventData.hasOwnProperty("timeEnd")) {
                        newAuctionEventData.timeEnd = newAuctionEventData.timeEnd.toDate();
                    }
                })

                setAuctionEvent(newAuctionEventData);
            }, (err) => {
                console.error("Error in useAllAuctionEventsOnSnapshot: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionEvent;
}

/*
export function getAllAuctionEventsOnSnapshot () {
    const auctionEventObject = 
    useAllAuctionEventsOnSnapshot();

    return auctionEventObject;
}
*/

// =========== One Time / .get() Version ===========
// ================================================================================================

//function useAllAuctionEvents() {
export function getAllAuctionEvents() {
    const [auctionEvent, setAuctionEvent] = useState([])

    useEffect( () => {
        
        firebase
            .firestore()
            .collection('/AuctionEvent/')
            .get()
            .then( (snapshot) => {
                let newAuctionEventData = snapshot.docs.map((auctionEvent) => ({
                    id: auctionEvent.id,
                    ...auctionEvent.data()
                }));

                newAuctionEventData.forEach( (auction) => {
                    // MARCH 9 EDITS
                    if (newAuctionEventData.hasOwnProperty("timeStart")) {
                        newAuctionEventData.timeStart = newAuctionEventData.timeStart.toDate();
                    }

                    if (newAuctionEventData.hasOwnProperty("timeEnd")) {
                        newAuctionEventData.timeEnd = newAuctionEventData.timeEnd.toDate();
                    }
                })

                setAuctionEvent(newAuctionEventData);
            })
            .catch ( (err) => {
                console.error("Error in useAllAuctionEvents: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionEvent;
}

/*
export function getAllAuctionEvents () {
    const auctionEventObject = useAllAuctionEvents();

    return auctionEventObject;
}
*/

export default getAllAuctionEventsOnSnapshot;
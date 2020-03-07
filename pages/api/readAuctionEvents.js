// /////////////////////////////////////////////////////////
//    
//    Filename:   getAuctionProducts.js
//    Programmer: Robert Ashley
//    Created:    17 Feb 2020
//    Purpose:    Provide options to query the Firestore NoSQL database for data on auction products.
//    Updated:    6 March 2020 - Robert Ashley :: Combined both onSnapshot (listener) and get (single time) options.
//
// /////////////////////////////////////////////////////////



import loadDB from '../../lib/db';
import { useState, useEffect } from 'react';


// ================================================================================================
//  useAuctionEvent
//      These functions pull a single auction event's data, given
//      the parameter given.
// ================================================================================================
// ===== Listener / .onSnapshot() Version =====
// ================================================================================================

function useAuctionEventOnSnapshot(AuctionEventId) {
    const [auctionEvent, setAuctionEvent] = useState([])

    useEffect( () => {
        
        loadDB()
            .firestore()
            .collection('AuctionEvent/' + AuctionEventId)
            .onSnapshot( (snapshot) => {

                const newAuctionEventData = {
                    id: snapshot.id,
                    ...snapshot.data()
                };

                setAuctionEvent(newAuctionEventData);
            }, (err) => {
                console.error("Error in useAuctionEventOnSnapshot: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionEvent;
}


export function getAuctionEventOnSnapshot (AuctionEventId) {
    const auctionEventObject = 
    useAuctionEventOnSnapshot(AuctionEventId);

    return auctionEventObject;
}

// =========== One Time / .get() Version ===========
// ================================================================================================

function useAuctionEvent(AuctionEventId) {
    const [auctionEvent, setAuctionEvent] = useState([])

    useEffect( () => {
        
        loadDB()
            .firestore()
            .collection('AuctionEvent/' + AuctionEventId + '/AuctionProduct')
            .get()
            .then( (snapshot) => {
                const newAuctionEventData = {
                    id: snapshot.id,
                    ...snapshot.data()
                };

                setAuctionEvent(newAuctionEventData);
            })
            .catch ( (err) => {
                console.error("Error in useAuctionEvent: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionEvent;
}

export function getAuctionEvent (AuctionEventId) {
    const auctionEventObject = useAuctionEvent(AuctionEventId);

    return auctionEventObject;
}




// ================================================================================================
//  useAllAuctionEvents
//      These functions pull all auction event data in one query.
//
// ================================================================================================


function useAllAuctionEventsOnSnapshot() {
    const [auctionEvent, setAuctionEvent] = useState([])

    useEffect( () => {
        
        loadDB()
            .firestore()
            .collection('AuctionEvent/')
            .onSnapshot( (snapshot) => {
                const newAuctionEventData = snapshot.docs.map((auctionEvent) => ({
                    id: auctionEvent.id,
                    ...auctionEvent.data()
                }));

                setAuctionEvent(newAuctionEventData);
            }, (err) => {
                console.error("Error in useAllAuctionEventsOnSnapshot: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionEvent;
}


export function getAllAuctionEventsOnSnapshot () {
    const auctionEventObject = 
    useAllAuctionEventsOnSnapshot();

    return auctionEventObject;
}

// =========== One Time / .get() Version ===========
// ================================================================================================

function useAllAuctionEvents() {
    const [auctionEvent, setAuctionEvent] = useState([])

    useEffect( () => {
        
        loadDB()
            .firestore()
            .collection('AuctionEvent/')
            .get()
            .then( (snapshot) => {
                const newAuctionEventData = snapshot.docs.map((auctionEvent) => ({
                    id: auctionEvent.id,
                    ...auctionEvent.data()
                }));

                setAuctionEvent(newAuctionEventData);
            })
            .catch ( (err) => {
                console.error("Error in useAllAuctionEvents: " + err.code + " => " + err.message);
            })

        return;
    }, [])

    return auctionEvent;
}

export function getAllAuctionEvents () {
    const auctionEventObject = useAllAuctionEvents();

    return auctionEventObject;
}



export default getAuctionEventsOnSnapshot;


// ================================================================================================
// ================================================================================================



/*
const auctionProductList = () => {
    const prods = useAuctionProducts()

    return (
       <div>
            <h1>Products</h1>
            <ul>
                {prods.map( (prod) => 
                    <li key={prod.id}>
                        <h3>{prod.name}</h3>
                        <img data-src={prod.image} alt="ImageGoesHere" /> 
                        <br/> ImageURL: {prod.image}
                        <br/><b>Description:</b> {prod.description}
                        <br/><b>MinBid:</b> ${prod.bid} <br/><b>Buyout</b>: ${prod.buyoutPrice}
                        <br/>BIDS ---
                        <br/><br/>
                    </li>
                )}
            </ul>
        </div>
    )
}
*/
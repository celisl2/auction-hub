// This script is intended to verify basic functionality of placing a bid
// This is by no means a conclusive and exhaustive test. I didn't want to
// push broken code. --RTA

import {getAuctionEvent} from '../readAuctionEvents';
import {getAuctionProduct} from '../readAuctionProducts';
import {placeBid} from '../createBidQuery';

//export async function testPlacingBid () {
    export function testPlacingBid () {

    let testBidAmount = 100;

    /*
    if ( placeBid('vOwsw3o6VFijgeOEDKXM', 'y9Hxj24LmWVu4AgcEYF5', testBidAmount) ) {
        return (<div><p>Bid placed successfully</p></div>)
    }
    else {
        return (<div><p>Bid was not placed.</p></div>)
    }
    */

    Promise.all([ placeBid('vOwsw3o6VFijgeOEDKXM', 'y9Hxj24LmWVu4AgcEYF5', testBidAmount) ])
        .then( results => {
            console.log("DEBUG:: Bid placed successfully by user " + firebase.auth().currentUser.uid + ".");
            console.log("DEBUG:: results=" + JSON.stringify(results));

            return (
            <h4>Bid placed successfully!</h4>
            )
        })
        .catch( error => {
            console.error("DEBUG:: Bid not placed successfully. Reason:" + JSON.stringify(error))
            return (
            <div>
                <h4>Bid could not be placed</h4>
                <b>{error.code}</b> : {error.message}
            </div>
            )
        })





    /*
    let eventData = getAuctionEvent('vOwsw3o6VFijgeOEDKXM')

    alert("Auction Event:\n" + JSON.stringify(eventData));

    
    
    let eventStartTime = eventData.timeStart.seconds * 1000 + eventData.timeStart.nanoseconds;
    let eventEndTime = eventData.timeEnd.seconds * 1000 + eventData.timeEnd.nanoseconds;
    let productData = getAuctionProduct('vOwsw3o6VFijgeOEDKXM', 'y9Hxj24LmWVu4AgcEYF5');
    

    
    //let didPlaceBid = placeBid('vOwsw3o6VFijgeOEDKXM', 'y9Hxj24LmWVu4AgcEYF5', 'Ry5z7PynNDfZWUBMyUNNAStznvt1', productData.bid, productData.buyoutPrice, testBidAmount, eventStartTime, eventEndTime);

    let didPlaceBid = placeBid('vOwsw3o6VFijgeOEDKXM', 'y9Hxj24LmWVu4AgcEYF5', 'Ry5z7PynNDfZWUBMyUNNAStznvt1', 40, 300, testBidAmount, new Date(1583240400), new Date(1583841600));
    



    if (didPlaceBid) {
        console.log("Did place bid successfully!");
        return ( <div><b>Bid placed successfully</b></div>);

    } else {
        console.log("Did NOT place bid.");
        return ( <div><b>Bid could not be placed successfully</b></div>);

    }
    */




}

export default testPlacingBid;
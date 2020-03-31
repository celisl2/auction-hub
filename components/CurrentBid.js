import {useState, useContext, useEffect} from 'react';
import {loadDB} from '../lib/db';
let db = loadDB();

/**
 * @param {data: {mindBid, productID, auctionID}} props 
 */
const CurrentBid = (props) => {
    const [highBidData, setHighBidData] = useState(() => {
        db
        .firestore()
        .collection('/AuctionEvent/' + aucID + '/AuctionProduct/' + prodID + '/BidHistory')
        .orderBy('amount', 'desc')
        .limit(1)
        .onSnapshot( (snapshot) => {
            if (snapshot.size) {
                //console.log("DEBUG: Active Event Snapshot Size: " + snapshot.size);
                let highBidDataInitial = snapshot.docs[0].data().amount;
                return highBidDataInitial;
            }
            
            else {
                //console.log("No currrent high bid accquired. The DB may be no bids for this product.\n" + "AuctionEventID: " + aucID + " ,    ProductID: " + prodID);
                return null;
            }
        });
    });

    let aucID = props.data.auctionID;
    let prodID = props.data.productID;
    let minBid = props.data.minBid;
    
    useEffect(() => {
        const unsubscribe = db
        .firestore()
        .collection('/AuctionEvent/' + aucID + '/AuctionProduct/' + prodID + '/BidHistory')
        .orderBy('amount', 'desc')
        .limit(1)
        .onSnapshot( (snapshot) => {
            if (snapshot.size) {
                let highBid = snapshot.docs[0].data().amount;
                //console.log(highBid)
                setHighBidData(highBid);
            }
        });

        return () => { unsubscribe() };
    }, [highBidData]);

    
    return (
        <div>
            {highBidData ? 
                <>
                    <p className="lightBlue">Current Bid</p>
                    <p className="padding">{ "$" + highBidData}</p>
                </> :
                <>
                    <p className="lightBlue">Minimum Price for Starting Bid</p>
                    <p className="padding">{"$" + minBid}</p>
                </> }
        </div>
    )
};
export default CurrentBid;
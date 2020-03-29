import {useState, useContext, useEffect} from 'react';
import HighestBidContext from '../lib/highestBidContext';
import readHighestBid from '../pages/api/readHighestBid';
//let x = readHighestBid(props.data.auctionID, props.data.productID, 0);

// props -> minBid
const CurrentBid = (props) => {
    const [bid, setBid] = useState();
    const [highestBid, setHighestBid] = useState(0);

   
    return (
        <div>
            <p className="lightBlue">{bid ? "Current Bid" : "Starting Bid"}</p>
           
            {readHighestBid(props.data.auctionID, props.data.productID) ? <p className="padding">{'$' + readHighestBid(props.data.auctionID, props.data.productID).amount}</p>  : <p className="padding">{'$' + props.data.minBid}</p>}
            
        </div>
    )
};
export default CurrentBid;
    
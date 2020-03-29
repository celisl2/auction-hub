import {useState, useContext} from 'react';
import HighestBidContext from '../lib/highestBidContext';
import readHighestBid from '../pages/api/readHighestBid';

// props -> minBid
const CurrentBid = (props) => {
    const [bid, setBid] = useState();
    const [highestBid, setHighestBid] = useState(getCurrHighestBid());
    console.log(props)
    function getCurrHighestBid() {
        readHighestBid(props.data.auctionID, props.data.productID, 0)
        .then(data => {
            return { highestBid: data};
        })
    }
    return (
        <div>
            <p className="lightBlue">{bid ? "Current Bid" : "Starting Bid"}</p>
            <p className="padding">{"$" + props.data.minBid}</p>
        </div>
    )
};
export default CurrentBid;
    
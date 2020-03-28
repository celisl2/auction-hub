import {useState} from 'react';

const CurrentBid = (props) => {
    const [bid, setBid] = useState();

    return (
        <div>
            <p className="lightBlue">{bid ? "Current Bid" : "Starting Bid"}</p>
            <p className="padding">{"$" + props.data}</p>
        </div>
    )
};
export default CurrentBid;
    
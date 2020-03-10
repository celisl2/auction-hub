import {getCode} from '../utils/helperFunctions';
import React from 'react';

function parseTime(time) {

}

const CurrentAuction = (prop) => {

    console.log(prop.data.data.auctionEvent)
    return (
        <div id="currentAuction">
                <h2 className="global-title">Current Auction</h2>
                <div className="auction-image">
                    {/* image here */}
                </div>
                
                <div className="auction-info">
                    {/* use logic in element below to: __find auction name */}
                    <h3>Aucton Name</h3>
                    <div className="time_home">
                        <div className="grid-item">
                            <h4>HH{getCode(58) + " " + prop.data.data.auctionEvent[0].time}</h4>
                        </div>
                        <div className="grid-item"><h4>MM{getCode(58)}</h4></div>
                        <div className="grid-item"><h4>SS</h4></div>
                        {/* use logic in div below to: __find hours left for auction event */}
                    </div>
                    <h4 className="banner time-left">Time Left to Bid</h4>
                </div>
            </div>
    );
};

export default CurrentAuction;
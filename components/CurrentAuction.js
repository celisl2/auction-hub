import {getCode} from '../utils/helperFunctions';

export default () =>
    <div id="currentAuction">
        <h2>Current Auction</h2>
        <div className="auction-image">
            {/* image here */}
        </div>
        <div className="auction-info">
            {/* use logic in element below to: __find auction name */}
            <h3>Aucton Name</h3>
            <div className="time_home">
                <div className="grid-item"><h4>HH{getCode(58)}</h4></div>
                {/* use logic in div below to: __find hours left for auction event */}
                <div className="grid-item"><h4>11{getCode(58)}</h4></div>
                <div className="grid-item"><h4>MM{getCode(58)}</h4></div>
                {/* use logic in div below to: __find hours left for auction event */}
                <div className="grid-item"><h4>11{getCode(58)}</h4></div>
                <div className="grid-item"><h4>SS</h4></div>
                {/* use logic in div below to: __find hours left for auction event */}
                <div className="grid-item"><h4>11</h4></div>
            </div>
            <h4 className="banner time-left">Time Left to Bid</h4>
        </div>
    </div>;
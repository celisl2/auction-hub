/* /////////////////////////////////////////////////////////
//
// File Name: Timer.js
// Purpose: Control the active timer for an auction
// 22 Mar 2020
//
///////////////////////////////////////////////////////// */


import React, {useEffect, useState, useLayoutEffect} from "react";
import ReactDOM from "react-dom";
import * as moment from 'moment';

//Pull times from active auction.
function CountdownTimer(props) {
    let startTime = props.date.startTime;
    let endTime = props.date.endTime;

//Formula that calculates the start and end times.
    const calculateTimeLeft = () => {
        const difference = +new Date(endTime) - + new Date(startTime);

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                DD: Math.floor(difference / (1000 * 60 * 60 * 24)),
                HH: Math.floor((difference / (1000 * 60 * 60)) % 24),
                MM: Math.floor((difference / 1000 / 60) % 60),
                SS: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    //was useEffect
    useLayoutEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    let timeFormat = 'MM/DD/YYYY @ h:mm A'
    let time = moment(new Date(startTime)).format(timeFormat);

//If the new start time does not equal the new date then return data.
    if(new Date(startTime) !== new Date()) {
        return (
            <div className="timer-box">
                    <div>
                        <h4 className="makeGold">DD : HH : MM : SS</h4>
                    </div>
                    <div>
                        <h4 className="makeLight">Event not in session, check back on</h4>
                        <h4 className="makeLight">{time}</h4>
                    </div>
            </div>
        )
    }
    //Otherwise return and render this where the users is informed the auction is over.
    else {
        return (
            <div>
                {timeLeft ?
                    <>
                    <div className="timer-box">
                        <div>
                            <h4 className="makeGold">DD : HH : MM : SS</h4>
                        </div>
                        <div>
                            <h4 className="makeLight">{timeLeft.DD + " : " + timeLeft.HH + " : " + timeLeft.MM+ " : " + timeLeft.SS}</h4>
                        </div>
                    </div>
                    <p className="overlap">Time Left to Bid</p>
                    </>
                    :
                    <>
                    <div className="timer-box">
                        <div>
                            <h4 className="makeGold">DD : HH : MM : SS</h4>
                        </div>
                        <div>
                            <h4 className="makeLight">{timeLeft.DD + " : " + timeLeft.HH + " : " + timeLeft.MM+ " : " + timeLeft.SS}</h4>
                        </div>
                    </div>
                    <p className="overlap">Time's Up</p>
                    </>
                }
            </div>
        );
    }

}

export default CountdownTimer;

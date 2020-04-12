import React, {useEffect, useState, useLayoutEffect} from "react";
import ReactDOM from "react-dom";
import * as moment from 'moment';

function CountdownTimer(props) {
    let startTime = props.date.startTime;
    let endTime = props.date.endTime;

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
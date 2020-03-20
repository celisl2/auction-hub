import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

function CountdownTimer(props) {
    let startTime = props.date.startTime;
    let endTime = props.date.endTime;

   // console.log("*****" + JSON.stringify(props))

    const calculateTimeLeft = () => {
        const difference = +new Date(endTime) - + new Date();
        
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

    const [timeLeft,
        setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    //const timerComponents = [];
/*
    Object
        .keys(timeLeft)
        .forEach(interval => {
            if (!timeLeft[interval]) {
                return;
            }

            timerComponents.push(
                <span key={interval}>
                    
                  
                    {interval}{" : "}  {timeLeft[interval]}
                </span>
            );
        });
*/

    return (
        <div>
            {timeLeft ? 
                <div className="timer-box"><div><h4 className="makeGold">DD : HH : MM : SS</h4></div><div><h4 className="makeLight">{timeLeft.DD + " : " + timeLeft.HH + " : " + timeLeft.MM+ " : " + timeLeft.SS}</h4></div></div> : 
                <span>Time's up!</span>
            } 
        </div>
    );
}

export default CountdownTimer;
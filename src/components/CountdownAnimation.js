import React, {useContext} from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { SettingContext } from '../context/SettingContext'


const CountdownAnimation = ({key=1, timer=20, animate = true, children, isActive}) => {
    const {stopTimer} = useContext(SettingContext)
    return (
        <CountdownCircleTimer
        key={key}
        isPlaying={animate}
        duration={timer * 60}
        colors={"#000"}
        strokeWidth={3}
        strokeLinecap={"square"}
        size={250}
        renderAriaTime
        onComplete={() => {
        stopTimer()
        }}
        >
            <div className={`timer ${isActive ? "black" : "none"}`}>
              <div className="value">{}</div>
            </div>
          </CountdownCircleTimer>
    );
}

export default CountdownAnimation;

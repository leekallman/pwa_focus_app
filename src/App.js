import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from './globalStyles.js';
import SettingsBtn from './components/settingsBtn.js';
import SettingsModal from './components/settingsModal.js';
import TimeOutModal from './components/timeOutModal.js';
import './App.css';

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useTimer from './hooks/useTimer.js'


const AppContainer = styled.div`
width:100vw;
height:100vh;

.hide{
  transform: translate(0, 100%);
  display: none !important;
  animation: moveOut 0.5s;
}
@keyframes moveIn {
  from {transform: translate(0, 100%)};
  to {transform: translate(0, 0%);
    display: block}
  }
@keyframes moveOut {
  0% {transform: translate(0, 0%)};
  90% {transform: translate(0, 100%)}
  100% {display: none}   
}

.show{
  animation: moveIn 0.5s;
  display: block;
}
`

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .timer{
    display: flex;
    align-items: center;
  }

  .black{
    background:#000;
    border-radius:50% !important;
    height:200px !important;
    width:200px !important;
  }
  .value{
    font-size: 50px;
    margin:auto;
  }

  .actions, .timeLabel{
  margin:5vh auto;
  }

  .start, .pause{
    margin-right: 10px;
  }

  .pause{
    background: none;
    color:#000;
  }
  `
const Button = styled.button`
  align-items: center;
  background: #000;
  padding: 10px 35px;
  border: solid 1px #000;
  border-radius: 50px;
  transition: all 0.1s ease-in-out;
  cursor:pointer;
`
function formatTime(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = sec % 60;
  if (seconds < 10) {
    seconds = `0${seconds} `;
  }
  if (minutes < 10) {
    minutes = `0${minutes} `
  }
  return `${minutes}: ${seconds} `;
}

function App() {
  const {timer, toggleTimer} = useTimer();

  // const [isActive, setIsActive] = useState(false);
  const [modal, setModal] = useState(false);
  const [timeOutModal, setTimeOutModal] = useState(false);

  // modals
  const modalToggler = () => {
    setModal(prev => !prev)
  }

  const timeOutToggler = () => {
    setTimeOutModal(prev => !prev)
  }

  const closeModal = (event) => {
    const clicked = event.target.id;
    if (modal !== false && clicked === "timerWrapper") {
      setModal(prev => !prev);
    } else if (timeOutModal !== false && clicked === "timerWrapper") {
      setTimeOutModal(prev => !prev)
    }
  }

  useEffect(() => {
    let interval = null;
    // COUNTDOWN
    if (timer.isActive && timer.setTime > 0) {
      interval = setInterval(() => {
        toggleTimer('COUNTDOWN')
      }, 10);

    // PAUSE
    } else if (!timer.isActive && timer.time > 0) {
      toggleTimer('BREAK')
      clearInterval(interval);
    }
    // TIMEOUT FOCUS SESSION
    else if (timer.time === 0 && timer.focus === true) {
      toggleTimer('TIMEFORBREAK')
      clearInterval(interval);
      setTimeOutModal(true)
      setModal(false);
      }
      // alarm.play();

    // TIMEOUT BREAK SESSION
    else if (timer.time === 0 && timer.focus === false) {
      toggleTimer('TIMEFORRESET')
      clearInterval(interval);
      }
      // alarm.play()

    return () => clearInterval(interval)
  }, [timer.isActive, timer.time, timer.setTime, timer.focus, toggleTimer]);


  return (
    <AppContainer id="App" className={timer.focus ? "focus" : "break"}>
      <GlobalStyles />
      <TimerWrapper id="timerWrapper" onClick={closeModal}>
        <div className="timeLabel">{timer.focus ? "Focus Time" : "Break Time"}</div>
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying={timer.isActive ? true : false}
            duration={timer.time}
            colors={"#000"}
            strokeWidth={3}
            strokeLinecap={"square"}
            size={250}
            renderAriaTime
            key={timer.key}
          >
            <div className={`timer ${timer.isActive ? "black" : "none"}`}>
              <div className="value">{formatTime(timer.time)}</div>
            </div>
          </CountdownCircleTimer>
        </div>
        <div className="actions">
          <Button className={`button ${timer.isActive ? "pause" : "start"}`} onClick={toggleTimer('START')}>
            {timer.isActive ? 'Pause' : 'Start'}
          </Button>

          <Button className="button reset" onClick={toggleTimer('RESET')}>Reset</Button>
        </div>
      </TimerWrapper>

      <SettingsBtn modalToggler={modalToggler} />
      <SettingsModal
        timer={timer}
        modal={modal}
        handleChange={toggleTimer('CHANGEFOCUS')}
        handleBreak={toggleTimer('CHANGEBREAK')}
        handleLongBreak={toggleTimer('CHANGELONGBREAK')}
      />
      {/* <TimeOutModal
        timer={timer}
        start={toggleTimer('START')}
        timeOutModal={timeOutModal}
        timeOutToggler={timeOutToggler}
        isActive={timer.isActive}
      /> */}
    </AppContainer >
  );
}

export default App;

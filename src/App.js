import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from './globalStyles.js';
import SettingsBtn from './components/settingsBtn.js';
import SettingsModal from './components/settingsModal.js';
import TimeOutModal from './components/timeOutModal.js';
import './App.css';
import timeOutAlarm from './assets/bell.mp3'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const alarm = new Audio(timeOutAlarm)
alarm.volume = 0.6

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
  // initial Session time
  let focusSessionDuration = 1
  let breakSessionDuration = 5
  let longBreakSessionDuration = 15

  // useState
  const [focusInput, setFocusInput] = useState(focusSessionDuration);
  const [breakInput, setBreakInput] = useState(breakSessionDuration);
  const [longBreakInput, setLongBreakInput] = useState(longBreakSessionDuration);

  const [focus, setFocus] = useState(true);
  const [time, setTime] = useState(focusInput * 60);
  const [isActive, setIsActive] = useState(false);
  const [key, setKey] = useState(0);

  const [modal, setModal] = useState(false);
  const [timeOutModal, setTimeOutModal] = useState(false);


  // functions
  const handleChange = (e) => {
    setFocusInput(e.target.value);
    setTime(e.target.value * 60);
    setKey(e.target.value)
  }
  const handleBreak = (e) => {
    setBreakInput(e.target.value);
  }

  const handleLongBreak = (e) => {
    setLongBreakInput(e.target.value);
  }

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

  // buttons
  function start() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
    setFocus(true);
    setTime(focusInput*60);
    setKey(focusInput*60);
  }

  useEffect(() => {
    let interval = null;
    // COUNTDOWN
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);

    // PAUSE
    } else if (!isActive && time > 0) {
      clearInterval(interval);
    }
    // TIMEOUT FOCUS SESSION
    else if (time === 0 && focus === true) {
      setIsActive(false);
      clearInterval(interval);
      setTimeOutModal(true)
      setFocus(!focus)
      setModal(false);
      alarm.play();
      setTime(breakInput * 60)
      setKey(breakInput * 60);
    }
    // TIMEOUT BREAK SESSION
    else if (time === 0 && focus === false) {
      clearInterval(interval);
      setIsActive(false);
      setFocus(true);
      alarm.play()
      setTime(focusInput * 60);
      setKey(focusInput * 60);
    }

    return () => clearInterval(interval);
  }, [isActive, time, setTime, breakInput, focus, focusInput]);


  return (
    <AppContainer id="App" className={focus ? "focus" : "break"}>
      <GlobalStyles />
      <TimerWrapper id="timerWrapper" onClick={closeModal}>
        <div className="timeLabel">{focus ? "Focus Time" : "Break Time"}</div>
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying={isActive ? true : false}
            duration={time}
            colors={"#000"}
            strokeWidth={3}
            strokeLinecap={"square"}
            size={250}
            renderAriaTime
            key={key}
          >
            <div className={`timer ${isActive ? "black" : "none"}`}>
              <div className="value">{formatTime(time)}</div>
            </div>
          </CountdownCircleTimer>
        </div>
        <div className="actions">
          <Button className={`button ${isActive ? "pause" : "start"}`} onClick={start}>
            {isActive ? 'Pause' : 'Start'}
          </Button>

          <Button className="button reset" onClick={reset}>Reset</Button>
        </div>
      </TimerWrapper>

      <SettingsBtn modalToggler={modalToggler} />
      <SettingsModal
        modal={modal}
        focusInput={focusInput}
        breakInput={breakInput}
        longBreakInput={longBreakInput}
        handleChange={handleChange}
        handleBreak={handleBreak}
        handleLongBreak={handleLongBreak}
      />
      <TimeOutModal
        timeOutModal={timeOutModal}
        timeOutToggler={timeOutToggler}
        setTime={setTime}
        breakInput={breakInput}
        longBreakInput={longBreakInput}
        isActive={isActive}
        setIsActive={setIsActive}
        focus={focus}
        setFocus={setFocus}
        focusInput={focusInput}
        setFocusInput={setFocusInput}
        setKey={setKey}
      />
    </AppContainer >
  );
}

export default App;

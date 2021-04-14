import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from './globalStyles.js';
import SettingsBtn from './components/SettingsBtn.js';
import SettingsModal from './components/SettingsModal.js';
import CountdownAnimation from './components/CountdownAnimation.js';
import TimeOutModal from './components/TimeOutModal.js';
import './App.css';
import timeOutAlarm from './assets/bell.mp3'

const alarm = new Audio(timeOutAlarm)
alarm.volume = 0.6

const AppContainer = styled.div`
.hide{
  transform: translate(0, 100%);
  display: none;
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

  // &:hover {
  //   background: none;
  //   color: #000;
  // }
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

  // useState
const [newTimer, setNewTimer] = useState({
  work: 0.1,
  short: 0.2,
  long: 1,
  active: "work"
})


  const [focusInput, setFocusInput] = useState(focusSessionDuration);
  const [breakInput, setBreakInput] = useState(breakSessionDuration);
  // const [remainingTime, setRemaningTime] = useState(focusSessionDuration);

  const [focus, setFocus] = useState(true);
  const [time, setTime] = useState(focusInput * 60);
  const [isActive, setIsActive] = useState(false);

  const [modal, setModal] = useState(false);
  const [timeOutModal, setTimeOutModal] = useState(false);


  // functions
  const handleChange = (input) => {
    const{name, value} = input.target
    switch(name){
      case 'focus':
        setNewTimer({
          ...newTimer,
          work: parseInt(value)
        })
      break;
      case 'shortBreak':
        setNewTimer({
        ...newTimer,
        short: parseInt(value)
        })
      break;
      case 'longBreak':
        setNewTimer({
        ...newTimer,
        long: parseInt(value)
        })
      break;
      

      default:
        break;

    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // updateExecute(newTimer)
  }

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
      setTime(breakInput * 60)
      setModal(false);
      alarm.play()
    }
    // TIMEOUT BREAK SESSION
    else if (time === 0 && focus === false) {
      clearInterval(interval);
      setTime(focusInput * 60);
      setIsActive(false);
      setFocus(true);
      alarm.play()
    }

    return () => clearInterval(interval);
  }, [isActive, time, setTime, breakInput, focus, focusInput]);


  return (
    <AppContainer id="App" className={focus ? "focus" : "break"}>
      <GlobalStyles />
      <TimerWrapper id="timerWrapper" onClick={closeModal}>
        <div className="timeLabel">{focus ? "Focus Time" : "Break Time"}</div>
        <div className="timer-wrapper">
          <CountdownAnimation />
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
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newTimer={newTimer}
        setNewTimer={setNewTimer}
      />
      <TimeOutModal
        timeOutModal={timeOutModal}
        timeOutToggler={timeOutToggler}
        isActive={isActive}
        setIsActive={setIsActive}
        focus={focus}
        setFocus={setFocus}
        reset={reset}
        newTimer={newTimer}
        setNewTimer={setNewTimer}
      />
    </AppContainer >
  );
}

export default App;

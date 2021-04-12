import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from './globalStyles.js';
import SettingsBtn from './components/settingsBtn.js';
import SettingsModal from './components/settingsModal.js';
import TimeOutModal from './components/timeOutModal.js';
import './App.css';
// import bgFocus from './assets/bg-focus.png';
// import bgBreak from './assets/bg-break.png';
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
    height: 70vh;
    display: flex;
    align-items: center;
    font-size: 60px;
  }
  .start{
    margin-right: 5px;
  }
  `
const Button = styled.button`
  align-items: center;
  background: #000;
  padding: 10px 35px;
  border: none;
  border-radius: 50px;
`
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  let seconds = sec % 60;
  if (seconds < 10) {
    seconds = `0${seconds} `;
  }
  return `${minutes}: ${seconds} `;
}

function App() {
  // initial Session time
  let focusSessionDuration = 25
  let breakSessionDuration = 5

  // useState
  const [focusInput, setFocusInput] = useState(focusSessionDuration);
  const [breakInput, setBreakInput] = useState(breakSessionDuration);

  const [focus, setFocus] = useState(true);
  const [time, setTime] = useState(focusInput * 60);
  const [isActive, setIsActive] = useState(false);

  const [modal, setModal] = useState(false);
  const [timeOutModal, setTimeOutModal] = useState(false);


  // functions
  const handleChange = (e) => {
    setFocusInput(e.target.value);
    setTime(e.target.value * 60);
  }
  const handleBreak = (e) => {
    setBreakInput(e.target.value);
  }

  const modalToggler = () => {
    setModal(prev => !prev)
  }

  function start() {
    setIsActive(!isActive);
  }

  function reset() {
    setTime(focusInput * 60);
    setIsActive(false);
    setFocus(true);
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
      reset();
      alarm.play()
    }

    return () => clearInterval(interval);
  }, [isActive, time, setTime, breakInput, focus, reset]);


  return (
    <AppContainer id="App" className={focus ? "focus" : "break"}>
      <GlobalStyles />
      <TimerWrapper id="timerWrapper" onClick={closeModal}>
        <div>{focus ? "Focus Time" : "Break Time"}</div>
        <div className="timer">{formatTime(time)}</div>

        <div className="actions">
          <Button className="button start" onClick={start}>
            {isActive ? 'Pause' : 'Start'}
          </Button>

          <Button className="button reset" onClick={reset}>
            Reset
          </Button>
        </div>
      </TimerWrapper>

      <SettingsBtn modalToggler={modalToggler} />
      <SettingsModal
        modal={modal}
        focusInput={focusInput}
        breakInput={breakInput}
        handleChange={handleChange}
        handleBreak={handleBreak}
      />
      <TimeOutModal
        timeOutModal={timeOutModal}
        timeOutToggler={timeOutToggler}
        setTime={setTime}
        breakInput={breakInput}
        isActive={isActive}
        setIsActive={setIsActive}
        focus={focus}
        setFocus={setFocus}
      />
    </AppContainer >
  );
}

export default App;

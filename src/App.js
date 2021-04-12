import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyles from './globalStyles.js';
import Timer from './components/timer.js';
import SettingsBtn from './components/settingsBtn.js';
import SettingsModal from './components/settingsModal.js';
import TimeOutModal from './components/timeOutModal.js';
import background from './assets/bg_main.png';


const Background = styled.div`
    align-items: center;
    background-image: url(${background});
    background-size: cover;
    width: 100vw;
    height: 100vh;
    }

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
  `;

function App() {
  // initial Session time
  let focusSessionDuration = 25
  let timeSpentInCurrentSession = 0
  let breakSessionDuration = 5





  // useState
  const [focusInput, setFocusInput] = useState(focusSessionDuration);
  const [breakInput, setBreakInput] = useState(breakSessionDuration);
  const [modal, setModal] = useState (true);
  const [timeOutModal, setTimeOutModal] = useState (true);
  const [time, setTime] = useState(focusInput);
  const [isActive, setIsActive] = useState(false);


  // functions
  const handleChange = (e) =>{
    setFocusInput(e.target.value);
    setTime(e.target.value*60);
    }
  const handleBreak = (e) =>{
    setBreakInput(e.target.value);
    setTime(e.target.value*60);
    }

  const toggler = () => {
  setModal(prev => !prev)
  }

  const timeOutToggler = () => {
    setTimeOutModal(prev => !prev)
  }

  const triggerTimeOutModal = () => {
    setTimeOutModal(false)
  }

const closeModal = (event) => {
  const clicked = event.target.id;
        if (modal !== true && clicked === "modalWrapper"){
          setModal(prev => !prev);
        } else if(timeOutModal !== true && clicked === "modalWrapper"){
          setTimeOutModal(prev => !prev)
        }   
}

  return (
    <Background>
      <GlobalStyles />

      <Timer 
      time={time} 
      setTime={setTime} 
      focusInput={focusInput} 
      breakInput={breakInput}
      setUserInput={setFocusInput} 
      handleChange={handleChange} 
      handleBreak={handleBreak}
      timeOutToggler={timeOutToggler} 
      triggerTimeOutModal={triggerTimeOutModal}
      isActive={isActive}
      setIsActive={setIsActive}
      />

      <SettingsBtn toggler={toggler} />

      <div style={{width: "100vw", height: "100vh"}} onClick={closeModal} id="modalWrapper">
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
        />
      </div>
    </Background >
  );
}

export default App;

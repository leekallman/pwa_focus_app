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

  const [timer, setTimer] = useState({
  isActive: false,
  time: focusInput,
  timeOutModal: false,
  modal: false,
  break: false,
  button: 'start'
})

  // const [modal, setModal] = useState (true);
  // const [timeOutModal, setTimeOutModal] = useState (true);
  // const [time, setTime] = useState(focusInput);
  // const [isActive, setIsActive] = useState(false);

const toggleTimer = (event) => {
  console.log(event)
  switch (event) {
    case 'start':
        setTimer({ 
          ...timer, 
          isActive: true, 
          button: 'pause' 
        })
        break
    case 'pause':
        setTimer({ 
          ...timer, 
          isActive: false, 
          button: 'start' 
        })
        break
    case 'break':
        setTimer({
          ...timer,
          isActive: true,
          button: 'pause',
          break: true,
          time: breakInput
        })
        break
      case 'reset':
        setTimer({
          ...timer,
          button: 'start',
          break: false,
          time: focusInput
        })
        break
      case 'countdown':
        setTimer({
          ...timer,
          button: 'pause',
          time: timer.time - 1000
        })
        break
      case 'startbreak':
        setTimer({
          ...timer,
          isActive: false,
          button: 'break'
        })
        // alarm.play()
        break
      case 'timeout':
        setTimer({
          ...timer,
          isActive: false,
          timeOutModal:true,
          button: 'reset'
        })
        // work.play()
        break
      default:
        return
  }
}
return [timer, toggleTimer]
}
  // functions
  const handleChange = (e) =>{
    setFocusInput(e.target.value);
    setTimer.time(e.target.value*60);
    }
  const handleBreak = (e) =>{
    setBreakInput(e.target.value);
    setTimer.time(e.target.value*60);
    }

  const toggler = () => {
    timer.modal(prev => !prev)
  }

  const timeOutToggler = () => {
    timer.timeOutModal(prev => !prev)
  }

  const triggerTimeOutModal = () => {
    timer.timeOutModal(false)
  }

const closeModal = (event) => {
  const clicked = event.target.id;
        if (timer.modal !== true && clicked === "modalWrapper"){
          timer.modal(prev => !prev);
        } else if(timer.timeOutModal !== true && clicked === "modalWrapper"){
          timer.timeOutModal(prev => !prev)
        }   
}

  return (
    <Background>
      <GlobalStyles />

      <Timer 
      timer={timer} 
      toggleTimer={toggleTimer}
      focusInput={focusInput} 
      breakInput={breakInput}
      setUserInput={setFocusInput} 
      handleChange={handleChange} 
      handleBreak={handleBreak}
      timeOutToggler={timeOutToggler} 
      triggerTimeOutModal={triggerTimeOutModal}
      />

      <SettingsBtn toggler={toggler} />

      <div style={{width: "100vw", height: "100vh"}} onClick={closeModal} id="modalWrapper">
        <SettingsModal 
        modal={timer.modal} 
        focusInput={focusInput} 
        breakInput={breakInput}
        handleChange={handleChange}
        handleBreak={handleBreak}
        />
        <TimeOutModal 
        timeOutModal={timer.timeOutModal} 
        timeOutToggler={timeOutToggler}
        setTime={timer.time}
        breakInput={breakInput}
        isActive={timer.isActive}
        />
      </div>
    </Background >
  );
}

export default App;

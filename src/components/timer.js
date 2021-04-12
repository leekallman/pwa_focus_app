// import React, { useState, useEffect } from 'react';
// import styled from "styled-components";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";

// // the timer has buttons to adjust the start time
// // the timer will be able to start, stop, and reset
// // the timer will display an alert when it runs out
// // the Countdown component will display the time and control buttons


// // timerOn: boolean value for if the timer is on
// // timerStart: the Unix Epoch (ms after 1970) time when the timer was started (or the past projected start time if the timer is resumed)
// // timerTime: total time (ms) that the timer has been running since start/reset

// const TimerWrapper = styled.div`
// display:flex;
// flex-direction: column;
// align-items: center;

// .timer{
//   height: 70vh;
//   display:flex;
//   align-items: center;
//   font-size:60px;
// }
// .start{
//   margin-right: 5px;
// }
// `

// const Button = styled.button`
// align-items: center;
// background: #000;
// padding: 10px 35px;
// border: none;
// border-radius: 50px;
// }

// `;

// function formatTime(sec) {
//   const minutes = Math.floor(sec / 60);
//   let seconds = sec % 60;
//   if (seconds < 10) {
//     seconds = `0${seconds}`;
//   }
//   return `${minutes}:${seconds}`;
// }

// const Timer = ({focusInput, breakInput, time, setTime, triggerTimeOutModal, timeOutToggler, closeModal, setModal, focus, setFocus}) => {
//   const [isActive, setIsActive] = useState(false);
 
//   function toggle() {
//     setIsActive(!isActive);
//   }
  
//   function reset() {
//     setTime(focusInput*60);
//     setIsActive(false);
//     setFocus(true);
//   }
  
//   useEffect(() => {
//     let interval = null;
//     //   as long as the timer is active and not 0
//     if (isActive && time > 0) {
//       interval = setInterval(() => {
//         setTime(time => time - 1);
//       }, 1000);
      
//     // pause timer
//     } else if (!isActive && time > 0) {
//       clearInterval(interval);
//     }
//     // timeout focus
//     else if ( time === 0 && focus === true) {
//       setIsActive(false);
//       clearInterval(interval);
//       triggerTimeOutModal();
//       setFocus(!focus)
//       setTime(breakInput*60)
//       setModal(true);
//     }
//     //timeout break
//     else if ( time === 0 && focus === false){
//       clearInterval(interval);
//       setFocus(true)
//       setTime(focusInput*60);
//       setIsActive(false);
//     }
    
    
//     return () => clearInterval(interval);
//   }, [isActive, time, setTime, timeOutToggler, triggerTimeOutModal]);
  
  
//   return (
//     <TimerWrapper id="timerWrapper" onClick={closeModal}>
//       <div>{focus ? "Focus Time" : "Break Time"}</div>
//       <div className="timer">{formatTime(time)}</div>

//       <div className="actions">
//         <Button className="button start" onClick={toggle}>
//           {isActive ? 'Pause' : 'Start'}
//         </Button>

//         <Button className="button reset" onClick={reset}>
//           Reset
//         </Button>
//       </div>

      
//     </TimerWrapper>
//     );
//   };
  
//   export default Timer;
  
  
//   // class Timer extends Component {
//   //     // state object
//   //     state = {
//   //       timerOn: false,
//   //       timerStart: 25,
//   //       timerTime: 0
//   //     };
  
//   //     // start timer by changing state
//   //     startTimer = () => {
//   //     this.setState({
//   //       timerOn: true,
//   //       timerTime: this.state.timerTime,
//   //       timerStart: this.state.timerTime
//   //     });
  
//   //     // add contitional interval on the state object
//   //     this.timer = setInterval(() => {
//   //       const newTime = this.state.timerTime - 10;
//   //       if (newTime >= 0) {
//   //         this.setState({
//   //           timerTime: newTime
//   //         });
//   //       } else {
//   //         clearInterval(this.timer);
//   //         this.setState({ timerOn: false });
//   //         alert("Well focused!");
//   //       }
//   //     }, 10);
//   //   };
  
//   // //   stop timer by changing state timerOn to false
//   //   stopTimer = () => {
//   //     clearInterval(this.timer);
//   //     this.setState({ timerOn: false });
//   //   };
  
//   //   resetTimer = () => {
//   //     if (this.state.timerOn === false) {
//   //       this.setState({
//   //         timerTime: this.state.timerStart
//   //       });
//   //     }
//   //   };
  
//   //   adjustTimer = input => {
//   //     const { timerTime, timerOn } = this.state;
//   //     if (!timerOn) {
//   //       if (input === "incMinutes" && timerTime + 60000 < 216000000) {
//   //         this.setState({ timerTime: timerTime + 60000*5 });
//   //       } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
//   //         this.setState({ timerTime: timerTime - 60000*5 });
//   //       } 
//   //     }
//   //   };
  
  
//   //   render() {
//   //     const { timerTime, timerStart, timerOn } = this.state;
//   //     let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
//   //     let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
  
//   //     return (
//   //         <div className="Timer">
//   //         <div className="Timer-header">Focus</div>
//   //         <div className="Countdown-display">
//   //           <button onClick={() => this.adjustTimer("incMinutes")}>
//   //             &#8679;
//   //           </button>
  
//   //           <CountdownCircleTimer
//   //             isPlaying
//   //             duration={10}
//   //             colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
//   //             onComplete={() => [true, 1000]}
//   //             >
//   //           {minutes} : {seconds}
//   //             </CountdownCircleTimer>
  
//   //           <button onClick={() => this.adjustTimer("decMinutes")}>
//   //             &#8681;
//   //           </button>
  
//   //         </div>
  
//   //         {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
//   //           <Button className="Button-start" onClick={this.startTimer}>
//   //             Start
//   //           </Button>
//   //         )}
//   //         {timerOn === true && timerTime >= 1000 && (
//   //           <Button className="Button-stop" onClick={this.stopTimer}>
//   //             Stop
//   //           </Button>
//   //         )}
//   //         {timerOn === false &&
//   //           (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
//   //             <Button className="Button-start" onClick={this.startTimer}>
//   //               Resume
//   //             </Button>
//   //           )}
  
//   //         {(timerOn === false || timerTime < 1000) &&
//   //           (timerStart !== timerTime && timerStart > 0) && (
//   //             <Button className="Button-reset" onClick={this.resetTimer}>
//   //               Reset
//   //             </Button>
//   //           )}
//   //       </div>
//   //     );
//   //   }
//   // }
  
//   // export default Timer;
  
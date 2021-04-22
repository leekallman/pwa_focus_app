import React from 'react';
import styled from "styled-components";

const Modal = styled.div`
    background: #fff;
    background-size: cover;
    width: 100vw;
    height: 50vh;
    border-radius: 20px 20px 0 0;
    position:absolute;
    bottom:0;
    padding: 10vh 10vw;
    display: flex !important;
    flex-direction: column;
    align-items: center;

    h3{
        color:#000 !important;
        font-size:24px !important;
        margin: 2vh auto;
    }

    h3, input{
        @import url('./assets. CabinetGrotesk-Light.woff');
        font-family: CabinetGrotesk-Light !important;

        font-size: 16px;
        font-weight:400;
    }
    p{
        color:#000;
        margin: 2vh auto;
    }
    span{
        margin-left:2vw;
    }
    button{
        display: inline-block;
        align-items: center;
        background: #000;
        padding: 10px 35px;
        border: solid 1px #000;
        border-radius: 50px;
        cursor:pointer;
        }
    
    .shortBreak, .longBreak{
        padding: 8px 30px;
        background: none;
        color:#000;
        font-size: 16px;
    }
    .shortBreak{
        margin-right: 5px;
    }
    .startSession{
        display:block;
        margin: 2vh auto;
      }
  `;
  const Emoji = props => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  )
  

const TimeOutModal = ({ timeOutModal, timeOutToggler, timer, setTimer, toggleTimer }) => {
    function startBreak() {
        setTimer({
            ...timer,
            focus: false,
            time: timer.breakInput*60,
            isActive: true
          })
        timeOutToggler();
    }
    function startLongBreak() {
        setTimer({
            ...timer,
            focus: false,
            time: timer.longBreakInput*60,
            isActive: true
          })
        timeOutToggler();
    }

    function restart(){
        setTimer({
            ...timer,
            focus: true,
            time: timer.focusInput*60,
            isActive: false,
            key: timer.focusInput*60
          })
        timeOutToggler();
    }


    return (
        <Modal className={timeOutModal ? "show" : "hide"} id="modal">
            <h3>Well Focused!<Emoji label="stars" symbol="✨"/></h3>
            <p>Take a break?</p>
            <div className="actions">
                <button className="shortBreak" onClick={startBreak}>Short break</button>
                <button className="longBreak" onClick={startLongBreak}>Long break</button>
            </div>
            <button className="startSession" onClick={restart}>Start new Focus Session</button>
        </Modal>
    );
}

export default TimeOutModal;

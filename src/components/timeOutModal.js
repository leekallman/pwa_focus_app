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

    h3{
        color:#000 !important;
    }

    h3, input{
        @import url('./assets. CabinetGrotesk-Light.woff');
        font-family: CabinetGrotesk-Light !important;

        font-size: 16px;
        font-weight:400;
    }
    button{
        display: inline-block;
        align-items: center;
        background: #000;
        padding: 10px 35px;
        border: none;
        border-radius: 50px;
        }
    .shortBreak{
        margin-right: 5px;
    }
    .startSession{
        display:block;
        margin: 2vh auto;
      }
  `;


const TimeOutModal = ({ timeOutModal, setTime, breakInput, setIsActive, timeOutToggler }) => {
    function startBreak() {
        setTime(breakInput);
        setIsActive(true);
        timeOutToggler();
        // change background
      }


    return (
        <Modal className={timeOutModal ? "hide" : "show"} id="modal">
            <h3>Well Focused!</h3>
            <button className="shortBreak" onClick={startBreak}>Short break</button>
            {/* <button>Long break</button> */}
            <button className="startSession">Start new Focus Session</button>
        </Modal>
    );
}

export default TimeOutModal;

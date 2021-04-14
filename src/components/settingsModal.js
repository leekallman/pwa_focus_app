import React from 'react';
import SubmitButton from './SubmitButton.js';
import styled from "styled-components";

const Modal = styled.div`
background: #fff;
background-size: cover;
width: 100vw;
height: 30vh;
border-radius: 20px 20px 0 0;
position:absolute;
bottom:0;
padding: 10vh 10vw;

li{
    display:flex;
    justify-content: space-between;
    margin-bottom: 5vh;
}
h3{
    color:#000 !important;
}

h3, input{
    @import url('./assets. CabinetGrotesk-Light.woff');
    font-family: CabinetGrotesk-Light !important;
    
    font-size: 16px;
    display: inline-block;
    font-weight:400;
}
input{
    color:#737272 !important;
    width:40px;
    border:none;
    text-align:right;
}
`;

const SettingsModal = ({ modal, handleChange, handleSubmit, newTimer, setNewTimer }) => {
    return (
        <Modal className={modal ? "show" : "hide"} id="modal">
            <ul>
                <li>
                    <h3>Focus Session</h3>
                    <input className="input" name="focus" type="number" onChange={handleChange} value={newTimer.focus} />
                </li>
                <li>
                    <h3>Short Break</h3>
                    <input className="input" name="shortBreak" type="number" onChange={handleChange} value={newTimer.short} />
                </li>
                <li>
                <h3>Long Break</h3>
                    <input className="input" name="longBreak" type="number" onChange={handleChange} value={newTimer.long} />
                </li>
            </ul>
            <SubmitButton title="Set timer" _callback={handleSubmit} />
        </Modal>
    );
}

export default SettingsModal;

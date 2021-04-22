import React from 'react';
import styled from "styled-components";

const Modal = styled.div`
background: #fff;
background-size: cover;
width: 100vw;
height: 35vh;
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

const SettingsModal = ({ modal, handleChange, handleBreak, handleLongBreak, timer }) => {
    return (
        <Modal className={modal ? "show" : "hide"} id="modal">
            <ul>
                <li>
                    <h3>Focus Session</h3>
                    <input min={1} type="number" onChange={handleChange} value={timer.focusInput} />
                </li>
                <li>
                    <h3>Short Break Session</h3>
                    <input min={1} type="number" onChange={handleBreak} value={timer.breakInput} />
                </li>
                <li>
                    <h3>Long Break Session</h3>
                    <input min={1} type="number" onChange={handleLongBreak} value={timer.longBreakInput} />
                </li>
            </ul>
        </Modal>
    );
}

export default SettingsModal;

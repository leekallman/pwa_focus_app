import React from 'react';
import styled from "styled-components";
import settings from '../assets/settings.svg';

const settingsBtn = ({ modalToggler }) => {
    const Button = styled.button`
    position:absolute;
    bottom:30px;
    left:30px;
    max-width:12vw;
    background: none;
    border: none;
    cursor: pointer;
`
    return (
        <Button>
            <img src={settings} alt="settings icon" onClick={modalToggler} />
        </Button>
    );
}

export default settingsBtn;

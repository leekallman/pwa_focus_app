import React from 'react';
import styled from "styled-components";
import settings from '../assets/settings.svg';

const settingsBtn = ({modalToggler}) => {
    const Icon = styled.img`
    position:absolute;
    bottom:30px;
    left:30px;
`

    return (
        <Icon src={settings} alt="settings icon" onClick={modalToggler}></Icon>     
    );
}

export default settingsBtn;

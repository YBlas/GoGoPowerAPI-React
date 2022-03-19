import React, { FC } from 'react';
import styled from "@emotion/styled";

const LogoStyle = styled.img`
    width: auto;
    height: 12%;
`

const Logo: FC = () => {
    return (
        <div onClick={() => {
            new Audio(require("../audio/FullIntro.mp3")).play();
        }}>
            <LogoStyle src={require('../images/logo.png')}></LogoStyle>
        </div>
    )
}

export default Logo;
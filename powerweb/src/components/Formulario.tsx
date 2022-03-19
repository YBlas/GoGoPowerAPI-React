import React, { FC, useState } from 'react';
import styled from "@emotion/styled";
import "./styles/Formulario.css";
import Axios from "axios";

const InputStyle = styled.input`
    width: 120%;
    height: auto;
    margin: 5px;
    border-radius: 5px;
`
const TextStyle = styled.p`
    background: rgba(116, 219, 245, 0.733);
    position: left;
    color: whitesmoke;
    width: 40%;
    border-radius: 5px;
`
const ButtomStyle = styled.button`
    background: rgba(241, 60, 60, 0.801);
    color: whitesmoke;
    border-radius: 5px;
`

const Formulario: FC = () => {

    const [textName, setName] = useState<string>("");
    const [textColor, setColor] = useState<string>("");
    const [textZord, setZord] = useState<string>("");

    var data = JSON.stringify({
        "color": { textColor }.textColor,
        "user": { textName }.textName,
        "zord": { textZord }.textZord
    })

    return (
        <div className='Formulario'>
            <TextStyle> Name: </TextStyle>
            <InputStyle placeholder="Write your name" value={textName} onChange={(e) => setName(e.target.value)}></InputStyle>
            <TextStyle> Color: </TextStyle>
            <InputStyle placeholder="Choose your power color" value={textColor} onChange={(e) => setColor(e.target.value)}></InputStyle>
            <TextStyle> Zord: </TextStyle>
            <InputStyle placeholder="Choose your power spirit robot" value={textZord} onChange={(e) => setZord(e.target.value)}></InputStyle>
            <ButtomStyle onClick={() => {
                if (textColor && textName && textZord) {
                    Axios({
                        method: 'post',
                        url: 'http://localhost:6969/SignIn',
                        headers: { 'Content-type': 'application/json' },
                        data: data
                    }).then((response) => {
                        console.log(JSON.stringify(response.data));
                        alert(JSON.stringify(response.data));
                    }).catch((error) => {
                        console.log(error);
                    })
                    new Audio(require("../audio/transport.mp3")).play();
                }
            }}> Send to Zordon </ButtomStyle>
        </div>
    )
}

export default Formulario;
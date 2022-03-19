import React, { FC, useState } from 'react';
import styled from "@emotion/styled";
import "./styles/Formulario.css";
import Axios from "axios";
import "./styles/Morphin.css";
import { visitEachChild } from 'typescript';

type VisibilityProp = {
    visibility: string
}

const ButtomStyle = styled.button<VisibilityProp>`
    background: rgba(241, 60, 60, 0.801);
    color: whitesmoke;
    border-radius: 5px;
    visibility: ${(props) => props.visibility};
`

const DeleteButtom = styled.button`
    background-image: url("https://findicons.com/files/icons/1262/amora/256/delete.png");
    background-size: contain;
    width: 10px;
    height: 17px;
    margin-left: 5px;
`

const RangerList = styled.div<VisibilityProp>`
    background: rgba(241, 60, 60, 0.801);
    color: whitesmoke;
    border-radius: 5px;
    visibility: ${(props) => props.visibility};
`
type Ranger = {
    color: string
    zord: string
    user: string
}

const Morphin: FC = () => {

    const [Rangers, setRangers] = useState<Ranger[]>([]);
    const [View, setView] = useState<string>("visible");
    const [View2, setView2] = useState<string>("hidden");

    return (
        <div className='Morphin'>
            <ButtomStyle visibility={View} onClick={() => {
                Axios({
                    url: "http://localhost:6969/MorphinTime"
                }).then((response) => {
                    setRangers(response.data);
                })
                if (View == "visible") {
                    setView("hidden");
                    setView2("visible");
                }
                new Audio(require("../audio/metamorfosearse.mp3")).play();
            }}>Call Aplpha 5</ButtomStyle>
            <ButtomStyle visibility={View2} onClick={() => {
                setView("visible");
                setView2("hidden");
            }}>Go Back</ButtomStyle>
            <RangerList visibility={View2}>
                {Rangers.map(elem => <div>{elem.user}<br />{elem.color}<br />{elem.zord}<DeleteButtom onClick={()=>{
                    Axios({
                        method: 'delete',
                        url: 'http://localhost:6969/Delete',
                        headers: { 'Content-type': 'application/json' },
                        data:{
                            user: elem.user
                        }
                    }).then((response)=>{
                        alert(JSON.stringify(response.data));
                    }).catch((error)=>{
                        console.log(error);
                    })
                }}/><br /><br /></div>)}
            </RangerList>
        </div>
    )
}

export default Morphin;
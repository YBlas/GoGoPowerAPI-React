import React, { FC } from 'react';
import "./styles/Options.css";

const Options:FC=({children})=>{
    return(
        <div className='Options'>
            {children}
        </div>
    )
}

export default Options;
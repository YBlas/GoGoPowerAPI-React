import React, { FC } from 'react';
import "./styles/Layout.css";

const Layout:FC=({children})=>{
    return(
        <div className='Layout'>
            {children}
        </div>
    )
}

export default Layout;
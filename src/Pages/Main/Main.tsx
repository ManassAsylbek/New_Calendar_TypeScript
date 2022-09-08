import React from 'react';
import style from './Main.module.css'
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";

const Main = () => {
    return (
        <div className={style.main}>
            <Sidebar/>
            <Content/>
        </div>
    );
};

export default Main;
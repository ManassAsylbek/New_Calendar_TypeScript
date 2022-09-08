import React from 'react';
import Header from "../Header/Header";
import style from "./Content.module.css"

const Content = () => {
    return (
        <div className={style.content}>
            <Header />
            {/*<div className={style.content_calendar}>
                {props.selectDate}
            </div>*/}
        </div>
    );
};

export default Content;
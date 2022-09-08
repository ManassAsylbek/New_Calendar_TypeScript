import React from 'react';
import style from "./SideBar.module.css"

import logoColendar from "../../../Media/icons/logoColendar.svg"
import addMarker from "../../../Media/icons/addMarker.svg"
import {Toaster} from "react-hot-toast";
import MiniCalendar from "../MiniCalendar/MiniCalendar";
const Sidebar = () => {
    return (
        <div className={style.sidebar}>
            <div className={style.logo}>
                <img src={logoColendar} alt=""/>
                <span>Calendar</span>
            </div>
            <div className={style.calendar}>
                <button className={style.create} onClick={() =>{}}>Создать</button>
            </div>

            <div className={style.miniCalendar}>
                <MiniCalendar/>
            </div>
            <div className={style.box}></div>

            <div className={style.addMarker}><span>Мои метки</span>
                <button
                    onClick={() =>{}}>
                    <img src={addMarker} alt=""/></button>
            </div>
            <ul>
               {/* {props.markersDate.map(m => <div key={m.id} className={style.mark}
                                                 onClick={() =>{}}>
                    <div style={{backgroundColor: m.color}}></div>
                    <span>{m.name}</span>
                </div>)}*/}
            </ul>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default Sidebar;
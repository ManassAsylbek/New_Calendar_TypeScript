import React from 'react';
import Header from "../Header/Header";
import style from "./Content.module.css"
import {useAppSelector} from "../../../hooks/redux";
import Calendar from "../Calendar/Calendar";
import Day from "./Day/Day";
import Week from "./Week/Week";

const Content = () => {
    const  {dateFormat} = useAppSelector(state => state.dateSlice)
    return (
        <div className={style.content}>
            <Header />
            <div className={style.content_calendar}>
                {dateFormat==="day" && <Day/>}
                {dateFormat==="week" && <Week/>}
                {dateFormat==="month" && <Calendar/>}
            </div>
        </div>
    );
};

export default Content;
import React from 'react';
import style from './Header.module.css'
import leftArrow from "../../../Media/icons/left_arrow.svg"
import rightArrow from "../../../Media/icons/right_arrow.svg"
import search_icon from "../../../Media/icons/Search.svg"
import bell from "../../../Media/icons/bell.svg"
import avatar from "../../../Media/images/avatar-7.jpg"
import {useAppSelector} from "../../../hooks/redux";
import moment from "moment";

import {useMomentDate} from "../../../hooks/momentDate";


const Header = () => {

    const {format} = useAppSelector(state => state.dateSlice)

/*    const dateDay = moment(date).format('DD MMMM YYYY - dddd')*/

    const {nextDate,prevDate,todayDate,setValue}=useMomentDate()

    return (
        <div className={style.header}>
            <div className={style.left}>
                <button className={style.today} onClick={todayDate}>Сегодня
                </button>
                <select className={style.day} id="" onChange={setValue}>
                    <option value="day">День</option>
                    <option value="week">Неделя</option>
                    <option value="month">Месяц</option>
                </select>
                <button className={style.btnArrowLeft} onClick={prevDate}>
                    <img src={leftArrow} alt="стрелка влево"/>
                </button>
                <button className={style.btnArrowRight} onClick={nextDate}>
                    <img src={rightArrow} alt="стрелка вправо"/>
                </button>
                <span className={style.date}>{format}</span>

            </div>
            <div className={style.right}>
                <button className={style.search}
                        onClick={() => {
                        }}>
                    <img src={search_icon} alt=""/>
                </button>
                <button className={style.bell}
                        onClick={() => {
                        }}>
                    <img src={bell} alt=""/>
                </button>
                <div className={style.avatar} onClick={() => {
                }}><img src={avatar} alt=""/>
                </div>
            </div>

        </div>
    );
};

export default Header;
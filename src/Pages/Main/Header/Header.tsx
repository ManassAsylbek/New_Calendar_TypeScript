import React from 'react';
import style from './Header.module.css'
import leftArrow from "../../../Media/icons/left_arrow.svg"
import rightArrow from "../../../Media/icons/right_arrow.svg"
import search_icon from "../../../Media/icons/Search.svg"
import bell from "../../../Media/icons/bell.svg"
import avatar from "../../../Media/images/avatar-7.jpg"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import moment from "moment";
import {dateSlice} from "../../../store/reducer/dateSlice";


const Header = () => {

    const dispatch = useAppDispatch()
    const {addDate} = dateSlice.actions
    const {date} = useAppSelector(state => state.dateSlice)

    const dateDay = moment(date).format('DD MMMM YYYY - dddd')

    const todayDate = () => {
        dispatch(addDate(moment(new Date())))
    }

    return (
        <div className={style.header}>
            <div className={style.left}>
                <button className={style.today} onClick={todayDate}>Сегодня
                </button>
                <select className={style.day} id="" onChange={() => {
                }}>
                    <option value="day">День</option>
                    <option value="week">Неделя</option>
                    <option value="month">Месяц</option>
                </select>
                <button className={style.btnArrowLeft} onClick={() => {
                }}><img src={leftArrow} alt="стрелка влево"/>
                </button>
                <button className={style.btnArrowRight} onClick={() => {
                }}><img src={rightArrow} alt="стрелка вправо"/>
                </button>
                <span className={style.date}>{dateDay}</span>

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
import React, {FC, useEffect, useState} from 'react';
import style from './Header.module.css'
import leftArrow from "../../../Media/icons/left_arrow.svg"
import rightArrow from "../../../Media/icons/right_arrow.svg"
import search_icon from "../../../Media/icons/Search.svg"
import bell from "../../../Media/icons/bell.svg"
import avatar from "../../../Media/images/avatar-7.jpg"
import {useAppSelector} from "../../../hooks/redux";

import {useMomentDate} from "../../../hooks/momentDate";
import Modal from "../../../Modal/modal";
import Notification from "../../../Components/Notification/Notification";
import Search from "../../../Components/Search/Search";
import UserProfile from "../../../Components/UserProfile/UserProfile";
import {getCurrentUser} from "../../../utilits/firebase_utilits";
import {isUserAuthenticated} from "../../../store/Auth/ActionCreatorAuth";


const Header: FC = () => {


    const [notificationActive, setNotificationActive] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
    const [userProfileActive, setUserProfileActive] = useState(false)

    const {nextDate, prevDate, todayDate, setValue} = useMomentDate()

    const {format,} = useAppSelector(state => state.dateSlice)
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
                        onClick={() => setSearchActive(true)}>
                    <img src={search_icon} alt=""/>
                </button>
                <button className={style.bell}
                        onClick={() => setNotificationActive(true)}>
                    <img src={bell} alt=""/>
                </button>
                <div className={style.avatar} onClick={() => setUserProfileActive(true)}><img src={avatar} alt=""/>
                </div>
            </div>
            {notificationActive && <Modal setActive={setNotificationActive} active={notificationActive}
                                          children={<Notification setActive={setNotificationActive}/>}/>}
            {searchActive && <Modal setActive={setSearchActive} active={searchActive}
                                    children={<Search setActive={setSearchActive}/>}/>}
            {userProfileActive && <Modal setActive={setUserProfileActive} active={userProfileActive}
                                         children={<UserProfile setActive={setUserProfileActive}/>}/>}
        </div>
    );
};

export default Header;
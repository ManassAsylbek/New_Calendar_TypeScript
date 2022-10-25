import React, {FC, useEffect, useState} from 'react';
import style from './Header.module.css'
import leftArrow from "../../../Media/icons/left_arrow.svg"
import rightArrow from "../../../Media/icons/right_arrow.svg"
import search_icon from "../../../Media/icons/Search.svg"
import bell from "../../../Media/icons/bell.svg"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import avatar from "../../../Media/images/avatar.png";
import {Popover} from 'antd'
import {useMomentDate} from "../../../hooks/momentDate";
import Modal from "../../../Modal/modal";
import Notification from "../../../Components/Notification/Notification";
import Search from "../../../Components/Search/Search";
import UserProfile from "../../../Components/UserProfile/UserProfile";

import {isForeigner, isRoom} from "../../../store/events/eventSlice";
import {getEvents} from "../../../store/events/ACEvents";
import {getMarkers} from "../../../store/Marker/ActionCreatorMarker";
import EditProfile from "../../../Components/EditProfile/EditProfile";


const Header: FC = () => {


    const [notificationActive, setNotificationActive] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
    const [userProfileActive, setUserProfileActive] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const {nextDate, prevDate, todayDate, setValue} = useMomentDate()

    const {format} = useAppSelector(state => state.dateSlice)
    const {foreigner, room} = useAppSelector(state => state.eventSlice)
    const {user, id} = useAppSelector(state => state.authSlice)
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch()

    const hide = () => {
        setOpen(false)
        dispatch(getMarkers(id))
        dispatch(getEvents(id))
        dispatch(isForeigner(null))
    };
const getRoom = () => {
    dispatch(isRoom(""))
}

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

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
                {room && <div className={style.room} onClick={getRoom}>{room}
                    {/*<button className={style.eventBtn}>
                        <img src={close} alt=""/>
                    </button>*/}
                </div>}
            </div>
            <div className={style.right}>
                <button className={style.search}
                        onClick={() => setSearchActive(true)}>
                    <img src={search_icon} alt=""/>
                </button>
                {!foreigner && <button className={style.bell}
                                       onClick={() => setNotificationActive(true)}>
                    <img src={bell} alt=""/>
                </button>}
                {foreigner && <>
                    <div className={style.foreigner}>
                        <div className={style.foreignerCall}>Чужой календарь</div>
                        <div className={style.foreignerName}>{foreigner.displayName}</div>
                    </div>
                    <Popover
                        content={<div className={style.popover}>
                            <div>{foreigner.displayName}</div>
                            <button onClick={hide}>Выход</button>
                        </div>}
                        trigger="click"
                        placement="bottomRight"
                        color="#2E2E2E"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <div className={style.avatar}>
                            <img src={foreigner?.photoURL ? foreigner.photoURL : avatar} alt=""/>
                        </div>
                    </Popover>
                </>
                }
                <div className={style.avatar} onClick={() => setUserProfileActive(true)}>
                    <img src={user?.photoURL ? user.photoURL : avatar} alt=""/>
                </div>
            </div>
            {notificationActive && <Modal setActive={setNotificationActive} active={notificationActive}
                                          children={<Notification setActive={setNotificationActive}/>}/>}
            {searchActive && <Modal setActive={setSearchActive} active={searchActive}
                                    children={<Search setActive={setSearchActive}/>}/>}
            {userProfileActive && <Modal setActive={setUserProfileActive} active={userProfileActive}
                                         children={<UserProfile setActive={setUserProfileActive}
                                                                setEditActive={setEditActive}/>}/>}
            {editActive && <Modal setActive={setEditActive} active={editActive}
                                  children={<EditProfile setEditActive={setEditActive}/>}/>}
        </div>
    );
};

export default Header;
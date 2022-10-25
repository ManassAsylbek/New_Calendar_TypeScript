import React, {FC} from 'react';
import style from "./Noification.module.css";
import {Popover} from "antd";
import PopoverEdit from "../Popover/popoverEditAnddelete/Popover";
import moment from "moment";
import DelegateButton from "../DelegateButton/DelegateButton";
import avatar from "../../Media/images/avatar.png";
import {IEvent} from "../../Intarface/IEvent";
import {useAppSelector} from "../../hooks/redux";

interface IList {
    e: IEvent;
    setEditEventActive: (pt: boolean) => void
    setEvent: (e: IEvent) => void
}

const NotificationList: FC<IList> = ({e, setEditEventActive, setEvent}) => {
    const {id} = useAppSelector(state => state.authSlice)
    let todayDate = moment(new Date()).format("YYYY-MM-DD")

    const getActive = (e: IEvent) => {
        setEditEventActive(true)
        setEvent(e)
    }

    return (
        <div key={e.id} className={style.message}>
            {e.status.new && e.author?.id!==id
                ? <div className={style.new}/>
                : <div/>}
            <div>
                <div className={style.eventTitle}>
                    <Popover
                        placement="right"
                        color="#FBFCFF"
                        content={() =>
                            <PopoverEdit event={e} setEvent={setEvent} setEditEventActive={setEditEventActive}/>}
                        key={e.id}>
                        <div>{e.title}</div>
                        <div className={style.eventAuthor}>{e.author?.displayName}</div>
                    </Popover></div>

            </div>
            <div>
                <div>{e.date}</div>
                <div>{
                    todayDate === e.date
                        ? "Сегодня"
                        : moment(e.date).format("dddd")}
                </div>
            </div>
            <div>{e.startTime + "-" + e.endTime}</div>
            <div>{e.room}</div>
            <div>{e.repeat}</div>

            {e.author?.id !== id
                ? <DelegateButton event={e}/>
                : e.status.label
                    ? <div>{e.status.label}</div>
                    : <div>Отправлен</div>
            }
            {e.participant && <div className={style.choosePerson}>
                {
                    e.participant.map(user => <div key={user.id} className={style.chooseAvatar}>
                        <img src={user.photoURL ? user.photoURL : avatar}
                             className={style.chooseAvatarImg} alt=""/>
                    </div>)
                }
            </div>
            }


        </div>
    );
};

export default NotificationList;

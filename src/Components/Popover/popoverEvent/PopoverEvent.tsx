import {IEvent} from "../../../Intarface/IEvent";
import style from "./PopoverEvent.module.css";
import edit from "../../../Media/icons/edit.svg";
import basketImg from "../../../Media/icons/basket.svg";
import timeLogo from "../../../Media/icons/time.svg";
import moment from "moment";
import location from "../../../Media/icons/location.svg";
import userLogo from "../../../Media/icons/user.svg";
import reloadLogo from "../../../Media/icons/reload.svg";
import avatar from "../../../Media/images/avatar.png";
import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {setDeleteEvent} from "../../../store/events/ACEvents";
import Modal from "../../../Modal/modal";
import EditEvent from "../../EditEvent/EditEvent";

interface IPopoverEvent {
    event: IEvent
}


const PopoverEvent: FC<IPopoverEvent> = ({event}) => {
    const [editEventActive, setEditEventActive] = useState(false)
    const {id} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()
    const handleRemove = () => {
        dispatch(setDeleteEvent(`events_${id}`, event.id))
        //setOpen(false)
    }
    const handleUpdate = () => {
        setEditEventActive(true)
        // setOpen(false)
    }

    return (<>
            {event && <div className={style.info} onClick={e => e.stopPropagation()}>
                <div className={style.btn}>
                    <img src={edit} alt="" onClick={handleUpdate}/>
                    <img src={basketImg} alt="" onClick={handleRemove}/>
                </div>
                <div className={style.title}>{event.title}</div>
                <div className={style.text}>
                    <img src={timeLogo} alt=""/>{moment(event.date).format('DD MMMM YYYY - dddd')}</div>
                <div className={style.time}><span>{event.startTime}</span> - <span>{event.endTime}</span></div>
                <div className={style.text}><img src={location} alt=""/>{event.room}</div>
                <div className={style.text}>
                    <img src={userLogo} alt=""/>{event.author?.displayName}
                    {
                        event.author?.id === id ? '' : <span>(отправитель)</span>
                    }
                </div>
                <div className={style.text}><img src={reloadLogo} alt=""/>{event.repeat}</div>
                <div className={style.users}>{event.participant.map(user =>
                    <div className={style.chooseAvatar} key={user.id}>
                        <img src={user.photoURL ? user.photoURL : avatar} className={style.chooseAvatarImg} alt=""/>
                    </div>)
                }
                </div>
            </div>
            }
            {editEventActive && event && <Modal setActive={setEditEventActive} active={editEventActive}
                                                children={<EditEvent
                                                    event={event}
                                                    setActive={setEditEventActive}/>}/>}
        </>
    );
}
export default PopoverEvent
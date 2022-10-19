import React, {FC, useState} from 'react';
import style from "./Noification.module.css"
import close from '../../Media/icons/close.svg'
import {eventAPI} from "../../services/eventServices";
import moment from "moment";
import DelegateButton from "../DelegateButton/DelegateButton";
import avatar from "../../Media/images/avatar.png";
import Modal from "../../Modal/modal";
import EditEvent from "../EditEvent/EditEvent";
import {IEvent} from "../../Intarface/IEvent";
import {useAppSelector} from "../../hooks/redux";
import {Popover} from "antd";
import PopoverEdit from "../Popover/popoverEditAnddelete/Popover";


interface NotificationProps {
    setActive: (pt: boolean) => void
}

const Notification: FC<NotificationProps> = ({setActive}) => {
    const [activated, setActivated] = useState(true)
    const [event, setEvent] = useState<IEvent>()
    const [editEventActive, setEditEventActive] = useState(false)
    // const {data: events} = eventAPI.useFetchAllEventsQuery(100)
    const {events} = useAppSelector(state => state.eventSlice)
    const [deleteEvent, {isSuccess: deleteEventSuccess}] = eventAPI.useDeleteEventsMutation()
    const [updateEvent, {
        isSuccess: updateEventSuccess,
        isError: updateEventError,
        isLoading: updateEventLoading
    }] = eventAPI.useUpdateEventsMutation()


    let todayDate = moment(new Date()).format("YYYY-MM-DD")

    const getActive = (e: IEvent) => {
        setEditEventActive(true)
        setEvent(e)
    }

    return (
        <>
            <div className={style.notification} onClick={e => e.stopPropagation()}>
                <div className={style.header}>
                    <div>
                        <h2 className={activated ? `${style.activated}` : `${style.incoming}`}
                            onClick={() => setActivated(true)}>Входящие</h2>
                        <h2 className={!activated ? `${style.activated}` : `${style.sent}`}
                            onClick={() => setActivated(false)}>Отправленные</h2>
                    </div>
                    <button onClick={() => setActive(false)} className={style.eventBtn}>
                        <img src={close} alt=""/>
                    </button>
                </div>
                <div className={style.messageHeader}>
                    <h3>Название события</h3>
                    <h3>Дата встречи</h3>
                    <h3>Время встречи</h3>
                    <h3>Место встречи</h3>
                    <h3>Повтор</h3>
                    <h3>Статус</h3>
                    <h3>Участники</h3>
                </div>
                <div className={style.incomingBody}>
                    {
                        events && events.map(e =>
                            <div key={e.id} className={style.message}>

                                <div>
                                    <div className={style.eventTitle}>
                                        <Popover
                                            placement="right"
                                            color="#FBFCFF"
                                            content={() =>
                                                <PopoverEdit event={e} setEvent={setEvent} setEditEventActive={setEditEventActive} />}
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

                                <DelegateButton event={e}/>

                                    {e.participant && <div className={style.choosePerson}>
                                        {
                                            e.participant.map(user => <div key={user.id} className={style.chooseAvatar}>
                                                <img src={user.photoURL ? user.photoURL : avatar}
                                                     className={style.chooseAvatarImg} alt=""/>
                                            </div>)
                                        }
                                    </div>
                                    }



                            </div>)


                    }
                </div>
            </div>

            {editEventActive && event && <Modal setActive={setEditEventActive} active={editEventActive}
                                                children={<EditEvent
                                                    event={event}
                                                    setActive={setEditEventActive}/>}/>}
        </>
    );
};

export default Notification;
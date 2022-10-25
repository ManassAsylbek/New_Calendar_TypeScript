import React, {FC, useState} from 'react';
import style from "./Noification.module.css"
import close from '../../Media/icons/close.svg'
import Modal from "../../Modal/modal";
import EditEvent from "../EditEvent/EditEvent";
import {IEvent} from "../../Intarface/IEvent";
import NotificationList from "./NotificationList";
import {useFilterEvent} from "../../hooks/filterEvent";


interface NotificationProps {
    setActive: (pt: boolean) => void
}

const Notification: FC<NotificationProps> = ({setActive}) => {


    const [author, setAuthor] = useState<boolean>(false)
    const [event, setEvent] = useState<IEvent>()
    const [editEventActive, setEditEventActive] = useState<boolean>(false)

    const {sent, incoming} = useFilterEvent()
    return (
        <>
            <div className={style.notification} onClick={e => e.stopPropagation()}>
                <div className={style.header}>
                    <div>
                        <h2 className={author ? `${style.activated}` : `${style.incoming}`}
                            onClick={() => setAuthor(false)}>Входящие</h2>
                        <h2 className={author ? `${style.sent}` : `${style.activated}`}
                            onClick={() => setAuthor(true)}>Отправленные</h2>
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
                        !author && incoming.map(e => <NotificationList key={e.id} e={e} setEvent={setEvent}
                                                                       setEditEventActive={setEditEventActive}/>)
                    }
                    {
                        author && sent.map(e => e.participant.length > 1 ?
                            <NotificationList key={e.id} e={e} setEvent={setEvent}
                                              setEditEventActive={setEditEventActive}/>
                            : <div></div>)
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
import React, {FC, useState} from 'react';
import style from './Event.module.css'
import {IEvent} from "../../../../Intarface/IEvent";
import {useFindEvent} from "../../../../hooks/findEventHook";
import moment from "moment";
import {useAppSelector} from "../../../../hooks/redux";
import {Popover} from 'antd'
import PopoverEvent from "../../../../Components/Popover/popoverEvent/PopoverEvent";


interface EventItemProps {
    time: string;
    date: string;
    setEditEvent: (arg: boolean) => void;
    setEventActive: (arg: boolean) => void;
    setEvent: (arg: IEvent | undefined) => void;
}

const Event: FC<EventItemProps> = ({time, date, setEditEvent, setEvent, setEventActive}) => {

    const {id} = useAppSelector(state => state.authSlice)
    const {findEvents} = useFindEvent(time, date)
    const {foreigner} = useAppSelector(state => state.eventSlice)


    return (
        <div className={style.Event}>
            {
                findEvents && findEvents.map(item => (item.status.label === 'Принят' || item.author?.id === id) &&//прверка на свое события или на принятия

                    <Popover key={item.id}
                             color="#FBFCFF" content={() => <PopoverEvent event={item}/>}>
                        <div className={style.item}>
                            <div style={{
                                background: !foreigner
                                    ? item.marker ? item.marker : "gray"
                                    : "gray"
                            }}
                                 className={style.marker}/>
                            <div className={style.EventItem}>
                                {item.title}
                                <div className={style.EventStart}>
                                    {item.startTime}
                                </div>
                            </div>
                        </div>
                    </Popover>)
            }
        </div>


    );
};

export default Event;
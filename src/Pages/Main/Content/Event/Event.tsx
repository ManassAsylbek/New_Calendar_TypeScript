import React, {FC, useState} from 'react';
import style from './Event.module.css'
import {eventAPI} from "../../../../services/eventServices";
import {IEvent} from "../../../../Intarface/IEvent";
import {useFindEvent} from "../../../../hooks/findEventHook";
import moment from "moment";
import {useAppSelector} from "../../../../hooks/redux";


interface EventItemProps {
    time: string;
    date: string;
    setEditEvent: (arg: boolean) => void;
    setEventActive: (arg: boolean) => void;
    setEvent: (arg: IEvent | undefined) => void;
}

const Event: FC<EventItemProps> = ({time, date, setEditEvent, setEvent, setEventActive}) => {

    const [limit, setLimit] = useState(100)

    //const {data: events} = eventAPI.useFetchAllEventsQuery(limit)

    const {events} = useAppSelector(state => state.eventSlice)

    const {findEvent} = useFindEvent(time, date)

    const getEvent = () => {
        if (events)
            events.find((item: IEvent) => item.date === (moment(date).format("YYYY-MM-DD"))
                && item.startTime === time)
                ? setEditEvent(true)
                : setEventActive(true)
    }
    const getActive = (item: IEvent) => {
        setEvent(item)
    }

    return (
        <div onClick={getEvent} className={style.Event}>
            {
                findEvent && findEvent.map(item => <div key={item.id} className={style.item}
                                                        onClick={() => getActive(item)}
                                                        onMouseEnter={() => {
                                                        }}
                                                        onMouseOut={() => {
                                                        }}>
                    <div style={{background: item.marker}} className={style.marker}></div>
                    <div className={style.EventItem}>
                        {item.title}
                        <div className={style.EventStart}>
                            {item.startTime}
                        </div>
                    </div>
                </div>)
            }
        </div>


    );
};

export default Event;
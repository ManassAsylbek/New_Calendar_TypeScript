import React, {FC, useState} from 'react';
import style from './Event.module.css'
import {eventAPI} from "../../../../services/eventServices";
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

    //const [limit, setLimit] = useState(100)

    //const {data: events} = eventAPI.useFetchAllEventsQuery(limit)

    const {events} = useAppSelector(state => state.eventSlice)
    const {id} = useAppSelector(state => state.authSlice)
    const {findEvent} = useFindEvent(time, date)
    const {foreigner} = useAppSelector(state => state.eventSlice)

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
        <div  className={style.Event}>
            {
                findEvent && findEvent.map(item => <Popover
                    color="#FBFCFF" content={() => <PopoverEvent  event={item}/>}
                    /*placement="right" key={item.id}
                    open={open}
                    onOpenChange={handleOpenChange}*/>
                    <div className={style.item}>
                        <div style={{background:item.marker, display: "inline-block"}}
                             className={style.marker}>{/*{item.marker}*/}</div>
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
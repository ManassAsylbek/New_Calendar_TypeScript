import React, {FC, useState} from 'react';
import {useAppSelector} from "../../../../hooks/redux";

import style from "./Day.module.css"
import logoTime from "../../../../Media/icons/logoTime.svg"

import {useWeekDate} from "../../../../hooks/weekHooks";
import Event from "../Event/Event";
import Modal from "../../../../Modal/modal";

import EditEvent from "../../../../Components/EditEvent/EditEvent";
import {times} from "../../../../Constants/constants";
import {IEvent} from "../../../../Intarface/IEvent";
import NewEvent from "../../../../Components/newEvent/newEvent";
import {eventAPI} from "../../../../services/eventServices";



const Day: FC = () => {
    const [eventActive, setEventActive] = useState(false)
    const [editEventActive, setEditEventActive] = useState(false)
    const [timeEvent, setTimeEvent] = useState<string>()
    const [event, setEvent] = useState<IEvent | undefined>()
    const {date} = useAppSelector(state => state.dateSlice)

    const {day, day_date} = useWeekDate()

    const [deleteEvent, {isSuccess: deleteEventSuccess}] = eventAPI.useDeleteEventsMutation()
    const [updateEvent, {
        isSuccess: updateEventSuccess,
        isError: updateEventError,
        isLoading: updateEventLoading,
    }] = eventAPI.useUpdateEventsMutation()


    /*updateEventSuccess && toast.success("Событие успешно редактирована")*/

    /*  updateEventLoading && message.loading('Action in progress..', 0);*/


    return (
        <>

            <div className={style.day}>
                <div className={style.title}>
                    <div className={style.logoTime}>
                        <img src={logoTime} alt=""/>
                    </div>
                    <div className={style.dayNumber}>
                        <h2>{day}</h2>
                        <span>{day_date}</span>
                    </div>
                </div>
                <div className={style.times}>
                    <div className={style.hours}>
                        {times.map((t) => <div key={t.id} className={style.hour}>{t.time}</div>)}
                    </div>
                    <div>
                        {
                            times.map((t) =>
                                <div key={t.id} onClick={() => setTimeEvent(t.time)}
                                     className={style.hours_items}>
                                    <Event
                                        setEditEvent={setEditEventActive}
                                        setEventActive={setEventActive}
                                        setEvent={setEvent}
                                        time={t.time}
                                        date={date}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {eventActive && <Modal setActive={setEventActive} active={eventActive}
                                   children={<NewEvent
                                       time={timeEvent}
                                       date={date}
                                       setActive={setEventActive}/>}/>}

            {editEventActive && event && <Modal setActive={setEditEventActive} active={editEventActive}
                                                children={<EditEvent
                                                    event={event}
                                                    setActive={setEditEventActive}/>}/>}
        </>
    );
};

export default Day;
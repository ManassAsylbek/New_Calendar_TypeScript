import React, {FC, useState} from 'react';
import style from "../Week/Week.module.css";
import logoTime from "../../../../Media/icons/logoTime.svg";
import {useWeekDate} from "../../../../hooks/weekHooks";
import Event from "../Event/Event";
import Modal from "../../../../Modal/modal";
import EditEvent from "../../../../Components/EditEvent/EditEvent";
import {times} from "../../../../Constants/constants";
import {IEvent} from "../../../../Intarface/IEvent";
import NewEvent from "../../../../Components/newEvent/newEvent";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {dateSlice} from "../../../../store/Date/dateSlice";



const Week: FC = () => {

    const {date} = useAppSelector(state => state.dateSlice)

    const [eventActive, setEventActive] = useState(false)
    const [editEventActive, setEditEventActive] = useState(false)
    const [event, setEvent] = useState<IEvent | undefined>()
    const [timeEvent, setTimeEvent] = useState<string>()
    const {foreigner} = useAppSelector(state => state.eventSlice)
    const {wd, wno,} = useWeekDate()
    const dispatch = useAppDispatch()
    const {addDate} = dateSlice.actions


    const setDate = (time:string,date:string) => {
        !foreigner &&  setEventActive(true)
        dispatch(addDate( date))
        setTimeEvent(time)
    }

    return (
        <>
            <div className={style.week}>
                <div className={style.title}>
                    <div className={style.logoTime}><img src={logoTime} alt=""/></div>
                    <div className={style.weekNumber}>
                        {wno.map((n, i) => <div className={style.weekItem} key={n.id}>
                            <h2>{n.d}</h2>
                            <span>{wd[i]}</span></div>)}
                    </div>
                </div>
                <div className={style.times}>
                    <div className={style.hours}>
                        {times.map((t) => <div key={t.id} className={style.hour}>{t.time}</div>)}
                    </div>
                    <div className={style.hour_items}>
                        {
                            times.map((t) => <div key={t.id}
                                                  onClick={() => {
                                                  }}
                                                  className={style.day_items}>
                                    {
                                        wno.map(n => <div key={n.id} onClick={() => setDate(t.time, n.date)}
                                                          className={style.item}>

                                                    <Event
                                                        setEditEvent={setEditEventActive}
                                                        setEventActive={setEventActive}
                                                        setEvent={setEvent}
                                                        time={t.time}
                                                        date={n.date}
                                                    />
                                            </div>
                                        )}
                                </div>
                            )}

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

export default Week;
import React from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import moment from "moment";
import style from "./Day.module.css"
import logoTime from "../../../../Media/icons/logoTime.svg"

const times = [
    {id: 1, time: "09:00"},
    {id: 2, time: "10:00"},
    {id: 3, time: "11:00"},
    {id: 4, time: "12:00"},
    {id: 5, time: "13:00"},
    {id: 6, time: "14:00"},
    {id: 7, time: "15:00"},
    {id: 8, time: "16:00"},
    {id: 9, time: "17:00"},
    {id: 10, time: "18:00"}
]

const Day = () => {
    const {date} = useAppSelector(state => state.dateSlice)
    const day = moment(date).format('dd')
    const day_date = moment(date).format('DD')
    return (
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
                    {times.map((t) => <div key={t.id}>{t.time}</div>)}
                </div>
                <div className={style.hours_items}>
                    {
                        times.map((t) =>
                            <div key={t.id} onClick={() => {}}>
                                <div >

                                    {/*<Event date={props.date}
                                           time={t.time}
                                           events={props.events}
                                           setEditActive={props.setEditActive}
                                           setEventActive={props.setEventActive}
                                           setEventValue={props.setEventValue}
                                           setInfoActive={props.setInfoActive}
                                           setLocationInfo={props.setLocationInfo}

                                    />*/}

                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>

    );
};

export default Day;
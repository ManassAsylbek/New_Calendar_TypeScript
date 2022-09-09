import React, {useState} from 'react';
import style from "../Week/Week.module.css";
import logoTime from "../../../../Media/icons/logoTime.svg";
import {useWeekDate} from "../../../../hooks/weekHooks";

const times=[
    {id:1,  time:"09:00" },
    {id:2,  time:"10:00" },
    {id:3,  time:"11:00" },
    {id:4,  time:"12:00" },
    {id:5,  time:"13:00" },
    {id:6,  time:"14:00" },
    {id:7,  time:"15:00" },
    {id:8,  time:"16:00" },
    {id:9,  time:"17:00" },
    {id:10, time:"18:00" }
]

const Week = () => {

    const [events, setEvents] = useState([])

const {wd,wno} = useWeekDate()


    return (
        <div className={style.week}>
            <div className={style.title}>
                <div className={style.logoTime}><img src={logoTime} alt=""/></div>
                <div className={style.weekNumber}>
                    {wno.map((n, i) => <div className={style.weekItem}>
                        <h2>{n.d}</h2>
                        <span>{wd[i]}</span></div>)}
                </div>
            </div>
            <div className={style.times}>
                <div className={style.hours}>
                    {times.map((t) => <div   key={t.id}>{t.time}</div>)}
                </div>
                <div className={style.hour_items}>
                    {
                        times.map((t) => <div
                                onClick={() => {}}
                                className={style.day_items} key={t.id}>

                                {
                                    wno.map(n => <div key={n} onClick={()=>{}}
                                                      className={style.item}>
                                            <div>
                                                {/*<Event date={n.date} time={t.time} events={events}
                                                       setEditActive={props.setEditActive}
                                                       setEventValue={props.setEventValue}
                                                       setEventActive={props.setEventActive}
                                                       setInfoActive={props.setInfoActive}
                                                       setLocationInfo={props.setLocationInfo}
                                                />*/}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )}

                </div>
            </div>


        </div>
    );
};

export default Week;
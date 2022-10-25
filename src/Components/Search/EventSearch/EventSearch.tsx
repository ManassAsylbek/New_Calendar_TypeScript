import React, {FC} from 'react';
import style from "./EventSearch.module.css";
import avatar from "../../../Media/images/avatar.png";
import {IUser} from "../../../Intarface/IUser";
import {getEvents} from "../../../store/events/ACEvents";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {isForeigner} from "../../../store/events/eventSlice"
import {getMarkers} from "../../../store/Marker/ActionCreatorMarker";
import {IEvent} from "../../../Intarface/IEvent";
import {dateSlice} from "../../../store/Date/dateSlice";


interface IList {
    list: IEvent[]
    setActive: (pt: boolean) => void
}

const EventSearch: FC<IList> = ({list,setActive}) => {
    const dispatch = useAppDispatch()
    const {addDate, changeDateFormat} = dateSlice.actions
    const {id} = useAppSelector(state => state.authSlice)
    const {foreigner} = useAppSelector(state => state.eventSlice)
    const getUserEvent=(event:IEvent)=>{
        dispatch(changeDateFormat("day"))
        dispatch(addDate(event.date))
        setActive(false)
    }
    return (
        <div className={style.person}>
            {list && list.map(event =>(event.status.label === 'Принят' || event.author?.id ===foreigner?.id || event.author?.id === id) &&
                <div className={style.chooseAvatar}>
                    <div className={style.Avatar} onClick={()=>getUserEvent(event)}>
                        <div style={{
                            background: !foreigner
                                ? event.marker ? event.marker : "gray"
                                : "gray"
                        }}
                             className={style.marker}/>
                        <div>
                            <div className={style.name}>{event.title}</div>
                            <div className={style.invite}>{event.access}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
};

export default EventSearch;
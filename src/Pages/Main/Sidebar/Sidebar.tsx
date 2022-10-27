import React, {FC, useState} from 'react';
import style from "./SideBar.module.css"
import logoColendar from "../../../Media/icons/logoColendar.svg"
import addMarker from "../../../Media/icons/addMarker.svg"
import edit from "../../../Media/icons/edit.svg"
import basketImg from "../../../Media/icons/basket.svg"
import MiniCalendar from "../MiniCalendar/MiniCalendar";
import Modal from "../../../Modal/modal";
import NewEvent from "../../../Components/newEvent/newEvent";
import Marker from "../../../Components/marker/Marker";
import EditMarker from "../../../Components/EditMarker/EditMarker";
import {isMarker} from "../../../store/events/eventSlice";
import {IMarker} from "../../../Intarface/IMarker";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {setUpdateEvent,} from "../../../store/events/ACEvents";
import {setDeleteMarker} from "../../../store/Marker/ActionCreatorMarker";
import Preloader from "../../../Components/Preloader/Preloader";


const Sidebar: FC = () => {

    const {date} = useAppSelector(state => state.dateSlice)

    const [eventActive, setEventActive] = useState(false)
    const [markerActive, setMarkerActive] = useState(false)
    const [editMarkerActive, setEditMarkerActive] = useState(false)
    const [marker, setMarker] = useState<IMarker>({label: "", value: "", id: ""})
    const {id} = useAppSelector(state => state.authSlice)
    const {errorEvent, foreigner, events, selectMarker} = useAppSelector(state => state.eventSlice)
    const {markers, isLoadingMarker,} = useAppSelector(state => state.markerSlice)


    const dispatch = useAppDispatch()
    const onEditMarker = (marker: IMarker) => {
        setMarker(marker)
        setEditMarkerActive(!editMarkerActive)
    }
    const getMarker = (marker: IMarker) => {
        setMarker(marker)
        marker.value === selectMarker
            ? dispatch(isMarker(""))
            : dispatch(isMarker(marker.value))
    }
    const removeMarker = (marker: IMarker) => {
        events && events.forEach(event => {
            const updateEventValue = {...event, marker: marker.value === event.marker ? null : event.marker}//проверяяет на совпадение с ткушим маркером и и меняяет
            dispatch(setUpdateEvent(`events_${id}`, event.id, updateEventValue))
        })
        dispatch(setDeleteMarker(`markers_${id}`, marker.id))
    }


    return (
        <div className={style.sidebar}>
            <div className={style.logo}>
                <img src={logoColendar} alt=""/>
                <span>Calendar</span>
            </div>
            <div className={style.calendar}>
                <button className={style.create} onClick={() => setEventActive(!eventActive)}>Создать</button>
            </div>

            <div className={style.miniCalendar}>
                <MiniCalendar/>
            </div>
            <div className={style.box}></div>

            <div className={style.addMarker}>{!foreigner
                ? <span>Мои метки</span>
                : <span>{`Метки ${foreigner.displayName}`}</span>}
                {!foreigner && <button
                    onClick={() => setMarkerActive(!markerActive)}>
                    <img src={addMarker} alt=""/>
                </button>}
            </div>

            <ul>
                {errorEvent && <h1>error</h1>}
                {isLoadingMarker
                    ? <Preloader loader={false}/>
                    : <>
                        <div className={style.mark}>
                            <div className={style.markerName} onClick={() => getMarker({
                                label: "Без метки",
                                value: "null",
                                id: "#808080"
                            })}
                                 style={{backgroundColor: selectMarker === "null" ? "#808080" : "transparent"}}>
                                <div style={{backgroundColor: "#808080"}} className={style.colorBox}/>
                                <div>Без метки</div>
                            </div>
                        </div>

                        {markers && markers.map((m) =>
                            <div key={m.id} className={style.mark}
                                /*onClick={() => onEditMarker(m)}*/>
                                <div className={style.markerName} onClick={() => getMarker(m)}
                                     style={{backgroundColor: selectMarker === m.value ? m.value : "transparent"}}>
                                    <div style={{backgroundColor: m.value}} className={style.colorBox}/>
                                    <div>{m.label}</div>
                                </div>

                                {!foreigner &&
                                <img src={edit} alt="" onClick={() => onEditMarker(m)} className={style.edit}/>}
                                {!foreigner && <img src={basketImg} alt="" onClick={() => removeMarker(m)}
                                                    className={style.delete}/>}
                            </div>)}
                    </>}
            </ul>


            {eventActive && <Modal setActive={setEventActive} active={eventActive}
                                   children={<NewEvent
                                       date={date}
                                       setActive={setEventActive}/>}/>}

            {markerActive && <Modal setActive={setMarkerActive} active={markerActive}
                                    children={<Marker setActive={setMarkerActive}/>}/>}
            {editMarkerActive && <Modal setActive={setEditMarkerActive} active={editMarkerActive}
                                        children={<EditMarker marker={marker}
                                                              setActive={setEditMarkerActive}/>}/>}
        </div>
    );
};

export default Sidebar;
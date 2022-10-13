import React, {FC, useState} from 'react';
import style from "./SideBar.module.css"
import {message } from 'antd';
import logoColendar from "../../../Media/icons/logoColendar.svg"
import addMarker from "../../../Media/icons/addMarker.svg"
import MiniCalendar from "../MiniCalendar/MiniCalendar";
import {markerAPI} from "../../../services/markerServices";
import Modal from "../../../Modal/modal";
import NewEvent from "../../../Components/newEvent/newEvent";
import Marker from "../../../Components/marker/Marker";

import EditMarker from "../../../Components/EditMarker/EditMarker";

import {IMarker} from "../../../Intarface/IMarker";

import {useAppSelector} from "../../../hooks/redux";
import {Toaster} from "react-hot-toast";
import {getUsersAndDocuments} from "../../../utilits/firebase_utilits";



const Sidebar:FC = () => {

    const {date} = useAppSelector(state => state.dateSlice)

    const [eventActive, setEventActive] = useState(false)
    const [markerActive, setMarkerActive] = useState(false)
    const [editMarkerActive, setEditMarkerActive] = useState(false)
    const [limit, setLImit] = useState(10)
    const [marker, setMarker] = useState<IMarker>({label:"",value:"",id:0})

    const {data:markers,error,isLoading } = markerAPI.useFetchAllMarkersQuery(limit)

  /*  isLoading && message.loading('Action in progress..', 0);
*/

    const onEditMarker = (marker: IMarker) => {
        setMarker(marker)
        setEditMarkerActive(!editMarkerActive)
    }

    const user= async ()=> {
        let us = await getUsersAndDocuments()
        console.log(us)
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

            <div><button onClick={user}>users</button></div>
            <div className={style.addMarker}><span>Мои метки</span>
                <button
                    onClick={() => setMarkerActive(!markerActive)}>
                    <img src={addMarker} alt=""/></button>
            </div>
            <ul>
                {isLoading && <h1>loading</h1>}
                {error && <h1>error</h1>}
                {markers && markers.map((m) =>
                    <div key={m.id} className={style.mark}
                         onClick={() => onEditMarker(m)}>
                        <div style={{backgroundColor: m.value}}></div>
                        <span>{m.label}</span>
                    </div>)}
            </ul>


            {eventActive && <Modal setActive={setEventActive} active={eventActive}
                                   children={<NewEvent
                                       date={date}
                                       setActive={setEventActive}/>}/>}

            {markerActive && <Modal setActive={setMarkerActive} active={markerActive}
                                    children={<Marker setActive={setMarkerActive} />}/>}
            {editMarkerActive && <Modal setActive={setEditMarkerActive} active={editMarkerActive}
                                  children={<EditMarker marker={marker}
                                                        setActive={setEditMarkerActive}/>}/>}
            <Toaster
                position="top-center"
            />
        </div>
    );
};

export default Sidebar;
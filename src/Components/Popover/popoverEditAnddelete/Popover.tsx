import React, {FC, useState} from 'react';
import {IEvent} from "../../../Intarface/IEvent";
import style from "./Popover.module.css";
import edit from "../../../Media/icons/edit.svg";
import basketImg from "../../../Media/icons/basket.svg";
import {setDeleteEvent} from "../../../store/events/ACEvents";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import Modal from "../../../Modal/modal";
import EditEvent from "../../EditEvent/EditEvent";

interface IPopover {
    event:IEvent
    setEditEventActive: (pt: boolean) => void
    setEvent:(event:IEvent) => void
}

const PopoverEdit:FC<IPopover> = ({event,setEditEventActive,setEvent}) => {
   /* const [editEventActive, setEditEventActive] = useState(false)*/
    const {id} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const handleRemove = () => {
        console.log(`events_${id}`, event.id)
        dispatch(setDeleteEvent(`events_${id}`, event.id))


    }
    const handleUpdate = () => {
        setEvent(event)
        setEditEventActive(true)
    }

    return (
        <div className={style.popoverEdit}>
            <div  onClick={handleUpdate}><img src={edit} alt=""/>Редоктировать</div>
            <div onClick={handleRemove}><img src={basketImg} alt="" />Удалить</div>

        </div>
    );
};

export default PopoverEdit;
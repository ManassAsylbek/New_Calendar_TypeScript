import React, {FC, useState} from 'react';
import style from "../Notification/Noification.module.css";
import accepted from "../../Media/icons/accepted.svg";
import delegate from "../../Media/icons/delegate.svg";
import rejected from "../../Media/icons/rejected.svg";
import Modal from "../../Modal/modal";
import InviteParticipants from "../inviteParticipants/inviteParticipants";
import {IEvent} from "../../Intarface/IEvent";
import {IUser} from "../../Intarface/IUser";
import {setUpdateEvent} from "../../store/events/ACEvents";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";



interface DelegateButtonType {
    event:IEvent
}
const DelegateButton: FC<DelegateButtonType> = ({event}) => {
    const [delegateActive, setDelegateActive] = useState(false)
    const [delegateUser, setDelegateUser] = useState<Array<IUser>>([])
    const [statusToggle, setStatusToggle] = useState<string|null>()
    const {id} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const status:(status:string)=>void = (status) => {
        const newEvent = {
            ...event, status: {label:status, value: null,new:false},marker:null
        }//
        dispatch(setUpdateEvent(`events_${id}`, event.id, newEvent))

    }
    return (
        <>{
            !event.status.label&& <div className={style.btn}>
                <button  onClick={()=>status('Принят')}><img src={accepted} alt=""/></button>
                <button onClick={()=>setDelegateActive(true)}><img src={delegate} alt="" /></button>
                <button onClick={()=>status('Отклонен')}><img src={rejected} alt="" /></button>

            </div>
        }
            {
                event.status.label && <div>{event.status.label}</div>
            }
            {delegateActive && <Modal setActive={setDelegateActive} active={delegateActive}
                                      children={<InviteParticipants event={event}
                                                                    label={"Делегировать"}
                                                                    setStatus={setStatusToggle}
                                                                    onChange={setDelegateUser}
                                                                    delegate={"delegate"}
                                                                    setActive={setDelegateActive}/>}/>}
        </>
    )
}

export default DelegateButton;
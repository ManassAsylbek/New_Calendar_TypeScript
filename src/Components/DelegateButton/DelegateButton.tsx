import React, {FC, useState} from 'react';
import style from "../Notification/Noification.module.css";
import accepted from "../../Media/icons/accepted.svg";
import delegate from "../../Media/icons/delegate.svg";
import rejected from "../../Media/icons/rejected.svg";
import Modal from "../../Modal/modal";
import InviteParticipants from "../inviteParticipants/inviteParticipants";
import {userAPI} from "../../services/userServicse";
import {eventAPI} from "../../services/eventServices";
import {IEvent} from "../../Intarface/IEvent";
import {IUser} from "../../Intarface/IUser";



interface DelegateButtonType {
    event:IEvent
}
const DelegateButton: FC<DelegateButtonType> = ({event}) => {
    const [delegateActive, setDelegateActive] = useState(false)
    const [delegateUser, setDelegateUser] = useState<Array<IUser>>()
    const [statusToggle, setStatusToggle] = useState<string|null>()
    const {data:users} = userAPI.useFetchAllUsersQuery(10)
    const [updateEvent,{}]=eventAPI.useUpdateEventsMutation()
    const delegateStatus = () => {
        setDelegateActive(true)

    }
    return (
        <>{
            !event.status.label&& <div className={style.btn}>
                <button  onClick={()=>setStatusToggle('Принят')}><img src={accepted} alt=""/></button>
                <button onClick={delegateStatus}><img src={delegate} alt="" /></button>
                <button onClick={()=>setStatusToggle('Отклонен')}><img src={rejected} alt="" /></button>

            </div>
        }
            {
                event.status.label && <div>{event.status.label}</div>
            }
            {delegateActive && <Modal setActive={setDelegateActive} active={delegateActive}
                                      children={<InviteParticipants event={event}
                                                                    users={users}
                                                                    label={"Делегировать"}
                                                                    setStatus={setStatusToggle}
                                                                    setActive={setDelegateActive}
                                                                    updateEvent={updateEvent}/>}/>}
        </>
    )
}

export default DelegateButton;
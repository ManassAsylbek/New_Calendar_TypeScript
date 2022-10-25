import React, {FC, useEffect, useState} from 'react';
import style from "./InviteParticipants.module.css"
import close from '../../Media/icons/close.svg'
import redClose from '../../Media/icons/redClose.svg'
import search_icon from "../../Media/icons/Search.svg";
import avatar from "../../Media/images/avatar.png";
import {IUser} from "../../Intarface/IUser";
import {useFilterPerson} from "../../hooks/filterPerson";
import {useSearch} from "../../hooks/useSearch";
import {IEvent} from "../../Intarface/IEvent";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setEvents, setUpdateEvent} from "../../store/events/ACEvents";


interface InviteParticipantsType {
    setActive: (pt: boolean) => void;
    label: string
    setStatus?: (pt: string) => void;
    onChange?: (users: Array<IUser>) => void
    value?: Array<IUser> | undefined
    event?: IEvent
    delegate?: string
}

const InviteParticipants: FC<InviteParticipantsType> = ({
                                                            setActive, label,
                                                            setStatus,
                                                            onChange, value, event,
                                                            delegate
                                                        }) => {

    const {id} = useAppSelector(state => state.authSlice)

    const {addUser, removeUser, newUsers, setNewUsers} = useFilterPerson(value)
    const {searchUsers, getSearch} = useSearch()
    const dispatch = useAppDispatch()

    const selectPerson = () => {
      /*  if (event && newUsers && setStatus && label === 'Делегировать') {
            /!*updateEvent({...event, status: {label: 'Делегирован', value: newUsers}})*!/
            setStatus('Делегирован')
        }*/
        if (delegate && event && newUsers.length > 0) {
            const newEvent = {
                ...event, status: {label: 'Делегирован', value: [...newUsers],new:false}
            }//delegate users
            console.log(newEvent)
            dispatch(setEvents(id, newEvent)) //отправляем события для делегированный пользавтелей
            dispatch(setUpdateEvent(`events_${id}`, event.id, newEvent))//обновляем текушия события
        }
        onChange && onChange(newUsers)
        setActive(false)
    }

    useEffect(() => {
        value && setNewUsers(value)
    }, [value])

    return (
        <div className={style.Content} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <h2>{label}</h2>
                <button onClick={() => setActive(false)}
                        className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
            </div>
            <div>
                <div className={style.searchInput}>
                    <img src={search_icon} alt=""/>
                    <input onChange={getSearch} className={style.titleInput}/>
                </div>
            </div>
            <div className={style.body}>
                {searchUsers && searchUsers.map((user) =>
                    <div className={style.person} onClick={() => addUser(user)} key={user.id}>
                        <div className={style.avatar} onClick={() => {
                        }}>
                            <img src={user.photoURL ? user.photoURL : avatar} className={style.avatarImg} alt=""/>
                        </div>
                        <div className={style.name}>{user.displayName}</div>
                        <div>{user.position}</div>
                        <div>{user.department}</div>
                    </div>)
                }
            </div>

            <div className={style.choosePerson}>
                {
                    newUsers && newUsers.map(user =>
                        <div className={style.chooseAvatar} key={user.id}>
                            <img src={user.photoURL ? user.photoURL : avatar} className={style.chooseAvatarImg} alt=""/>
                            {user.id !== id
                                ? <img src={redClose} className={style.redClose} alt=""
                                       onClick={() => removeUser(user.id)}/>
                                : <></>}
                        </div>)
                }
            </div>
            <div className={style.footer}>
                <button onClick={selectPerson}>{label}</button>
            </div>
        </div>
    );
};

export default InviteParticipants;
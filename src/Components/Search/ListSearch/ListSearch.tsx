import React, {FC} from 'react';
import style from "./ListSearch.module.css";
import avatar from "../../../Media/images/avatar.png";
import {IUser} from "../../../Intarface/IUser";
import {getEvents} from "../../../store/events/ACEvents";
import {useAppDispatch} from "../../../hooks/redux";
import {isForeigner} from "../../../store/events/eventSlice"
import {getMarkers} from "../../../store/Marker/ActionCreatorMarker";


interface IList {
    list: IUser[]
    setActive: (pt: boolean) => void
}

const ListSearch: FC<IList> = ({list,setActive}) => {
    const dispatch = useAppDispatch()

    const getUserEvent=(user:IUser)=>{
        dispatch(isForeigner(user))
        dispatch(getEvents(user.id))
        dispatch(getMarkers(user.id))
        setActive(false)
    }
    return (
        <div className={style.person}>
            {list && list.map(user =>
                <div className={style.chooseAvatar}>
                    <div className={style.Avatar} onClick={()=>getUserEvent(user)}>
                        <img src={user.photoURL ? user.photoURL : avatar} className={style.chooseAvatarImg} alt=""/>
                        <div>
                            <div className={style.name}>{user.displayName}</div>
                            <div className={style.invite}>{user.position}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
};

export default ListSearch;
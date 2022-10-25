import React, {FC, useState} from 'react';
import style from "./UserProfile.module.css"
import close from '../../Media/icons/close.svg'

import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import person from "../../Media/images/avatar.png";
import {signOut} from "../../store/Auth/ActionCreatorAuth";
import {isForeigner} from "../../store/events/eventSlice";



interface UserProfileProps {
    setActive: (pt: boolean) => void
    setEditActive: (pt: boolean) => void

}


const UserProfile: FC<UserProfileProps> = ({setActive,setEditActive}) => {
    const {user} = useAppSelector(state => state.authSlice)
/*    const [editActive, setEditActive] = useState(false)*/
    const dispatch = useAppDispatch()
    const editProfile =()=>{
        setEditActive(true)
        setActive(false)
    }

    const logout = () => {
        dispatch(signOut())
        dispatch(isForeigner(null))
    };
    return (
        <div className={style.newEventContent} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <button onClick={() => setActive(false)} className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
                {user &&
                <div className={style.info}>
                    <div className={style.avatar} onClick={editProfile}>
                        <img className={style.avatarImg} src={user.photoURL?user.photoURL:person} alt=""/>
                    </div>
                    <div className={style.name}>{user.displayName}</div>
                    <div className={style.email}>{user.email}</div>
                </div>
                }


            </div>

            {user &&
            <div className={style.body}>
                <div className={style.userInfo}>{user.displayName}</div>
                <div className={style.userInfo}>{user.position}</div>
                <div className={style.userInfo}>{user.email}</div>
                <div className={style.userInfo}>{user.department}</div>
                <button className={style.btn} onClick={logout}>logout</button>
            </div>
            }
           {/* {editActive && <Modal setActive={setEditActive} active={editActive}
                                   children={<EditProfile/>}/>}*/}
        </div>
    );
};

export default UserProfile;
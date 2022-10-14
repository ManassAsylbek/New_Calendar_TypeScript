import React, {FC} from 'react';
import style from "./UserProfile.module.css"
import close from '../../Media/icons/close.svg'

import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import person from "../../Media/icons/person.svg";
import {signOut} from "../../store/Auth/ActionCreatorAuth";


interface UserProfileProps {
    setActive: (pt: boolean) => void
}


const UserProfile: FC<UserProfileProps> = ({setActive}) => {
    const {user} = useAppSelector(state => state.authSlice)

    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(signOut())
    };
    return (
        <div className={style.newEventContent} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <button onClick={() => setActive(false)} className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
                {user &&
                <div className={style.user}>
                    <div className={style.avatar}>
                        <img src={person} alt=""/>
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

        </div>
    );
};

export default UserProfile;
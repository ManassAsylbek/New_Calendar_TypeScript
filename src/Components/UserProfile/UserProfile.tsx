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
    const logout =() => {
        dispatch(signOut())
    };
    return (
        <div className={style.newEventContent} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <button onClick={() => setActive(false)} className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
                {user && <>
                    <div className={style.avatar}>
                        <img src={person} alt=""/>
                    </div>
                    <h2>{user.displayName}</h2>
                    <h2>{user.email}</h2>
                </>}
                {/*  <h2>{user.department}</h2>
                <h2>{position}</h2>*/}

            </div>
            <form className={style.body} action="javascript:void (0)">
                <div>

                </div>
                <button onClick={logout}>logout</button>

            </form>
        </div>
    );
};

export default UserProfile;
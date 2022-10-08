import React, {FC} from 'react';
import style from "./UserProfile.module.css"
import close from '../../Media/icons/close.svg'
import {getAuth, signOut} from "firebase/auth";
import {removeUser} from "../../store/reducer/authSlices";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";


interface UserProfileProps {
    setActive: (pt: boolean) => void
}


const UserProfile: FC<UserProfileProps> = ({setActive}) => {
    const dispatch = useAppDispatch()
    const auth = getAuth();
    const logout = async () => {
        await signOut(auth);
        dispatch(removeUser())
    };
    return (
        <div className={style.newEventContent} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <h2>Profile</h2>
                <button onClick={() => setActive(false)} className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
            </div>
            <form className={style.body} action="javascript:void (0)">
                <div>
                    <h4>Название</h4>
                </div>
                <button onClick={logout}>logout</button>

            </form>
        </div>
    );
};

export default UserProfile;
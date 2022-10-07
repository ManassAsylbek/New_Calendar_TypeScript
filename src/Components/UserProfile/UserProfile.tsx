import React, {FC} from 'react';
import style from "./UserProfile.module.css"
import close from '../../Media/icons/close.svg'

interface UserProfileProps {
    setActive: (pt: boolean) => void
}


const UserProfile:FC<UserProfileProps>= ({setActive}) => {
    return (
        <div className={style.newEventContent} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <h2>Profile</h2>
                <button onClick={()=>setActive(false)} className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
            </div>
            <form  className={style.body} action="javascript:void (0)">
                <div>
                    <h4>Название</h4>
                </div>

            </form>
        </div>
    );
};

export default UserProfile;
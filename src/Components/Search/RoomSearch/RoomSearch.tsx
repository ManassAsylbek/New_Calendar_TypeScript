import React, {FC} from 'react';
import style from "./RoomSearch.module.css";
import {useAppDispatch} from "../../../hooks/redux";
import {IOption} from "../../../Intarface/isShippingField";
import {isRoom} from "../../../store/events/eventSlice";

interface IList {
    list: IOption[]
    setActive: (pt: boolean) => void
}

const RoomSearch: FC<IList> = ({list, setActive}) => {
    const dispatch = useAppDispatch()

    const getUserEvent = (position: IOption) => {
        dispatch(isRoom(position.value))
        setActive(false)
    }
    return (
        <div className={style.person}>
            {list && list.map(position =>
                <div className={style.chooseAvatar}>
                    <div className={style.Avatar} onClick={() => getUserEvent(position)}>
                        <div className={style.name}>{position.value}</div>
                    </div>
                </div>)
            }
        </div>
    )
};

export default RoomSearch;
import React, {FC} from 'react';
import style from "./PositionSearch.module.css";
import {useAppDispatch} from "../../../hooks/redux";
import {IOption} from "../../../Intarface/isShippingField";


interface IList {
    list: IOption[]
    setActive: (pt: boolean) => void
}

const PositionSearch: FC<IList> = ({list,setActive}) => {
    const dispatch = useAppDispatch()

    const getUserEvent=(position:IOption)=>{

        setActive(false)
    }
    return (
        <div className={style.person}>
            {list && list.map(position =>
                <div className={style.chooseAvatar}>
                    <div className={style.Avatar} onClick={()=>getUserEvent(position)}>
                            <div className={style.name}>{position.value}</div>
                    </div>
                </div>)
            }
        </div>
    )
};

export default PositionSearch;
import React, {FC, useState} from 'react';
import style from "./Search.module.css"
import close from '../../Media/icons/close.svg'
import folder from '../../Media/icons/folder.svg'
import person from '../../Media/icons/person.svg'
import bag from '../../Media/icons/bag.svg'
import local from '../../Media/icons/locol.svg'
import search_icon from "../../Media/icons/Search.svg";
import ListSearch from "../ListSearch/ListSearch";
import {IUser} from "../../Intarface/IUser";
import {useAppSelector} from "../../hooks/redux";
import {useSearch} from "../../hooks/useSearch";

interface searchProps {
    setActive: (pt: boolean) => void
}

const Search: FC<searchProps> = ({setActive}) => {
    const  searchArray:any = []
    const [title,setTitle] = useState<string>('all')

    const [list,setList] = useState<IUser[]>([])
    const {searchUsers, search} = useSearch()


    // @ts-ignore
    return (
        <div className={style.search} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <img src={search_icon} alt="" className={style.searchImg}/>
                <input className={style.titleInput} onChange={search}/>
                <button onClick={() => setActive(false)} className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
            </div>
            <div className={style.body}>
                <div className={style.bodyHeader}>
                    <div className={title==='all'?`${style.active}`:`${style.title}`}
                         onClick={()=>setTitle('all')}>
                        <div>Все</div>
                    </div>
                    <div className={title==='title'?`${style.active}`:`${style.title}`}
                         onClick={()=>setTitle('title')}>
                        <img src={folder} alt=""/>
                        <div>События</div>
                    </div >
                    <div  className={title==='co-worker'?`${style.active}`:`${style.title}`}
                          onClick={()=>setTitle('co-worker')}>
                        <img src={person} alt=""/>
                        <div>Сотрудник</div>
                    </div>
                    <div className={title==='position'?`${style.active}`:`${style.title}`}
                         onClick={()=>setTitle('position')}>
                        <img src={bag} alt=""/>
                        <div>Должность</div>
                    </div>
                    <div className={title==='room'?`${style.active}`:`${style.title}`}
                         onClick={()=>setTitle('room')}>
                        <img src={local} alt=""/>
                        <div>Конф. зал</div>
                    </div>
                </div>
                <div className={style.content}>
                    {
                        (title=== 'all')&& <ListSearch list={searchUsers} setActive={setActive} />
                    }
                    {
                        (title=== 'co-worker')&& <ListSearch list={searchUsers} setActive={setActive} />
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;
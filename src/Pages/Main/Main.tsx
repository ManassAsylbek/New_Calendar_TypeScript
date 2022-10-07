import React, {FC} from 'react';
import style from './Main.module.css'
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

const Main:FC = () => {
    const {isAuth} = useAppSelector(state => state.authSlice)
    return (
        <div className={style.main}>
            {!isAuth && <Navigate to={'/authorizations'}/>}
            <Sidebar/>
            <Content/>
        </div>
    );
};

export default Main;
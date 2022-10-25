import React, {FC} from 'react';
import style from "./Preloader.module.css";
import {Spin} from "antd";

interface PreloaderType {
    loader: boolean
}

const Preloader: FC<PreloaderType> = ({loader}) => {
    return (
        <div className={loader ? `${style.globalSpin}` : `${style.spin}`}>
            <Spin tip="Загрузка..." size="large"/>
        </div>
    );
};

export default Preloader;
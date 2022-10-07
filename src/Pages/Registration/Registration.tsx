import React from 'react';
import style from './Registration.module.css'
import addFileImg from "../../Media/icons/addFile.svg"
import logo from "../../Media/images/logo.svg"
import {Link} from "react-router-dom";

const Registration = () => {
    return (
        <div className={style.registration}>
            <form className={style.left}>
                <h1 className={style.title_left}>Добро пожаловать!</h1>
                <label htmlFor="inputTag" className={style.addFile}>
                    <img src={addFileImg} alt=""/>
                    <span>Добавьте фото профиля</span>
                    <input className={style.file} id="inputTag" type="file"/>
                </label>

                <div className={style.inputArea}>
                    <div className={style.surname}>
                        <p>Фамилия</p>
                        <input type="text"/>
                    </div>
                    <div className={style.name}>
                        <p>Имя</p>
                        <input type="text"/>
                    </div>
                    <div className={style.middleName}>
                        <p>Отчество</p>
                        <input  type="text"/>
                    </div>
                    <div className={style.mail}>
                        <p>Почта</p>
                        <input type="text"/>
                    </div>
                    <div className={style.department}>
                        <p>Отдел</p>
                        <select className={style.select}>
                            <option value=""></option>
                        </select>
                    </div>
                    <div className={style.jobTitle}>
                        <p>Должность</p>
                        <select className={style.select}>
                            <option value=""></option>
                        </select>
                    </div>
                    <div className={style.password}>
                        <p>Пароль</p>
                        <input type="text"/>
                    </div>
                    <div className={style.repeaPassword}>
                        <p>Повторите пароль</p>
                        <input type="text"/>
                    </div>
                </div>
                <button className={style.btn}><Link className={style.link} to="/authorizations">Сохранить</Link>
                </button>
            </form>
            <div className={style.right}>
                <h1 className={style.title_right}>Calendar</h1>
                <img src={logo} alt=""/>
            </div>
        </div>
    );
};

export default Registration;
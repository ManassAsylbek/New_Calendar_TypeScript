import React from 'react';
import style from "./Authorization.module.css";
import {Link} from "react-router-dom";
import logo from "../../Media/images/logo.svg";

const Authorizations = () => {
    return (
        <div className={style.authorization}>
            <div className={style.left}>
                <h1 className={style.title_left}>Вход</h1>
                <div className={style.inputArea}>
                    <div className={style.login}>
                        <p>Логин</p>
                        <input type="text"/>
                    </div>
                    <div className={style.password}>
                        <p>Пароль</p>
                        <input type="text"/>
                        <a href="#">Забыли пароль?</a>
                    </div>

                </div>
                <button className={style.btn}><Link className={style.link} to="/">Войти</Link>
                </button>
                <div className={style.account}>
                    <h2>У вас нет аккаунта?</h2><Link to="/registration">Регистрация</Link>
                </div>
            </div>
            <div className={style.right}>
                <h2 className={style.title_right}>Calendar</h2>
                <img src={logo} alt=""/>
            </div>
        </div>
    );
};

export default Authorizations;
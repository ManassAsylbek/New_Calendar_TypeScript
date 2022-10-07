import React, {FC} from 'react';
import style from "./Authorization.module.css";
import {Link} from "react-router-dom";
import logo from "../../Media/images/logo.svg";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "../../Intarface/IUser";

const Authorizations:FC = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm<IUser>({mode: 'onChange'})

    const onSubmit: SubmitHandler<IUser> = (data) => {


        const newEvent = {...data, status: {label: null, value: null}, user: 'Darrell Steward'}
        /*createEvent(newEvent)
        setActive(false)*/
    }

    return (
        <div className={style.authorization}>
            <form className={style.left} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={style.title_left}>Вход</h1>
                <div className={style.inputArea}>
                    <div className={style.login}>
                        <p>Email</p>
                        <input {...register('email', {
                            required: "Введите Почту", pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Введите Почту'
                            }
                        })}/>
                        {errors.email && <span className={style.error}>{"Введите Почту"}</span>}
                    </div>
                    <div className={style.password}>
                        <p>Пароль</p>
                        <input type='password' {...register('password', {required: "Введите пароль"})}/>
                        {errors.password && <span className={style.error}>{"Введите пароль"}</span>}
                        <a href="#">Забыли пароль?</a>
                    </div>

                </div>
                <button className={style.btn}>Войти</button>
                <div className={style.account}>
                    <h2>У вас нет аккаунта?</h2><Link to="/registration">Регистрация</Link>
                </div>
            </form>
            <div className={style.right}>
                <h2 className={style.title_right}>Calendar</h2>
                <img src={logo} alt=""/>
            </div>
        </div>
    );
};

export default Authorizations;
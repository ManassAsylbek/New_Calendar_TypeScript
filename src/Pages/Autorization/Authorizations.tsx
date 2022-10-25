import React, {FC, useEffect} from 'react';
import style from "./Authorization.module.css";
import {Link} from "react-router-dom";
import logo from "../../Media/images/logo.svg";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUser, IUserSignUp} from "../../Intarface/IUser";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Navigate} from "react-router-dom";
import {signInWithEmail} from "../../store/Auth/ActionCreatorAuth";

const Authorizations: FC = () => {

    const {isAuth, isLoadingAuth, user} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IUserSignUp>({mode: 'onChange'})


    const onSubmit: SubmitHandler<IUserSignUp> = (data) => {
        dispatch(signInWithEmail({email: data.email, password: data.password}))
    }

    return (
        <>
            {isAuth
                ? <Navigate to={'/'}/>
                : <div className={style.authorization}>
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
            }
        </>
    );
};

export default Authorizations;
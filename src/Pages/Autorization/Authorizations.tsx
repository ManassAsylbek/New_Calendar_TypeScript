import React, {FC, useEffect} from 'react';
import style from "./Authorization.module.css";
import {Link} from "react-router-dom";
import logo from "../../Media/images/logo.svg";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "../../Intarface/IUser";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Navigate} from "react-router-dom";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {setUser, setLoader} from "../../store/reducer/authSlices";

const Authorizations: FC = () => {

    const {isAuth, loading} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IUser>({mode: 'onChange'})

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.refreshToken,
            }))
            dispatch(setLoader())
        } else {
            dispatch(setLoader())
        }
    });
    const onSubmit: SubmitHandler<IUser> = async (data) => {

        const {user} = await signInWithEmailAndPassword(auth, data.email, data.password)
        dispatch(setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            department: data.department,
            position: data.position,
        }))
    }


    return (
        <>
            {loading && <div>loading</div>}
            {isAuth && <Navigate to={'/'}/>}
            {!loading &&
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
            </div>}
        </>
    );
};

export default Authorizations;
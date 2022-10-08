import React, {FC, useEffect, useState} from 'react';
import style from './Registration.module.css'
import addFileImg from "../../Media/icons/addFile.svg"
import logo from "../../Media/images/logo.svg"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "../../Intarface/IUser";
import ReactSelect from "react-select";
import {optionDepartment, optionRoom, SelectStyles} from "../../Constants/option";
import {IOption} from "../../Intarface/isShippingField";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, User} from "firebase/auth";
import {setLoader, setUser} from "../../store/reducer/authSlices"
import {createUserDocumentFromAuth} from "../../utilits/firebase_utilits";


const Registration: FC = () => {
    const [correctPass, setCorrectPass] = useState(false)
    const {isAuth, loading} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
        control
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

        if (data.confirmPassword !== data.password) {
            setCorrectPass(true)
        } else {
            try {
                setCorrectPass(false)


                const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password)
                console.log(user)
                const userDocRef = createUserDocumentFromAuth(user, {
                    department: data.department, displayName: data.name, position: data.position
                })
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                    department: data.department,
                    position: data.position,

                }))
                console.log(user)

            } catch (error: any) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Cannot create user, email already in use');
                } else {
                    console.log('user creation encountered an error', error);
                }
            }
        }
        const newEvent = {...data, status: {label: null, value: null}, user: 'Darrell Steward'}
        /*createEvent(newEvent)
        setActive(false)*/
    }
    return (<>
            {loading && <div>loading</div>}
            {isAuth && <Navigate to={'/'}/>}
            {!loading && <div className={style.registration}>
                <form className={style.left} onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={style.title_left}>Добро пожаловать!</h1>
                    <label htmlFor="inputTag" className={style.addFile}>
                        <img src={addFileImg} alt=""/>
                        <span>Добавьте фото профиля</span>
                        {/*<input {...register('file', { required:"Введите название" })}  className={style.file}/>*/}
                        {/*  <input className={style.file} id="inputTag" type="file"/>*/}
                    </label>

                    <div className={style.inputArea}>
                        <div className={style.surname}>
                            <p>Фамилия</p>
                            <input {...register('name', {required: "Введите ФИО"})}/>
                            {errors.name && <span className={style.error}>{"Введите ФИО"}</span>}
                        </div>

                        <div className={style.mail}>
                            <p>Почта</p>
                            <input {...register('email', {
                                required: "Введите Почту", pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Введите Почту'
                                }
                            })}/>
                            {errors.email && <span className={style.error}>{"Введите Почту"}</span>}
                        </div>
                        <div className={style.department}>
                            <p>Отдел</p>
                            <Controller control={control}
                                        name="department"
                                        rules={{
                                            required: 'выберите Отдел'
                                        }}
                                        render={({field: {onChange, value}, fieldState: {error}}) => <>
                                            <ReactSelect
                                                styles={SelectStyles}
                                                placeholder={optionDepartment[0].label}
                                                options={optionDepartment}
                                                onChange={(newValue) => onChange((newValue as IOption).value)}
                                            />
                                            {error && <div className={style.error}>{error.message}</div>}
                                        </>}
                            />
                        </div>
                        <div className={style.jobTitle}>
                            <p>Должность</p>
                            <Controller control={control}
                                        name="position"
                                        rules={{
                                            required: 'выберите Отдел'
                                        }}
                                        render={({field: {onChange, value}, fieldState: {error}}) => <>
                                            <ReactSelect
                                                styles={SelectStyles}
                                                placeholder={optionDepartment[0].label}
                                                options={optionDepartment}
                                                onChange={(newValue) => onChange((newValue as IOption).value)}
                                            />
                                            {error && <div className={style.error}>{error.message}</div>}
                                        </>}
                            />
                        </div>
                        <div className={style.password}>
                            <p>Пароль</p>
                            <input  {...register('password', {required: "Введите пароль"})}/>
                            {errors.password && <span className={style.error}>{"Введите пароль"}</span>}
                        </div>
                        <div className={style.repeatPassword}>
                            <p>Повторите пароль</p>
                            <input {...register('confirmPassword', {required: "Введите пароль"})}/>
                            {errors.confirmPassword &&
                            <span className={style.error}>{"Введите пароль"}</span>}
                        </div>
                    </div>
                    {correctPass && <span className={style.error}>{"Пароли не совпадают"}</span>}
                    <button className={style.btn}>Сохранить</button>
                </form>
                <div className={style.right}>
                    <h1 className={style.title_right}>Calendar</h1>
                    <img src={logo} alt=""/>
                </div>
            </div>}
        </>
    );
};

export default Registration;
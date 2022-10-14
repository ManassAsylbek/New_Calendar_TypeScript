import React, {FC, useState} from 'react';
import style from './Registration.module.css'
import addFileImg from "../../Media/icons/addFile.svg"
import logo from "../../Media/images/logo.svg"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IUser, IUserSignUp} from "../../Intarface/IUser";
import ReactSelect from "react-select";
import {optionDepartment, optionRoom, SelectStyles} from "../../Constants/option";
import {IOption} from "../../Intarface/isShippingField";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {signUp} from "../../store/Auth/ActionCreatorAuth";


const Registration: FC = () => {
    const [correctPass, setCorrectPass] = useState(false)
    const {isAuth, isLoading, user} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm<IUserSignUp>({mode: 'onChange'})


    const onSubmit: SubmitHandler<IUserSignUp> = (data) => {

        if (data.confirmPassword !== data.password) {
            setCorrectPass(true)
        } else {
            try {
                setCorrectPass(false)
                dispatch(signUp(data))

            } catch (error: any) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Cannot create User, email already in use');
                } else {
                    console.log('User creation encountered an error', error);
                }
            }
        }
    }
    return (<>
            {isLoading
                ? <div>loading</div>
                : isAuth
                    ? <Navigate to={'/'}/>
                    : <div className={style.registration}>
                        <form className={style.left} onSubmit={handleSubmit(onSubmit)}>
                            <h1 className={style.title_left}>Добро пожаловать!</h1>
                            <label htmlFor="inputTag" className={style.addFile}>
                                <img src={addFileImg} alt=""/>
                                <span>Добавьте фото профиля</span>
                                {/*<input {...register('avatar', { required:"Введите название" })}  className={style.file}/>
                          <input className={style.file} id="inputTag" type="text"/>*/}
                            </label>

                            <div className={style.inputArea}>
                                <div className={style.surname}>
                                    <p>Фамилия</p>
                                    <input {...register('displayName', {required: "Введите ФИО"})}/>
                                    {errors.displayName && <span className={style.error}>{"Введите ФИО"}</span>}
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
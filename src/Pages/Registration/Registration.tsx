import React, {FC} from 'react';
import style from './Registration.module.css'
import addFileImg from "../../Media/icons/addFile.svg"
import logo from "../../Media/images/logo.svg"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "../../Intarface/IUser";
import ReactSelect from "react-select";
import {optionDepartment, optionRoom, SelectStyles} from "../../Constants/option";
import {IOption} from "../../Intarface/isShippingField";

const Registration: FC = () => {


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
        <div className={style.registration}>
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
                        <input {...register('surname', {required: "Введите Фамилию"})}/>
                        {errors.surname && <span className={style.error}>{"Введите Фамилию"}</span>}
                    </div>
                    <div className={style.name}>
                        <p>Имя</p>
                        <input {...register('name', {required: "Введите Имя"})}/>
                        {errors.name && <span className={style.error}>{"Введите Имя"}</span>}
                    </div>
                    <div className={style.middleName}>
                        <p>Отчество</p>
                        <input {...register('middleName', {required: "Введите Отчество"})}/>
                        {errors.middleName && <span className={style.error}>{"Введите Отчество"}</span>}
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
                        <input {...register('password', {required: "Введите пароль"})}/>
                        {errors.password && <span className={style.error}>{"Введите пароль"}</span>}
                    </div>
                    <div className={style.repeaPassword}>
                        <p>Повторите пароль</p>
                        <input {...register('password', {required: "Введите пароль"})}/>
                        {errors.password && <span className={style.error}>{"Введите пароль"}</span>}
                    </div>
                </div>
                <button className={style.btn}>Сохранить</button>
            </form>
            <div className={style.right}>
                <h1 className={style.title_right}>Calendar</h1>
                <img src={logo} alt=""/>
            </div>
        </div>
    );
};

export default Registration;
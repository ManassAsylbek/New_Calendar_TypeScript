import React, {FC, useState} from 'react';
import style from "./EditProfile.module.css";
import addFileImg from "../../Media/icons/addFile.svg";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import ReactSelect from "react-select";
import {optionDepartment, optionPosition, optionTime, SelectStyles} from "../../Constants/option";
import {IOption} from "../../Intarface/isShippingField";
import {IUserSignUp} from "../../Intarface/IUser";
import {deleteProfile, signUp, updateProfile} from "../../store/Auth/ActionCreatorAuth";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getValue} from "../../hooks/getValue";
import close from "../../Media/icons/close.svg";

interface IEditProfile {
    setEditActive: (pt: boolean) => void
}

const EditProfile: FC<IEditProfile> = ({setEditActive}) => {
    const [correctPass, setCorrectPass] = useState(false)
    const { user, id} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm<IUserSignUp>({mode: 'onChange'})

    const handleRemove = () => {
        dispatch(deleteProfile(id))
        setEditActive(false)
    }

    const onSubmit: SubmitHandler<IUserSignUp> = (data) => {
        const newData = {...data, id: id}

        if (data.confirmPassword !== data.password) {
            setCorrectPass(true)
        } else {
            setCorrectPass(false)
            dispatch(updateProfile(newData))
            setEditActive(false)


        }
    }
    return (
        <div onClick={e => e.stopPropagation()}>
            <form className={style.left} action="#">
                <div className={style.header}>
                    <h1 className={style.title_left}>Редактирование профиля</h1>
                    <button onClick={() => setEditActive(false)}
                            className={style.eventBtn}>
                        <img src={close} alt=""/>
                    </button>
                </div>

                <label htmlFor="inputTag" className={style.addFile}>
                    <img src={addFileImg} alt=""/>
                    <span>Добавьте фото профиля</span>
                </label>

                <div className={style.inputArea}>
                    <div className={style.surname}>
                        <p>ФИО</p>
                        <input
                            defaultValue={user?.displayName} {...register('displayName', {required: "Введите ФИО"})}/>
                        {errors.displayName && <span className={style.error}>{"Введите ФИО"}</span>}
                    </div>

                    <div className={style.mail}>
                        <p>Почта</p>
                        <input defaultValue={user?.email}
                               {...register('email', {
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
                                    defaultValue={user?.department}
                                    name="department"
                                    rules={{
                                        required: 'выберите Отдел'
                                    }}
                                    render={({field: {onChange, value}, fieldState: {error}}) => <>
                                        <ReactSelect
                                            styles={SelectStyles}
                                            placeholder={optionDepartment[0].label}
                                            options={optionDepartment}
                                            value={getValue(value, optionDepartment)}
                                            onChange={(newValue) => onChange((newValue as IOption).value)}
                                        />
                                        {error && <div className={style.error}>{error.message}</div>}
                                    </>}
                        />
                    </div>
                    <div className={style.jobTitle}>
                        <p>Должность</p>
                        <Controller control={control}
                                    defaultValue={user?.position}
                                    name="position"
                                    rules={{
                                        required: 'выберите Отдел'
                                    }}
                                    render={({field: {onChange, value}, fieldState: {error}}) => <>
                                        <ReactSelect
                                            styles={SelectStyles}
                                            placeholder={optionPosition[0].label}
                                            options={optionPosition}
                                            value={getValue(value, optionPosition)}
                                            onChange={(newValue) => onChange((newValue as IOption).value)}
                                        />
                                        {error && <div className={style.error}>{error.message}</div>}
                                    </>}
                        />
                    </div>
                    <div className={style.password}>
                        <p>Пароль</p>
                        <input
                            {...register('password', {required: "Введите пароль"})}/>
                        {errors.password && <span className={style.error}>{"Введите пароль"}</span>}
                    </div>
                    <div className={style.repeatPassword}>
                        <p>Повторите пароль</p>
                        <input
                            {...register('confirmPassword', {required: "Введите пароль"})}/>
                        {errors.confirmPassword &&
                        <span className={style.error}>{"Введите пароль"}</span>}
                    </div>
                </div>
                {correctPass && <span className={style.error}>{"Пароли не совпадают"}</span>}
                <div className={style.footer}>
                    <button className={style.delete} onClick={handleRemove}>Удалить</button>
                    <button onClick={handleSubmit(onSubmit)} className={style.save}>Сохранить</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
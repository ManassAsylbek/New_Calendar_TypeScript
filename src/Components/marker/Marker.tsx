import React, {FC, useState} from 'react';
import style from "./MarkerModal.module.css"
import close from '../../Media/icons/close.svg'
import checkImg from '../../Media/icons/check.svg'
import {color} from "../../Constants/constants";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

import {markerAPI} from "../../services/markerServices";
import {IMarker} from "../../Intarface/IMarker";
import {setEvents} from "../../store/events/ACEvents";
import {setMarkers} from "../../store/Marker/ActionCreatorMarker";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

interface MarkerProps {
    setActive: (pt:boolean)=>void
}

const Marker: FC<MarkerProps> = ({setActive}) => {
    const [mark, setMark] = useState("")
    //const [createMarker, {}] = markerAPI.useCreateMarkersMutation()
    const dispatch = useAppDispatch()
    const {id} = useAppSelector(state => state.authSlice)
    const {
        register,
        handleSubmit,
        formState,
        control
    } = useForm<IMarker>({mode: 'onChange'})

    const onSubmit: SubmitHandler<IMarker> = (data) => {

        dispatch(setMarkers(id, data))
       // createMarker(data)
        setActive(false)
    }


    return (
        <div className={style.Content} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <h2>Создание метки</h2>
                <button onClick={() => setActive(false)}
                        className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
            </div>
            <form className={style.body} >
                <div>
                    <h4>Название</h4>
                    <input {...register('label', {required: "Введите название"})}
                           className={style.titleInput}/>
                </div>
                <div>
                    <h4>Цвет</h4>
                    <div className={style.color}>
                        <Controller control={control}
                                    name="value"
                                    rules={{
                                        required: 'выберите цвет'
                                    }}
                                    defaultValue={mark}
                                    render={({field: {onChange, value}, fieldState: {error}}) => <>
                                        {
                                            color.map(c => <div
                                                    onClick={(e) =>
                                                        setMark(c.color)}>
                                                    <div key={c.id}
                                                         className={style.selectColor}
                                                         style={{background: c.color}}
                                                         onClick={() => onChange(c.color)}>
                                                        {mark === c.color
                                                            ? <img src={checkImg} alt=""/>
                                                            : ""}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </>
                                    }
                        />

                    </div>

                </div>
                <div className={style.footer}>
                    <button onClick={handleSubmit(onSubmit)}>Сохранить</button>
                </div>
            </form>

        </div>
    );
};

export default Marker;
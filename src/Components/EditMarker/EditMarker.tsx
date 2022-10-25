import React, {FC, useState} from 'react';
import style from "./EditMarkerModal.module.css"
import close from '../../Media/icons/close.svg'
import checkImg from '../../Media/icons/check.svg'
import {color} from "../../Constants/constants";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {markerAPI} from "../../services/markerServices";
import {IMarker} from "../../Intarface/IMarker";
import {setDeleteMarker, setUpdateMarker} from "../../store/Marker/ActionCreatorMarker";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setUpdateEvent} from "../../store/events/ACEvents";

interface MarkerProps {
    setActive: (pt: boolean) => void;
    marker: IMarker
}

const Marker: FC<MarkerProps> = ({setActive, marker}) => {
    const {id} = useAppSelector(state => state.authSlice)
    const {events} = useAppSelector(state => state.eventSlice)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm<IMarker>({mode: 'onChange'})

    const removeMarker = () => {

        events && events.forEach(event => {
            const updateEventValue = {...event, marker: marker.value === event.marker ? null : event.marker}//проверяяет на совпадение с ткушим маркером и и меняяет
            dispatch(setUpdateEvent(`events_${id}`, event.id, updateEventValue))
        })

        dispatch(setDeleteMarker(`markers_${id}`, marker.id))


        setActive(false)
    }


    const onSubmit: SubmitHandler<IMarker> = (data) => {


        const updateMarkerValue = {...marker, ...data}
        console.log(updateMarkerValue.value)
        dispatch(setUpdateMarker(`markers_${id}`, marker.id, data))
        events && events.forEach(event => {

            const updateEventValue = {...event, marker: marker.value === event.marker ? data.value : event.marker}//проверяяет на совпадение с ткушим маркером и и меняяет
            dispatch(setUpdateEvent(`events_${id}`, event.id, updateEventValue))
        })

        // updateMarker(updateMarkerValue)
        setActive(false)

    }


    return (
        <div className={style.Content} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <h2>Редактирования метки</h2>
                <button onClick={() => setActive(false)}
                        className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
            </div>
            <form className={style.body}>
                <div>
                    <h4>Название</h4>
                    <input defaultValue={marker.label} {...register('label', {required: "Введите название"})}
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
                                    defaultValue={marker.value}
                                    render={({field: {onChange, value}, fieldState: {error}}) => <>
                                        {
                                            color.map(c =>
                                                <div key={c.id}
                                                     className={style.selectColor}
                                                     style={{background: c.color}}
                                                     onClick={() => onChange(c.color)}>
                                                    {value === c.color
                                                        ? <img src={checkImg} alt=""/>
                                                        : ""}
                                                </div>
                                            )
                                        }
                                    </>
                                    }
                        />

                    </div>

                </div>
                <div className={style.footer}>
                    <button onClick={removeMarker} className={style.delete}>Удалить</button>
                    <button onClick={handleSubmit(onSubmit)} className={style.save}>Сохранить</button>

                </div>
            </form>
        </div>
    );
};

export default Marker;
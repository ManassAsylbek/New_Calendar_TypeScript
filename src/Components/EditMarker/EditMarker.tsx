import React, {FC, useState} from 'react';
import style from "./EditMarkerModal.module.css"
import close from '../../Media/icons/close.svg'
import checkImg from '../../Media/icons/check.svg'
import {color} from "../../Constants/constants";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {markerAPI} from "../../services/markerServices";
import {IMarker} from "../../Intarface/IMarker";

interface MarkerProps {
    setActive: (pt:boolean)=>void;
    marker:IMarker
}
const Marker: FC<MarkerProps> = ({setActive,marker}) => {
    const [updateMarker,{}] = markerAPI.useUpdateMarkersMutation()
    const [deleteMarker,{}] = markerAPI.useDeleteMarkersMutation()
    const {
        register,
        handleSubmit,
        formState:{errors},
        control
    } = useForm<IMarker>({mode: 'onChange'})

    const removeMarker = () => {
        deleteMarker(marker)
        setActive(false)
    }

    const onSubmit: SubmitHandler<IMarker> = (data) => {
        const updateMarkerValue={...marker,...data}
        updateMarker(updateMarkerValue)
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
            <form className={style.body} action="javascript:void (0)">
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
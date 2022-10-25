import React from "react";
import {FieldError, Path, UseFormRegister} from "react-hook-form";
import {IEvent} from "../../Intarface/IEvent";
import style from "./formStyle.module.css";


type InputProps = {
    label: Path<IEvent>
    register: UseFormRegister<IEvent>
    required: boolean
    className:string
    defaultValue?:string |undefined
    errors:FieldError | undefined
};

const Input = ({ label, register, required, className,defaultValue,errors}: InputProps) => (
    <>
        <input defaultValue={defaultValue} {...register(label, { required:"Введите название" })}  className={className}/>
        {errors && <span className={style.error}>{errors.message}</span>}
    </>
);

export default Input;
import React from "react";
import {Path,  UseFormRegister} from "react-hook-form";
import {IEvent} from "../../Intarface/IEvent";


type InputProps = {
    label: Path<IEvent>
    register: UseFormRegister<IEvent>
    required: boolean
    className:string
    defaultValue:string |undefined
};

const Input = ({ label, register, required, className,defaultValue}: InputProps) => (
    <>
        <input defaultValue={defaultValue} {...register(label, { required:"Введите название" })}  className={className}/>
    </>
);

export default Input;
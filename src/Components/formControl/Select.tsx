import {UseFormRegister} from "react-hook-form";
import React from "react";
import {IsShippingField} from "../../Intarface/isShippingField";
import {times} from "../../Constants/constants";

export const Select = React.forwardRef<
    HTMLSelectElement,
    { label: string } & ReturnType<UseFormRegister<IsShippingField>>
    >(({ onChange, onBlur, name, label }, ref) =>(    <>
        <label>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>


           {/* {times.map(item => <option key={item.id} value={item.time}>{item.time}</option>)}*/}
        </select>
    </>
));
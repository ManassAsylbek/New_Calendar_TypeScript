
import {IOption} from "../Intarface/isShippingField";

export const getValue = (value: string|null, option: IOption[]) => {
    return value ? option.find(option => option.value === value) : ''
}
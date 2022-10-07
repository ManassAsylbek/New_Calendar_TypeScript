import {IOption} from "../Intarface/isShippingField";

export const optionTime: IOption[] = [
    {id:1,value: "09:00", label: "09:00"},
    {id:1,value: "10:00", label: "10:00"},
    {id:1,value: "11:00", label: "11:00"},
    {id:1,value: "12:00", label: "12:00"},
    {id:1,value: "13:00", label: "13:00"},
    {id:1,value: "14:00", label: "14:00"},
    {id:1,value: "15:00", label: "15:00"},
    {id:1,value: "16:00", label: "16:00"},
    {id:1,value: "17:00", label: "17:00"},
    {id:1,value: "18:00", label: "18:00"}
]

export const optionRepeat: IOption[] = [
    {id:1,value: "Не повторять", label: "Не повторять"},
    {id:1,value: "Ежедневно", label: "Ежедневно"},
    {id:1,value: "По будням (Пн-Пт)", label: "По будням (Пн-Пт)"},
    {id:1,value: "Еженедельно(среда)", label: "Еженедельно(среда)"},
    {id:1,value: "Ежемесячно", label: "Ежемесячно"},
    {id:1,value: "Ежегодно", label: "Ежегодно"},
    {id:1,value: "Период повторения", label: "Период повторения"},
]


export const optionRoom: IOption[] = [
    {id:1, value: "Конференц зал 1 этаж", label: "Конференц зал 1 этаж"},
    {id:1, value: "Конференц зал 2 этаж", label: "Конференц зал 2 этаж"},
    {id:1, value: "Конференц зал 3 этаж", label: "Конференц зал 3 этаж"},
    {id:1,value: "Аудитория 1", label: "Аудитория 1"},
    {id:1,value: "Аудитория 2", label: "Аудитория 2"}
]
export const optionMarker: IOption[] = [
    {id:1,value: "Личный", label: "Личный"},
    {id:1,value: "Рабочий", label: "Рабочий"},
    {id:1,value: "Мероприятия", label: "Мероприятия"},
    {id:1,value: "Проекты", label: "Проекты"}
]
export const optionAccess: IOption[] = [
    {id:1,value: "Общедоступное", label: "Общедоступное"},
    {id:1,value: "Личный", label: "Личный"}
]
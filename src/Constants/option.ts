import {IOption} from "../Intarface/isShippingField";
import {IMarker} from "../Intarface/IMarker";

export const optionTime: IOption[] = [
    {id:'1',value: "09:00", label: "09:00"},
    {id:'2',value: "10:00", label: "10:00"},
    {id:'3',value: "11:00", label: "11:00"},
    {id:'4',value: "12:00", label: "12:00"},
    {id:'5',value: "13:00", label: "13:00"},
    {id:'6',value: "14:00", label: "14:00"},
    {id:'7',value: "15:00", label: "15:00"},
    {id:'8',value: "16:00", label: "16:00"},
    {id:'9',value: "17:00", label: "17:00"},
    {id:'10',value: "18:00", label: "18:00"}
]

export const optionRepeat: IOption[] = [
    {id:'1',value: "Не повторять", label: "Не повторять"},
    {id:'2',value: "Ежедневно", label: "Ежедневно"},
    {id:'3',value: "По будням (Пн-Пт)", label: "По будням (Пн-Пт)"},
    {id:'4',value: "Еженедельно(среда)", label: "Еженедельно(среда)"},
    {id:'5',value: "Ежемесячно", label: "Ежемесячно"},
    {id:'6',value: "Ежегодно", label: "Ежегодно"},
    {id:'7',value: "Период повторения", label: "Период повторения"},
]


export const optionRoom: IOption[] = [
    {id:'1', value: "Конференц зал 1 этаж", label: "Конференц зал 1 этаж"},
    {id:'2', value: "Конференц зал 2 этаж", label: "Конференц зал 2 этаж"},
    {id:'3', value: "Конференц зал 3 этаж", label: "Конференц зал 3 этаж"},
    {id:'4',value: "Аудитория 1", label: "Аудитория 1"},
    {id:'5',value: "Аудитория 2", label: "Аудитория 2"}
]
export const optionMarker: IMarker[] = [
    {id:"1",value: "Личный", label: "Личный"},
    {id:"2",value: "Рабочий", label: "Рабочий"},
    {id:"3",value: "Мероприятия", label: "Мероприятия"},
    {id:"4",value: "Проекты", label: "Проекты"}
]
export const optionAccess: IOption[] = [
    {id:'1',value: "Общедоступное", label: "Общедоступное"},
    {id:'2',value: "Личный", label: "Личный"}
]

export const optionDepartment: IOption[] = [
    {id:'1',value: "Руководитель", label: "Руководитель"},
    {id:'2',value: "UX/UI дизайнер", label: "UX/UI дизайнер"},
    {id:'3',value: "Frontend разработчик", label: "Frontend разработчик"},
    {id:'4',value: "Backend разработчик", label: "Backend разработчик"},
    {id:'5',value: "Flutter разработчик", label: "Flutter разработчик"},
]


export const SelectStyles = {
    input:(style: any) => ({...style,
        display:'flex',
        alignItems: 'center',
        height:30,
    }),

    control: (style: any) => ({...style,
        borderRadius: 8,
        height:40,
    }),


    indicatorSeparator: (style: any) => ({...style,
        display:"none"
    }),

}
export const SelectTimeStyles = {
    input:(style: any) => ({...style,
        display:'flex',
        alignItems: 'center',
        height:30,
    }),

    control: (style: any) => ({...style,
        borderRadius: 8,
        height:40,
    }),

    indicatorsContainer: (style: any) => ({...style,
        paddingLeft:0,
        paddingRight:0,
        width:30
    }),
    indicatorSeparator: (style: any) => ({...style,
        display:"none"
    }),
    valueContainer:(style: any) => ({...style,
        paddingLeft:4,
        paddingRight:0,
    }),
}
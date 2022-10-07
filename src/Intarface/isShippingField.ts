export interface IsShippingField {
    title: string
    date: string
    startTime: string
    endTime: string
    repeat: string
    participant: Array<{}>
    room: string
    marker: string
    access: string
}
export interface IsShippingFieldMarker {
    title: string
    color:string
    id:number
}
export interface IOption {
    value: string
    label: string
    id:number
}




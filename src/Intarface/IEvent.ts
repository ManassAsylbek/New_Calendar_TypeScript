import {IStatus} from "./IStatus";
import {IUser} from "./IUser";

export interface IEvent {
    user:string
    title: string
    date: string
    startTime: string
    endTime: string
    repeat: string
    participant: Array<IUser>|undefined
    room: string
    marker: string
    access: string
    id:number
    status:IStatus
}

export interface IEventAdd{
    user:string
    title: string
    date: string
    startTime: string
    endTime: string
    repeat: string
    participant: Array<IUser>|undefined
    room: string
    marker: string
    access: string
    status:IStatus
}
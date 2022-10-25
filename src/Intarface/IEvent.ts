import {IStatus} from "./IStatus";
import {IUser} from "./IUser";

export interface IEvent {
    user:string
    title: string
    date: string
    startTime: string
    endTime: string
    repeat: string
    author:IUser|null
    participant: Array<IUser>
    room: string
    marker: string|null
    access: string
    id:string
    status:IStatus
}

/*
export interface IEventAdd{
    user:string
    title: string
    date: string
    startTime: string
    endTime: string
    repeat: string
    author:string
    participant: Array<IUser>
    room: string
    marker: string
    access: string
    status:IStatus
}*/

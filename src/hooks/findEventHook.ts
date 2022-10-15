import {useState} from "react";
import {eventAPI} from "../services/eventServices";
import {IEvent} from "../Intarface/IEvent";
import moment from "moment";
import {useAppSelector} from "./redux";


interface IFindEvent {(time: string, date: string): {findEvent:IEvent[]|undefined}}


export const useFindEvent:IFindEvent = (time: string, date: string) => {

    const [limit, setLimit] = useState(31)
    const [eventArray, setEventArray] = useState([ ])

     //const {data: events} = eventAPI.useFetchAllEventsQuery(limit)
    const {events} = useAppSelector(state => state.eventSlice)

    let findEvent:Array<IEvent>| undefined
    if(events) {
        findEvent = events.filter((item: IEvent) => item.date === (moment(date).format("YYYY-MM-DD"))
            && item.startTime === time)
    }else{
        findEvent =undefined
    }
    return {findEvent}
}
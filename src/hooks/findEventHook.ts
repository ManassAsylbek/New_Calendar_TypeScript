import {useState} from "react";
import {eventAPI} from "../services/eventServices";
import {IEvent} from "../Intarface/IEvent";
import moment from "moment";
import {useAppSelector} from "./redux";
import {eventsFetchingSuccess, isRoom} from "../store/events/eventSlice";


interface IFindEvent {
    (time: string, date: string): { findEvents: IEvent[] | undefined }
}


export const useFindEvent: IFindEvent = (time: string, date: string) => {

    const [limit, setLimit] = useState(31)
    const [eventArray, setEventArray] = useState([])

    //const {data: events} = eventAPI.useFetchAllEventsQuery(limit)
    const {events, room, selectMarker} = useAppSelector(state => state.eventSlice)

    let findEvents: Array<IEvent> | undefined
    if (events) {
        findEvents = events.filter((item: IEvent) => item.date === (moment(date).format("YYYY-MM-DD"))
            && item.startTime === time)
    } else {
        findEvents = undefined
    }
    if (room && findEvents) {
        findEvents = findEvents.filter(event => event.room === room)
    }
    if (selectMarker && findEvents) {
        findEvents = findEvents.filter(event => event.marker === selectMarker)
    }
    if (selectMarker === "null" && findEvents) {
        findEvents = findEvents.filter(event => event.marker === null)
    }
    return {findEvents}
}
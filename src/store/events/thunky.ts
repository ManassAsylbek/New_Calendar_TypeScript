import {AppDispatch} from "../store";
import {createEventsDocumentFromAuth, getEventsAndDocuments} from "../../utilits/firebase_utilits";
import {eventsFetching, eventsFetchingError, eventsFetchingSuccess} from "./eventSlice";
import {IEventAdd} from "../../Intarface/IEvent";



export const setEvents = (id:string, event: IEventAdd) => async (dispatch: AppDispatch) => {
    console.log("no work")
    try {
        dispatch(eventsFetching())
        await createEventsDocumentFromAuth(id, event)
        const events = await getEventsAndDocuments(id)
        console.log(events)
        dispatch(eventsFetchingSuccess(events))
    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
    }
}

export const getEvents = (id:string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(eventsFetching())
        const events = await getEventsAndDocuments(id)
        console.log(events)
        dispatch(eventsFetchingSuccess(events))
    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
    }
}
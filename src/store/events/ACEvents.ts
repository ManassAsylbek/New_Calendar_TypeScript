import {AppDispatch} from "../store";
import {createEventsDocumentFromAuth, getEventsAndDocuments} from "../../utilits/firebase_utilits";
import {eventsFetching, eventsFetchingError, eventsFetchingSuccess,addEvent} from "./eventSlice";
import {IEventAdd} from "../../Intarface/IEvent";



export const setEvents = (id:string, event: IEventAdd) => async (dispatch: AppDispatch) => {
    try {
        dispatch(eventsFetching())
        await createEventsDocumentFromAuth(id, event)
        dispatch(addEvent())
        const events = await getEventsAndDocuments(id)
        dispatch(eventsFetchingSuccess(events))
        dispatch(addEvent())
    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
    }
}

export const getEvents = (id:string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(eventsFetching())
        const events = await getEventsAndDocuments(id)
        dispatch(eventsFetchingSuccess(events))
    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
    }
}
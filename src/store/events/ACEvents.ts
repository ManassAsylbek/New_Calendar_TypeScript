import {AppDispatch} from "../store";
import {
    createEventsDocumentFromAuth,
    getEventsAndDocuments,
    setDeleteDoc,
    setUpdateDoc
} from "../../utilits/firebase_utilits";
import {eventsFetching, eventsFetchingError, eventsFetchingSuccess,addEvent} from "./eventSlice";
import {IEvent} from "../../Intarface/IEvent";
import {IMarker} from "../../Intarface/IMarker";
import {addMarker, markerFetchingError} from "../Marker/markerSlice";
import {message} from "antd";


export const setUpdateEvent = (uId: string, docId: string, data: IMarker | IEvent) => async (dispatch: AppDispatch) => {
    try {
        await setUpdateDoc(uId, docId, data)
        dispatch(addEvent())
    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
    }
}
export const setDeleteEvent = (uId: string, docId: string) => async (dispatch: AppDispatch) => {
    try {
        await setDeleteDoc(uId, docId)
        dispatch(addEvent())
    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
    }
}

export const setEvents = (id:string, event: IEvent) => async (dispatch: AppDispatch) => {
    try {
        dispatch(eventsFetching())
        await createEventsDocumentFromAuth(id, event)
        dispatch(addEvent())
        const events = await getEventsAndDocuments(id)
        console.log(events)
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
        console.log(events)
        dispatch(eventsFetchingSuccess(events))

    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
    }
}
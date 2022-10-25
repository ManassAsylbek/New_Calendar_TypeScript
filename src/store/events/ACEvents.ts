import {AppDispatch} from "../store";
import {
    createEventsDocumentFromAuth,
    getEventsAndDocuments,
    setDeleteDoc,
    setUpdateDoc,
} from "../../utilits/firebase_utilits";
import {eventsFetching, eventsFetchingError, eventsFetchingSuccess, addEvent, isRoom} from "./eventSlice";
import {IEvent} from "../../Intarface/IEvent";
import {IMarker} from "../../Intarface/IMarker";
import {message} from "antd";

const key = 'event';

export const setUpdateEvent = (uId: string, docId: string, data: IMarker | IEvent) => async (dispatch: AppDispatch) => {
    try {
        message.loading({content: 'Загрузка...', key});
        await setUpdateDoc(uId, docId, data)
        dispatch(addEvent())
        message.success({content: 'Событие успешно редактирована', key, duration: 2});
    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
        message.error({content: 'Ошибка', key, duration: 2});
    }
}
export const setDeleteEvent = (uId: string, docId: string) => async (dispatch: AppDispatch) => {
    try {
        message.loading({content: 'Загрузка...', key});
        await setDeleteDoc(uId, docId)
        dispatch(addEvent())
        message.success({content: 'Событие удалено', key, duration: 2});
    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
    }
}

export const setEvents = (id: string, event: IEvent) => async (dispatch: AppDispatch) => {

    try {
        dispatch(eventsFetching())
        message.loading({content: 'Загрузка...', key});
        if (event.status.value) { //check users
            for (let i = 0; i < event.status.value.length; i++) {  //sent delegate user
                const newEvent = {
                    ...event, participant: [...event.participant.filter(user => user.id !== id)//убираю текушего пользователя
                        , ...event.status.value],//add new delegate users
                    status: {label: null, value: null, new: true}
                }//status === null
                await createEventsDocumentFromAuth(event.status.value[i].id, newEvent)
            }
        }
        if (!event.status.value) {
            for (let i = 0; i < event.participant.length; i++) {  //sent  participant users
                await createEventsDocumentFromAuth(event.participant[i].id, event)
            }
        }
        dispatch(addEvent())
        const events = await getEventsAndDocuments(id)

        // message.success('Событие успешно добавлена');
        dispatch(eventsFetchingSuccess(events))
        dispatch(addEvent())
        message.success({content: 'Событие успешно добавлена', key, duration: 2});
    } catch
        (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
        message.error({content: 'Ошибка', key, duration: 2});
    }
}
export const getEvents = (id: string) => async (dispatch: AppDispatch) => {

    try {
        dispatch(eventsFetching())
        const events = await getEventsAndDocuments(id)
        dispatch(eventsFetchingSuccess(events))


    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
        message.error({content: 'Ошибка', key, duration: 2});
    }
}
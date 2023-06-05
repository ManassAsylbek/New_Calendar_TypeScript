import {AppDispatch} from "../store";
import {addMarker, markerFetching, markerFetchingSuccess, markerFetchingError} from "./markerSlice";
import {addEvent} from "../events/eventSlice";
import {
    createMarkersDocumentFromAuth, getMarkerAndDocuments, setDefaultMarker, setDeleteDoc, setUpdateDoc,
} from "../../utilits/firebase_utilits";
import {IMarker} from "../../Intarface/IMarker";
import {IEvent} from "../../Intarface/IEvent";
import {message} from "antd";

const key = 'marker';
export const setUpdateMarker = (uId: string, docId: string, data: IMarker ) => async (dispatch: AppDispatch) => {
    try {
        message.loading({content: 'Загрузка...', key});
        await setUpdateDoc(uId, docId, data)
        message.success({content: 'Метка успешно редактирована', key, duration: 2});
        dispatch(addMarker())
    } catch (e) {
// @ts-ignore
        dispatch(markerFetchingError(e.message))
        message.error({content: 'Ошибка', key, duration: 2});
    }
}
export const setDeleteMarker = (uId: string, docId: string) => async (dispatch: AppDispatch) => {
    try {
        message.loading({content: 'Загрузка...', key});
        await setDeleteDoc(uId, docId)
        message.success({content: 'Метка успешно удалено', key, duration: 2});
        dispatch(addMarker())
    } catch (e) {
// @ts-ignore
        dispatch(markerFetchingError(e.message))
        message.error({content: 'Ошибка', key, duration: 2});
    }
}


export const setDefaultMark = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(markerFetching())
        await setDefaultMarker(id)
        dispatch(addEvent())
        const markers = await getMarkerAndDocuments(id)
        dispatch(markerFetchingSuccess(markers))
        dispatch(addMarker())
    } catch (e) {
// @ts-ignore
        dispatch(markerFetchingError(e.message))
        message.error({content: 'Ошибка', key, duration: 2});
    }
}


export const setMarkers = (id: string, marker?: IMarker) => async (dispatch: AppDispatch) => {
    try {
        message.loading({content: 'Загрузка...', key});
        dispatch(markerFetching())
        await createMarkersDocumentFromAuth(id, marker)
        dispatch(addEvent())
        const markers = await getMarkerAndDocuments(id)
        dispatch(markerFetchingSuccess(markers))
        message.success({content: 'Метка успешно добавлена', key, duration: 2});
        dispatch(addMarker())
    } catch (e) {
// @ts-ignore
        dispatch(markerFetchingError(e.message))
        message.error({content: 'Ошибка', key, duration: 2});
    }
}

export const getMarkers = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(markerFetching())
        const markers = await getMarkerAndDocuments(id) //запрос на метки
        dispatch(markerFetchingSuccess(markers))
    } catch (e) {
// @ts-ignore
        dispatch(eventsFetchingError(e.message))
        message.error({content: 'Ошибка', key, duration: 2});
    }
}
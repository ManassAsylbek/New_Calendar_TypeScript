import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth, deleteAuthUser,
    getCurrentUser, getEventsAndDocuments, getMarkerAndDocuments, getUser, setDefaultMarker, setDeleteDoc, setUpdateDoc,
    signInAuthUserWithEmailAndPassword, signOutUser, updateAuthUser, updateEmailAuthUser, updatePasswordAuthUser
} from "../../utilits/firebase_utilits";
import {AppDispatch} from "../store";
import {AuthFetching, AuthFetchingSuccess, AuthFetchingError, removeUser, AddToken,reloadUser} from "./authSlice"
import {IUserSignUp} from "../../Intarface/IUser";
import {getEvents} from "../events/ACEvents";
import {eventsFetchingSuccess} from "../events/eventSlice";
import {markerFetchingSuccess} from "../Marker/markerSlice";
import {getMarkers} from "../Marker/ActionCreatorMarker";

import {message} from "antd";

const key = 'event';
export const signOut = () => async (dispatch: AppDispatch) => {

    try {
        await signOutUser()
        dispatch(removeUser())
    } catch (e) {
// @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}

export const signUp = (data: IUserSignUp) => async (dispatch: AppDispatch) => {
    try {
        dispatch(AuthFetching())
        const {user} = await createAuthUserWithEmailAndPassword(data.email, data.password)
        await createUserDocumentFromAuth(user,
            {
                displayName: data.displayName, department: data.department, position: data.position,
                /*photoURL: "https://cdn.pixabay.com/photo/2016/01/25/19/48/man-1161337__340.jpg"*/
            })
        const currentUser = await getUser(user.uid)

        await setDefaultMarker(user.uid) //добавляяет дефолтный маркер при регистрации в firestore

        const events = await getEventsAndDocuments(user.uid) //получаЮ СОБЫТИЕ  пользователЕЙ из db(events_+id)
        dispatch(eventsFetchingSuccess(events))

        const markers = await getMarkerAndDocuments(user.uid) //получаЮ Marker  пользователЕЙ из db(markers_+id)
        dispatch(markerFetchingSuccess(markers))

        dispatch(AuthFetchingSuccess({
            displayName: currentUser?.displayName,
            department: currentUser?.department,
            position: currentUser?.position,
            email: currentUser?.email,
            id: currentUser?.id,
            photoURL: currentUser?.photoURL
        }))
        dispatch(AddToken(user.refreshToken))
        await getEvents(user.uid)
    } catch (e) {
// @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}

export const isUserAuthenticated = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(AuthFetching())
        const user = await getCurrentUser()
        if (!user) {
            dispatch(AuthFetchingError("error"))
            return
        }
        ;
        const currentUser = await getUser(user.uid)
        /* await getEvents(user.uid)*/
        const events = await getEventsAndDocuments(user.uid) //получаЮ СОБЫТИЕ  пользователЕЙ из db(events_+id)
        dispatch(eventsFetchingSuccess(events))

        const markers = await getMarkerAndDocuments(user.uid) //получаЮ Marker  пользователЕЙ из db(markers_+id)
        dispatch(markerFetchingSuccess(markers))

        dispatch(AuthFetchingSuccess({
            displayName: currentUser?.displayName,
            department: currentUser?.department,
            position: currentUser?.position,
            email: currentUser?.email,
            id: currentUser?.id,
            photoURL: currentUser?.photoURL
        }))
        dispatch(AddToken(user.refreshToken))


    } catch (e) {
// @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}


export const signInWithEmail = (data: { email: string, password: string }) => async (dispatch: AppDispatch) => {
    try {
        dispatch(AuthFetching())
        const {user} = await signInAuthUserWithEmailAndPassword(data.email, data.password)

        const currentUser = await getUser(user.uid)           //получая данные текушего пользователя из db(users)

        const events = await getEventsAndDocuments(user.uid)
        dispatch(eventsFetchingSuccess(events))

        const markers = await getMarkerAndDocuments(user.uid) //получаЮ Marker  пользователЕЙ из db(markers_+id)
        dispatch(markerFetchingSuccess(markers))

        dispatch(AuthFetchingSuccess({
            displayName: currentUser?.displayName,
            department: currentUser?.department,
            position: currentUser?.position,
            email: currentUser?.email,
            id: currentUser?.id,
            photoURL: currentUser?.photoURL
        }))
        dispatch(AddToken(user.refreshToken))
        await getEvents(user.uid) //получаЮ СОБЫТИЕ  пользователЕЙ из db(events_+id) используя thunk

        await getMarkers(user.uid) //получаЮ Marker  пользователЕЙ из db(marker_+id) используя thunk
    } catch (e) {
        // @ts-ignore
        dispatch(AuthFetchingError(e.message))
        message.error({content: 'Ошибка: Неправильный Email или пароль.Повтарите попытку. ', key, duration: 2});
    }
}

export const deleteProfile = (id: string) => async (dispatch: AppDispatch) => {


    message.loading({content: 'Загрузка...', key});
    await setDeleteDoc("users", id)

    dispatch(AuthFetching())
    await deleteAuthUser()

    isUserAuthenticated()
    dispatch(removeUser())
    message.success({content: 'Профиль удален', key, duration: 2});
}

export const updateProfile = (data: IUserSignUp) => async (dispatch: AppDispatch) => {
    try {
        message.loading({content: 'Загрузка...', key});
        await setUpdateDoc("users", data.id, {
            displayName: data.displayName, department: data.department, position: data.position,
            id: data.id, email: data.email,photoURL: data.photoURL?data.photoURL:""
        })
        await updateAuthUser({displayName: data.displayName, photoURL: data.photoURL})
        await updateEmailAuthUser(data.email)
        await updatePasswordAuthUser(data.password)
        message.success({content: 'Профиль редоктирован', key, duration: 2});
        dispatch(reloadUser())

    } catch (e) {
        dispatch(AuthFetchingError("Ошибка"))
    }
}

export const getProfile = (id:string) => async (dispatch: AppDispatch) => {
    const currentUser = await getUser(id)
    dispatch(AuthFetchingSuccess({
        displayName: currentUser?.displayName,
        department: currentUser?.department,
        position: currentUser?.position,
        email: currentUser?.email,
        id: currentUser?.id,
        photoURL: currentUser?.photoURL
    }))
}
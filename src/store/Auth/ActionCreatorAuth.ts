import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser, getEventsAndDocuments, getUser,
    signInAuthUserWithEmailAndPassword, signOutUser
} from "../../utilits/firebase_utilits";
import {AppDispatch} from "../store";
import {AuthFetching, AuthFetchingSuccess, AuthFetchingError, removeUser, AddToken} from "./authSlice"
import {IUserSignUp} from "../../Intarface/IUser";
import {getEvents} from "../events/ACEvents";
import {eventsFetchingSuccess} from "../events/eventSlice";


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
                photoURL: "https://cdn.pixabay.com/photo/2016/01/25/19/48/man-1161337__340.jpg"
            })
        const currentUser = await getUser(user.uid)
        const events = await getEventsAndDocuments(user.uid) //получаЮ СОБЫТИЕ  пользователЕЙ из db(events_+id)
        dispatch(eventsFetchingSuccess(events))
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
    } catch (e) {
        // @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}

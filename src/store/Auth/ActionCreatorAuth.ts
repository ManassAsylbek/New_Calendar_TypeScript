import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser, getUser,
    signInAuthUserWithEmailAndPassword, signOutUser
} from "../../utilits/firebase_utilits";

import {AppDispatch} from "../store";
import {AuthFetching, AuthFetchingSuccess, AuthFetchingError, removeUser} from "./authSlice"
import {IUserSignUp} from "../../Intarface/IUser";
import {getEvents} from "../events/thunky";


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
        const userSnapshot = await createUserDocumentFromAuth(user,
            {displayName: data.displayName, department: data.department, position: data.position})
        const currentUser = await getUser(user.uid)

        dispatch(AuthFetchingSuccess({
            displayName: currentUser?.displayName,
            department: currentUser?.department,
            position: currentUser?.position,
            email: currentUser?.email,
            id: currentUser?.id,
            token: user.refreshToken
        }))
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
        console.log(user.uid)
        await getEvents(user.uid)
        dispatch(AuthFetchingSuccess({
            displayName: currentUser?.displayName,
            department: currentUser?.department,
            position: currentUser?.position,
            email: currentUser?.email,
            id: currentUser?.id,
            token: user.refreshToken
        }))


    } catch (e) {
// @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}


export const signInWithEmail = (data: { email: string, password: string }) => async (dispatch: AppDispatch) => {
    try {
        dispatch(AuthFetching())
        const {user} = await signInAuthUserWithEmailAndPassword(data.email, data.password)
        /*if (user) {
            await getSnapshotFromUserAuth(user);
        }*/
        const currentUser = await getUser(user.uid)

        dispatch(AuthFetchingSuccess({
            displayName: currentUser?.displayName,
            department: currentUser?.department,
            position: currentUser?.position,
            email: currentUser?.email,
            id: currentUser?.id,
            token: user.refreshToken
        }))
        await getEvents(user.uid)
    } catch (e) {
        // @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}


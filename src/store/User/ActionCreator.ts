import {AppDispatch} from "../store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUsersAndDocuments} from "../../utilits/firebase_utilits";
import {AuthFetching, AuthFetchingError, removeUser} from "../Auth/authSlice";
import {removeUsers, usersFetching, usersFetchingError, usersFetchingSuccess} from "./userSlice"
import {useAppSelector} from "../../hooks/redux";


export const fetchUser = () => async (dispatch: AppDispatch) => {
    /*const {id} = useAppSelector(state => state.authSlice)*/
    try {
        dispatch(usersFetching())
        const users = await getUsersAndDocuments()
        /*   let newUser = users.filter(user =>user.id!==id)*/
        dispatch(usersFetchingSuccess(users))
    } catch (e) {
// @ts-ignore
        dispatch(usersFetchingError('error Fetching the user'))
    }
}

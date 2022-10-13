import {AppDispatch} from "../store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import { getUsersAndDocuments} from "../../utilits/firebase_utilits";
import {AuthFetching, AuthFetchingError, removeUser} from "../Auth/authSlice";
import {removeUsers,usersFetching,usersFetchingError,usersFetchingSuccess} from "./userSlice"
import {IEvent} from "../../Intarface/IEvent";



/*
export const fetchUser = createAsyncThunk(
    "User/fetchAll",
    async (_,thunkApi) => {
        try {

        } catch (e) {
            return thunkApi.rejectWithValue("не удалось загрузить")
        }

    }
)*/


export const fetchUser = () => async (dispatch: AppDispatch) => {

    try {
        dispatch(usersFetching())
        const users = await getUsersAndDocuments()
        dispatch(usersFetchingSuccess(users))
    } catch (e) {
// @ts-ignore
        dispatch(usersFetchingError('error Fetching the user'))
    }
}

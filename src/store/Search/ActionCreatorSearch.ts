import {AppDispatch} from "../store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUsersAndDocuments} from "../../utilits/firebase_utilits";
import {AuthFetching, AuthFetchingError, removeUser} from "../Auth/authSlice";
import {useAppSelector} from "../../hooks/redux";


export const fetchUser = () => async (dispatch: AppDispatch) => {

    try {

    } catch (e) {
// @ts-ignore

    }
}

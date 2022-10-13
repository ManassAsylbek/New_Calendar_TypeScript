import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {signInWithEmail} from "./ActionCreatorAuth";
import {fetchUser} from "../User/ActionCreator";
import {IAuth} from "../../Intarface/IUser";

interface IAuthState {
   /* avatar:string|null,
    name: string|null,
    email: string|null,
    department: string|null,
    position: string|null,
    isAuth:boolean
    isLoading:boolean
    token: string|null
    id: string|null
    error:string*/
    isAuth:boolean,
    isLoading:boolean,
    error:string,
    user:IAuth|null
}

const initialState:IAuthState = {
    isAuth:false,
    isLoading:false,
    error:"",
    user:null

 /*   avatar:"https://cdn.pixabay.com/photo/2016/11/10/12/33/model-1814200__340.jpg",
    name: null,
    email: null,
    department: null,
    position: null,
    isAuth:false,
    token: null,
    id: null,
    isLoading:false,
    error:"",*/
}

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        removeUser:(state) =>{
            state.isAuth = false;
            state.user = null
            state.isLoading = false;
        },
        AuthFetching:(state) =>{
            state.isLoading = true;
        },
        AuthFetchingSuccess:(state, action: PayloadAction<IAuth>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
            state.error = '';
        },
        AuthFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    },
    /*extraReducers: {
        [signInWithEmail.pending.type]: (state) => {
            state.isLoading = true;
        },
        [signInWithEmail.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
            state.error = '';
        },
        [signInWithEmail.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }*/
})

export const {removeUser,AuthFetching,AuthFetchingSuccess,AuthFetchingError} = authSlice.actions
export default authSlice.reducer
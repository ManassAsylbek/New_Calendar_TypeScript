import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../Intarface/IUser";

interface IAuthState {
    isAuth:boolean,
    successAuth:boolean
    isLoadingAuth:boolean,
    error: string|null;
    user:IUser|null,
    id:string
    token:string
}

const initialState:IAuthState = {
    isAuth:false,
    token:"",
    successAuth:false,
    isLoadingAuth:false,
    error:"",
    user:null,
    id:""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        removeUser:(state) =>{
            state.isAuth = false;
            state.user = null
            state.isLoadingAuth = false;
            state.token =""

        },
        AuthFetching:(state) =>{
            state.isLoadingAuth = true;
            state.successAuth = false
        },
        AuthFetchingSuccess:(state, action: PayloadAction<IUser>) => {
            state.isLoadingAuth = false;
            state.isAuth = true;
            state.user = action.payload;
            state.id = action.payload.id
        },
        AuthFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoadingAuth = false;
            state.error = action.payload
        },
        AddToken:(state, action: PayloadAction<string>) => {
            state.token = action.payload;
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

export const {removeUser,AuthFetching,AuthFetchingSuccess,AuthFetchingError,AddToken} = authSlice.actions
export default authSlice.reducer
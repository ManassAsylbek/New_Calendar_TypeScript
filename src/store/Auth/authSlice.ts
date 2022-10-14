import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuth} from "../../Intarface/IUser";

interface IAuthState {
    isAuth:boolean,
    isLoading:boolean,
    error:string,
    user:IAuth|null,
    id:string
}

const initialState:IAuthState = {
    isAuth:false,
    isLoading:false,
    error:"",
    user:null,
    id:""
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
            state.id = action.payload.id;
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
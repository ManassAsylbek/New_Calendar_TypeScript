import {createSlice} from "@reduxjs/toolkit";
import {loginType} from "../../Intarface/IUser";

interface IAuth {
    avatar:string|null,
    surname: string|null,
    name: string|null,
    middleName: string|null,
    email: string|null,
    department: string|null,
    position: string|null,
    password:string|null,
    isAuth:boolean
    token: string|null
    id: string|null
}

const initialState:IAuth = {
    avatar:null,
    surname: null,
    name: null,
    middleName:null,
    email: null,
    department: null,
    position: null,
    password:null,
    isAuth:false,
    token: null,
    id: null,
}

const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUser:(state,action) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.surname = action.payload.surname;
            state.name = action.payload.name;
            state.isAuth = true;
        },
        removeUser:(state) =>{
            state.email = null;
            state.token = null;
            state.id = null;
            state.surname = null;
            state.name = null;
            state.isAuth = false;
        }
    }
})

export const {setUser,removeUser} = authSlice.actions
export default authSlice.reducer
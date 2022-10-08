import {createSlice} from "@reduxjs/toolkit";
import {loginType} from "../../Intarface/IUser";

interface IAuth {
    avatar:string|null,
    name: string|null,
    email: string|null,
    department: string|null,
    position: string|null,
    isAuth:boolean
    loading:boolean
    token: string|null
    id: string|null
}

const initialState:IAuth = {
    avatar:null,
    name: null,
    email: null,
    department: null,
    position: null,
    isAuth:false,
    token: null,
    id: null,
    loading:true
}

const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUser:(state,action) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.department = action.payload.department;
            state.position = action.payload.position;
            state.isAuth = true;
        },
        setLoader:(state)=>{
            state.loading = false;
        },
        removeUser:(state) =>{
            state.email = null;
            state.token = null;
            state.id = null;
            state.name = null;
            state.department = null;
            state.position=null;
            state.loading = false;
            state.isAuth = false;
        }
    }
})

export const {setUser,removeUser,setLoader} = authSlice.actions
export default authSlice.reducer

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUser} from './ActionCreator'
import {IAuth, IUser} from "../../Intarface/IUser";

interface UserState {
    users: IUser[]|[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: "",

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeUsers:(state) =>{
            state.users = []
            state.isLoading = false;
        },
        usersFetching:(state) =>{
            state.isLoading = true;
        },
        usersFetchingSuccess:(state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.users = action.payload;
            state.error = '';
        },
        usersFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    },
    /*extraReducers: {
        [fetchUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.users = action.payload;
            state.error = '';
        },
        [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }*/
})
export const {removeUsers,usersFetching,usersFetchingError,usersFetchingSuccess}= userSlice.actions
export default userSlice.reducer
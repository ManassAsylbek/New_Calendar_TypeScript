import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../Intarface/IUser";

interface searchState {
    user: IUser[]|null;
    isLoading: boolean;
    error: string;
}

const initialState: searchState = {
    user: null,
    isLoading: false,
    error: "",

}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        removeUsers:(state) =>{
            state.user = []
            state.isLoading = false;
        },
        usersFetching:(state) =>{
            state.isLoading = true;
        },
        usersFetchingSuccess:(state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.user = action.payload;
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
export const {removeUsers,usersFetching,usersFetchingError,usersFetchingSuccess}= searchSlice.actions
export default searchSlice.reducer
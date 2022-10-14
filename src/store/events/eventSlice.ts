import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuth, IUser} from "../../Intarface/IUser";
import {IEvent} from "../../Intarface/IEvent";

interface UserState {
    events: IEvent[]|[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    events: [],
    isLoading: false,
    error: "",

}

export const eventSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        eventsFetching:(state) =>{
            state.isLoading = true;
        },
        eventsFetchingSuccess:(state, action: PayloadAction<IEvent[]>) => {
            state.isLoading = false;
            state.events = action.payload;
            state.error = '';
        },
        eventsFetchingError: (state, action: PayloadAction<string>) => {
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
export const {eventsFetching,eventsFetchingSuccess,eventsFetchingError}= eventSlice.actions
export default eventSlice.reducer
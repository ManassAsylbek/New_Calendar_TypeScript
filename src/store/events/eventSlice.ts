import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuth, IUser} from "../../Intarface/IUser";
import {IEvent} from "../../Intarface/IEvent";

interface eventState {
    events: IEvent[]|[];
    isLoading: boolean;
    error: string;
    trash:number
}

const initialState: eventState = {
    events: [],
    isLoading: false,
    error: "",
    trash:0

}

export const eventSlice = createSlice({
    name: 'event',
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
        },
        addEvent:(state) => {
            state.trash ++
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
export const {eventsFetching,eventsFetchingSuccess,eventsFetchingError,addEvent}= eventSlice.actions
export default eventSlice.reducer
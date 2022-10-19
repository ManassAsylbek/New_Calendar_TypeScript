import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEvent} from "../../Intarface/IEvent";
import {IUser} from "../../Intarface/IUser";

interface eventState {
    events: IEvent[] | null;
    successEvent: boolean;
    isLoadingEvent: boolean;
    errorEvent: string | null;
    reloadEvent: number
    foreigner: IUser|null
}

const initialState: eventState = {
    events: [],
    successEvent: false,
    isLoadingEvent: false,
    errorEvent: null,
    reloadEvent: 0,
    foreigner: null,

}

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        eventsFetching: (state) => {
            state.isLoadingEvent = true;
            state.successEvent = false;
            state.errorEvent = '';

        },
        eventsFetchingSuccess: (state, action: PayloadAction<IEvent[]>) => {
            state.events = action.payload;
            state.isLoadingEvent = false;
            state.successEvent = true;
            state.errorEvent = '';
        },
        eventsFetchingError: (state, action: PayloadAction<string>) => {
            state.errorEvent = action.payload
            state.isLoadingEvent = false;
            state.successEvent = false;
        },
        addEvent: (state) => {
            state.reloadEvent++
        },
        isForeigner: (state,action:PayloadAction<IUser|null>) => {
            state.foreigner = action.payload
        },
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
export const {eventsFetching, eventsFetchingSuccess, eventsFetchingError, addEvent,isForeigner} = eventSlice.actions
export default eventSlice.reducer
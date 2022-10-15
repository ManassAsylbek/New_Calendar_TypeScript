import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IMarker} from "../../Intarface/IMarker";

interface UserState {
    markers: IMarker[]|[];
    isLoading: boolean;
    error: string;
    trash:number
}

const initialState: UserState = {
    markers: [],
    isLoading: false,
    error: "",
    trash:0

}

export const markerSlice = createSlice({
    name: 'marker',
    initialState,
    reducers: {
        markerFetching:(state) =>{
            state.isLoading = true;
        },
        markerFetchingSuccess:(state, action: PayloadAction<IMarker[]>) => {
            state.isLoading = false;
            state.markers = action.payload;
            state.error = '';
        },
        markerFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        addMarker:(state) => {
            state.trash ++
        }
    },
})
export const {markerFetching,markerFetchingSuccess,markerFetchingError,addMarker}= markerSlice.actions
export default markerSlice.reducer
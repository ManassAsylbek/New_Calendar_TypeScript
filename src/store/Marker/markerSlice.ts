import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IMarker} from "../../Intarface/IMarker";

interface markerState {
    markers: IMarker[] | null;
    isLoadingMarker: boolean;
    errorMarker: string | null;
    reloadMarker: number
}

const initialState: markerState = {
    markers: [],
    isLoadingMarker: false,
    errorMarker: null,
    reloadMarker: 0
}

export const markerSlice = createSlice({
    name: 'marker',
    initialState,
    reducers: {
        markerFetching: (state) => {
            state.isLoadingMarker = true;
            state.errorMarker = '';
        },
        markerFetchingSuccess: (state, action: PayloadAction<IMarker[]>) => {
            state.isLoadingMarker = false;
            state.markers = action.payload;
            /*state.markers = [{label: "Без метки", value: "gray", id: "gray"}, ...action.payload];*/
            state.errorMarker = '';
        },
        markerFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoadingMarker = false;
            state.errorMarker = action.payload
        },
        addMarker: (state) => {
            state.reloadMarker++
        }
    },
})
export const {markerFetching, markerFetchingSuccess, markerFetchingError, addMarker} = markerSlice.actions
export default markerSlice.reducer
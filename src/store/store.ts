import {combineReducers, configureStore} from "@reduxjs/toolkit";
import dateSlice from "./reducer/dateSlice";
import {markerAPI} from "../services/markerServices";






const rootReducer = combineReducers({
    dateSlice,
    [markerAPI.reducerPath]:markerAPI.reducer
})

export const setupStore = () =>{
    return configureStore({
        reducer:rootReducer,

    })
}

export type RootState = ReturnType <typeof rootReducer>
export type AppStore = ReturnType <typeof setupStore>
export type AppDispatch = AppStore['dispatch']


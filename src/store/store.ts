import {combineReducers, configureStore} from "@reduxjs/toolkit";
import dateSlice from "./reducer/dateSlice";
import authSlice from "./reducer/authSlices";
import {markerAPI} from "../services/markerServices";
import {eventAPI} from "../services/eventServices";
import {userAPI} from "../services/userServicse";






const rootReducer = combineReducers({
    dateSlice,
    authSlice,
    [markerAPI.reducerPath]:markerAPI.reducer,
    [eventAPI.reducerPath]:eventAPI.reducer,
    [userAPI.reducerPath]:userAPI.reducer,
})

export const setupStore = () =>{
    return configureStore({
        reducer:rootReducer,
        middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(markerAPI.middleware,
            eventAPI.middleware,userAPI.middleware)

    })
}

export type RootState = ReturnType <typeof rootReducer>
export type AppStore = ReturnType <typeof setupStore>
export type AppDispatch = AppStore['dispatch']


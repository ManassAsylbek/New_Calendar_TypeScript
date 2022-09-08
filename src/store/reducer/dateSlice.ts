import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import moment from "moment";


interface dateState {
    date:  moment.Moment | null
}

const initialState: dateState = {
    date: moment(new Date()),
}


export const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        addDate(state, action: PayloadAction<moment.Moment | null>) {
            state.date = action.payload
        }
    }
})

export default dateSlice.reducer
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import moment from "moment";


interface dateState {
    date: string;
    format: string | undefined;
    dateFormat: "day" | "week" | "month";
}

const initialState: dateState = {
    date: moment(new Date()).format('YYYY-MM-DD'),
    format: moment(new Date()).format('DD MMMM YYYY - dddd'),
    dateFormat: 'day'
}

export const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        addDate(state, action: PayloadAction<string>) {
            state.date = action.payload;

            if (state.dateFormat === 'day') {
                state.format = moment(action.payload).format('DD MMMM YYYY - dddd')
            }
            if (state.dateFormat === 'week') {
                state.format = `${moment(action.payload).startOf("week").format('D')} -
                                  ${moment(action.payload).endOf("week").format('D MMMM YYYY')}`
            }
            if (state.dateFormat === 'month') {
                state.format = moment(action.payload).format('MMMM YYYY')
            }
        },
        changeDateFormat(state, action: PayloadAction<string>) {
            if (action.payload === "day")
                state.dateFormat = "day"
            if (action.payload === "week")
                state.dateFormat = "week"
            if (action.payload === "month")
                state.dateFormat = "month"
        },
    }
})

export default dateSlice.reducer
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import moment from "moment";


interface dateState {
    date: string;
    format: string | undefined;
    dateFormat: "day" | "week" | "month";
}

/*interface IFormat_Map {
    day: string;
    week: string;
    month: string;
}*/

const initialState: dateState = {
    date: moment(new Date()).format('YYYY-MM-DD'),
    format: moment(new Date()).format('DD MMMM YYYY - dddd'),
    dateFormat: "day"
}


export const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        addDate(state, action: PayloadAction<string>) {
            state.date = action.payload;
          /*  const format_Map = {
                'day': moment(state.date).format('DD MMMM YYYY - dddd'),
                'week': `${moment(state.date).startOf("week").format('D')} -  ${moment(state.date).endOf("week").format('D MMMM YYYY')}`,
                'month': moment(state.date).format('MMMM YYYY')
            }

            // @ts-ignore
            state.format = format_Map[action.payload]

*/
             if (state.dateFormat === 'day') {
                 state.format= moment(state.date).format('DD MMMM YYYY - dddd')
             }
             if (state.dateFormat=== 'week') {
                 state.format = `${moment(state.date).startOf("week").format('D')} -
                                  ${moment(state.date).endOf("week").format('D MMMM YYYY')}`
             }
             if (state.dateFormat === 'month') {
                 state.format = moment(state.date).format('MMMM YYYY')
             }
        },
        changeDateFormat(state, action: PayloadAction<"day" | "week" | "month" | string>) {
            // @ts-ignore
            state.dateFormat = action.payload;
            /* addDate(state.date)*/

        },
        changeFormat(state, action: PayloadAction<string | undefined>) {

            state.format = action.payload
        },


    }
})

export default dateSlice.reducer
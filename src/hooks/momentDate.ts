import moment from "moment";
import {dateSlice} from "../store/reducer/dateSlice";
import {useAppDispatch, useAppSelector} from "./redux";
import React, {useState} from "react";


export const useMomentDate =() =>{
    const {date,dateFormat,} = useAppSelector(state => state.dateSlice)

    const [dateDay,setDateDay]=useState(date)

    const dispatch = useAppDispatch()

    const {addDate, changeDateFormat} = dateSlice.actions



    const todayDate = () => {
        setDateDay(moment(new Date()).format("YYYY-MM-DD"))
        dispatch(addDate(dateDay))
    }
    const nextDate = () => {
        setDateDay(moment(date).add(1, dateFormat).format("YYYY-MM-DD"))
        dispatch(addDate(dateDay))
    }

    const prevDate = () => {
        setDateDay(moment(date).subtract(1, dateFormat).format("YYYY-MM-DD"))
        dispatch(addDate(dateDay))
    }

    const setValue = (e:React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeDateFormat(e.target.value))
        dispatch(addDate(date))

    }


    return {todayDate,nextDate,prevDate,setValue}
}

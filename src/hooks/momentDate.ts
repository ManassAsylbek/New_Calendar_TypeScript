import moment from "moment";
import {dateSlice} from "../store/Date/dateSlice";
import {useAppDispatch, useAppSelector} from "./redux";
import React, {useState} from "react";

type funcType = () => void

interface IMomentDate {
    (): {
        todayDate: funcType;
        nextDate: funcType;
        prevDate: funcType;
        setValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    }
}

export const useMomentDate:IMomentDate = () => {
    const {date, dateFormat} = useAppSelector(state => state.dateSlice)

    const dispatch = useAppDispatch()

    const {addDate, changeDateFormat} = dateSlice.actions


    const todayDate:funcType = () => {
        dispatch(addDate(moment(new Date()).format("YYYY-MM-DD")))
    }

    const nextDate:funcType = () => {
        dispatch(addDate(moment(date).add(1, `${dateFormat}`).format("YYYY-MM-DD")))
    }

    const prevDate:funcType = () => {
        dispatch(addDate(moment(date).subtract(1,`${dateFormat}`).format("YYYY-MM-DD")))
    }

    const setValue:(e: React.ChangeEvent<HTMLSelectElement>)=>void= (e) => {
        dispatch(changeDateFormat(e.target.value))
        dispatch(addDate(date))
    }

    return {todayDate, nextDate, prevDate, setValue}
}

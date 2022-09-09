import type {DatePickerProps} from 'antd';
import {DatePicker} from 'antd';
import React from 'react';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import "./MiniCalendar.css"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {dateSlice} from "../../../store/reducer/dateSlice";
import moment from "moment";





const MiniCalendar: React.FC = () => {
    const dispatch = useAppDispatch()
    const {addDate} = dateSlice.actions
    const {date} = useAppSelector(state => state.dateSlice)


    const onChange: DatePickerProps['onChange'] = (date, dateString) => {

        dispatch(addDate(dateString))
    };


    return (
        <DatePicker
            value={moment(date)}
            onChange={onChange}
            className = "miniCalendar"
            popupClassName="calendarBar"
            /*     ClassName="calendarSitebar"*/
            showToday={false}
            locale={locale}
            open={true}
            mode="date"

        />
    );
}

export default MiniCalendar;
import type {DatePickerProps} from 'antd';
import {DatePicker} from 'antd';
import React from 'react';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import "./MiniCalendar.css"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {dateSlice} from "../../../store/Date/dateSlice";
import moment from "moment";


const MiniCalendar: React.FC = () => {
    const dispatch = useAppDispatch()
    const {addDate} = dateSlice.actions
    const {date} = useAppSelector(state => state.dateSlice)


    const onChange: DatePickerProps['onChange'] = (date, dateString) => {

        dispatch(addDate( moment(date).format('YYYY-MM-DD')))
    };

    return (
        <DatePicker
            value={moment(date)}
            onChange={onChange}
            onPanelChange={onChange}
            className = "miniCalendar"
            popupClassName="calendarBar"
            showToday={false}
            locale={locale}
            open={true}
            mode="date"

        />
    );
}

export default MiniCalendar;
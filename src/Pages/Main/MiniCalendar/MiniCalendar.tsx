import type {DatePickerProps} from 'antd';
import {DatePicker} from 'antd';
import React from 'react';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import "./MiniCalendar.css"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {dateSlice} from "../../../store/reducer/dateSlice";





const MiniCalendar: React.FC = () => {

    const {addDate} = dateSlice.actions
    const {date} = useAppSelector(state => state.dateSlice)


    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        dispatch(addDate(date))
    };
    const dispatch = useAppDispatch()

    return (
        <DatePicker

            value={date}
            onChange={onChange}
            dropdownClassName="calendarBar"
            /*     ClassName="calendarSitebar"*/
            showToday={false}
            locale={locale}
            open={true}
            mode="date"
            style={{visibility: "hidden", background: 'transparent', zIndex: 1}}
        />
    );
}

export default MiniCalendar;
import {Calendar} from 'antd';
import type {Moment} from 'moment';
import React, {useState} from 'react';
import "./Calendar.css";
import 'moment/locale/ru';
import locale from 'antd/es/calendar/locale/ru_RU';
import moment from "moment";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {dateSlice} from "../../../../store/Date/dateSlice";
import {eventAPI} from "../../../../services/eventServices";
import {IEvent} from "../../../../Intarface/IEvent";
import Modal from "../../../../Modal/modal";
import NewEvent from "../../../../Components/newEvent/newEvent";
import EditEvent from "../../../../Components/EditEvent/EditEvent";


const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
        return 1394;
    }
};

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const {addDate} = dateSlice.actions
    const {date} = useAppSelector(state => state.dateSlice)

    const [deleteEvent, {isSuccess: deleteEventSuccess}] = eventAPI.useDeleteEventsMutation()
    const [updateEvent, {
        isSuccess: updateEventSuccess,
        isError: updateEventError,
        isLoading: updateEventLoading
    }] = eventAPI.useUpdateEventsMutation()

    const [editEventActive, setEditEventActive] = useState(false)
    const [eventActive, setEventActive] = useState(false)
    const [event, setEvent] = useState<IEvent | undefined>()
    const [limit, setLimit] = useState(100)

    const {data: events} = eventAPI.useFetchAllEventsQuery(limit)

    const monthCellRender = (value: Moment) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    type ListDataType = { (value: Moment): (Array<IEvent> | []) }


    const getListData: ListDataType = (value: Moment) => {
        let listData: Array<IEvent> = []
        if (events)
            events.map((item: IEvent) => {
                    if (item.date === (moment(value).format("YYYY-MM-DD"))) {
                        return listData.push(item)
                    }
                }
            )
        return listData || [];
    };

    const getEvent = (item: IEvent) => {
        setEvent(item)
        events && events.find((item: IEvent) => item.date === date)
            ? setEditEventActive(true)
            : setEventActive(true)
    }

    const dateCellRender = (value: Moment) => {
        const listData: Array<IEvent> = getListData(value);
        return (
            <ul className="events" onClick={() => editEventActive
                ? setEventActive(false)
                : setEventActive(true)}>
                {listData.map((item) => (
                    <li key={item.title} style={{position: "relative"}} onClick={() => getEvent(item)}>
                       <span onClick={() => setEvent(item)}
                             style={{
                                 display: "inline-block",
                                 background: item.marker,
                                 width: 10,
                                 color: item.marker,
                                 height: 10,
                                 borderRadius: 10,
                                 marginRight: 5,
                             }}
                             className="markerCalendar"
                       />
                        <span style={{marginRight: 5}}
                        >{item.startTime}</span>
                        <span
                        >{item.title}</span>

                    </li>
                ))}
            </ul>
        );
    };

    const onChange = (dateString: Moment) => {
        dispatch(addDate(moment(dateString).format("YYYY-MM-DD")))
    };

    return <>
        <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            className="calendar_table"
            value={moment(date)}
            locale={locale}
            onChange={onChange}
            mode="month"
            fullscreen={true}
            onSelect={() => editEventActive
                ? setEventActive(false)
                : setEventActive(true)}
        />;
        {eventActive && <Modal setActive={setEventActive} active={eventActive}
                               children={<NewEvent
                                   date={date}
                                   setActive={setEventActive}/>}/>}
        {editEventActive && event && <Modal setActive={setEditEventActive} active={editEventActive}
                                            children={<EditEvent
                                                deleteEvent={deleteEvent}
                                                updateEvent={updateEvent}
                                                event={event}
                                                setActive={setEditEventActive}/>}/>}


    </>
};

export default App;

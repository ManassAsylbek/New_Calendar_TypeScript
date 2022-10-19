import {Calendar, Popover} from 'antd';
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
import PopoverEvent from "../../../../Components/Popover/popoverEvent/PopoverEvent";


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


    const [eventActive, setEventActive] = useState(false)
    const [event, setEvent] = useState<IEvent | undefined>()
    const [limit, setLimit] = useState(100)
    const [open, setOpen] = useState(false);

    //const {data: events} = eventAPI.useFetchAllEventsQuery(limit)
    const {events} = useAppSelector(state => state.eventSlice)

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

    /*   const getEvent = (item: IEvent) => {
           setEvent(item)
           events && events.find((item: IEvent) => item.date === date)
               ? ""
               : setEventActive(true)
       }*/

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const dateCellRender = (value: Moment) => {
        const listData: Array<IEvent> = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.title} style={{position: "relative"}}>
                        <Popover color="#FBFCFF" content={() => <PopoverEvent  event={item}/>}
                                 key={item.id}
                                 placement="right"
                                 >
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
                        </Popover>
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
            onSelect={() => setEventActive(true)}

        />;
        {eventActive && <Modal setActive={setEventActive} active={eventActive}
                               children={<NewEvent
                                   date={date}
                                   setActive={setEventActive}/>}/>}


    </>
};

export default App;

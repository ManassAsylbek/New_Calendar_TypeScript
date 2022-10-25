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
    const {id} = useAppSelector(state => state.authSlice)
    const {foreigner} = useAppSelector(state => state.eventSlice)


    const [eventActive, setEventActive] = useState(false)

    const [event, setEvent] = useState<IEvent | undefined>()
    const {events,room} = useAppSelector(state => state.eventSlice)

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
        let newEvent = events
        if (room && events) {
            newEvent = events.filter(event => event.room === room)
        }

        if (newEvent)
            newEvent.map((item: IEvent) => {
                    if (item.date === (moment(value).format("YYYY-MM-DD"))) {
                        return listData.push(item)
                    }
                }
            )
        return listData || [];
    };
    ;

    const dateCellRender = (value: Moment) => {
        const listData: Array<IEvent> = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => ((item.status.label === 'Принят' || item.author?.id === id) &&//прверка на свое события или на принятия
                    <li key={item.title} style={{position: "relative"}}>
                        <Popover color="#FBFCFF" content={() => <PopoverEvent event={item}/>}
                                 key={item.id}
                                 placement="right"
                        >
                       <span onClick={() => setEvent(item)}
                             style={{
                                 display: "inline-block",
                                 background: !foreigner
                                     ? item.marker ? item.marker : "gray"
                                     : "gray",
                                 width: 10,
                                 //color: item.marker?item.marker:"gray",
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

        />
        {eventActive && <Modal setActive={setEventActive} active={eventActive}
                               children={<NewEvent
                                   date={date}
                                   setActive={setEventActive}/>}/>}


    </>
};

export default App;

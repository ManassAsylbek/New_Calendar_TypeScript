import React, {FC, useState} from 'react';
import style from './EditEventModal.module.css'
import '../../Modal/datePickerModal.css'
import close from '../../Media/icons/close.svg'
import add from '../../Media/icons/add.svg'
import tire from '../../Media/icons/tire.svg'
import 'moment/locale/ru';
import {DatePicker} from "antd";
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment from "moment";
import Input from "../formControl/Input";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import ReactSelect from "react-select";
import {
    optionAccess, optionMarker,
    optionRepeat,
    optionRoom,
    optionTime, SelectFooterStyles,
    SelectStyles,
    SelectTimeStyles
} from "../../Constants/option";
import {IOption} from "../../Intarface/isShippingField";
import {getValue} from "../../hooks/getValue";
import {IEvent} from "../../Intarface/IEvent";
import Modal from "../../Modal/modal";
import InviteParticipants from "../inviteParticipants/inviteParticipants";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {IMarker} from "../../Intarface/IMarker";
import {setDeleteEvent, setEvents, setUpdateEvent} from "../../store/events/ACEvents";
import person from "../../Media/images/avatar.png";

interface NewEventProps {
    setActive: (pt: boolean) => void
    event: IEvent

}

const EditEvent: FC<NewEventProps> = ({setActive, event}) => {

    const {id} = useAppSelector(state => state.authSlice)
    const [inviteActive, setInviteActive] = useState(false)
    const dispatch = useAppDispatch()
    const {markers} = useAppSelector(state => state.markerSlice)
    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm<IEvent>({mode: 'onChange'})


    const handleRemove = () => {

        dispatch(setDeleteEvent(`events_${id}`, event.id))
        setActive(false)
    }

    const onSubmit: SubmitHandler<IEvent> = (data) => {
        const updateEventValue = {...event, ...data}
        console.log(updateEventValue)
        dispatch(setUpdateEvent(`events_${id}`, event.id, updateEventValue))
        setActive(false)
    }


    return (
        <div className={style.newEventContent} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <h2>Редактирования события</h2>
                <button onClick={() => setActive(false)} className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
            </div>
            <form action="javascript:void (0)">
                <div>
                    <h4>Название</h4>
                    <Input errors={errors.title} label='title' defaultValue={event.title} register={register} required
                           className={style.titleInput}/>
                </div>
                <div className={style.date}>
                    <h4>Дата и время</h4>
                    <div className={style.time}>
                        <Controller
                            control={control}
                            name='date'
                            rules={{
                                required: 'выберите дату'
                            }}
                            defaultValue={event.date}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <> {error && <div className={style.error}>{error.message}</div>}
                                    <DatePicker
                                        className={style.DatePicker}
                                        allowClear={false}
                                        popupClassName="modalDatePickerDrop"
                                        showToday={false}
                                        locale={locale}
                                        mode="date"
                                        defaultValue={moment(value)}
                                        format="DD-MM-YYYY"
                                        name="date"
                                        onChange={(date) => onChange(moment(date).format('YYYY-MM-DD'))}
                                        value={moment(value)}
                                    />

                                </>)}
                        />
                        <div className={style.select}>
                            <Controller control={control}
                                        name='startTime'
                                        rules={{
                                            required: 'выберите начало времени'
                                        }}
                                        defaultValue={event.startTime}
                                        render={({field: {onChange, value}, fieldState: {error}}) => <>
                                            {error && <div className={style.error}>{error.message}</div>}
                                            <ReactSelect
                                                className={style.startTime}
                                                styles={SelectTimeStyles}
                                                placeholder={optionTime[0].label}
                                                options={optionTime}
                                                value={getValue(value, optionTime)}
                                                onChange={(newValue) => onChange((newValue as IOption).value)}
                                            />
                                            {error && <div className={style.error}>{error.message}</div>}
                                        </>}
                            />
                            <img src={tire} alt=""/>
                            <Controller control={control}
                                        name='endTime'
                                        rules={{
                                            required: 'выберите конец времени'
                                        }}
                                        defaultValue={event.endTime}
                                        render={({field: {onChange, value}, fieldState: {error}}) => <>
                                            {error && <div className={style.error}>{error.message}</div>}
                                            <ReactSelect
                                                styles={SelectTimeStyles}
                                                className={style.endTime}
                                                placeholder={optionTime[0].label}
                                                options={optionTime}
                                                value={getValue(value, optionTime)}
                                                onChange={(newValue) => onChange((newValue as IOption).value)}
                                            />
                                            {error && <div className={style.error}>{error.message}</div>}
                                        </>}
                            />
                        </div>
                        <Controller control={control}
                                    name="repeat"
                                    rules={{
                                        required: 'выберите периуд повторения'
                                    }}
                                    defaultValue={event.repeat}
                                    render={({field: {onChange, value}, fieldState: {error}}) => <>
                                        {error && <div className={style.error}>{error.message}</div>}
                                        <ReactSelect
                                            styles={SelectStyles}
                                            className={style.endTime}
                                            placeholder={optionRepeat[0].label}
                                            options={optionRepeat}
                                            value={getValue(value, optionRepeat)}
                                            onChange={(newValue) => onChange((newValue as IOption).value)}
                                        />
                                        {error && <div className={style.error}>{error.message}</div>}
                                    </>}
                        />
                    </div>
                </div>
                <div>
                    <Controller control={control}
                                name="participant"
                                rules={{
                                    required: 'выберите участников'
                                }}
                                defaultValue={event.participant}
                                render={({field: {onChange, value}, fieldState: {error}}) => <>
                                    <div className={style.add}>
                                        <h4>Участники ({value && value.length})</h4>
                                        <button>
                                            <img src={add} onClick={() => setInviteActive(true)} alt=""/>
                                        </button>
                                    </div>
                                    {error && <div className={style.error}>{error.message}</div>}
                                    <div className={style.person}>
                                        {value && value.map(user =>
                                            <div key={user.id} className={style.chooseAvatar}>
                                                <img src={user.photoURL ? user.photoURL : person}
                                                     alt="" className={style.chooseAvatarImg}/>
                                                <div>
                                                    <div className={style.name}>{user.displayName}</div>
                                                    {user.id === id ? <div className={style.invite}>автор</div>
                                                        : <div className={style.invite}>приглашен</div>}
                                                </div>
                                            </div>)
                                        }
                                        {inviteActive && <Modal setActive={setInviteActive}
                                                                active={inviteActive}
                                                                children={<InviteParticipants
                                                                    onChange={onChange}
                                                                    value={value}
                                                                    /* users={users}*/
                                                                    label={"Пригласить"}
                                                                    setActive={setInviteActive}/>}/>}

                                    </div>
                                </>}
                    />
                </div>
                <div className={style.place}>
                    <h4>Помещение</h4>
                    <Controller control={control}
                                name="room"
                                rules={{
                                    required: 'выберите помещение'
                                }}
                                defaultValue={event.room}
                                render={({field: {onChange, value}, fieldState: {error}}) => <>
                                    <ReactSelect
                                        styles={SelectStyles}
                                        className={style.endTime}
                                        placeholder={optionRoom[0].label}
                                        options={optionRoom}
                                        value={getValue(value, optionRoom)}
                                        onChange={(newValue) => onChange((newValue as IOption).value)}
                                    />
                                    {error && <div className={style.error}>{error.message}</div>}
                                </>}
                    />
                </div>
                <div className={style.room}>
                    <div>
                        <h4>Метки</h4>
                        {markers && <Controller control={control}
                                                name="marker"
                                                rules={{
                                                    required: 'выберите метку '
                                                }}
                                                defaultValue={event.marker ? event.marker : markers[0].value}
                                                render={({field: {onChange, value}, fieldState: {error}}) => <>
                                                    <ReactSelect
                                                        styles={SelectFooterStyles}
                                                        className={style.endTime}
                                                        placeholder={markers[0].label}
                                                        options={markers}
                                                        value={getValue(value, markers)}
                                                        onChange={(newValue) => onChange((newValue as IMarker).value)}
                                                    />
                                                    {error && <div className={style.error}>{error.message}</div>}
                                                </>}
                        />}
                    </div>
                    <div>
                        <h4>Разрешение на доступ к мероприятию</h4>

                        <Controller control={control}
                                    name="access"
                                    rules={{
                                        required: 'выберите доступ'
                                    }}
                                    defaultValue={event.access}
                                    render={({field: {onChange, value}, fieldState: {error}}) => <>
                                        <ReactSelect
                                            styles={SelectStyles}
                                            className={style.endTime}
                                            placeholder={optionAccess[0].label}
                                            options={optionAccess}
                                            value={getValue(value, optionAccess)}
                                            onChange={(newValue) => onChange((newValue as IOption).value)}
                                        />
                                        {error && <div className={style.error}>{error.message}</div>}
                                    </>}
                        />
                    </div>

                </div>
                <div className={style.footer}>
                    <button className={style.delete} onClick={handleRemove}>Удалить</button>
                    <button onClick={handleSubmit(onSubmit)} className={style.save}>Сохранить</button>
                </div>
            </form>

        </div>
    );
};

export default EditEvent;
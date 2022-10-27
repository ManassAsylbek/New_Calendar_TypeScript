import React, {FC, useState} from 'react';
import style from './NewEventModal.module.css'
import '../../Modal/datePickerModal.css'
import close from '../../Media/icons/close.svg'
import add from '../../Media/icons/add.svg'
import tire from '../../Media/icons/tire.svg'
import 'moment/locale/ru';
import {DatePicker} from "antd";
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment from "moment";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IOption} from "../../Intarface/isShippingField";
import Input from "../formControl/Input";
import ReactSelect from 'react-select';
import {
    optionAccess,
    optionRepeat,
    optionRoom,
    optionTime, SelectStyles, SelectFooterStyles,
    SelectTimeStyles
} from "../../Constants/option";
import {getValue} from "../../hooks/getValue";
import {IEvent, IEventAdd} from "../../Intarface/IEvent";
import InviteParticipants from "../inviteParticipants/inviteParticipants";
import Modal from "../../Modal/modal";
import {useTime} from "../../hooks/useTime";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setEvents} from "../../store/events/ACEvents";
import {IUser} from "../../Intarface/IUser";
import {IMarker} from "../../Intarface/IMarker";
import person from "../../Media/images/avatar.png";


interface NewEventProps {
    setActive: (pt: boolean) => void
    date: string | undefined
    time?: string | undefined
}


const NewEvent: FC<NewEventProps> = ({setActive, date, time}) => {
    const [inviteActive, setInviteActive] = useState(false)
    const {markers} = useAppSelector(state => state.markerSlice)
    const {user, id} = useAppSelector(state => state.authSlice)
    const {startTime, endTime} = useTime(time)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm<IEvent>({mode: 'onChange'})


    let userArray: IUser[] = []
    if (user)
        userArray.push(user)

    const onSubmit: SubmitHandler<IEvent> = async (data) => {

        const newData: IEvent = {...data, author:user, id: "def", status: {label: null, value: null, new: true}}
        console.log(newData)
        dispatch(setEvents(id, newData))
        setActive(false)
    }


    return (
        <div className={style.newEventContent} onClick={e => e.stopPropagation()}>
            <div className={style.header}>
                <h2>Новое событие</h2>
                <button onClick={() => setActive(false)} className={style.eventBtn}>
                    <img src={close} alt=""/>
                </button>
            </div>
            <form action="javascript:void (0)">
                <div>
                    <h4>Название</h4>
                    <Input errors={errors.title} label='title' register={register} required
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
                            defaultValue={date}
                            render={({field: {onChange, value}, fieldState: {error}}) => (<>
                                <DatePicker
                                    popupClassName="modalDatePickerDrop"
                                    className={style.DatePicker}
                                    allowClear={false}
                                    showToday={false}
                                    locale={locale}
                                    mode="date"
                                    format="DD-MM-YYYY"
                                    name="date"
                                    onChange={(date) => onChange(moment(date).format('YYYY-MM-DD'))}
                                    value={moment(value)}
                                />
                                {error && <div className={style.error}>{error.message}</div>}
                            </>)}
                        />


                        <div className={style.select}>
                            <Controller control={control}
                                        name='startTime'
                                        rules={{
                                            required: 'выберите время'
                                        }}
                                        defaultValue={startTime}
                                        render={({field: {onChange, value}, fieldState: {error}}) => <>
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
                                            required: 'выберите время'
                                        }}
                                        defaultValue={endTime}
                                        render={({field: {onChange, value}, fieldState: {error}}) => <>
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
                                        required: 'выберите повтор'
                                    }}
                                    render={({field: {onChange, value}, fieldState: {error}}) => <>
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
                                defaultValue={userArray}
                                render={({field: {onChange, value}, fieldState: {error}}) => <>
                                    <div className={style.add}>
                                        <h4>Участники ({value && value.length})</h4>
                                        <button><img src={add} onClick={() => setInviteActive(true)} alt=""/>
                                        </button>
                                    </div>
                                    <div className={style.person}>
                                        {value && value.map(user =>
                                            <div className={style.chooseAvatar} key={user.id}>
                                                <div className={style.Avatar}>
                                                    <img src={user.photoURL ? user.photoURL : person}
                                                         alt="" className={style.chooseAvatarImg}/>
                                                    <div>
                                                        <div className={style.name}>{user.displayName}</div>
                                                        {user.id === id ? <div className={style.invite}>автор</div>
                                                            : <div className={style.invite}>приглашен</div>}
                                                    </div>
                                                </div>
                                            </div>)
                                        }
                                        {inviteActive &&
                                        <Modal setActive={setInviteActive} active={inviteActive}
                                               children={<InviteParticipants onChange={onChange}
                                                                             value={value}
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
                                                    required: 'выберите метку'
                                                }}
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
                                                </>
                                                }
                        />}
                    </div>
                    <div>
                        <h4>Разрешение на доступ к мероприятию</h4>
                        <Controller control={control}
                                    name="access"
                                    rules={{
                                        required: 'выберите доступ'
                                    }}
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
                    <button onClick={handleSubmit(onSubmit)} className={style.save}>Сохранить</button>
                </div>
            </form>
        </div>
    );
};

export default NewEvent;


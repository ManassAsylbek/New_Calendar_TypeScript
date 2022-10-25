import React, {useState} from "react";
import {IUser} from "../Intarface/IUser";
import {useAppSelector} from "./redux";
import {IEvent} from "../Intarface/IEvent";
import {optionRoom} from "../Constants/option";
import {IOption} from "../Intarface/isShippingField";


interface ISearchType {
    (title?: string): {
        getSearch: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void
        searchUsers: IUser[] | [],
        searchEvents: IEvent[] | []
        searchRooms: IOption[] | []

    }
}

export const useSearch: ISearchType = (title) => {
    // const {data: users} = userAPI.useFetchAllUsersQuery(10)
    const {id} = useAppSelector(state => state.authSlice)

    const {users} = useAppSelector(state => state.userSlice)
    const {events} = useAppSelector(state => state.eventSlice)
    const filterUsers = users.filter(user => user.id !== id)

    const [searchUsers, setSearchUsers] = useState<Array<IUser>>(filterUsers as IUser[])
    const [searchEvents, setSearchEvents] = useState<Array<IEvent>>(events as IEvent[])
    const [searchRooms, setSearchRooms] = useState<Array<IOption>>(optionRoom as IOption[])

    const getSearch: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void = (e) => {
        if (e) {
            users && setSearchUsers(users.filter(user => user.displayName.toLowerCase().includes(e.target.value)))
        }
        if (e && (title==="title" || title==="all")) {
            events && setSearchEvents(events.filter(event => event.title.toLowerCase().includes(e.target.value)))
        }
        if (e && (title==="room" || title==="all")) {
            optionRoom && setSearchRooms(optionRoom.filter(room => room.value.toLowerCase().includes(e.target.value)))
        }
    }


    return {getSearch, searchUsers, searchEvents,searchRooms}
};

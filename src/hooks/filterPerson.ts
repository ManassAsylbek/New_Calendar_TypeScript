import moment from "moment";
import {dateSlice} from "../store/Date/dateSlice";
import {useAppDispatch, useAppSelector} from "./redux";
import React, {useState} from "react";
import {IUser, loginType} from "../Intarface/IUser";
import {userAPI} from "../services/userServicse";


type funcType = () => void

interface IFilterPerson {
    (value?: IUser[]): {
        findUser: (id: string, users: IUser[], property: 'id' | 'displayName') => void
        addUser: (user: IUser) => void
        removeUser: (id: string) => void;
        newUsers: IUser[] | [],
        searchUsers: IUser[] | [],
        setNewUsers: (users: IUser[]) => void
        search: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void
    }
}

export const useFilterPerson: IFilterPerson = (value?) => {
    // const {data: users} = userAPI.useFetchAllUsersQuery(10)

    const {users} = useAppSelector(state => state.userSlice)





    const [newUsers, setNewUsers] = useState<Array<IUser>>(value as IUser[])

    const [searchUsers, setSearchUsers] = useState<Array<IUser>>(users as IUser[])

    const search: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void = (e) => {
        if (e) {
            users && setSearchUsers(users.filter(user => user.displayName.toLowerCase().includes(e.target.value)))
        }
    }

    const findUser: (id: string, users: IUser[], property: 'id' | 'displayName') => void = (id, users, property) => {
        users.filter((user) => user[property] == id)
    }
    const addUser: (user: IUser) => void = (user) => {

        if (!newUsers.find(item => item.id === user.id) && value) {
            setNewUsers(curr => [...curr, user])
        }
    }
    const removeUser: (id: string) => void = (id) => {
        setNewUsers(newUsers.filter((user) => user.id !== id))
    }

    return {addUser, removeUser, findUser, newUsers, setNewUsers, search, searchUsers}
}

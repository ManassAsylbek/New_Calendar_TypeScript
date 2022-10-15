import React, {useState} from "react";
import {IUser} from "../Intarface/IUser";
import {userAPI} from "../services/userServicse";
import {useAppSelector} from "./redux";


interface ISearchType {
    (): {
        searchUsers: IUser[] | [],
        search: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void
    }
}

export const useSearch: ISearchType = () => {
   // const {data: users} = userAPI.useFetchAllUsersQuery(10)
    const {id} = useAppSelector(state => state.authSlice)

    const {users}= useAppSelector(state => state.userSlice)
    const filterUsers =users.filter(user => user.id !==id)

    const [searchUsers, setSearchUsers] = useState<Array<IUser>>(filterUsers as IUser[])

    const search: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void = (e) => {
        if (e) {
            users && setSearchUsers(users.filter(user => user.displayName.toLowerCase().includes(e.target.value)))
        }
    }
    return {search, searchUsers}
};

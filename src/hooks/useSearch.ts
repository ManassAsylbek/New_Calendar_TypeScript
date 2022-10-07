import React, {useState} from "react";
import {IUser} from "../Intarface/IUser";
import {userAPI} from "../services/userServicse";


interface ISearchType {
    (): {
        searchUsers: IUser[] | [],
        search: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void
    }
}

export const useSearch: ISearchType = () => {
    const {data: users} = userAPI.useFetchAllUsersQuery(10)
    const [searchUsers, setSearchUsers] = useState<Array<IUser>>(users as IUser[])

    const search: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void = (e) => {
        if (e) {
            users && setSearchUsers(users.filter(user => user.name.toLowerCase().includes(e.target.value)))
        }
    }
    return {search, searchUsers}
};

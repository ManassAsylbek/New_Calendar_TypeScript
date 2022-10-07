import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "../Intarface/IUser";




export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        fetchAllUsers: build.query<IUser[],number>({
            query: (limit:number) => ({
                url: '/users',
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['User']
        }),
        createUsers: build.mutation<IUser ,IUser >({
            query: (user: IUser ) => ({
                url: '/users',
                method:"POST",
                body: user
            }),
            invalidatesTags: ['User']
        }),
        updateUsers: build.mutation<IUser , IUser>({
            query: (user: IUser ) => ({
                url: `/users/${user.id}`,
                method:"PUT",
                body: user
            }),
            invalidatesTags: ['User']
        }),
        deleteUsers: build.mutation<IUser , IUser>({
            query: (user: IUser ) => ({
                url: `/users/${user.id}`,
                method:"DELETE",
                body: user
            }),
            invalidatesTags: ['User']
        }),
    })
})
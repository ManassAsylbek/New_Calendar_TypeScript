
export const h=''
/*
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IEvent} from "../Intarface/IEvent";
import {IUser} from "../Intarface/IUser";


export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        fetchAllUsers: build.query<IUser[], number>({
            query: (limit: number) => ({
                url: '/events',
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['Event']
        }),
        createEvents: build.mutation<IEvent, IEvent>({
            query: (event: IEvent) => ({
                url: '/events',
                method: "POST",
                body: event
            }),
            invalidatesTags: ['Event']
        }),
        updateEvents: build.mutation<IEvent, IEvent>({
            query: (event: IEvent) => ({
                url: `/events/${event.id}`,
                method: "PUT",
                body: event
            }),
            invalidatesTags: ['Event']
        }),
        deleteEvents: build.mutation<IEvent, IEvent>({
            query: (event: IEvent) => ({
                url: `/events/${event.id}`,
                method: "DELETE",
                body: event
            }),
            invalidatesTags: ['Event']
        }),
    })
})*/

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IEvent} from "../Intarface/IEvent";



export const eventAPI = createApi({
    reducerPath: "eventAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Event'],
    endpoints: (build) => ({
        fetchAllEvents: build.query<IEvent[],number>({
            query: (limit:number) => ({
                url: '/events',
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['Event']
        }),
        createEvents: build.mutation<IEvent ,IEvent >({
            query: (event: IEvent ) => ({
                url: '/events',
                method:"POST",
                body: event
            }),
            invalidatesTags: ['Event']
        }),
        updateEvents: build.mutation<IEvent , IEvent>({
            query: (event: IEvent ) => ({
                url: `/events/${event.id}`,
                method:"PUT",
                body: event
            }),
            invalidatesTags: ['Event']
        }),
        deleteEvents: build.mutation<IEvent , IEvent>({
            query: (event: IEvent ) => ({
                url: `/events/${event.id}`,
                method:"DELETE",
                body: event
            }),
            invalidatesTags: ['Event']
        }),
    })
})
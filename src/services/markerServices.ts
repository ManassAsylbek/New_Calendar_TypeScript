import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IMarker} from "../Intarface/IMarker";



export const markerAPI = createApi({
    reducerPath: "markerAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    tagTypes: ['Marker'],
    endpoints: (build) => ({
        fetchAllMarkers: build.query<IMarker[],number>({
            query: (limit:number) => ({
                url: 'markers',
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['Marker']
        }),
        createMarkers: build.mutation<IMarker , IMarker >({
            query: (marker: IMarker ) => ({
                url: '/markers',
                method:"POST",
                body: marker
            }),
            invalidatesTags:['Marker']
        }),
        updateMarkers: build.mutation<IMarker , IMarker>({
            query: (marker: IMarker ) => ({
                url: `markers/${marker.id}`,
                method:"PUT",
                body: marker
            }),
            invalidatesTags:['Marker']
        }),
        deleteMarkers: build.mutation<IMarker , IMarker>({
            query: (marker: IMarker ) => ({
                url: `markers/${marker.id}`,
                method:"DELETE",
                body: marker
            }),
            invalidatesTags:['Marker']
        }),
    })
})
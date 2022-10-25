import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Main from "./Pages/Main/Main";
import Registration from "./Pages/Registration/Registration";
import Authorizations from "./Pages/Autorization/Authorizations";
import NotFound from "./Pages/NotFound/NotFound";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {getProfile, isUserAuthenticated} from "./store/Auth/ActionCreatorAuth";
import {auth} from "./utilits/firebase_utilits";
import {fetchUser} from "./store/User/ActionCreator";
import {getEvents} from "./store/events/ACEvents";
import {getMarkers} from "./store/Marker/ActionCreatorMarker";
import Preloader from "./Components/Preloader/Preloader";

function App() {
    const dispatch = useAppDispatch()
    const {isLoadingAuth, id,reloadProfile} = useAppSelector(state => state.authSlice)
    const {reloadEvent} = useAppSelector(state => state.eventSlice)
    const {reloadMarker} = useAppSelector(state => state.markerSlice)

    useEffect(() => {
        dispatch(fetchUser())
        dispatch(isUserAuthenticated())

    }, [])
    useEffect(() => {
        dispatch(getMarkers(id))

    }, [reloadMarker])

    useEffect(() => {
        dispatch(getProfile(id))
    }, [reloadProfile])

    useEffect(() => {
        dispatch(fetchUser())
        dispatch(getEvents(id))

    }, [reloadEvent])

    return (
        <>
            {isLoadingAuth
                ? <Preloader loader={true}/>
                : <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/authorizations" element={<Authorizations/>}/>
                        <Route path="/*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            }
        </>
    );
}

export default App;

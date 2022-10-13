import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Main from "./Pages/Main/Main";
import Registration from "./Pages/Registration/Registration";
import Authorizations from "./Pages/Autorization/Authorizations";
import NotFound from "./Pages/NotFound/NotFound";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {isUserAuthenticated} from "./store/Auth/ActionCreatorAuth";
import {auth} from "./utilits/firebase_utilits";
import {fetchUser} from "./store/User/ActionCreator";

function App() {
    const dispatch = useAppDispatch()
    const {isLoading} = useAppSelector(state => state.authSlice)
    useEffect(() => {
        dispatch(isUserAuthenticated())
    }, [])
    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    return (
        <>
            {isLoading
                ? <div>loading</div>
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

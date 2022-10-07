import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Main from "./Pages/Main/Main";
import Registration from "./Pages/Registration/Registration";
import Authorizations from "./Pages/Autorization/Authorizations";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/authorizations" element={<Authorizations/>}/>
                    <Route path="/*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
